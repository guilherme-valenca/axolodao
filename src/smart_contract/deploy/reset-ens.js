#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ethers = require(path.resolve(__dirname, '../../axolodao-relayer/node_modules/ethers'));
const {
  EXPECTED_CHAIN_ID,
  INVENTORY_FILE,
  ROOT_DOMAIN,
  ROOT_NODE,
  clearRecords,
  loadInventory,
  saveInventory,
} = require('./ens-inventory/inventory');

const SMART_CONTRACT_ENV = path.resolve(__dirname, '../.env');
const RELAYER_ENV = path.resolve(__dirname, '../../axolodao-relayer/.env');
const HISTORY_FILE = path.resolve(__dirname, './deployments/sepolia.json');
const BROADCAST_FILE = path.resolve(__dirname, '../broadcast/Deploy.s.sol/11155111/run-latest.json');

const ENS_REGISTRY = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
const BASE_REGISTRAR = '0x57f1887a8BF19b14fC0dF6Fd9B2acc9Af147eA85';
const NAME_WRAPPER = '0x0635513f179D50A207757E05759CbD106d7dFcE8';

const ROOT_LABEL = 'axolodao2';
const ROOT_LABELHASH = ethers.keccak256(ethers.toUtf8Bytes(ROOT_LABEL));
const ROOT_TOKEN_ID = BigInt(ROOT_LABELHASH);

const ENS_ABI = [
  'function owner(bytes32 node) view returns (address)',
  'function resolver(bytes32 node) view returns (address)',
  'function setSubnodeOwner(bytes32 node, bytes32 label, address owner) returns (bytes32)',
  'function setResolver(bytes32 node, address resolver)',
  'function setOwner(bytes32 node, address owner)',
];

const BASE_REGISTRAR_ABI = [
  'function ownerOf(uint256 tokenId) view returns (address)',
  'function reclaim(uint256 id, address owner)',
];

function die(message) {
  console.error(`ERRO: ${message}`);
  process.exit(1);
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) {
    return {};
  }

  const env = {};
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) {
      continue;
    }

    env[trimmed.slice(0, separatorIndex).trim()] = trimmed.slice(separatorIndex + 1).trim();
  }

  return env;
}

function ensureAddress(rawValue, label) {
  if (!rawValue) {
    die(`${label} não encontrado.`);
  }

  try {
    return ethers.getAddress(rawValue);
  } catch {
    die(`${label} inválido: ${rawValue}`);
  }
}

function readHistory() {
  if (!fs.existsSync(HISTORY_FILE)) {
    return {
      chainId: EXPECTED_CHAIN_ID,
      network: 'sepolia',
      contracts: [],
    };
  }

  const parsed = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
  return {
    chainId: parsed.chainId ?? EXPECTED_CHAIN_ID,
    network: parsed.network ?? 'sepolia',
    contracts: Array.isArray(parsed.contracts) ? parsed.contracts : [],
  };
}

function writeHistory(history) {
  fs.mkdirSync(path.dirname(HISTORY_FILE), { recursive: true });
  fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2) + '\n', 'utf8');
}

function upsertDeployment(history, accessAddress) {
  const normalizedAddress = accessAddress.toLowerCase();
  const existing = history.contracts.find(
    (entry) => typeof entry.address === 'string' && entry.address.toLowerCase() === normalizedAddress
  );

  if (existing) {
    if (!existing.broadcastPath && fs.existsSync(BROADCAST_FILE)) {
      existing.broadcastPath = path.relative(path.resolve(__dirname, '..'), BROADCAST_FILE);
    }
    return history;
  }

  history.contracts.push({
    address: accessAddress,
    chainId: EXPECTED_CHAIN_ID,
    deployedAt: new Date().toISOString(),
    broadcastPath: fs.existsSync(BROADCAST_FILE)
      ? path.relative(path.resolve(__dirname, '..'), BROADCAST_FILE)
      : null,
  });

  return history;
}

