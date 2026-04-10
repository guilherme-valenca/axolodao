#!/usr/bin/env node
/**
 * seed-data.js — Popula a blockchain Sepolia com dados de teste para o AxoloDAO.
 *
 * Pré-requisitos:
 *   1. Contratos deployados e endereços no seed-config.json
 *   2. Relayer rodando em localhost:3000
 *   3. Admin e gerente com Sepolia ETH (cuidador/auditor usam relayer gasless)
 *   4. AxoloAccess é o manager atual de axolodao2.eth no ENS Registry
 *
 * Uso: node smart_contract/scripts/seed-data.js
 */

const fs   = require('fs');
const path = require('path');

// Resolve ethers from the relayer's node_modules
const ethers = require(path.resolve(__dirname, '../../axolodao-relayer/node_modules/ethers'));
const {
  buildInstitutionRecord,
  buildMemberRecord,
  loadInventory,
  saveInventory,
  upsertRecord,
} = require(path.resolve(__dirname, '../deploy/ens-inventory/inventory'));

// ─── Config ──────────────────────────────────────────────────────────────────

const configPath = path.resolve(__dirname, 'seed-config.json');
if (!fs.existsSync(configPath)) {
  console.error('ERROR: seed-config.json not found. Copy seed-config.example.json and fill in the values.');
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// ─── Provider & Wallets ──────────────────────────────────────────────────────

const provider       = new ethers.JsonRpcProvider(config.rpcUrl);
const adminWallet    = new ethers.Wallet(config.privateKeys.admin, provider);
const gerenteWallet  = new ethers.Wallet(config.privateKeys.gerente, provider);
const cuidadorWallet = new ethers.Wallet(config.privateKeys.cuidador, provider);
const auditorWallet  = new ethers.Wallet(config.privateKeys.auditor, provider);

// ─── Minimal ABIs (human-readable) ──────────────────────────────────────────

const ABI_ACCESS = [
  'function adicionarInstituicao(string labelInst, bytes32 role, address gerente)',
  'function registrarAcesso(string label, bytes32 parentNode)',
  'function CARETAKER_ROLE() view returns (bytes32)',
  'function AUDITOR_ROLE() view returns (bytes32)',
];

const ABI_REGISTRY = [
  'function registerTank(string name, string location) returns (uint256)',
  'function registerAxolotl(string name, string species, uint256 birthDate, uint256 tankId, string morphData, bytes32 photoHash) returns (uint256)',
  'function nextTankId() view returns (uint256)',
];

const ABI_MONITORING = [
  'function recordMeasurement(tuple(uint256 tankId, uint16 temperature, uint16 ph, uint16 dissolvedOxygen, uint16 conductivity, uint16 turbidity, uint16 phosphates, uint16 no2, uint16 no3, uint16 ammonia, uint16 hardness) p) returns (uint256)',
  'function validateMeasurement(uint256 measurementId)',
  'function contestMeasurement(uint256 measurementId, string reason)',
  'function nextMeasurementId() view returns (uint256)',
];

const ABI_ENS_REGISTRY = [
  'function setSubnodeOwner(bytes32 node, bytes32 label, address owner) returns (bytes32)',
  'function setResolver(bytes32 node, address resolver)',
];

const ABI_ENS_RESOLVER = [
  'function setAddr(bytes32 node, address a)',
];

// ─── Contract Instances ──────────────────────────────────────────────────────

const accessAdmin    = new ethers.Contract(config.contracts.access, ABI_ACCESS, adminWallet);
const accessIface    = new ethers.Interface(ABI_ACCESS);
const registryIface  = new ethers.Interface(ABI_REGISTRY);
const monitorIface   = new ethers.Interface(ABI_MONITORING);
const registryRead   = new ethers.Contract(config.contracts.registry, ABI_REGISTRY, provider);
const monitorRead    = new ethers.Contract(config.contracts.monitoring, ABI_MONITORING, provider);

// ─── Helpers ─────────────────────────────────────────────────────────────────

function banner(phase, title) {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`  Fase ${phase}: ${title}`);
  console.log(`${'='.repeat(60)}\n`);
}

async function relayCall(wallet, targetAddress, iface, methodName, args) {
  const data = iface.encodeFunctionData(methodName, args);
  const signature = await wallet.signMessage(ethers.getBytes(data));

  const res = await fetch(`${config.relayerUrl}/relay`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      target: targetAddress,
      data,
      user: wallet.address,
      signature,
    }),
  });

  const body = await res.json();
  if (!res.ok) {
    throw new Error(`Relay error (${res.status}): ${body.error} — ${body.message}`);
  }
  console.log(`        TX: ${body.txHash} (block ${body.blockNumber})`);
  return body;
}

