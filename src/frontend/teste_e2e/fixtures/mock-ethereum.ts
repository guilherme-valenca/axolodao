/**
 * mock-ethereum.ts
 *
 * Cria um provider EIP-1193 sintético para substituir a MetaMask nos testes E2E.
 *
 * ARQUITETURA:
 *   - buildInitConfig() roda em Node.js: usa ethers para pré-computar seletores
 *     e codificar respostas ABI antes de enviá-las ao browser.
 *   - ethereumInitScript() é serializado e injetado no browser via
 *     page.addInitScript(ethereumInitScript, config) ANTES do Angular inicializar.
 *     Por isso NÃO pode ter imports — é JavaScript puro em runtime.
 *
 * USO NOS TESTES:
 *   const cfg = buildInitConfig({ role: 'caretaker', address: ADDR.operator, tanks: DEFAULT_TANKS });
 *   await page.addInitScript(ethereumInitScript, cfg);
 *   await page.goto('/login');
 */

import { ethers } from 'ethers';

// ─── Tipos ────────────────────────────────────────────────────────────────────

export type Role = 'caretaker' | 'auditor' | 'admin' | 'gerente' | 'none';

export interface MockTank {
  id: number;
  name: string;
  location: string;
}

export interface MockAxolotl {
  id: number;
  name: string;
  species: string;
  birthDate: number;
  tankId: number;
  morphData: string;
}

export interface MockMeasurement {
  id: number;
  tankId: number;
  recorder: string;
  timestamp: number;
  temperature: number;
  ph: number;
  dissolvedOxygen: number;
  conductivity: number;
  turbidity: number;
  phosphates: number;
  no2: number;
  no3: number;
  ammonia: number;
  hardness: number;
  status: number; // 0=pending, 1=validated, 2=contested
}

export interface MockConfig {
  role: Role;
  address: string;
  ensName?: string;
  tanks?: MockTank[];
  axolotls?: MockAxolotl[];
  measurements?: MockMeasurement[];
  /** Instituição label para gerente mock (default: 'biomuseu') */
  gerenteInst?: string;
}

// Tipo que será serializado como JSON e enviado ao browser context
export interface InitConfig {
  address: string;
  role: Role;
  selectors: Record<string, string>;
  caretakerRoleHex: string;
  auditorRoleHex: string;
  encoded: {
    CARETAKER_ROLE: string;
    AUDITOR_ROLE: string;
    DEFAULT_ADMIN_ROLE: string;
    trueVal: string;
    falseVal: string;
    nextTankId: string;
    tankCount: string;
    tanks: Record<string, string>;
    nextAxolotlId: string;
    axolotls: Record<string, string>;
    nextMeasurementId: string;
    measurements: Record<string, string>;
    ensNameVal: string;
    // Gerente detection
    gerentePorNodeVal: string;
    instituicoesVal: string;
    instAdicionadaLogs: any[];
    instAdicionadaTopic: string;
  };
}

// ─── Helpers Node.js (usam ethers) ────────────────────────────────────────────

const abi = ethers.AbiCoder.defaultAbiCoder();

/** Primeiros 4 bytes do keccak256 da assinatura da função = seletor ABI */
function sel(sig: string): string {
  return ethers.id(sig).slice(0, 10).toLowerCase();
}

