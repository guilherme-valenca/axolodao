import { Page, Locator } from '@playwright/test';

/**
 * TelaInicialPage — Page Object para /tela-inicial
 *
 * Gerencia a sidebar RBAC e os painéis da home.
 * A sidebar mostra menus diferentes conforme o cargoUsuario.
 */
export class TelaInicialPage {
  readonly page: Page;

  // ─── Sidebar: comum a todos ───────────────────────────────────────────────
  readonly navHome:          Locator;
  readonly navTanques:       Locator;
  readonly navAxolotes:      Locator;

  // ─── Sidebar: operador (caretaker) ────────────────────────────────────────
  readonly navCadastroAxolote: Locator;
  readonly navCadastroTanque:  Locator;
  readonly navMonitoramento:   Locator;

  // ─── Sidebar: admin ───────────────────────────────────────────────────────
  readonly navDiagnostico:     Locator;
  readonly navMedicoes:        Locator;  // admin vê "Medições" em vez de "Monitoramento"

  // ─── Sidebar: gerente ─────────────────────────────────────────────────────
  readonly navRegistroMembro:  Locator;

  // ─── Sidebar: auditor ─────────────────────────────────────────────────────
  readonly navValidacao:       Locator;

  // ─── Sidebar: footer ──────────────────────────────────────────────────────
  readonly btnDesconectar: Locator;
  readonly walletBadge:    Locator;

  // ─── Painéis da home ──────────────────────────────────────────────────────
  readonly dashboardContainer:       Locator;
  readonly painelUltimasMedicoes:    Locator;
  readonly painelMedicoesPendentes:  Locator;
  readonly fonteDosDados:            Locator;

  constructor(page: Page) {
    this.page = page;

    // Sidebar navigation items (by text content)
    this.navHome             = page.locator('.nav-item').filter({ hasText: 'Home' });
    this.navTanques          = page.locator('.nav-item').filter({ hasText: 'Tanques' });
    this.navAxolotes         = page.locator('.nav-item').filter({ hasText: 'Axolotes' });
    this.navCadastroAxolote  = page.locator('.nav-item').filter({ hasText: /Cadastro axolote|Cadastro Axolote/i });
    this.navCadastroTanque   = page.locator('.nav-item').filter({ hasText: /Cadastro tanque|Cadastro Tanque/i });
    this.navMonitoramento    = page.locator('.nav-item').filter({ hasText: 'Monitoramento' });
    this.navDiagnostico      = page.locator('.nav-item').filter({ hasText: 'Diagnóstico' });
    this.navMedicoes         = page.locator('.nav-item').filter({ hasText: 'Medições' });
    this.navRegistroMembro   = page.locator('.nav-item').filter({ hasText: 'Registrar Membros' });
    this.navValidacao        = page.locator('.nav-item').filter({ hasText: 'Fila de Validação' });

    // Footer
    this.btnDesconectar = page.locator('.logout-btn');
    this.walletBadge    = page.locator('.sidebar-footer .wallet-address');

    // Dashboard panels
    this.dashboardContainer      = page.locator('.dashboard-container');
    this.painelUltimasMedicoes   = page.locator('.panel-title').filter({ hasText: 'Últimas Medições' });
    this.painelMedicoesPendentes = page.locator('.panel-title').filter({ hasText: /Pendentes/ });
    this.fonteDosDados           = page.locator('.data-source-badge');
  }

  async goto() {
    await this.page.goto('/tela-inicial');
    await this.page.waitForSelector('.sidebar', { state: 'visible', timeout: 10_000 });
  }

  /** Navega para uma seção via sidebar */
  async navegarPara(
    menu:
      | 'home' | 'tanques' | 'axolotes'
      | 'cadastro-axolote' | 'cadastro-tanque'
      | 'monitoramento' | 'diagnostico'
      | 'registro-membro' | 'validacao' | 'medicoes'
  ) {
    const navMap: Record<string, Locator> = {
      'home':             this.navHome,
      'tanques':          this.navTanques,
      'axolotes':         this.navAxolotes,
      'cadastro-axolote': this.navCadastroAxolote,
      'cadastro-tanque':  this.navCadastroTanque,
      'monitoramento':    this.navMonitoramento,
      'diagnostico':      this.navDiagnostico,
      'medicoes':         this.navMedicoes,
      'registro-membro':  this.navRegistroMembro,
      'validacao':        this.navValidacao,
    };
    await navMap[menu].click();
    await this.page.waitForTimeout(500);
  }
}