function persistInventoryRecord(record) {
  const inventory = loadInventory();
  saveInventory(upsertRecord(inventory, record));
}

async function registerMember(signer, { instLabel, memberLabel, memberAddress }) {
  const ensRegistry = new ethers.Contract(config.ens.registry, ABI_ENS_REGISTRY, signer);
  const resolver    = new ethers.Contract(config.ens.resolver, ABI_ENS_RESOLVER, signer);
  const gerenteAddr = await signer.getAddress();

  const parentNode   = ethers.namehash(`${instLabel}.axolodao2.eth`);
  const userLabelHash = ethers.keccak256(ethers.toUtf8Bytes(memberLabel));
  const userNode     = ethers.namehash(`${memberLabel}.${instLabel}.axolodao2.eth`);

  console.log(`    ENS: ${memberLabel}.${instLabel}.axolodao2.eth → ${memberAddress}`);

  // Step 1: gerente takes temporary ownership of the subnode
  const tx1 = await ensRegistry.setSubnodeOwner(parentNode, userLabelHash, gerenteAddr);
  await tx1.wait();
  console.log(`        1/4 setSubnodeOwner → gerente`);

  // Step 2: set resolver
  const tx2 = await ensRegistry.setResolver(userNode, config.ens.resolver);
  await tx2.wait();
  console.log(`        2/4 setResolver`);

  // Step 3: point ENS name to member address
  const tx3 = await resolver['setAddr(bytes32,address)'](userNode, memberAddress);
  await tx3.wait();
  console.log(`        3/4 setAddr → ${memberAddress}`);

  // Step 4: transfer ownership to member
  const tx4 = await ensRegistry.setSubnodeOwner(parentNode, userLabelHash, memberAddress);
  await tx4.wait();
  console.log(`        4/4 setSubnodeOwner → membro`);

  persistInventoryRecord(buildMemberRecord({
    institutionLabel: instLabel,
    label: memberLabel,
    createdBy: 'seed',
    owner: memberAddress,
    resolver: config.ens.resolver,
  }));
  console.log('        Inventário local ENS atualizado');
}

async function checkRelayerHealth() {
  try {
    const res = await fetch(`${config.relayerUrl}/health`);
    const body = await res.json();
    if (body.status !== 'ok') throw new Error('Relayer status not ok');
    console.log(`Relayer online: ${body.relayer} (${body.balance})`);
    return true;
  } catch (e) {
    console.error(`ERROR: Relayer offline em ${config.relayerUrl} — ${e.message}`);
    return false;
  }
}

// ─── Phase 1: Admin cria instituições ────────────────────────────────────────

async function phase1() {
  banner(1, 'Admin cria instituições');

  const CARETAKER_ROLE = ethers.keccak256(ethers.toUtf8Bytes('CARETAKER_ROLE'));
  const AUDITOR_ROLE   = ethers.keccak256(ethers.toUtf8Bytes('AUDITOR_ROLE'));
  const gerenteAddr    = gerenteWallet.address;

  console.log(`  Admin:   ${adminWallet.address}`);
  console.log(`  Gerente: ${gerenteAddr}\n`);

  // Instituição de cuidadores
  console.log(`  [1/2] adicionarInstituicao("labcuidadores", CARETAKER_ROLE, ${gerenteAddr})`);
  try {
    const tx1 = await accessAdmin.adicionarInstituicao('labcuidadores', CARETAKER_ROLE, gerenteAddr);
    const receipt1 = await tx1.wait();
    console.log(`        TX: ${receipt1.hash} (block ${receipt1.blockNumber})`);
  } catch (e) {
    if (e.message.includes('ja existe')) {
      console.log('        SKIP: instituição já existe');
    } else {
      throw e;
    }
  }
  persistInventoryRecord(buildInstitutionRecord({
    label: 'labcuidadores',
    createdBy: 'seed',
    manager: gerenteAddr,
  }));

  // Instituição de auditores
  console.log(`  [2/2] adicionarInstituicao("labauditores", AUDITOR_ROLE, ${gerenteAddr})`);
  try {
    const tx2 = await accessAdmin.adicionarInstituicao('labauditores', AUDITOR_ROLE, gerenteAddr);
    const receipt2 = await tx2.wait();
    console.log(`        TX: ${receipt2.hash} (block ${receipt2.blockNumber})`);
  } catch (e) {
    if (e.message.includes('ja existe')) {
      console.log('        SKIP: instituição já existe');
    } else {
      throw e;
    }
  }
  persistInventoryRecord(buildInstitutionRecord({
    label: 'labauditores',
    createdBy: 'seed',
    manager: gerenteAddr,
  }));
}

