const fs = require('fs');
const path = require('path');
const ethers = require(path.resolve(__dirname, '../../../axolodao-relayer/node_modules/ethers'));

const INVENTORY_VERSION = 1;
const EXPECTED_CHAIN_ID = 11155111;
const ROOT_LABEL = 'axolodao2';
const ROOT_DOMAIN = `${ROOT_LABEL}.eth`;
const ROOT_NODE = ethers.namehash(ROOT_DOMAIN);
const INVENTORY_FILE = path.resolve(__dirname, 'sepolia.json');
const BOOTSTRAP_FILE = path.resolve(__dirname, 'sepolia.bootstrap-purge.json');

function makeEmptyInventory() {
  return {
    version: INVENTORY_VERSION,
    chainId: EXPECTED_CHAIN_ID,
    rootDomain: ROOT_DOMAIN,
    records: [],
  };
}

function normalizeInventory(parsed) {
  return {
    version: parsed?.version ?? INVENTORY_VERSION,
    chainId: parsed?.chainId ?? EXPECTED_CHAIN_ID,
    rootDomain: parsed?.rootDomain ?? ROOT_DOMAIN,
    records: Array.isArray(parsed?.records) ? parsed.records : [],
  };
}

function loadInventory(filePath = INVENTORY_FILE) {
  if (!fs.existsSync(filePath)) {
    return makeEmptyInventory();
  }

  return normalizeInventory(JSON.parse(fs.readFileSync(filePath, 'utf8')));
}

function saveInventory(inventory, filePath = INVENTORY_FILE) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  const normalized = normalizeInventory(inventory);
  normalized.records = normalized.records
    .slice()
    .sort((a, b) => {
      const depthDiff = Number(b.depth ?? 0) - Number(a.depth ?? 0);
      if (depthDiff !== 0) {
        return depthDiff;
      }
      return String(a.node ?? '').localeCompare(String(b.node ?? ''));
    });
  fs.writeFileSync(filePath, JSON.stringify(normalized, null, 2) + '\n', 'utf8');
}

function toLabelHash(label) {
  return ethers.keccak256(ethers.toUtf8Bytes(String(label).trim().toLowerCase()));
}

function computeNode(parentNode, label) {
  return ethers.keccak256(
    ethers.solidityPacked(['bytes32', 'bytes32'], [parentNode, toLabelHash(label)])
  );
}

function buildInstitutionRecord({ label, createdBy, manager }) {
  const normalizedLabel = String(label).trim().toLowerCase();
  const labelHash = toLabelHash(normalizedLabel);
  return {
    depth: 1,
    kind: 'institution',
    createdBy,
    label: normalizedLabel,
    fqdn: `${normalizedLabel}.${ROOT_DOMAIN}`,
    labelHash,
    parentNode: ROOT_NODE,
    node: computeNode(ROOT_NODE, normalizedLabel),
    manager: manager ?? null,
  };
}

function buildMemberRecord({ institutionLabel, label, createdBy, owner, resolver }) {
  const normalizedInstitution = String(institutionLabel).trim().toLowerCase();
  const normalizedLabel = String(label).trim().toLowerCase();
  const parentNode = ethers.namehash(`${normalizedInstitution}.${ROOT_DOMAIN}`);
  const labelHash = toLabelHash(normalizedLabel);

  return {
    depth: 2,
    kind: 'member',
    createdBy,
    label: normalizedLabel,
    parentLabel: normalizedInstitution,
    fqdn: `${normalizedLabel}.${normalizedInstitution}.${ROOT_DOMAIN}`,
    labelHash,
    parentNode,
    node: computeNode(parentNode, normalizedLabel),
    owner: owner ?? null,
    resolver: resolver ?? null,
  };
}

function upsertRecord(inventory, record) {
  const normalized = normalizeInventory(inventory);
  const nodeKey = String(record.node).toLowerCase();
  const nextRecords = normalized.records.filter((entry) => String(entry.node).toLowerCase() !== nodeKey);
  nextRecords.push(record);
  normalized.records = nextRecords;
  return normalized;
}

function clearRecords(inventory) {
  const normalized = normalizeInventory(inventory);
  normalized.records = [];
  return normalized;
}

module.exports = {
  BOOTSTRAP_FILE,
  EXPECTED_CHAIN_ID,
  INVENTORY_FILE,
  ROOT_DOMAIN,
  ROOT_NODE,
  buildInstitutionRecord,
  buildMemberRecord,
  clearRecords,
  computeNode,
  loadInventory,
  saveInventory,
  toLabelHash,
  upsertRecord,
};