async function runTx(label, txPromiseFactory) {
  const tx = await txPromiseFactory();
  await tx.wait();
  console.log(`  OK: ${label} -> ${tx.hash}`);
}

function detectNameMode(registryManager) {
  if (registryManager === ethers.ZeroAddress) {
    die(`${ROOT_DOMAIN} não possui manager no ENS Registry.`);
  }

  if (registryManager.toLowerCase() === NAME_WRAPPER.toLowerCase()) {
    die(
      `${ROOT_DOMAIN} está wrapped no NameWrapper (${NAME_WRAPPER}). ` +
      'O fluxo atual de reset suporta apenas .eth 2LD não wrapped.'
    );
  }

  return 'unwrapped';
}

async function reclaimManager(baseRegistrar, targetAddress, currentManager, label) {
  if (currentManager.toLowerCase() === targetAddress.toLowerCase()) {
    console.log(`  OK: manager já aponta para ${targetAddress} (${label}).`);
    return;
  }

  await runTx(
    `reclaim do manager para ${label}: ${targetAddress}`,
    () => baseRegistrar.reclaim(ROOT_TOKEN_ID, targetAddress)
  );
}

async function ensureTemporaryControl(registry, parentNode, labelHash, node, adminAddress, label) {
  const currentOwner = await registry.owner(node);

  if (currentOwner.toLowerCase() === adminAddress.toLowerCase()) {
    console.log(`  OK: controle temporário já está com a carteira owner para ${label}.`);
    return currentOwner;
  }

  await runTx(
    `retomar controle temporário de ${label}`,
    () => registry.setSubnodeOwner(parentNode, labelHash, adminAddress)
  );

  const ownerAfter = await registry.owner(node);
  if (ownerAfter.toLowerCase() !== adminAddress.toLowerCase()) {
    die(`falha ao retomar controle de ${label}. Esperado ${adminAddress}, encontrado ${ownerAfter}.`);
  }

  return ownerAfter;
}

async function ensureControlPath(registry, nodeRecord, adminAddress, recordsByNode, controlledNodes) {
  const nodeKey = String(nodeRecord.node).toLowerCase();
  if (controlledNodes.has(nodeKey)) {
    return;
  }

  const parentNodeKey = String(nodeRecord.parentNode).toLowerCase();
  const rootNodeKey = String(ROOT_NODE).toLowerCase();

  if (parentNodeKey !== rootNodeKey) {
    const parentRecord = recordsByNode.get(parentNodeKey);

    if (parentRecord) {
      await ensureControlPath(registry, parentRecord, adminAddress, recordsByNode, controlledNodes);
    } else {
      const parentOwner = await registry.owner(nodeRecord.parentNode);
      if (parentOwner.toLowerCase() !== adminAddress.toLowerCase()) {
        die(
          `não foi possível assumir controle de ${labelForRecord(nodeRecord)} porque o domínio pai ` +
          `${nodeRecord.parentNode} não está no inventário e não pertence à carteira owner ${adminAddress}.`
        );
      }
    }
  }

  await ensureTemporaryControl(
    registry,
    nodeRecord.parentNode,
    nodeRecord.labelHash,
    nodeRecord.node,
    adminAddress,
    labelForRecord(nodeRecord)
  );

  controlledNodes.add(nodeKey);
}