// ─── Phase 2: Gerente registra membros ENS ───────────────────────────────────

async function phase2() {
  banner(2, 'Gerente registra membros ENS');

  console.log(`  Gerente: ${gerenteWallet.address}\n`);

  // Registrar cuidador: joao.labcuidadores.axolodao2.eth
  console.log('  [1/2] Registrando joao.labcuidadores.axolodao2.eth');
  await registerMember(gerenteWallet, {
    instLabel: 'labcuidadores',
    memberLabel: 'joao',
    memberAddress: cuidadorWallet.address,
  });

  // Registrar auditor: maria.labauditores.axolodao2.eth
  console.log('\n  [2/2] Registrando maria.labauditores.axolodao2.eth');
  await registerMember(gerenteWallet, {
    instLabel: 'labauditores',
    memberLabel: 'maria',
    memberAddress: auditorWallet.address,
  });
}

// ─── Phase 3: Membros fazem registrarAcesso via relayer ──────────────────────

async function phase3() {
  banner(3, 'Membros fazem registrarAcesso (via relayer)');

  const parentNodeCuidadores = ethers.namehash('labcuidadores.axolodao2.eth');
  const parentNodeAuditores  = ethers.namehash('labauditores.axolodao2.eth');

  // Cuidador registra acesso
  console.log(`  [1/2] Cuidador "joao" → registrarAcesso via relayer`);
  console.log(`        Wallet: ${cuidadorWallet.address}`);
  await relayCall(cuidadorWallet, config.contracts.access, accessIface, 'registrarAcesso', [
    'joao', parentNodeCuidadores,
  ]);

  // Auditor registra acesso
  console.log(`\n  [2/2] Auditor "maria" → registrarAcesso via relayer`);
  console.log(`        Wallet: ${auditorWallet.address}`);
  await relayCall(auditorWallet, config.contracts.access, accessIface, 'registrarAcesso', [
    'maria', parentNodeAuditores,
  ]);
}

// ─── Phase 4: Cuidador registra tanques e axolotes ───────────────────────────

async function phase4() {
  banner(4, 'Cuidador registra tanques e axolotes (via relayer)');

  // Read current nextTankId to know our starting point
  const startTankId = Number(await registryRead.nextTankId());
  console.log(`  nextTankId atual: ${startTankId}\n`);

  // 3 tanques
  const tanques = [
    { name: 'Tanque Principal A', location: 'Sala 1 — Prateleira A' },
    { name: 'Tanque Quarentena',  location: 'Sala 2 — Isolamento' },
    { name: 'Tanque Reprodução',  location: 'Sala 3 — Berçário' },
  ];

  for (let i = 0; i < tanques.length; i++) {
    const t = tanques[i];
    console.log(`  [${i + 1}/3] registerTank("${t.name}", "${t.location}")`);
    await relayCall(cuidadorWallet, config.contracts.registry, registryIface, 'registerTank', [
      t.name, t.location,
    ]);
  }

  // Tank IDs assigned sequentially
  const tankIds = [startTankId, startTankId + 1, startTankId + 2];
  console.log(`\n  Tanques criados com IDs: ${tankIds.join(', ')}\n`);

  // 5 axolotes
  const birthTs = BigInt(Math.floor(Date.now() / 1000) - 86400 * 365); // ~1 ano atrás

  const axolotes = [
    { name: 'Totli',   species: 'Ambystoma mexicanum', tankId: tankIds[0], morphData: 'Leucístico, 18cm',  photo: 'totli-photo' },
    { name: 'Xochitl', species: 'Ambystoma mexicanum', tankId: tankIds[0], morphData: 'Selvagem, 15cm',    photo: 'xochitl-photo' },
    { name: 'Atl',     species: 'Ambystoma mexicanum', tankId: tankIds[1], morphData: 'Albino, 12cm',      photo: 'atl-photo' },
    { name: 'Citlali', species: 'Ambystoma mexicanum', tankId: tankIds[2], morphData: 'Melanóide, 20cm',   photo: 'citlali-photo' },
    { name: 'Quetzal', species: 'Ambystoma mexicanum', tankId: tankIds[2], morphData: 'GFP, 14cm',         photo: 'quetzal-photo' },
  ];

  for (let i = 0; i < axolotes.length; i++) {
    const a = axolotes[i];
    const photoHash = ethers.keccak256(ethers.toUtf8Bytes(a.photo));
    console.log(`  [${i + 1}/5] registerAxolotl("${a.name}", tank ${a.tankId})`);
    await relayCall(cuidadorWallet, config.contracts.registry, registryIface, 'registerAxolotl', [
      a.name, a.species, birthTs, BigInt(a.tankId), a.morphData, photoHash,
    ]);
  }
}

