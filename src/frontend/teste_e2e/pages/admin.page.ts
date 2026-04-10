import { Page, Locator } from '@playwright/test';

/**
 * AdminPage — Page Object para o componente admin-diagnostico
 *
 * Acessado via sidebar → "Diagnóstico" (apenas admin).
 */
export class AdminPage {
  readonly page: Page;

  // ─── Diagnóstico ──────────────────────────────────────────────────────────
  readonly diagTitle:    Locator;
  readonly diagCards:    Locator;
  readonly diagLoading:  Locator;

  // Cards específicos
  readonly cardConstantes: Locator;
  readonly cardContratos:  Locator;
  readonly cardEAS:        Locator;
  readonly cardRelayer:    Locator;

  // Valores dentro dos cards
  readonly relayerStatusOk:  Locator;
  readonly relayerStatusBad: Locator;

  constructor(page: Page) {
    this.page = page;

    this.diagTitle   = page.locator('.diag-title');
    this.diagCards   = page.locator('.diag-card');
    this.diagLoading = page.locator('.diag-loading');

    this.cardConstantes = page.locator('.diag-card').filter({ hasText: 'Constantes' });
    this.cardContratos  = page.locator('.diag-card').filter({ hasText: 'Contratos Deployados' });
    this.cardEAS        = page.locator('.diag-card').filter({ hasText: 'EAS Schemas' });
    this.cardRelayer    = page.locator('.diag-card').filter({ hasText: 'Status do Relayer' });

    this.relayerStatusOk  = page.locator('.diag-check.ok').filter({ hasText: 'Online' });
    this.relayerStatusBad = page.locator('.diag-check.bad').filter({ hasText: 'Offline' });
  }

  /** Aguarda o diagnóstico carregar (sai do loading) */
  async aguardarCarregamento() {
    await this.page.waitForFunction(
      () => document.querySelector('.diag-loading') === null && document.querySelector('.diag-card') !== null,
      { timeout: 10_000 },
    );
  }

  /** Retorna true se o título "Diagnóstico do Sistema" é visível */
  async isDiagnosticoVisible(): Promise<boolean> {
    return this.diagTitle.isVisible();
  }

  /** Retorna o número de cards de diagnóstico */
  async getCardCount(): Promise<number> {
    return this.diagCards.count();
  }
}
