import { Page, Locator } from '@playwright/test';

/**
 * CadastroPage — Page Object para Cadastro de Tanque e Cadastro de Axolote
 *
 * Ambos os formulários são renderizados dentro de <app-tela-inicial>,
 * controlados pelo menu lateral. Esta classe os cobre.
 */
export class CadastroPage {
  readonly page: Page;

  // ─── Formulário: Cadastro Tanque ────────────────────────────────────────────
  readonly inputNomeTanque:   Locator;
  readonly inputLocalizacao:  Locator;
  readonly btnAdicionarTanque: Locator;

  // ─── Formulário: Cadastro Axolote ───────────────────────────────────────────
  readonly inputNomeAxolote:      Locator;
  readonly inputEspecie:          Locator;
  readonly inputDataNascimento:   Locator;
  readonly inputTanqueId:         Locator;
  readonly inputMorfologia:       Locator;
  readonly btnAdicionarAxolote:   Locator;

  // ─── SweetAlert2 ────────────────────────────────────────────────────────────
  readonly swalConfirm:  Locator;
  readonly swalCancel:   Locator;
  readonly swalTitle:    Locator;
  readonly swalContent:  Locator;

  constructor(page: Page) {
    this.page = page;

    // Tanque — usa ngModel, logo identifica pelo placeholder ou label próxima
    this.inputNomeTanque  = page.locator('input[placeholder="Ex: Tanque Berçário"]');
    this.inputLocalizacao = page.locator('input[placeholder="Ex: Laboratório Norte"]');
    this.btnAdicionarTanque = page.getByRole('button', { name: 'Adicionar Tanque' });

    // Axolote — uses input for name/date/photo, select for species/tank/morphology
    this.inputNomeAxolote    = page.locator('input[placeholder="Ex: Totli"]');
    this.inputEspecie        = page.locator('select').filter({ has: page.locator('option', { hasText: 'A. mexicanum' }) });
    this.inputDataNascimento = page.locator('input[type="date"]');
    this.inputTanqueId       = page.locator('select').filter({ has: page.locator('option', { hasText: 'Selecione o tanque' }) });
    this.inputMorfologia     = page.locator('select').filter({ has: page.locator('option', { hasText: 'Selecione a morfologia' }) });
    this.btnAdicionarAxolote = page.getByRole('button', { name: 'Adicionar Axolote' });

    // SweetAlert2 (globais, aparecem em qualquer página)
    this.swalConfirm = page.locator('.swal2-confirm');
    this.swalCancel  = page.locator('.swal2-cancel');
    this.swalTitle   = page.locator('.swal2-title');
    this.swalContent = page.locator('.swal2-html-container');
  }

  // ─── Ações: Tanque ──────────────────────────────────────────────────────────

  async preencherTanque(nome: string, localizacao: string) {
    await this.inputNomeTanque.fill(nome);
    await this.inputLocalizacao.fill(localizacao);
  }

  async submeterTanque() {
    await this.btnAdicionarTanque.click();
  }

  /** Preenche e submete o formulário de tanque, aguarda SweetAlert de sucesso */
  async cadastrarTanque(nome: string, localizacao: string) {
    await this.preencherTanque(nome, localizacao);
    await this.submeterTanque();
    await this.aguardarSwal();
  }

  // ─── Ações: Axolote ─────────────────────────────────────────────────────────

  async preencherAxolote(dados: {
    nome:           string;
    especie:        string;
    dataNascimento: string;
    tanqueId:       string;
    morfologia:     string;
  }) {
    await this.inputNomeAxolote.fill(dados.nome);
    await this.inputEspecie.selectOption({ label: dados.especie });
    await this.inputDataNascimento.fill(dados.dataNascimento);
    // Tanque uses [ngValue] — select by visible label text (e.g. "#1 — Tanque Berçário")
    await this.inputTanqueId.selectOption({ index: Number(dados.tanqueId) });
    await this.inputMorfologia.selectOption({ label: dados.morfologia });
  }

  async submeterAxolote() {
    await this.btnAdicionarAxolote.click();
  }

  async cadastrarAxolote(dados: Parameters<CadastroPage['preencherAxolote']>[0]) {
    await this.preencherAxolote(dados);
    await this.submeterAxolote();
    await this.aguardarSwal();
  }

  // ─── SweetAlert helpers ─────────────────────────────────────────────────────

  /** Aguarda qualquer SweetAlert aparecer */
  async aguardarSwal(timeout = 8_000) {
    await this.page.waitForSelector('.swal2-container', { state: 'visible', timeout });
  }

  /** Clica no botão de confirmação do SweetAlert e aguarda fechar */
  async confirmarSwal() {
    await this.swalConfirm.click();
    await this.page.waitForSelector('.swal2-container', { state: 'hidden', timeout: 5_000 });
  }

  /** Retorna o título do SweetAlert atual */
  async getSwalTitulo(): Promise<string> {
    return (await this.swalTitle.textContent())?.trim() ?? '';
  }
}
