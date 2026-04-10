import { Component, OnInit, OnDestroy, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ethers } from 'ethers';
import { Web3Service } from '../../services/web3';
import { AuthService, UserRole } from '../../services/auth.service';
import { RelayerService } from '../../services/relayer.service';
import {
  LucideAngularModule,
  Wallet, CheckCircle, AlertTriangle, Loader2, RefreshCw, Shield, User, Eye,
} from 'lucide-angular';

type LoginStep = 'connect' | 'detecting' | 'selectRole' | 'register';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit, OnDestroy {
  step: LoginStep = 'connect';
  walletAddress   = '';
  logMensagem     = '';
  isLoading       = false;
  isError         = false;
  isSuccess       = false;
  registerForm!: FormGroup;
  private _accountSub?: Subscription;

  readonly WalletIcon         = Wallet;
  readonly CheckCircleIcon    = CheckCircle;
  readonly AlertTriangleIcon  = AlertTriangle;
  readonly LoaderIcon         = Loader2;
  readonly RefreshCwIcon      = RefreshCw;
  readonly ShieldIcon         = Shield;
  readonly UserIcon           = User;
  readonly EyeIcon            = Eye;

  readonly web3    = inject(Web3Service);
  readonly auth    = inject(AuthService);
  readonly relayer = inject(RelayerService);
  private  router  = inject(Router);
  private  cdr     = inject(ChangeDetectorRef);

  ngOnInit() {
    this.registerForm = new FormGroup({
      ensLabel: new FormControl('', Validators.required),
      ensInst:  new FormControl('', Validators.required),
    });
    this.checkExistingConnection();

    // Reage a trocas de conta feitas diretamente no MetaMask
    this._accountSub = this.web3.accountChanged$.subscribe(async (addr) => {
      this.auth.reset();
      if (addr) {
        this.walletAddress = addr;
        await this.detectAndRoute();
      } else {
        this.walletAddress = '';
        this.step = 'connect';
        this.cdr.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    this._accountSub?.unsubscribe();
  }

  async checkExistingConnection() {
    try {
      const addr = await this.web3.checkConnection();
      if (addr) {
        this.walletAddress = addr;
        await this.detectAndRoute();
      }
    } catch { /* silencioso */ }
  }

  async conectarCarteira() {
    await this._runWalletAction(
      () => this.web3.connectWallet(),
      'Abrindo MetaMask...',
      'Conexão cancelada.',
    );
  }

  async trocarCarteira() {
    this.auth.reset();
    await this._runWalletAction(
      () => this.web3.switchWallet(),
      'Selecione outra conta na MetaMask...',
      'Troca de carteira cancelada.',
    );
  }

  private async _runWalletAction(
    action: () => Promise<string>,
    loadingMsg: string,
    cancelMsg: string,
  ) {
    this.isLoading   = true;
    this.isError     = false;
    this.isSuccess   = false;
    this.logMensagem = loadingMsg;
    this.cdr.detectChanges();
    try {
      this.walletAddress = await action();
      await this.detectAndRoute();
    } catch (error: any) {
      this.isError     = true;
      this.isLoading   = false;
      const rejected   = error?.code === 4001 || error?.message?.includes('User rejected');
      this.logMensagem = rejected ? cancelMsg : `Erro: ${error?.message || 'Falha'}`;
      this.cdr.detectChanges();
    }
  }

  private async detectAndRoute() {
    this.step        = 'detecting';
    this.isLoading   = true;
    this.logMensagem = 'Verificando permissões...';
    this.cdr.detectChanges();

    try {
      // Quando _detectarGerente completar em background, re-renderiza os cards
      this.auth.onRoleChange = () => {
        this._applyRoleRouting();
        this.cdr.detectChanges();
      };

      await this.auth.detectRoles();
      console.log('[detectAndRoute] hasAnyRole:', this.auth.hasAnyRole, '| isAdmin:', this.auth.isAdmin, '| role:', this.auth.role);
      this._applyRoleRouting();
      this.isSuccess = true;
      this.logMensagem = '';
    } catch (err) {
      console.error('[detectAndRoute] detectRoles threw:', err);
      this.step        = 'register';
      this.isError     = true;
      this.logMensagem = 'Não foi possível verificar permissões. Tente registrar-se.';
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  selecionarPerfil(role: string) {
    this.auth.role = role as any;
    this.router.navigate(['/tela-inicial']);
  }

  private _getSingleAvailableRole(): UserRole | null {
    const availableRoles: UserRole[] = [];

    if (this.auth.isAdmin) availableRoles.push('admin');
    if (this.auth.isGerente) availableRoles.push('gerente');
    if (this.auth.isCaretaker) availableRoles.push('caretaker');
    if (this.auth.isAuditor) availableRoles.push('auditor');

    return availableRoles.length === 1 ? availableRoles[0] : null;
  }

  private _applyRoleRouting(): void {
    const singleRole = this._getSingleAvailableRole();

    if (singleRole) {
      this.selecionarPerfil(singleRole);
      return;
    }

    this.step = this.auth.hasAnyRole ? 'selectRole' : 'register';
  }

  get nomeEnsCompleto(): string {
    const label = this.registerForm.get('ensLabel')?.value;
    const inst  = this.registerForm.get('ensInst')?.value;
    if (!label || !inst) return '';
    return `${label}.${inst}.axolodao2.eth`;
  }

  get parentNodeCalculado(): string {
    const inst = this.registerForm.get('ensInst')?.value;
    if (!inst) return '';
    return ethers.namehash(`${inst}.axolodao2.eth`);
  }

  async registrarAcesso() {
    if (this.registerForm.invalid) {
      this.isError     = true;
      this.isSuccess   = false;
      this.logMensagem = 'Preencha a Label e a Instituição!';
      this.cdr.detectChanges();
      return;
    }

    const contract = this.web3.contracts.access;
    if (!contract) {
      this.isError     = true;
      this.logMensagem = 'Contrato não inicializado. Reconecte a carteira.';
      this.cdr.detectChanges();
      return;
    }

    const labelEns = this.registerForm.get('ensLabel')?.value;

    try {
      this.isLoading   = true;
      this.isError     = false;
      this.isSuccess   = false;
      this.logMensagem = 'Assine a mensagem na MetaMask...';
      this.cdr.detectChanges();

      await this.relayer.relayWrite(contract, 'registrarAcesso', [labelEns, this.parentNodeCalculado]);

      this.isSuccess   = true;
      this.logMensagem = 'Acesso registrado com sucesso!';
      this.cdr.detectChanges();
      this.router.navigate(['/tela-inicial']);
    } catch (error: any) {
      this.isError     = true;
      this.isSuccess   = false;
      const msg        = error?.message || 'Falha na transação';
      this.logMensagem = msg.includes('User rejected') || msg.includes('rejected')
        ? 'Cancelado pelo usuário.'
        : `Erro: ${msg}`;
      this.cdr.detectChanges();
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }
}
