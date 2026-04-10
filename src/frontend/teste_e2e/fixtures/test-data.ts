/**
 * test-data.ts
 *
 * Dados compartilhados entre todos os specs:
 * endereços de carteira, tanques de teste, axolotes, medições e valores de formulário.
 */

import { buildInitConfig, MockTank, MockAxolotl, MockMeasurement } from './mock-ethereum';

// ─── Endereços de carteira por role ──────────────────────────────────────────

// Endereços de teste do Hardhat (derivados do mnemônico padrão "test test test...").
// São válidos, determinísticos, e não têm fundos reais em nenhuma rede.
export const ADDRESSES = {
  operator: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  auditor:  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  admin:    '0x90F79bf6EB2c4f870365E785982E1f101E93b906',
  gerente:  '0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc',
  noRole:   '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
} as const;

// ─── Tanques de teste ─────────────────────────────────────────────────────────

export const DEFAULT_TANKS: MockTank[] = [
  { id: 1, name: 'Tanque Berçário', location: 'Laboratório Norte' },
  { id: 2, name: 'Tanque Principal', location: 'Laboratório Sul' },
];

// ─── Axolotes de teste ────────────────────────────────────────────────────────

export const DEFAULT_AXOLOTLS: MockAxolotl[] = [
  { id: 1, name: 'Xolotl', species: 'Ambystoma mexicanum', birthDate: 1_700_000_000, tankId: 1, morphData: 'Leucístico' },
];

// ─── Medições de teste ────────────────────────────────────────────────────────

export const DEFAULT_MEASUREMENTS: MockMeasurement[] = [
  {
    id: 1, tankId: 1, recorder: ADDRESSES.operator, timestamp: 1_700_000_000,
    temperature: 1700, ph: 720, dissolvedOxygen: 710, conductivity: 300,
    turbidity: 100, phosphates: 50, no2: 3, no3: 1000, ammonia: 0, hardness: 800,
    status: 0, // pending
  },
];

// ─── Configurações pré-montadas por cenário ───────────────────────────────────

/** Operador com tanques e dados disponíveis */
export const operatorConfig = buildInitConfig({
  role:         'caretaker',
  address:      ADDRESSES.operator,
  ensName:      'gui.biomuseu.axolodao2.eth',
  tanks:        DEFAULT_TANKS,
  axolotls:     DEFAULT_AXOLOTLS,
  measurements: DEFAULT_MEASUREMENTS,
});

/** Operador sem nenhum tanque cadastrado ainda */
export const operatorEmptyConfig = buildInitConfig({
  role:    'caretaker',
  address: ADDRESSES.operator,
  ensName: 'gui.biomuseu.axolodao2.eth',
  tanks:   [],
});

/** Auditor com medições pendentes para validar */
export const auditorConfig = buildInitConfig({
  role:         'auditor',
  address:      ADDRESSES.auditor,
  ensName:      'auditor.biomuseu.axolodao2.eth',
  tanks:        DEFAULT_TANKS,
  measurements: DEFAULT_MEASUREMENTS,
});

/** Admin (sem ENS, usa endereço direto) */
export const adminConfig = buildInitConfig({
  role:    'admin',
  address: ADDRESSES.admin,
  tanks:   DEFAULT_TANKS,
});

/** Gerente institucional */
export const gerenteConfig = buildInitConfig({
  role:        'gerente',
  address:     ADDRESSES.gerente,
  ensName:     'admin.biomuseu.axolodao2.eth',
  tanks:       DEFAULT_TANKS,
  gerenteInst: 'biomuseu',
});

/** Sem role registrado (novo usuário) */
export const noRoleConfig = buildInitConfig({
  role:    'none',
  address: ADDRESSES.noRole,
  tanks:   [],
});

// ─── Valores de formulário para os testes ─────────────────────────────────────

export const TANK_FORM = {
  valid: {
    nome:        'Tanque Teste E2E',
    localizacao: 'Sala de Automação',
  },
};

export const AXOLOTE_FORM = {
  valid: {
    nome:           'Axolote Teste',
    especie:        'A. mexicanum',
    dataNascimento: '2024-01-15',
    tanqueId:       '1',
    morfologia:     'Leucístico',
  },
};

export const MEDICAO_FORM = {
  /** Parâmetros dentro dos limites ideais — sem alertas biológicos */
  normal: {
    tankId: '1',
    temp:   '17.0',
    ph:     '7.2',
    o2:     '7.1',
    cond:   '300',
    turb:   '1.0',
    phos:   '0.5',
    no2:    '0.03',
    no3:    '10.0',
    nh3:    '0.0',
    gh:     '8.0',
  },
  /** Temperatura acima do limite → dispara alerta biológico */
  tempCritica: {
    tankId: '1',
    temp:   '22.0',
    ph:     '7.2',
    o2:     '7.1',
    cond:   '300',
    turb:   '1.0',
    phos:   '0.5',
    no2:    '0.03',
    no3:    '10.0',
    nh3:    '0.0',
    gh:     '8.0',
  },
  /** pH abaixo do limite → dispara alerta biológico */
  phCritico: {
    tankId: '1',
    temp:   '17.0',
    ph:     '5.5',
    o2:     '7.1',
    cond:   '300',
    turb:   '1.0',
    phos:   '0.5',
    no2:    '0.03',
    no3:    '10.0',
    nh3:    '0.0',
    gh:     '8.0',
  },
  /** Amônia acima de zero → dispara alerta biológico */
  amoniaCritica: {
    tankId: '1',
    temp:   '17.0',
    ph:     '7.2',
    o2:     '7.1',
    cond:   '300',
    turb:   '1.0',
    phos:   '0.5',
    no2:    '0.03',
    no3:    '10.0',
    nh3:    '0.1',
    gh:     '8.0',
  },
};

export const REGISTRO_MEMBRO_FORM = {
  valid: {
    instLabel:       'biomuseu',
    userLabel:       'novomembro',
    userAddress:     '0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65',
    resolverAddress: '0xE99638b40E4Fff0129D56f03b55b6bbC4BBE49b5',
  },
};
