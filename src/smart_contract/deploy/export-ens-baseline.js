#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const ethers = require(path.resolve(__dirname, '../../axolodao-relayer/node_modules/ethers'));
const { BOOTSTRAP_FILE, EXPECTED_CHAIN_ID, ROOT_DOMAIN, ROOT_NODE, saveInventory } = require('./ens-inventory/inventory');

const SMART_CONTRACT_ENV = path.resolve(__dirname, '../.env');
const ENS_REGISTRY = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
const DEFAULT_FROM_BLOCK = Number(process.env.ENS_BASELINE_SCAN_FROM_BLOCK ?? 0);
const DEFAULT_CHUNK_SIZE = Number(process.env.ENS_BASELINE_SCAN_CHUNK_SIZE ?? 1000);

const ENS_ABI = [
  'event NewOwner(bytes32 indexed node, bytes32 indexed label, address owner)',
];

function die(message) {
  console.error(`ERRO: ${message}`);
  process.exit(1);
}

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {};
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

function isRangeLimitError(error) {
  const message = [
    error?.shortMessage,
    error?.message,
    error?.error?.message,
    error?.info?.error?.message,
  ].filter(Boolean).join(' | ').toLowerCase();

  return message.includes('block range') || message.includes('getlogs') || message.includes('eth_getlogs');
}

function computeChildNode(parentNode, labelHash) {
  return ethers.keccak256(ethers.solidityPacked(['bytes32', 'bytes32'], [parentNode, labelHash]));
}

async function collectDirectChildren(registry, provider, parentNode, depth, fromBlock) {
  const latestBlock = await provider.getBlockNumber();
  const seen = new Set();
  const children = [];
  let currentFromBlock = fromBlock;
  let chunkSize = DEFAULT_CHUNK_SIZE;

  console.log(
    `  Varredura baseline para ${parentNode} (início: ${fromBlock}, chunk inicial: ${chunkSize}, último bloco: ${latestBlock}).`
  );

  while (currentFromBlock <= latestBlock) {
    const toBlock = Math.min(currentFromBlock + chunkSize - 1, latestBlock);
    let events;

    try {
      events = await registry.queryFilter(registry.filters.NewOwner(parentNode), currentFromBlock, toBlock);
    } catch (error) {
      if (!isRangeLimitError(error) || chunkSize <= 1) {
        throw error;
      }
      chunkSize = Math.max(1, Math.floor(chunkSize / 2));
      console.log(`  AVISO: RPC recusou ${currentFromBlock}-${toBlock}. Reduzindo chunk para ${chunkSize}.`);
      continue;
    }

    for (const event of events) {
      const labelHash = event.args.label;
      const key = `${parentNode.toLowerCase()}:${labelHash.toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      children.push({
        depth,
        kind: depth === 1 ? 'baseline-root-child' : 'baseline-descendant',
        createdBy: 'baseline-export',
        label: null,
        fqdn: null,
        labelHash,
        parentNode,
        node: computeChildNode(parentNode, labelHash),
      });
    }

    currentFromBlock = toBlock + 1;
  }

  return children.sort((a, b) => a.node.localeCompare(b.node));
}

async function main() {
  const smartContractEnv = loadEnvFile(SMART_CONTRACT_ENV);
  const rpcUrl = smartContractEnv.SEPOLIA_RPC_URL;
  if (!rpcUrl) die(`SEPOLIA_RPC_URL está vazio em ${SMART_CONTRACT_ENV}`);

  const provider = new ethers.JsonRpcProvider(rpcUrl);
  const network = await provider.getNetwork();
  if (Number(network.chainId) !== EXPECTED_CHAIN_ID) {
    die(`chainId inesperado: ${network.chainId}. Este script foi preparado para Sepolia (${EXPECTED_CHAIN_ID}).`);
  }

  const registry = new ethers.Contract(ENS_REGISTRY, ENS_ABI, provider);
  console.log('============================================================');
  console.log('EXPORT ENS BASELINE: manifesto bruto de subdomínios históricos');
  console.log('============================================================');
  console.log(`Domínio raiz: ${ROOT_DOMAIN}`);
  console.log(`Bloco inicial: ${DEFAULT_FROM_BLOCK}`);
  console.log(`Chunk inicial: ${DEFAULT_CHUNK_SIZE}`);
  console.log('Use um RPC melhor nesta etapa se quiser varredura ampla sem atraso.');

  const firstLevel = await collectDirectChildren(registry, provider, ROOT_NODE, 1, DEFAULT_FROM_BLOCK);
  const records = [...firstLevel];

  for (const entry of firstLevel) {
    const secondLevel = await collectDirectChildren(registry, provider, entry.node, 2, DEFAULT_FROM_BLOCK);
    records.push(...secondLevel);
  }

  saveInventory({
    version: 1,
    chainId: EXPECTED_CHAIN_ID,
    rootDomain: ROOT_DOMAIN,
    records,
  }, BOOTSTRAP_FILE);

  console.log(`Manifesto baseline salvo em ${BOOTSTRAP_FILE}`);
  console.log(`Primeiro nível encontrado: ${firstLevel.length}`);
  console.log(`Total de registros exportados: ${records.length}`);
}

main().catch((error) => {
  console.error('\nERRO ao executar export-ens-baseline.js');
  console.error(error);
  process.exit(1);
});
