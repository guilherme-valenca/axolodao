import { Page, Locator } from '@playwright/test';

/**
 * MonitoramentoPage — Page Object para a aba de Monitoramento
 *
 * O componente <app-monitoramento> fica dentro da tela-inicial.
 * Para acessá-lo, navegar via sidebar antes de usar esta classe.
 */
export class MonitoramentoPage {
  readonly page: Page;

  // ─── Formulário de medição de água ──────────────────────────────────────────
  readonly selectTanque:    Locator;
  readonly inputTemp:       Locator;
  readonly inputPh:         Locator;
  readonly inputO2:         Locator;
  readonly inputCond:       Locator;
  readonly inputTurb:       Locator;
  readonly inputPhos:       Locator;
  readonly inputNo2:        Locator;
  readonly inputNo3:        Locator;
  readonly inputNh3:        Locator;
  readonly inputGh:         Locator;

  readonly btnPreencherTeste:    Locator;
  readonly btnRegistrarMedicao:  Locator;

  // ─── SweetAlert2 ────────────────────────────────────────────────────────────
  readonly swalConfirm:  Locator;
  readonly swalCancel:   Locator;
  readonly swalTitle:    Locator;
  readonly swalContent:  Locator;

  constructor(page: Page) {
    this.page = page;

    // Formulário de água (formControlName mapeado para id no HTML)
    this.selectTanque   = page.locator('#mTankId');
    this.inputTemp      = page.locator('[formcontrolname="mTemp"]');
    this.inputPh        = page.locator('[formcontrolname="mPh"]');
    this.inputO2        = page.locator('[formcontrolname="mO2"]');
    this.inputCond      = page.locator('[formcontrolname="mCond"]');
    this.inputTurb      = page.locator('[formcontrolname="mTurb"]');
    this.inputPhos      = page.locator('[formcontrolname="mPhos"]');
    this.inputNo2       = page.locator('[formcontrolname="mNo2"]');
    this.inputNo3       = page.locator('[formcontrolname="mNo3"]');
    this.inputNh3       = page.locator('[formcontrolname="mNh3"]');
    this.inputGh        = page.locator('[formcontrolname="mGh"]');

    this.btnPreencherTeste   = page.getByRole('button', { name: 'Preencher Teste' });
    this.btnRegistrarMedicao = page.getByRole('button', { name: /Registrar Medição da Água/ });

    // SweetAlert2
    this.swalConfirm = page.locator('.swal2-confirm');
    this.swalCancel  = page.locator('.swal2-cancel');
    this.swalTitle   = page.locator('.swal2-title');
    this.swalContent = page.locator('.swal2-html-container');
  }

  /**
   * Preenche todos os campos do formulário de água.
   * tankId é o valor do option no select (número como string).
   */
  async preencherMedicao(dados: {
    tankId: string;
    temp: string;
    ph: string;
    o2: string;
    cond: string;
    turb: string;
    phos: string;
    no2: string;
    no3: string;
    nh3: string;
    gh: string;
  }) {
    await this.selectTanque.selectOption(dados.tankId);
    await this.inputTemp.fill(dados.temp);
    await this.inputPh.fill(dados.ph);
    await this.inputO2.fill(dados.o2);
    await this.inputCond.fill(dados.cond);
    await this.inputTurb.fill(dados.turb);
    await this.inputPhos.fill(dados.phos);
    await this.inputNo2.fill(dados.no2);
    await this.inputNo3.fill(dados.no3);
    await this.inputNh3.fill(dados.nh3);
    await this.inputGh.fill(dados.gh);
  }

  async clicarRegistrarMedicao() {
    await this.btnRegistrarMedicao.click();
  }

  async clicarPreencherTeste() {
    await this.btnPreencherTeste.click();
  }

  // ─── SweetAlert helpers ─────────────────────────────────────────────────────

  async aguardarSwal(timeout = 8_000) {
    await this.page.waitForSelector('.swal2-container', { state: 'visible', timeout });
  }

  async confirmarSwal() {
    await this.swalConfirm.click();
    await this.page.waitForSelector('.swal2-container', { state: 'hidden', timeout: 5_000 });
  }

  async cancelarSwal() {
    await this.swalCancel.click();
    await this.page.waitForSelector('.swal2-container', { state: 'hidden', timeout: 5_000 });
  }

  async getSwalTitulo(): Promise<string> {
    return (await this.swalTitle.textContent())?.trim() ?? '';
  }

  async getSwalConteudo(): Promise<string> {
    return (await this.swalContent.textContent())?.trim() ?? '';
  }

  /** Verifica se o botão de registrar está habilitado */
  async isBtnRegistrarEnabled(): Promise<boolean> {
    return !(await this.btnRegistrarMedicao.isDisabled());
  }
}
