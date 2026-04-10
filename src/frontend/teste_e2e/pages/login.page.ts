import { Page, Locator, expect } from '@playwright/test';

/**
 * LoginPage — Page Object para /login
 *
 * Fluxo step-based:
 *   connect → detecting → selectRole (se tem role) OU register (se novo)
 */
export class LoginPage {
  readonly page: Page;

  // ─── Step: connect ────────────────────────────────────────────────────────
  readonly btnConectarCarteira: Locator;

  // ─── Step: selectRole ─────────────────────────────────────────────────────
  readonly roleCards:         Locator;
  readonly roleCardAdmin:     Locator;
  readonly roleCardGerente:   Locator;
  readonly roleCardOperador:  Locator;  // Cuidador ou Auditor
  readonly walletBadge:       Locator;

  // ─── Step: register ───────────────────────────────────────────────────────
  readonly inputEnsLabel:      Locator;
  readonly inputEnsInst:       Locator;
  readonly ensPreview:         Locator;
  readonly btnRegistrarAcesso: Locator;
  readonly relayerStatus:      Locator;

  // ─── Feedback ─────────────────────────────────────────────────────────────
  readonly feedbackMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    // Connect step
    this.btnConectarCarteira = page.getByRole('button', { name: 'Conectar Carteira' });

    // SelectRole step
    this.roleCards        = page.locator('.role-cards');
    this.roleCardAdmin    = page.locator('.role-card').filter({ hasText: 'Administrador' });
    this.roleCardGerente  = page.locator('.role-card').filter({ hasText: 'Gerente' });
    this.roleCardOperador = page.locator('.role-card').filter({ hasText: /Cuidador|Auditor/ });
    this.walletBadge      = page.locator('.wallet-address');

    // Register step
    this.inputEnsLabel      = page.locator('#ensLabel');
    this.inputEnsInst       = page.locator('#ensInst');
    this.ensPreview         = page.locator('.ens-preview');
    this.btnRegistrarAcesso = page.getByRole('button', { name: 'Registrar Acesso' });
    this.relayerStatus      = page.locator('.relayer-status');

    // Feedback
    this.feedbackMessage = page.locator('.feedback-message');
  }

  async goto() {
    await this.page.goto('/login');
    await this.page.waitForSelector('.login-card', { state: 'visible' });
  }

  /** Clica em "Conectar Carteira" e aguarda o próximo step */
  async conectarCarteira() {
    await this.btnConectarCarteira.click();
    // Aguarda sair do step 'detecting' — ou role cards ou register form aparece
    await this.page.waitForFunction(
      () => document.querySelector('.role-cards') !== null || document.querySelector('.wallet-inputs') !== null,
      { timeout: 10_000 },
    );
  }

  /** Clica no card de perfil correspondente e aguarda redirect */
  async selecionarPerfil(role: 'admin' | 'gerente' | 'caretaker' | 'auditor') {
    const cardMap = {
      admin:     this.roleCardAdmin,
      gerente:   this.roleCardGerente,
      caretaker: this.roleCardOperador,
      auditor:   this.roleCardOperador,
    };
    await cardMap[role].click();
  }

  /** Preenche o formulário de registro ENS */
  async preencherRegistro(label: string, inst: string) {
    await this.inputEnsLabel.fill(label);
    await this.inputEnsInst.fill(inst);
  }

  /** Submete o registro e aguarda redirect */
  async registrarAcesso(label: string, inst: string) {
    await this.preencherRegistro(label, inst);
    await this.btnRegistrarAcesso.click();
  }

  /** Aguarda redirect para /tela-inicial */
  async aguardarRedirect() {
    await this.page.waitForURL('**/tela-inicial', { timeout: 15_000 });
  }

  /** Retorna o endereço abreviado exibido no badge */
  async getWalletBadgeText(): Promise<string> {
    return (await this.walletBadge.first().textContent())?.trim() ?? '';
  }

  /** Retorna o texto do preview ENS (ex: "gui.biomuseu.axolodao2.eth") */
  async getEnsPreview(): Promise<string> {
    return (await this.ensPreview.textContent())?.trim() ?? '';
  }

  /** Retorna o texto da mensagem de feedback */
  async getFeedbackText(): Promise<string> {
    return (await this.feedbackMessage.textContent())?.trim() ?? '';
  }

  /** Verifica se o step de seleção de role está visível */
  async isRoleSelectionVisible(): Promise<boolean> {
    return this.roleCards.isVisible();
  }

  /** Verifica se o form de registro está visível */
  async isRegisterFormVisible(): Promise<boolean> {
    return this.page.locator('.wallet-inputs').isVisible();
  }
}
