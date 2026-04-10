#!/usr/bin/env node

const {
  buildInstitutionRecord,
  buildMemberRecord,
  loadInventory,
  saveInventory,
  upsertRecord,
} = require('./ens-inventory/inventory');

function die(message) {
  console.error(`ERRO: ${message}`);
  process.exit(1);
}

function usage() {
  die(
    'Uso:\n' +
    '  node deploy/add-ens-inventory-record.js institution <label> [createdBy]\n' +
    '  node deploy/add-ens-inventory-record.js member <institutionLabel> <memberLabel> [createdBy]'
  );
}

const [, , kind, arg1, arg2, arg3] = process.argv;
if (!kind) usage();

let record;

if (kind === 'institution') {
  if (!arg1) usage();
  record = buildInstitutionRecord({
    label: arg1,
    createdBy: arg2 || 'manual',
  });
} else if (kind === 'member') {
  if (!arg1 || !arg2) usage();
  record = buildMemberRecord({
    institutionLabel: arg1,
    label: arg2,
    createdBy: arg3 || 'manual',
  });
} else {
  usage();
}

const inventory = loadInventory();
saveInventory(upsertRecord(inventory, record));

console.log(`Registro adicionado ao inventário: ${record.fqdn ?? record.node}`);