// ─── Phase 5: Cuidador registra medições ─────────────────────────────────────

async function phase5() {
  banner(5, 'Cuidador registra medições (via relayer)');

  // Read current nextMeasurementId
  const startMeasId = Number(await monitorRead.nextMeasurementId());
  console.log(`  nextMeasurementId atual: ${startMeasId}\n`);

  // Read current tank IDs (use nextTankId - 3 as base, since we just created 3)
  const nextTank = Number(await registryRead.nextTankId());
  const tank1 = nextTank - 3;
  const tank2 = nextTank - 2;
  const tank3 = nextTank - 1;

  // 6 medições — 2 por tanque, valores realistas (uint16 × 100)
  const medicoes = [
    { tankId: tank1, temperature: 1720, ph: 720, dissolvedOxygen: 710, conductivity: 30000, turbidity: 80,  phosphates: 45, no2: 3,  no3: 900,  ammonia: 1, hardness: 800 },
    { tankId: tank1, temperature: 1810, ph: 730, dissolvedOxygen: 690, conductivity: 31000, turbidity: 90,  phosphates: 50, no2: 4,  no3: 1000, ammonia: 2, hardness: 780 },
    { tankId: tank2, temperature: 1950, ph: 680, dissolvedOxygen: 750, conductivity: 28000, turbidity: 120, phosphates: 60, no2: 5,  no3: 1100, ammonia: 3, hardness: 850 },
    { tankId: tank2, temperature: 1650, ph: 740, dissolvedOxygen: 720, conductivity: 29500, turbidity: 95,  phosphates: 55, no2: 2,  no3: 950,  ammonia: 1, hardness: 820 },
    { tankId: tank3, temperature: 1780, ph: 710, dissolvedOxygen: 700, conductivity: 32000, turbidity: 110, phosphates: 48, no2: 6,  no3: 1050, ammonia: 4, hardness: 790 },
    { tankId: tank3, temperature: 2100, ph: 650, dissolvedOxygen: 600, conductivity: 35000, turbidity: 200, phosphates: 80, no2: 10, no3: 1500, ammonia: 8, hardness: 600 },
  ];

  for (let i = 0; i < medicoes.length; i++) {
    const m = medicoes[i];
    console.log(`  [${i + 1}/6] recordMeasurement(tank ${m.tankId}, temp=${m.temperature/100}°C, pH=${m.ph/100})`);
    await relayCall(cuidadorWallet, config.contracts.monitoring, monitorIface, 'recordMeasurement', [m]);
  }

  // Store starting measurement ID for phase 6
  return startMeasId;
}

// ─── Phase 6: Auditor valida/contesta ────────────────────────────────────────