/** Seletores dos métodos usados pelo app */
const SELECTORS: Record<string, string> = {
  CARETAKER_ROLE:     sel('CARETAKER_ROLE()'),
  AUDITOR_ROLE:       sel('AUDITOR_ROLE()'),
  DEFAULT_ADMIN_ROLE: sel('DEFAULT_ADMIN_ROLE()'),
  hasRole:            sel('hasRole(bytes32,address)'),
  nextTankId:         sel('nextTankId()'),
  tankCount:          sel('tankCount()'),
  getTank:            sel('getTank(uint256)'),
  nextAxolotlId:      sel('nextAxolotlId()'),
  getAxolotl:         sel('getAxolotl(uint256)'),
  getAxolotlsInTank:  sel('getAxolotlsInTank(uint256)'),
  nextMeasurementId:  sel('nextMeasurementId()'),
  getMeasurement:     sel('getMeasurement(uint256)'),
  getTankStatus:      sel('getTankStatus(uint256)'),
  ensName:            sel('ensName(address)'),
  gerentePorNode:     sel('gerentePorNode(bytes32)'),
  instituicoes:       sel('instituicoes(bytes32)'),
  AXOLODAO_NODE:      sel('AXOLODAO_NODE()'),
  ENS_REGISTRY:       sel('ENS_REGISTRY()'),
  eas:                sel('eas()'),
  tankSchemaUID:      sel('tankSchemaUID()'),
  axolotlSchemaUID:   sel('axolotlSchemaUID()'),
  measurementSchemaUID: sel('measurementSchemaUID()'),
};

/** Hash das roles (OpenZeppelin: keccak256 do nome, exceto DEFAULT_ADMIN que é 0x0) */
const ROLE_HASHES = {
  caretaker: ethers.keccak256(ethers.toUtf8Bytes('CARETAKER_ROLE')),
  auditor:   ethers.keccak256(ethers.toUtf8Bytes('AUDITOR_ROLE')),
  admin:     ethers.ZeroHash,
};

function encodeTank(t: MockTank, registeredBy: string): string {
  // tuple(uint256 id, string name, string location, address registeredBy, uint256 registeredAt, bool active, bytes32 attestationUID)
  return abi.encode(
    ['tuple(uint256,string,string,address,uint256,bool,bytes32)'],
    [[BigInt(t.id), t.name, t.location, registeredBy, BigInt(1_700_000_000), true, ethers.ZeroHash]],
  );
}

function encodeAxolotl(a: MockAxolotl, registeredBy: string): string {
  // tuple(uint256 id, string name, string species, uint256 birthDate, uint256 tankId, string morphData, bytes32 photoHash, address registeredBy, uint256 registeredAt, bool active, bytes32 attestationUID)
  return abi.encode(
    ['tuple(uint256,string,string,uint256,uint256,string,bytes32,address,uint256,bool,bytes32)'],
    [[
      BigInt(a.id), a.name, a.species, BigInt(a.birthDate), BigInt(a.tankId),
      a.morphData, ethers.ZeroHash, registeredBy, BigInt(1_700_000_000), true, ethers.ZeroHash,
    ]],
  );
}

function encodeMeasurement(m: MockMeasurement): string {
  // tuple(uint256 id, uint256 tankId, address recorder, uint256 timestamp,
  //   uint16 temperature, uint16 ph, uint16 dissolvedOxygen, uint16 conductivity,
  //   uint16 turbidity, uint16 phosphates, uint16 no2, uint16 no3, uint16 ammonia, uint16 hardness,
  //   uint8 status, address validator, uint256 validatedAt, string contestReason, bytes32 attestationUID)
  return abi.encode(
    ['tuple(uint256,uint256,address,uint256,uint16,uint16,uint16,uint16,uint16,uint16,uint16,uint16,uint16,uint16,uint8,address,uint256,string,bytes32)'],
    [[
      BigInt(m.id), BigInt(m.tankId), m.recorder, BigInt(m.timestamp),
      m.temperature, m.ph, m.dissolvedOxygen, m.conductivity,
      m.turbidity, m.phosphates, m.no2, m.no3, m.ammonia, m.hardness,
      m.status, ethers.ZeroAddress, BigInt(0), '', ethers.ZeroHash,
    ]],
  );
}

function encodeTankStatus(tankId: number, hasMeasurements: boolean): string {
  // tuple(uint256 lastPendingId, uint256 lastValidatedId, uint256 totalMeasurements)
  return abi.encode(
    ['tuple(uint256,uint256,uint256)'],
    [[BigInt(hasMeasurements ? 1 : 0), BigInt(0), BigInt(hasMeasurements ? 1 : 0)]],
  );
}

// ─── buildInitConfig ─────────────────────────────────────────────────────────

