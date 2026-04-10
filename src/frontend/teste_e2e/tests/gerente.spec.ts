import { test, expect } from '@playwright/test';
import { TelaInicialPage } from '../pages/tela-inicial.page';
import { GerentePage } from '../pages/gerente.page';
import { loginAs } from '../fixtures/helpers';
import { gerenteConfig, REGISTRO_MEMBRO_FORM } from '../fixtures/test-data';

// ─── Gerente: Sidebar e Registro de Membro ───────────────────────────────────

test.describe('Gerente — Sidebar e Registro de Membro', () => {

  test('sidebar mostra "Registrar Membros" para gerente', async ({ page }) => {
    await loginAs(page, gerenteConfig);
    const home = new TelaInicialPage(page);

    await expect(home.navRegistroMembro).toBeVisible();
    // Gerente vê Tanques, Axolotes, Medições (readonly)
    await expect(home.navTanques).toBeVisible();
    await expect(home.navAxolotes).toBeVisible();
  });

  test('navegar para Registrar Membros → formulário visível', async ({ page }) => {
    await loginAs(page, gerenteConfig);
    const home = new TelaInicialPage(page);
    const gerente = new GerentePage(page);

    await home.navegarPara('registro-membro');

    // Título e formulário devem estar visíveis
    await expect(gerente.registroTitle).toContainText('Registrar Membro ENS');
    await expect(gerente.instLabelInput).toBeVisible();
    await expect(gerente.userLabelInput).toBeVisible();
    await expect(gerente.userAddressInput).toBeVisible();
    await expect(gerente.btnRegistrar).toBeVisible();
  });

  test('ENS preview atualiza ao digitar label da instituição e do membro', async ({ page }) => {
    await loginAs(page, gerenteConfig);
    const home = new TelaInicialPage(page);
    const gerente = new GerentePage(page);

    await home.navegarPara('registro-membro');

    // Preenche os campos
    await gerente.instLabelInput.fill(REGISTRO_MEMBRO_FORM.valid.instLabel);
    await gerente.userLabelInput.fill(REGISTRO_MEMBRO_FORM.valid.userLabel);

    // Preview ENS deve mostrar "novomembro.biomuseu.axolodao2.eth"
    await expect(gerente.ensPreview).toContainText(
      `${REGISTRO_MEMBRO_FORM.valid.userLabel}.${REGISTRO_MEMBRO_FORM.valid.instLabel}.axolodao2.eth`
    );
  });

});