async function clearNode(registry, nodeRecord, adminAddress, label, recordsByNode, controlledNodes) {
  await ensureControlPath(registry, nodeRecord, adminAddress, recordsByNode, controlledNodes);

  const resolverBefore = await registry.resolver(nodeRecord.node);
  if (resolverBefore !== ethers.ZeroAddress) {
    await runTx(`limpar resolver de ${label}`, () => registry.setResolver(nodeRecord.node, ethers.ZeroAddress));
  } else {
    console.log(`  OK: resolver já estava zerado para ${label}.`);
  }

  const ownerBefore = await registry.owner(nodeRecord.node);
  if (ownerBefore !== ethers.ZeroAddress) {
    await runTx(`zerar manager de ${label}`, () => registry.setOwner(nodeRecord.node, ethers.ZeroAddress));
  } else {
    console.log(`  OK: manager já estava zerado para ${label}.`);
  }

  const ownerAfter = await registry.owner(nodeRecord.node);
  const resolverAfter = await registry.resolver(nodeRecord.node);

  if (ownerAfter !== ethers.ZeroAddress || resolverAfter !== ethers.ZeroAddress) {
    die(`falha ao limpar ${label}. owner=${ownerAfter}, resolver=${resolverAfter}`);
  }
}

function labelForRecord(record) {
  if (record.fqdn) {
    return record.fqdn;
  }
  return `[${String(record.labelHash).slice(0, 10)}…]`;
}

