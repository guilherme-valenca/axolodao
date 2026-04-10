import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { Web3Service } from './web3';

export type UserRole = 'admin' | 'gerente' | 'caretaker' | 'auditor' | 'none';

// Role constants — deterministic keccak256 hashes, computed once at module load
const ROLE = {
  admin:     ethers.ZeroHash,                // DEFAULT_ADMIN_ROLE = bytes32(0) in OZ AccessControl
  caretaker: ethers.id('CARETAKER_ROLE'),
  auditor:   ethers.id('AUDITOR_ROLE'),
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  public role: UserRole = 'none';
  public isAdmin     = false;
  public isGerente   = false;
  public isCaretaker = false;
  public isAuditor   = false;
  public ensName     = '';
  public gerenteInstituicao = '';  // label da instituição que o gerente gerencia

  constructor(private web3: Web3Service) {}

  /**
   * Detecta TODAS as roles do endereço conectado.
   * Prioridade de exibição: admin > gerente > caretaker > auditor
   */
  /** Callback opcional — chamado sempre que a role muda (para atualizar sidebar, etc.) */
  public onRoleChange: (() => void) | null = null;

  async detectRoles(): Promise<void> {
    const contract = this.web3.contracts.access;
    const addr     = this.web3.address;
    if (!contract || !addr) { console.warn('[detectRoles] aborted: no contract or addr'); return; }

    // Fase 1: checks rápidos em paralelo (4 RPCs simultâneas)
    const [isAdmin, isCaretaker, isAuditor, ensName] = await Promise.all([
      contract['hasRole'](ROLE.admin,     addr),
      contract['hasRole'](ROLE.caretaker, addr),
      contract['hasRole'](ROLE.auditor,   addr),
      contract['ensName'](addr).catch(() => ''),
    ]);

    this.isAdmin     = isAdmin;
    this.isCaretaker = isCaretaker;
    this.isAuditor   = isAuditor;
    this.ensName     = ensName;

    // Seta role imediatamente com o que já sabemos (sidebar aparece rápido)
    this._atualizarRole();

    // Fase 2: detecção de gerente (mais lenta — query de eventos)
    // Roda em background para não bloquear a UI
    this._detectarGerente(contract, addr);
  }

  private async _detectarGerente(contract: any, addr: string): Promise<void> {
    try {
      const events = await contract.queryFilter(contract.filters['InstituicaoAdicionada']());
      this.isGerente = false;
      this.gerenteInstituicao = '';

      const nodes = events.map((e: any) => e.args['node'] as string);
      const gerentes: string[] = await Promise.all(
        nodes.map((n: string) => contract['gerentePorNode'](n))
      );

      const matchIdx = gerentes.findIndex(
        (g: string) => g.toLowerCase() === addr.toLowerCase()
      );

      if (matchIdx !== -1) {
        const [, label, ativa] = await contract['instituicoes'](nodes[matchIdx]);
        if (ativa) {
          this.isGerente = true;
          this.gerenteInstituicao = label;
        }
      }
    } catch (err) {
      console.error('[detectRoles] Erro ao detectar gerente:', err);
      this.isGerente = false;
    }

    // Atualiza role (pode mudar de caretaker→gerente se for gerente)
    const roleBefore = this.role;
    this._atualizarRole();
    if (this.role !== roleBefore && this.onRoleChange) {
      this.onRoleChange();
    }
  }

  private _atualizarRole(): void {
    if      (this.isAdmin)     this.role = 'admin';
    else if (this.isGerente)   this.role = 'gerente';
    else if (this.isCaretaker) this.role = 'caretaker';
    else if (this.isAuditor)   this.role = 'auditor';
    else                       this.role = 'none';
  }

  get hasAnyRole(): boolean {
    return this.isAdmin || this.isGerente || this.isCaretaker || this.isAuditor;
  }

  reset(): void {
    this.role = 'none';
    this.isAdmin = this.isGerente = this.isCaretaker = this.isAuditor = false;
    this.ensName = '';
    this.gerenteInstituicao = '';
    this.onRoleChange = null;
  }
}