async function phase6(startMeasId) {
  banner(6, 'Auditor valida/contesta medições (via relayer)');

  console.log(`  Medições ${startMeasId} a ${startMeasId + 5}\n`);

  // Validar medições 1-4
  for (let i = 0; i < 4; i++) {
    const id = startMeasId + i;
    console.log(`  [${i + 1}/5] validateMeasurement(${id})`);
    await relayCall(auditorWallet, config.contracts.monitoring, monitorIface, 'validateMeasurement', [
      BigInt(id),
    ]);
  }

  // Contestar medição 5
  const contestId = startMeasId + 4;
  console.log(`  [5/5] contestMeasurement(${contestId}, "Turbidez acima do padrão aceitável")`);
  await relayCall(auditorWallet, config.contracts.monitoring, monitorIface, 'contestMeasurement', [
    BigInt(contestId), 'Turbidez acima do padrão aceitável',
  ]);

  // Medição 6 fica pendente
  const pendingId = startMeasId + 5;
  console.log(`\n  Medição #${pendingId} deixada como PENDENTE para teste de auditoria.`);
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║  AxoloDAO — Seed Data Script                           ║');
  console.log('╚══════════════════════════════════════════════════════════╝');
  console.log();
  console.log(`  Admin:    ${adminWallet.address}`);
  console.log(`  Gerente:  ${gerenteWallet.address}`);
  console.log(`  Cuidador: ${cuidadorWallet.address}`);
  console.log(`  Auditor:  ${auditorWallet.address}`);
  console.log();

  // Check relayer health before starting
  const relayerOk = await checkRelayerHealth();
  if (!relayerOk) {
    console.error('\nAbortando: relayer precisa estar rodando para as fases 3-6.');
    console.error('Inicie com: cd axolodao-relayer && node server.js');
    process.exit(1);
  }

  // Phase 1: Admin cria instituições (direto on-chain)
  try {
    await phase1();
    console.log('\n  ✓ Fase 1 concluída');
  } catch (e) {
    console.error(`\n  ✗ Fase 1 FALHOU: ${e.message}`);
  }

  // Phase 2: Gerente registra membros ENS (direto on-chain)
  try {
    await phase2();
    console.log('\n  ✓ Fase 2 concluída');
  } catch (e) {
    console.error(`\n  ✗ Fase 2 FALHOU: ${e.message}`);
  }

  // Phase 3: Membros fazem registrarAcesso (via relayer)
  try {
    await phase3();
    console.log('\n  ✓ Fase 3 concluída');
  } catch (e) {
    console.error(`\n  ✗ Fase 3 FALHOU: ${e.message}`);
  }

  // Phase 4: Cuidador registra tanques e axolotes (via relayer)
  try {
    await phase4();
    console.log('\n  ✓ Fase 4 concluída');
  } catch (e) {
    console.error(`\n  ✗ Fase 4 FALHOU: ${e.message}`);
  }

  // Phase 5: Cuidador registra medições (via relayer)
  let startMeasId;
  try {
    startMeasId = await phase5();
    console.log('\n  ✓ Fase 5 concluída');
  } catch (e) {
    console.error(`\n  ✗ Fase 5 FALHOU: ${e.message}`);
  }

  // Phase 6: Auditor valida/contesta (via relayer)
  if (startMeasId !== undefined) {
    try {
      await phase6(startMeasId);
      console.log('\n  ✓ Fase 6 concluída');
    } catch (e) {
      console.error(`\n  ✗ Fase 6 FALHOU: ${e.message}`);
    }
  } else {
    console.error('\n  ✗ Fase 6 PULADA: fase 5 falhou, sem IDs de medição');
  }

  // Summary
  console.log(`\n${'='.repeat(60)}`);
  console.log('  RESUMO DOS DADOS CRIADOS');
  console.log(`${'='.repeat(60)}\n`);
  console.log('  INSTITUIÇÕES:');
  console.log('    - labcuidadores (CARETAKER) — gerente:', gerenteWallet.address);
  console.log('    - labauditores  (AUDITOR)   — gerente:', gerenteWallet.address);
  console.log();
  console.log('  MEMBROS:');
  console.log(`    - joao.labcuidadores.axolodao2.eth → ${cuidadorWallet.address}`);
  console.log(`    - maria.labauditores.axolodao2.eth → ${auditorWallet.address}`);
  console.log();
  console.log('  TANQUES: 3 (Tanque Principal A, Tanque Quarentena, Tanque Reprodução)');
  console.log('  AXOLOTES: 5 (Totli, Xochitl, Atl, Citlali, Quetzal)');
  console.log();
  if (startMeasId !== undefined) {
    console.log(`  MEDIÇÕES:`);
    console.log(`    #${startMeasId}   Tanque 1 — VALIDADA`);
    console.log(`    #${startMeasId+1}   Tanque 1 — VALIDADA`);
    console.log(`    #${startMeasId+2}   Tanque 2 — VALIDADA`);
    console.log(`    #${startMeasId+3}   Tanque 2 — VALIDADA`);
    console.log(`    #${startMeasId+4}   Tanque 3 — CONTESTADA ("Turbidez acima do padrão aceitável")`);
    console.log(`    #${startMeasId+5}   Tanque 3 — PENDENTE (para teste de auditoria)`);
  }
  console.log(`\n${'='.repeat(60)}`);
  console.log('  Seed completo! Frontend pronto para testes.');
  console.log(`${'='.repeat(60)}\n`);
}

main().catch((e) => {
  console.error('\nERRO FATAL:', e);
  process.exit(1);
});
