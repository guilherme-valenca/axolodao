import { Page, Locator } from '@playwright/test';

/**
 * GerentePage — Page Object para o componente registro-membro
 *
 * Acessado via sidebar → "Registrar Membros" (apenas gerente).
 */
export class GerentePage {
  readonly page: Page;

  // ─── Formulário ───────────────────────────────────────────────────────────
  readonly registroTitle:  Locator;
  readonly instLabelInput: Locator;
  readonly userLabelInput: Locator;
  readonly userAddressInput: Locator;
  readonly resolverInput:    Locator;
  readonly btnRegistrar:     Locator;

  // ─── Preview ENS ──────────────────────────────────────────────────────────
  readonly ensPreview:       Locator;
  readonly parentNodePreview: Locator;
  readonly userNodePreview:   Locator;

  // ─── Log de progresso ─────────────────────────────────────────────────────
  readonly logEntries: Locator;

  constructor(page: Page) {
    this.page = page;

    this.registroTitle = page.locator('.registro-title');

    // Campos do formulário (identifica por placeholder ou label próxima)
    this.instLabelInput   = page.locator('input[placeholder="Ex: labtest"]');
    this.userLabelInput   = page.locator('input[placeholder="Ex: joao, ana"]');
    this.userAddressInput = page.locator('input[placeholder="0x..."]');
    this.resolverInput    = page.locator('.mono-input');

    this.btnRegistrar = page.getByRole('button', { name: /Registrar Membro/ });

    // Previews
    this.ensPreview        = page.locator('.preview-value.highlight');
    this.parentNodePreview = page.locator('.preview-row').filter({ hasText: 'parentNode' }).locator('.preview-value');
    this.userNodePreview   = page.locator('.preview-row').filter({ hasText: 'userNode' }).locator('.preview-value');

    // Logs
    this.logEntries = page.locator('.log-entry');
  }

  /** Preenche o formulário de registro de membro */
  async preencherMembro(dados: {
    instLabel: string;
    userLabel: string;
    userAddress: string;
    resolverAddress: string;
  }) {
    await this.instLabelInput.fill(dados.instLabel);
    await this.userLabelInput.fill(dados.userLabel);
    await this.userAddressInput.fill(dados.userAddress);
    await this.resolverInput.fill(dados.resolverAddress);
  }

  /** Clica em "Registrar Membro" */
  async submeterRegistro() {
    await this.btnRegistrar.click();
  }

  /** Retorna o texto do preview ENS */
  async getEnsPreviewText(): Promise<string> {
    return (await this.ensPreview.textContent())?.trim() ?? '';
  }

  /** Verifica se o título da seção está visível */
  async isRegistroVisible(): Promise<boolean> {
    return this.registroTitle.isVisible();
  }
}