/**
 * Pré-computa todos os valores ABI-encoded que o mock precisará retornar.
 * Roda em Node.js — pode usar ethers livremente.
 */
export function buildInitConfig(cfg: MockConfig): InitConfig {
  const tanks        = cfg.tanks ?? [];
  const axolotls     = cfg.axolotls ?? [];
  const measurements = cfg.measurements ?? [];
  const gerenteInst  = cfg.gerenteInst ?? 'biomuseu';

  const tankMap: Record<string, string> = {};
  tanks.forEach((t) => {
    tankMap[String(t.id)] = encodeTank(t, cfg.address);
  });

  const axolotlMap: Record<string, string> = {};
  axolotls.forEach((a) => {
    axolotlMap[String(a.id)] = encodeAxolotl(a, cfg.address);
  });

  const measurementMap: Record<string, string> = {};
  measurements.forEach((m) => {
    measurementMap[String(m.id)] = encodeMeasurement(m);
  });

  const nextTankIdVal        = BigInt(tanks.length + 1);
  const nextAxolotlIdVal     = BigInt(axolotls.length + 1);
  const nextMeasurementIdVal = BigInt(measurements.length + 1);

  // Gerente detection: mock InstituicaoAdicionada event log
  const instNode = ethers.namehash(`${gerenteInst}.axolodao2.eth`);
  const instAdicionadaTopic = ethers.id('InstituicaoAdicionada(string,bytes32,bytes32)');

  // Encode event data: (string labelInst, bytes32 role, bytes32 node)
  const eventData = abi.encode(
    ['string', 'bytes32', 'bytes32'],
    [gerenteInst, ROLE_HASHES.caretaker, instNode],
  );

  // Mock log entry for eth_getLogs
  const instAdicionadaLogs = cfg.role === 'gerente' ? [{
    address: '0x0000000000000000000000000000000000000001', // placeholder, Access contract
    topics: [instAdicionadaTopic],
    data: eventData,
    blockNumber: '0x100',
    transactionHash: '0x' + '0'.repeat(64),
    transactionIndex: '0x0',
    blockHash: '0x' + '0'.repeat(64),
    logIndex: '0x0',
    removed: false,
  }] : [];

  // gerentePorNode response: returns the gerente address if role is gerente
  const gerentePorNodeVal = cfg.role === 'gerente'
    ? abi.encode(['address'], [cfg.address])
    : abi.encode(['address'], [ethers.ZeroAddress]);

  // instituicoes response: (bytes32 role, string label, bool ativa, address gerente)
  const instituicoesVal = cfg.role === 'gerente'
    ? abi.encode(['bytes32', 'string', 'bool', 'address'], [ROLE_HASHES.caretaker, gerenteInst, true, cfg.address])
    : abi.encode(['bytes32', 'string', 'bool', 'address'], [ethers.ZeroHash, '', false, ethers.ZeroAddress]);

  return {
    address:          cfg.address,
    role:             cfg.role,
    selectors:        SELECTORS,
    caretakerRoleHex: ROLE_HASHES.caretaker.slice(2),
    auditorRoleHex:   ROLE_HASHES.auditor.slice(2),
    encoded: {
      CARETAKER_ROLE:         abi.encode(['bytes32'], [ROLE_HASHES.caretaker]),
      AUDITOR_ROLE:           abi.encode(['bytes32'], [ROLE_HASHES.auditor]),
      DEFAULT_ADMIN_ROLE:     abi.encode(['bytes32'], [ROLE_HASHES.admin]),
      trueVal:                abi.encode(['bool'], [true]),
      falseVal:               abi.encode(['bool'], [false]),
      nextTankId:             abi.encode(['uint256'], [nextTankIdVal]),
      tankCount:              abi.encode(['uint256'], [BigInt(tanks.length)]),
      tanks:                  tankMap,
      nextAxolotlId:          abi.encode(['uint256'], [nextAxolotlIdVal]),
      axolotls:               axolotlMap,
      nextMeasurementId:      abi.encode(['uint256'], [nextMeasurementIdVal]),
      measurements:           measurementMap,
      ensNameVal:             abi.encode(['string'], [cfg.ensName ?? '']),
      gerentePorNodeVal,
      instituicoesVal,
      instAdicionadaLogs,
      instAdicionadaTopic,
    },
  };
}