async function main() {
  const smartContractEnv = loadEnvFile(SMART_CONTRACT_ENV);
  const relayerEnv = loadEnvFile(RELAYER_ENV);

  const rpcUrl = smartContractEnv.SEPOLIA_RPC_URL;
  const privateKey = smartContractEnv.ENS_OWNER_PRIVATE_KEY;
  const currentAccess = ensureAddress(relayerEnv.ACCESS_CONTRACT, 'ACCESS_CONTRACT em axolodao-relayer/.env');

  if (!rpcUrl) {
    die(`SEPOLIA_RPC_URL está vazio em ${SMART_CONTRACT_ENV}`);
  }
  if (!privateKey) {
    die(`ENS_OWNER_PRIVATE_KEY está vazio em ${SMART_CONTRACT_ENV}`);
  }

  const inventory = loadInventory(INVENTORY_FILE);
  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const network = await provider.getNetwork();
  if (Number(network.chainId) !== EXPECTED_CHAIN_ID) {
    die(`chainId inesperado: ${network.chainId}. Este script foi preparado para Sepolia (${EXPECTED_CHAIN_ID}).`);
  }

  const wallet = new ethers.Wallet(privateKey, provider);
  const registry = new ethers.Contract(ENS_REGISTRY, ENS_ABI, wallet);
  const baseRegistrar = new ethers.Contract(BASE_REGISTRAR, BASE_REGISTRAR_ABI, wallet);

  console.log('============================================================');
  console.log('RESET ENS: rotação rápida do manager e limpeza por inventário local');
  console.log('============================================================');
  console.log(`Owner real informado (ENS_OWNER_PRIVATE_KEY): ${wallet.address}`);
  console.log(`AxoloAccess novo: ${currentAccess}`);
  console.log(`ENS Registry: ${ENS_REGISTRY}`);
  console.log(`Base Registrar: ${BASE_REGISTRAR}`);
  console.log(`Name Wrapper Sepolia: ${NAME_WRAPPER}`);
  console.log(`Domínio raiz: ${ROOT_DOMAIN}`);
  console.log(`Inventário canônico: ${INVENTORY_FILE}`);
  console.log(`Subnames registrados no inventário: ${inventory.records.length}`);

  const registryManagerBefore = ensureAddress(await registry.owner(ROOT_NODE), `manager atual de ${ROOT_DOMAIN} no ENS Registry`);
  const registrant = ensureAddress(await baseRegistrar.ownerOf(ROOT_TOKEN_ID), `owner real de ${ROOT_DOMAIN} no Base Registrar`);
  const mode = detectNameMode(registryManagerBefore);

  console.log(`Modo do nome: ${mode}`);
  console.log(`Owner real no Base Registrar: ${registrant}`);
  console.log(`Manager atual no ENS Registry: ${registryManagerBefore}`);

  if (registrant.toLowerCase() !== wallet.address.toLowerCase()) {
    die(
      `a carteira do ENS_OWNER_PRIVATE_KEY (${wallet.address}) não é a owner real de ${ROOT_DOMAIN} no Base Registrar. ` +
      `Owner encontrado: ${registrant}`
    );
  }

  const history = upsertDeployment(readHistory(), currentAccess);
  writeHistory(history);

  console.log('\nPasso 1/3: trazer o manager de volta para a carteira owner real.');
  await reclaimManager(baseRegistrar, wallet.address, registryManagerBefore, 'owner real');

  const registryManagerDuringCleanup = ensureAddress(
    await registry.owner(ROOT_NODE),
    `manager temporário de ${ROOT_DOMAIN} no ENS Registry`
  );

  if (registryManagerDuringCleanup.toLowerCase() !== wallet.address.toLowerCase()) {
    die(
      `falha ao retomar o manager de ${ROOT_DOMAIN}. Esperado ${wallet.address}, encontrado ${registryManagerDuringCleanup}.`
    );
  }

  if (registryManagerBefore.toLowerCase() === wallet.address.toLowerCase()) {
    console.log('  AVISO: o manager já estava na carteira owner. Retomando a execução a partir de um estado parcialmente recuperado.');
  }

  console.log('\nPasso 2/3: limpar apenas os subdomínios listados no inventário local.');
  let clearedRecords = 0;
  let skippedAlreadyCleared = 0;

  if (inventory.records.length === 0) {
    console.log('  OK: inventário vazio. Nenhum subdomínio precisa ser limpo neste deploy.');
  } else {
    const recordsByNode = new Map(
      inventory.records.map((record) => [String(record.node).toLowerCase(), record])
    );
    const controlledNodes = new Set();
    const orderedRecords = inventory.records
      .slice()
      .sort((a, b) => Number(b.depth ?? 0) - Number(a.depth ?? 0));

    for (const record of orderedRecords) {
      const label = labelForRecord(record);
      const ownerBefore = await registry.owner(record.node);
      const resolverBefore = await registry.resolver(record.node);

      if (ownerBefore === ethers.ZeroAddress && resolverBefore === ethers.ZeroAddress) {
        skippedAlreadyCleared += 1;
        console.log(`  OK: ${label} já estava zerado.`);
        continue;
      }

      await clearNode(registry, record, wallet.address, label, recordsByNode, controlledNodes);
      clearedRecords += 1;
    }

    saveInventory(clearRecords(inventory), INVENTORY_FILE);
    console.log(`  OK: inventário canônico foi zerado após limpar ${clearedRecords} registro(s).`);
  }

  console.log('\nPasso 3/3: entregar o manager final ao novo AxoloAccess.');
  await reclaimManager(baseRegistrar, currentAccess, wallet.address, 'AxoloAccess novo');

  const registryManagerAfter = ensureAddress(
    await registry.owner(ROOT_NODE),
    `manager final de ${ROOT_DOMAIN} no ENS Registry`
  );

  if (registryManagerAfter.toLowerCase() !== currentAccess.toLowerCase()) {
    die(
      `falha ao atribuir o manager final ao novo AxoloAccess. Esperado ${currentAccess}, encontrado ${registryManagerAfter}.`
    );
  }

  console.log('\nResumo final:');
  console.log(`  Owner real no Base Registrar: ${registrant}`);
  console.log(`  Manager inicial no ENS Registry: ${registryManagerBefore}`);
  console.log(`  Manager final no ENS Registry: ${registryManagerAfter}`);
  console.log(`  Registros no inventário antes da limpeza: ${inventory.records.length}`);
  console.log(`  Registros limpos neste deploy: ${clearedRecords}`);
  console.log(`  Nós já zerados e pulados: ${skippedAlreadyCleared}`);
  console.log('\nENS pronto. A partir daqui, o deploy normal depende do inventário local, não de varredura histórica no Registry.');
}

main().catch((error) => {
  console.error('\nERRO ao executar reset-ens.js');
  console.error(error);
  process.exit(1);
});
