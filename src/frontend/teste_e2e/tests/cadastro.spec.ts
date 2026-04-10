import { test, expect } from '@playwright/test';
import { TelaInicialPage } from '../pages/tela-inicial.page';
import { CadastroPage } from '../pages/cadastro.page';
import { loginAs } from '../fixtures/helpers';
import { operatorConfig, TANK_FORM, AXOLOTE_FORM } from '../fixtures/test-data';

// ─── Caminho 3: Cadastro de Tanque ────────────────────────────────────────────

test.describe('Cadastro de Tanque', () => {

  test('fluxo feliz: cadastrar tanque com sucesso → SweetAlert de sucesso aparece', async ({ page }) => {
    await loginAs(page, operatorConfig);
    const home = new TelaInicialPage(page);
    const cadastro = new CadastroPage(page);

    await home.navegarPara('cadastro-tanque');
    await expect(cadastro.inputNomeTanque).toBeVisible();

    await cadastro.preencherTanque(TANK_FORM.valid.nome, TANK_FORM.valid.localizacao);
    await cadastro.submeterTanque();

    // SweetAlerts em sequência: "Transação Enviada" → "Sucesso!"
    await expect(cadastro.swalTitle).toContainText(/Sucesso/i, { timeout: 8_000 });
    await cadastro.swalConfirm.click();
  });

  test('campos obrigatórios vazios: alerta de atenção, sem enviar transação', async ({ page }) => {
    await loginAs(page, operatorConfig);
    const home = new TelaInicialPage(page);
    const cadastro = new CadastroPage(page);

    await home.navegarPara('cadastro-tanque');
    await expect(cadastro.inputNomeTanque).toBeVisible();

    await cadastro.submeterTanque();

    await cadastro.aguardarSwal();
    const titulo = await cadastro.getSwalTitulo();
    expect(titulo).toMatch(/Atenção|atenção|Aviso/i);

    await cadastro.confirmarSwal();
    await expect(cadastro.inputNomeTanque).toHaveValue('');
  });

  test('só nome preenchido: alerta de atenção (localização obrigatória)', async ({ page }) => {
    await loginAs(page, operatorConfig);
    const home = new TelaInicialPage(page);
    const cadastro = new CadastroPage(page);

    await home.navegarPara('cadastro-tanque');
    await cadastro.inputNomeTanque.fill('Tanque Só Nome');

    await cadastro.submeterTanque();
    await cadastro.aguardarSwal();
    expect(await cadastro.getSwalTitulo()).toMatch(/Atenção/i);
    await cadastro.confirmarSwal();
  });

  test('links do menu de cadastro visíveis para operador', async ({ page }) => {
    await loginAs(page, operatorConfig);
    const home = new TelaInicialPage(page);

    await expect(home.navCadastroTanque).toBeVisible();
    await expect(home.navCadastroAxolote).toBeVisible();
  });

});

// ─── Caminho 3: Cadastro de Axolote ──────────────────────────────────────────

test.describe('Cadastro de Axolote', () => {

  test('fluxo feliz: cadastrar axolote com sucesso → SweetAlert de sucesso aparece', async ({ page }) => {
    await loginAs(page, operatorConfig);
    const home = new TelaInicialPage(page);
    const cadastro = new CadastroPage(page);

    await home.navegarPara('cadastro-axolote');
    await expect(cadastro.inputNomeAxolote).toBeVisible();

    await cadastro.preencherAxolote(AXOLOTE_FORM.valid);
    await cadastro.submeterAxolote();

    await expect(cadastro.swalTitle).toContainText(/Sucesso/i, { timeout: 8_000 });
    await cadastro.swalConfirm.click();
  });

  test('campos obrigatórios vazios: alerta de atenção', async ({ page }) => {
    await loginAs(page, operatorConfig);
    const home = new TelaInicialPage(page);
    const cadastro = new CadastroPage(page);

    await home.navegarPara('cadastro-axolote');

    await cadastro.submeterAxolote();

    await cadastro.aguardarSwal();
    expect(await cadastro.getSwalTitulo()).toMatch(/Atenção/i);
    await cadastro.confirmarSwal();
  });

});
