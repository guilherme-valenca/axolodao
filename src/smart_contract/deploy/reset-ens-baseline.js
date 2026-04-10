#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ethers = require(path.resolve(__dirname, '../../axolodao-relayer/node_modules/ethers'));
const {
  BOOTSTRAP_FILE,
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
    if (!trimmed || trimmed.startsWith('#')) continue;
    const separatorIndex = trimmed.indexOf('=');
    if (separatorIndex === -1) continue;
    env[trimmed.slice(0, separatorIndex).trim()] = trimmed.slice(separatorIndex + 1).trim();
  }
  return env;
}

function ensureAddress(rawValue, label) {
  if (!rawValue) die(`${label} não encontrado.`);
  try {
    return ethers.getAddress(rawValue);
  } catch {
    die(`${label} inválido: ${rawValue}`);
  }
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
      'O fluxo atual de baseline suporta apenas .eth 2LD não wrapped.'
    );
  }
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
    return;
  }
  await runTx(`retomar controle temporário de ${label}`, () => registry.setSubnodeOwner(parentNode, labelHash, adminAddress));
}

async function clearNode(registry, record, adminAddress, label) {
  await ensureTemporaryControl(registry, record.parentNode, record.labelHash, record.node, adminAddress, label);

  const resolverBefore = await registry.resolver(record.node);
  if (resolverBefore !== ethers.ZeroAddress) {
    await runTx(`limpar resolver de ${label}`, () => registry.setResolver(record.node, ethers.ZeroAddress));
  } else {
    console.log(`  OK: resolver já estava zerado para ${label}.`);
  }

  const ownerBefore = await registry.owner(record.node);
  if (ownerBefore !== ethers.ZeroAddress) {
    await runTx(`zerar manager de ${label}`, () => registry.setOwner(record.node, ethers.ZeroAddress));
  } else {
    console.log(`  OK: manager já estava zerado para ${label}.`);
  }
}

function labelForRecord(record) {
  return record.fqdn || record.label || `[${String(record.labelHash).slice(0, 10)}…]`;
}

async function main() {
  const smartContractEnv = loadEnvFile(SMART_CONTRACT_ENV);
  const relayerEnv = loadEnvFile(RELAYER_ENV);
  const rpcUrl = smartContractEnv.SEPOLIA_RPC_URL;
  const privateKey = smartContractEnv.ENS_OWNER_PRIVATE_KEY;
  const currentAccess = ensureAddress(relayerEnv.ACCESS_CONTRACT, 'ACCESS_CONTRACT em axolodao-relayer/.env');

  if (!rpcUrl) die(`SEPOLIA_RPC_URL está vazio em ${SMART_CONTRACT_ENV}`);
  if (!privateKey) die(`ENS_OWNER_PRIVATE_KEY está vazio em ${SMART_CONTRACT_ENV}`);

  const manifest = loadInventory(BOOTSTRAP_FILE);
  if (manifest.records.length === 0) {
    die(`manifesto baseline vazio em ${BOOTSTRAP_FILE}. Exporte ou preencha os subdomínios antes de rodar a baseline.`);
  }

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const network = await provider.getNetwork();
  if (Number(network.chainId) !== EXPECTED_CHAIN_ID) {
    die(`chainId inesperado: ${network.chainId}. Este script foi preparado para Sepolia (${EXPECTED_CHAIN_ID}).`);
  }

  const wallet = new ethers.Wallet(privateKey, provider);
  const registry = new ethers.Contract(ENS_REGISTRY, ENS_ABI, wallet);
  const baseRegistrar = new ethers.Contract(BASE_REGISTRAR, BASE_REGISTRAR_ABI, wallet);

  console.log('============================================================');
  console.log('RESET ENS BASELINE: limpeza pesada única a partir do manifesto');
  console.log('============================================================');
  console.log(`Manifesto baseline: ${BOOTSTRAP_FILE}`);
  console.log(`Registros a limpar: ${manifest.records.length}`);

  const registrant = ensureAddress(await baseRegistrar.ownerOf(ROOT_TOKEN_ID), `owner real de ${ROOT_DOMAIN} no Base Registrar`);
  if (registrant.toLowerCase() !== wallet.address.toLowerCase()) {
    die(
      `a carteira do ENS_OWNER_PRIVATE_KEY (${wallet.address}) não é a owner real de ${ROOT_DOMAIN} no Base Registrar. ` +
      `Owner encontrado: ${registrant}`
    );
  }

  const managerBefore = ensureAddress(await registry.owner(ROOT_NODE), `manager atual de ${ROOT_DOMAIN} no ENS Registry`);
  detectNameMode(managerBefore);

  console.log('\nPasso 1/3: retomar o manager raiz para a carteira owner real.');
  await reclaimManager(baseRegistrar, wallet.address, managerBefore, 'owner real');

  console.log('\nPasso 2/3: limpar exatamente os registros listados no manifesto baseline.');
  const ordered = manifest.records.slice().sort((a, b) => Number(b.depth ?? 0) - Number(a.depth ?? 0));
  let cleared = 0;
  let skipped = 0;

  for (const record of ordered) {
    const owner = await registry.owner(record.node);
    const resolver = await registry.resolver(record.node);
    const label = labelForRecord(record);

    if (owner === ethers.ZeroAddress && resolver === ethers.ZeroAddress) {
      skipped += 1;
      console.log(`  OK: ${label} já estava zerado.`);
      continue;
    }

    await clearNode(registry, record, wallet.address, label);
    cleared += 1;
  }

  console.log('\nPasso 3/3: entregar o manager final ao novo AxoloAccess e zerar o inventário canônico.');
  await reclaimManager(baseRegistrar, currentAccess, wallet.address, 'AxoloAccess novo');
  saveInventory(clearRecords(loadInventory(INVENTORY_FILE)), INVENTORY_FILE);

  console.log('\nResumo final:');
  console.log(`  Registros no manifesto baseline: ${manifest.records.length}`);
  console.log(`  Registros limpos: ${cleared}`);
  console.log(`  Registros já zerados: ${skipped}`);
  console.log(`  Inventário canônico zerado: ${INVENTORY_FILE}`);
}

main().catch((error) => {
  console.error('\nERRO ao executar reset-ens-baseline.js');
  console.error(error);
  process.exit(1);
});