// ─── ethereumInitScript ───────────────────────────────────────────────────────

/**
 * Injetado no browser via page.addInitScript(ethereumInitScript, config).
 * ATENÇÃO: esta função roda no contexto do browser — ZERO imports permitidos.
 * Recebe `config` como argumento JSON serializado pelo Playwright.
 */
export function ethereumInitScript(config: InitConfig): void {
  const { address, role, selectors, caretakerRoleHex, auditorRoleHex, encoded } = config;

  // ─── Utilitários ─────────────────────────────────────────────────────────

  const sentTxs = new Set<string>();
  let _connected = false; // eth_accounts returns [] until eth_requestAccounts is called

  function randomHex64(): string {
    let h = '';
    for (let i = 0; i < 64; i++) h += Math.floor(Math.random() * 16).toString(16);
    return h;
  }

  // ─── Event Emitter real (EIP-1193) ───────────────────────────────────────

  const _listeners: Record<string, Function[]> = {};

  function _on(event: string, fn: Function) {
    if (!_listeners[event]) _listeners[event] = [];
    _listeners[event].push(fn);
  }

  function _off(event: string, fn: Function) {
    if (!_listeners[event]) return;
    _listeners[event] = _listeners[event].filter((f) => f !== fn);
  }

  function _emit(event: string, ...args: any[]) {
    (_listeners[event] || []).forEach((fn) => { try { fn(...args); } catch (_) {} });
  }

  // ─── Block ticker ─────────────────────────────────────────────────────────

  const BLOCK_SUB_ID = '0x4242';
  let currentBlock  = 0x1234570;

  setTimeout(() => {
    setInterval(() => {
      currentBlock += 1;
      _emit('message', {
        type: 'eth_subscription',
        data: {
          subscription: BLOCK_SUB_ID,
          result: {
            number:           '0x' + currentBlock.toString(16),
            hash:             '0x' + randomHex64(),
            parentHash:       '0x' + randomHex64(),
            timestamp:        '0x' + Math.floor(Date.now() / 1000).toString(16),
            nonce:            '0x' + '0'.repeat(16),
            difficulty:       '0x0',
            gasLimit:         '0x1C9C380',
            gasUsed:          '0x0',
            miner:            '0x' + '0'.repeat(40),
            extraData:        '0x',
            baseFeePerGas:    '0x77359400',
            logsBloom:        '0x' + '0'.repeat(512),
            receiptsRoot:     '0x' + '0'.repeat(64),
            sha3Uncles:       '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
            stateRoot:        '0x' + '0'.repeat(64),
            transactionsRoot: '0x' + '0'.repeat(64),
            mixHash:          '0x' + '0'.repeat(64),
          },
        },
      });
    }, 150);
  }, 300);

  // ─── ABI call router ─────────────────────────────────────────────────────

  function handleCall(callObj: { to?: string; data?: string }): string {
    const data = (callObj?.data ?? '0x').toLowerCase();
    const s = data.slice(0, 10);

    if (s === selectors['CARETAKER_ROLE'])     return encoded.CARETAKER_ROLE;
    if (s === selectors['AUDITOR_ROLE'])       return encoded.AUDITOR_ROLE;
    if (s === selectors['DEFAULT_ADMIN_ROLE']) return encoded.DEFAULT_ADMIN_ROLE;

    if (s === selectors['hasRole']) {
      const roleInCall = data.slice(10, 74);
      if (roleInCall === caretakerRoleHex.toLowerCase()) {
        return (role === 'caretaker' || role === 'gerente') ? encoded.trueVal : encoded.falseVal;
      }
      if (roleInCall === auditorRoleHex.toLowerCase()) {
        return role === 'auditor' ? encoded.trueVal : encoded.falseVal;
      }
      // DEFAULT_ADMIN_ROLE = 0x00...00
      if (roleInCall === '0'.repeat(64)) {
        return role === 'admin' ? encoded.trueVal : encoded.falseVal;
      }
      return encoded.falseVal;
    }

    if (s === selectors['nextTankId'])        return encoded.nextTankId;
    if (s === selectors['tankCount'])         return encoded.tankCount;
    if (s === selectors['nextAxolotlId'])     return encoded.nextAxolotlId;
    if (s === selectors['nextMeasurementId']) return encoded.nextMeasurementId;
    if (s === selectors['ensName'])           return encoded.ensNameVal;

    if (s === selectors['getTank']) {
      const idHex = data.slice(10, 74);
      const tankId = String(parseInt(idHex, 16));
      return encoded.tanks[tankId] ?? '0x';
    }

    if (s === selectors['getAxolotl']) {
      const idHex = data.slice(10, 74);
      const axolotlId = String(parseInt(idHex, 16));
      return encoded.axolotls[axolotlId] ?? '0x';
    }

    if (s === selectors['getMeasurement']) {
      const idHex = data.slice(10, 74);
      const measurementId = String(parseInt(idHex, 16));
      return encoded.measurements[measurementId] ?? '0x';
    }

    if (s === selectors['getTankStatus']) {
      // Return a basic tank status: (lastPendingId=0, lastValidatedId=0, totalMeasurements=0)
      // Not critical for most tests
      return '0x' + '0'.repeat(64).repeat(3);
    }

    if (s === selectors['getAxolotlsInTank']) {
      // Return empty array
      return '0x' + '0'.repeat(64) + '0'.repeat(64);
    }

    if (s === selectors['gerentePorNode'])    return encoded.gerentePorNodeVal;
    if (s === selectors['instituicoes'])       return encoded.instituicoesVal;

    // AXOLODAO_NODE — namehash('axolodao2.eth')
    if (s === selectors['AXOLODAO_NODE']) {
      return '0x' + '0'.repeat(64); // placeholder
    }

    // ENS_REGISTRY
    if (s === selectors['ENS_REGISTRY']) {
      return '0x' + '0'.repeat(24) + '00000000000C2E074eC69A0dFb2997BA6C7d2e1e'.toLowerCase();
    }

    // EAS + schema UIDs (return placeholder hashes)
    if (s === selectors['eas']) {
      return '0x' + '0'.repeat(24) + '0'.repeat(40);
    }
    if (s === selectors['tankSchemaUID'] || s === selectors['axolotlSchemaUID'] || s === selectors['measurementSchemaUID']) {
      return '0x' + 'aa'.repeat(32);
    }

    return '0x';
  }

  // ─── Transaction receipt ─────────────────────────────────────────────────

  function buildReceipt(txHash: string) {
    return {
      transactionHash:   txHash,
      blockHash:         '0x' + '1'.repeat(64),
      blockNumber:       '0x1234565',
      status:            '0x1',
      gasUsed:           '0x5208',
      effectiveGasPrice: '0x77359400',
      cumulativeGasUsed: '0x5208',
      logs:              [],
      logsBloom:         '0x' + '0'.repeat(512),
      from:              address,
      to:                '0x' + '0'.repeat(40),
      contractAddress:   null,
      type:              '0x2',
      transactionIndex:  '0x0',
    };
  }

  // ─── Provider EIP-1193 ───────────────────────────────────────────────────

  (window as any).ethereum = {
    isMetaMask:      true,
    selectedAddress: address,
    chainId:         '0xaa36a7',

    request: async ({ method, params }: { method: string; params?: any[] }): Promise<any> => {
      switch (method) {
        case 'eth_requestAccounts':
          _connected = true;
          return [address];

        case 'eth_accounts':
          // Return empty until user explicitly connects via eth_requestAccounts.
          // This prevents checkExistingConnection() from auto-connecting in ngOnInit,
          // allowing the test to control when the connection happens.
          return _connected ? [address] : [];

        case 'eth_chainId':  return '0xaa36a7';
        case 'net_version':  return '11155111';

        case 'eth_blockNumber':
          return '0x' + currentBlock.toString(16);

        case 'eth_getTransactionCount':   return '0x1';
        case 'eth_estimateGas':           return '0x30D40';
        case 'eth_gasPrice':              return '0x77359400';
        case 'eth_maxFeePerGas':          return '0x77359400';
        case 'eth_maxPriorityFeePerGas':  return '0x3B9ACA00';
        case 'eth_getBalance':            return '0xDE0B6B3A7640000';

        case 'eth_call':
          return handleCall((params?.[0] as any) ?? {});

        case 'eth_sendTransaction':
        case 'wallet_sendTransaction': {
          const txHash = '0x' + randomHex64();
          sentTxs.add(txHash);
          return txHash;
        }

        // personal_sign: relayerService.relayWrite() calls signer.signMessage()
        // which translates to personal_sign on the provider
        case 'personal_sign': {
          // Return a mock 65-byte signature (130 hex chars)
          return '0x' + 'ab'.repeat(65);
        }

        case 'eth_getTransactionReceipt': {
          const hash = params?.[0] as string;
          if (sentTxs.has(hash)) return buildReceipt(hash);
          return null;
        }

        case 'eth_getTransactionByHash': {
          const hash = params?.[0] as string;
          if (sentTxs.has(hash)) {
            return {
              hash,
              from:                  address,
              to:                    '0x' + '0'.repeat(40),
              nonce:                 '0x1',
              gas:                   '0x30D40',
              gasPrice:              '0x77359400',
              maxFeePerGas:          '0x77359400',
              maxPriorityFeePerGas:  '0x3B9ACA00',
              value:                 '0x0',
              input:                 '0x',
              chainId:               '0xaa36a7',
              blockNumber:           '0x1234565',
              blockHash:             '0x' + '1'.repeat(64),
              transactionIndex:      '0x0',
              type:                  '0x2',
              v:                     '0x0',
              r:                     '0x' + 'a'.repeat(64),
              s:                     '0x' + 'b'.repeat(64),
            };
          }
          return null;
        }

        case 'eth_subscribe': {
          const subType = params?.[0];
          if (subType === 'newHeads') return BLOCK_SUB_ID;
          return '0x' + randomHex64().slice(0, 8);
        }

        case 'eth_unsubscribe':
          return true;

        // eth_getLogs: used by contract.queryFilter() for gerente detection
        case 'eth_getLogs': {
          const filter = params?.[0] as any;
          if (filter?.topics?.[0] === encoded.instAdicionadaTopic) {
            return encoded.instAdicionadaLogs;
          }
          return [];
        }

        case 'eth_getBlockByNumber':
          return {
            number:           '0x' + currentBlock.toString(16),
            hash:             '0x' + randomHex64(),
            parentHash:       '0x' + '0'.repeat(64),
            timestamp:        '0x' + Math.floor(Date.now() / 1000).toString(16),
            transactions:     [],
            gasLimit:         '0x1C9C380',
            gasUsed:          '0x0',
            baseFeePerGas:    '0x77359400',
            miner:            '0x' + '0'.repeat(40),
            extraData:        '0x',
            logsBloom:        '0x' + '0'.repeat(512),
            sha3Uncles:       '0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347',
            stateRoot:        '0x' + '0'.repeat(64),
            receiptsRoot:     '0x' + '0'.repeat(64),
            transactionsRoot: '0x' + '0'.repeat(64),
            nonce:            '0x' + '0'.repeat(16),
            mixHash:          '0x' + '0'.repeat(64),
            difficulty:       '0x0',
            totalDifficulty:  '0x0',
            size:             '0x220',
            uncles:           [],
          };

        case 'wallet_switchEthereumChain':
          return null;

        case 'wallet_requestPermissions':
          return [{ parentCapability: 'eth_accounts' }];

        default:
          console.warn('[MockEthereum] Método não tratado:', method, params);
          return null;
      }
    },

    on:             _on,
    removeListener: _off,
    emit:           _emit,
    addListener:    _on,
  };
}
