#!/usr/bin/env node
/**
 * sync-addresses.js
 *
 * Reads the Foundry broadcast log produced by Deploy.s.sol and automatically
 * updates the contract addresses in:
 *   - axolodao-relayer/.env
 *   - contratos/test/axolodao.html
 *   - contratos/scripts/seed-config.json
 *
 * Run from the smart_contract/ folder after a successful --broadcast:
 *   node deploy/sync-addresses.js
 */

const fs   = require("fs");
const path = require("path");

// ── Paths ────────────────────────────────────────────────────────────────────

const BROADCAST = path.resolve(
  __dirname,
  "../broadcast/Deploy.s.sol/11155111/run-latest.json"
);

const SMART_CONTRACT_ENV = path.resolve(
  __dirname,
  "../.env"
);

const RELAYER_ENV = path.resolve(
  __dirname,
  "../../axolodao-relayer/.env"
);

const FRONTEND_HTML = path.resolve(
  __dirname,
  "../test/axolodao.html"
);

const SEED_CONFIG = path.resolve(
  __dirname,
  "../scripts/seed-config.json"
);

// ── Read broadcast log ───────────────────────────────────────────────────────

if (!fs.existsSync(BROADCAST)) {
  console.error("ERROR: Broadcast log not found at:");
  console.error("  " + BROADCAST);
  console.error("Run the deploy script with --broadcast first.");
  process.exit(1);
}

const broadcast = JSON.parse(fs.readFileSync(BROADCAST, "utf8"));

function normalizeContractName(rawName) {
  return rawName.split(/[\\/]/).pop();
}

function readEnvValue(filePath, key) {
  if (!fs.existsSync(filePath)) {
    return "";
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) {
      continue;
    }

    const currentKey = trimmed.slice(0, separatorIndex).trim();
    if (currentKey === key) {
      return trimmed.slice(separatorIndex + 1).trim();
    }
  }

  return "";
}

// Each CREATE transaction has contractName + contractAddress
const deployed = {};
for (const tx of broadcast.transactions) {
  if (tx.transactionType === "CREATE" && tx.contractName && tx.contractAddress) {
    const normalizedName = normalizeContractName(tx.contractName);
    deployed[normalizedName] = tx.contractAddress;
  }
}

const access     = deployed["AxoloAccess"];
const registry   = deployed["AxoloRegistry"];
const monitoring = deployed["AxoloMonitoring"];
const eas        = deployed["AxoloEAS"];

if (!access || !registry || !monitoring) {
  console.error("ERROR: Could not find all three contract addresses in broadcast log.");
  console.error("Found:", deployed);
  process.exit(1);
}

console.log("Addresses read from broadcast log:");
console.log("  AxoloAccess    :", access);
console.log("  AxoloRegistry  :", registry);
console.log("  AxoloMonitoring:", monitoring);
if (eas) {
  console.log("  AxoloEAS       :", eas);
}

// ── Update axolodao-relayer/.env ─────────────────────────────────────────────

let relayerEnv = fs.readFileSync(RELAYER_ENV, "utf8");

relayerEnv = relayerEnv
  .replace(/^ACCESS_CONTRACT=.*/m,     `ACCESS_CONTRACT=${access}`)
  .replace(/^REGISTRY_CONTRACT=.*/m,   `REGISTRY_CONTRACT=${registry}`)
  .replace(/^MONITORING_CONTRACT=.*/m, `MONITORING_CONTRACT=${monitoring}`);

if (/^EAS_CONTRACT=/m.test(relayerEnv) && eas) {
  relayerEnv = relayerEnv.replace(/^EAS_CONTRACT=.*/m, `EAS_CONTRACT=${eas}`);
}

fs.writeFileSync(RELAYER_ENV, relayerEnv, "utf8");
console.log("\nUpdated axolodao-relayer/.env");

// ── Update axolodao.html ─────────────────────────────────────────────────────

let html = fs.readFileSync(FRONTEND_HTML, "utf8");

// Replaces the three lines inside the ADDR = { ... } block
html = html
  .replace(/(access\s*:\s*)"0x[0-9a-fA-F]+"/, `$1"${access}"`)
  .replace(/(registry\s*:\s*)"0x[0-9a-fA-F]+"/, `$1"${registry}"`)
  .replace(/(monitoring\s*:\s*)"0x[0-9a-fA-F]+"/, `$1"${monitoring}"`);

if (eas) {
  html = html.replace(/(eas\s*:\s*)"0x[0-9a-fA-F]+"/, `$1"${eas}"`);
}

fs.writeFileSync(FRONTEND_HTML, html, "utf8");
console.log("Updated smart_contract/test/axolodao.html");

// ── Update frontend/src/environments/environment.ts ──────────────────────────

const FRONTEND_ENV = path.resolve(
  __dirname,
  "../../frontend/src/environments/environment.ts"
);

if (fs.existsSync(FRONTEND_ENV)) {
  let envTs = fs.readFileSync(FRONTEND_ENV, "utf8");
  envTs = envTs
    .replace(/(access\s*:\s*)'0x[0-9a-fA-F]+'/, `$1'${access}'`)
    .replace(/(registry\s*:\s*)'0x[0-9a-fA-F]+'/, `$1'${registry}'`)
    .replace(/(monitoring\s*:\s*)'0x[0-9a-fA-F]+'/, `$1'${monitoring}'`);
  if (eas) {
    envTs = envTs.replace(/(eas\s*:\s*)'0x[0-9a-fA-F]+'/, `$1'${eas}'`);
  }
  fs.writeFileSync(FRONTEND_ENV, envTs, "utf8");
  console.log("Updated frontend/src/environments/environment.ts");
} else {
  console.warn("WARNING: frontend/src/environments/environment.ts not found — skipping.");
}

// ── Update smart_contract/scripts/seed-config.json ───────────────────────────

if (fs.existsSync(SEED_CONFIG)) {
  const seedConfig = JSON.parse(fs.readFileSync(SEED_CONFIG, "utf8"));
  const deployerPrivateKey = readEnvValue(SMART_CONTRACT_ENV, "DEPLOYER_PRIVATE_KEY");

  seedConfig.contracts = {
    ...seedConfig.contracts,
    access,
    registry,
    monitoring,
  };

  if (deployerPrivateKey) {
    seedConfig.privateKeys = {
      ...seedConfig.privateKeys,
      admin: deployerPrivateKey,
    };
  }

  if (eas) {
    seedConfig.contracts.eas = eas;
  }
  fs.writeFileSync(SEED_CONFIG, JSON.stringify(seedConfig, null, 2) + "\n", "utf8");
  console.log("Updated smart_contract/scripts/seed-config.json");
} else {
  console.warn("WARNING: smart_contract/scripts/seed-config.json not found — skipping.");
}

console.log("\nDone. All files are up to date.");
