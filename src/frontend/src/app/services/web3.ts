import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Subject } from 'rxjs';
import { environment } from '../../environments/environment';

// ── ABIs Completas ────────────────────────────────────────────────────────────

const ABI_ACCESS = [
  'function registrarAcesso(string label, bytes32 parentNode) external',
  'function adicionarInstituicao(string labelInst, bytes32 role, address gerente) external',
  'function removerInstituicao(bytes32 parentNode) external',
  'function hasRole(bytes32 role, address account) view returns (bool)',
  'function grantRole(bytes32 role, address account) external',
  'function getRoleAdmin(bytes32 role) view returns (bytes32)',
  'function CARETAKER_ROLE() view returns (bytes32)',
  'function AUDITOR_ROLE() view returns (bytes32)',
  'function DEFAULT_ADMIN_ROLE() view returns (bytes32)',
  'function ensName(address) view returns (string)',
  'function AXOLODAO_NODE() view returns (bytes32)',
  'function ENS_REGISTRY() view returns (address)',
  'function instituicoes(bytes32) view returns (bytes32 role, string label, bool ativa, address gerente)',
  'function gerentePorNode(bytes32) view returns (address)',
  'event AcessoRegistrado(bytes32 indexed role, address indexed account, string label, bytes32 indexed parentNode)',
  'event InstituicaoAdicionada(string labelInst, bytes32 role, bytes32 node)',
  'event InstituicaoRemovida(bytes32 node)',
];

const ABI_REGISTRY = [
  'function registerTank(string name, string location) external returns (uint256)',
  'function updateTank(uint256 tankId, string newName, string newLocation) external',
  'function deactivateTank(uint256 tankId) external',
  'function registerAxolotl(string name, string species, uint256 birthDate, uint256 tankId, string morphData, bytes32 photoHash) external returns (uint256)',
  'function updateAxolotl(uint256 axolotlId, string newName, string newMorphData, bytes32 newPhotoHash) external',
  'function transferAxolotl(uint256 axolotlId, uint256 newTankId) external',
  'function deactivateAxolotl(uint256 axolotlId) external',
  'function getTank(uint256 tankId) view returns (tuple(uint256 id, string name, string location, address registeredBy, uint256 registeredAt, bool active, bytes32 attestationUID))',
  'function getAxolotl(uint256 axolotlId) view returns (tuple(uint256 id, string name, string species, uint256 birthDate, uint256 tankId, string morphData, bytes32 photoHash, address registeredBy, uint256 registeredAt, bool active, bytes32 attestationUID))',
  'function getAxolotlsInTank(uint256 tankId) view returns (uint256[])',
  'function nextTankId() view returns (uint256)',
  'function nextAxolotlId() view returns (uint256)',
  'function tankCount() view returns (uint256)',
  'function axolotlCount() view returns (uint256)',
  'function eas() view returns (address)',
  'function tankSchemaUID() view returns (bytes32)',
  'function axolotlSchemaUID() view returns (bytes32)',
  'function transferSchemaUID() view returns (bytes32)',
  'function deactivateSchemaUID() view returns (bytes32)',
];

const ABI_MONITORING = [
  'function recordMeasurement(tuple(uint256 tankId, uint16 temperature, uint16 ph, uint16 dissolvedOxygen, uint16 conductivity, uint16 turbidity, uint16 phosphates, uint16 no2, uint16 no3, uint16 ammonia, uint16 hardness) p) external returns (uint256)',
  'function validateMeasurement(uint256 measurementId) external',
  'function contestMeasurement(uint256 measurementId, string reason) external',
  'function getMeasurement(uint256 measurementId) view returns (tuple(uint256 id, uint256 tankId, address recorder, uint256 timestamp, uint16 temperature, uint16 ph, uint16 dissolvedOxygen, uint16 conductivity, uint16 turbidity, uint16 phosphates, uint16 no2, uint16 no3, uint16 ammonia, uint16 hardness, uint8 status, address validator, uint256 validatedAt, string contestReason, bytes32 attestationUID))',
  'function getTankStatus(uint256 tankId) view returns (tuple(uint256 lastPendingId, uint256 lastValidatedId, uint256 totalMeasurements))',
  'function getLastValidatedMeasurement(uint256 tankId) view returns (tuple(uint256 id, uint256 tankId, address recorder, uint256 timestamp, uint16 temperature, uint16 ph, uint16 dissolvedOxygen, uint16 conductivity, uint16 turbidity, uint16 phosphates, uint16 no2, uint16 no3, uint16 ammonia, uint16 hardness, uint8 status, address validator, uint256 validatedAt, string contestReason, bytes32 attestationUID))',
  'function nextMeasurementId() view returns (uint256)',
  'function measurementCount() view returns (uint256)',
  'function eas() view returns (address)',
  'function measurementSchemaUID() view returns (bytes32)',
];

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ActiveTank {
  id: number;
  name: string;
  location: string;
}

