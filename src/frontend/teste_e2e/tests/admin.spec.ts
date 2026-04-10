import { test, expect } from '@playwright/test';
import { TelaInicialPage } from '../pages/tela-inicial.page';
import { AdminPage } from '../pages/admin.page';
import { loginAs } from '../fixtures/helpers';
import { adminConfig } from '../fixtures/test-data';

// ─── Admin: Sidebar e Diagnóstico ───────────────────────────────────────────

test.describe('Admin — Sidebar e Diagnóstico', () => {

  test('sidebar mostra menus corretos para admin', async ({ page }) => {
    await loginAs(page, adminConfig);
    const home = new TelaInicialPage(page);

    // Aguarda o sidebar receber cargoUsuario='admin' e renderizar os menus corretos
    // O título do painel muda para "Painel Administrativo" quando cargoUsuario='admin'
    await expect(page.locator('.panel-context')).toContainText('Painel Administrativo', { timeout: 10_000 });

    // Admin vê: Home, Tanques, Axolotes, Medições, Cadastro tanque, Cadastro axolote, Diagnóstico
    await expect(home.navHome).toBeVisible();
    await expect(home.navTanques).toBeVisible();
    await expect(home.navAxolotes).toBeVisible();
    await expect(home.navDiagnostico).toBeVisible();
  });

  test('navegar para Diagnóstico → cards de constantes e contratos visíveis', async ({ page }) => {
    await loginAs(page, adminConfig);
    const home = new TelaInicialPage(page);
    const admin = new AdminPage(page);

    // Aguarda sidebar com menus de admin
    await expect(page.locator('.panel-context')).toContainText('Painel Administrativo', { timeout: 10_000 });

    await home.navegarPara('diagnostico');
    await admin.aguardarCarregamento();

    await expect(admin.diagTitle).toContainText('Diagnóstico do Sistema');
    await expect(admin.cardConstantes).toBeVisible();
    await expect(admin.cardContratos).toBeVisible();
    await expect(admin.cardEAS).toBeVisible();
  });

  test('admin vê wallet badge no footer da sidebar', async ({ page }) => {
    await loginAs(page, adminConfig);
    const home = new TelaInicialPage(page);

    await expect(home.walletBadge).toBeVisible();
    const badge = await home.walletBadge.textContent();
    expect(badge).toContain('0x90F7');
  });

  test('admin vê botão de logout na sidebar', async ({ page }) => {
    await loginAs(page, adminConfig);
    const home = new TelaInicialPage(page);

    await expect(home.btnDesconectar).toBeVisible();
  });

});