// ── Service ───────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class Web3Service {
  public provider: ethers.BrowserProvider | null = null;
  public signer: ethers.JsonRpcSigner | null = null;
  public address = '';
  public wrongNetwork = false;

  /** Emite o novo endereço sempre que a conta muda via MetaMask ('' = desconectou). */
  public accountChanged$ = new Subject<string>();

  /** True após logout explícito — impede reconexão silenciosa pelo guard. */
  private _loggedOut = false;
  private _listenersAttached = false;
  private readonly _expectedChainId = environment.chainId; // 11155111

  public contracts: {
    access: any;
    registry: any;
    monitoring: any;
  } = { access: null, registry: null, monitoring: null };

  /** Getter público para o guard consultar sem acessar campo privado. */
  get isLoggedOut(): boolean { return this._loggedOut; }

  private initContracts(): void {
    if (!this.provider) return;
    this.contracts.access     = new ethers.Contract(environment.contracts.access,     ABI_ACCESS,     this.provider);
    this.contracts.registry   = new ethers.Contract(environment.contracts.registry,   ABI_REGISTRY,   this.provider);
    this.contracts.monitoring = new ethers.Contract(environment.contracts.monitoring, ABI_MONITORING, this.provider);
  }

  /** Finaliza a conexão após o provider estar pronto: signer, address, contratos, rede. */
  private async _finalizeConnection(): Promise<string> {
    this.signer  = await this.provider!.getSigner();
    this.address = await this.signer.getAddress();
    this.initContracts();
    await this._checkNetwork();
    return this.address;
  }

  /** Desconecta o usuário (logout explícito). */
  disconnect(): void {
    this._loggedOut = true;
    this.signer = null;
    this.address = '';
    this.wrongNetwork = false;
    this.contracts = { access: null, registry: null, monitoring: null };
  }

  /** Registra listeners do MetaMask (accountsChanged, chainChanged) uma única vez. */
  private _setupListeners(): void {
    if (this._listenersAttached || !(window as any).ethereum) return;
    this._listenersAttached = true;

    (window as any).ethereum.on('accountsChanged', async (accounts: string[]) => {
      if (this._loggedOut) return;
      if (!accounts.length) {
        this.disconnect();
        this.accountChanged$.next('');
        return;
      }
      this.provider = new ethers.BrowserProvider((window as any).ethereum);
      const addr = await this._finalizeConnection();
      this.accountChanged$.next(addr);
    });

    (window as any).ethereum.on('chainChanged', () => {
      window.location.reload();
    });
  }

  private async _checkNetwork(): Promise<void> {
    if (!this.provider) return;
    const network = await this.provider.getNetwork();
    this.wrongNetwork = Number(network.chainId) !== this._expectedChainId;
  }

  async connectWallet(): Promise<string> {
    if (!(window as any).ethereum) throw new Error('MetaMask não encontrada no navegador!');
    this._loggedOut = false;
    this.provider = new ethers.BrowserProvider((window as any).ethereum);
    await this.provider.send('eth_requestAccounts', []);
    const addr = await this._finalizeConnection();
    this._setupListeners();
    return addr;
  }

  async switchWallet(): Promise<string> {
    if (!(window as any).ethereum) throw new Error('MetaMask não encontrada no navegador!');
    this._loggedOut = false;
    this.provider = new ethers.BrowserProvider((window as any).ethereum);
    await this.provider.send('wallet_requestPermissions', [{ eth_accounts: {} }]);
    const addr = await this._finalizeConnection();
    this._setupListeners();
    return addr;
  }

  async checkConnection(): Promise<string | null> {
    if (!(window as any).ethereum) return null;
    if (this._loggedOut) return null;           // respeita logout explícito
    this.provider = new ethers.BrowserProvider((window as any).ethereum);
    const accounts = await this.provider.send('eth_accounts', []);
    if (accounts && accounts.length > 0) {
      const addr = await this._finalizeConnection();
      this._setupListeners();
      return addr;
    }
    return null;
  }

  async buscarTanquesAtivos(): Promise<ActiveTank[]> {
    const contract = this.contracts.registry;
    if (!contract) return [];

    const totalBigInt = await contract['tankCount']();
    const total = Number(totalBigInt);
    if (!Number.isFinite(total) || total < 1) return [];

    const buscas = Array.from({ length: total }, (_, i) =>
      contract['getTank'](i + 1) as Promise<any>
    );
    const resultados = await Promise.all(buscas);

    return resultados
      .filter(t => Boolean(t.active))
      .map(t => ({
        id:       Number(t.id),
        name:     String(t.name),
        location: String(t.location),
      }));
  }
}
