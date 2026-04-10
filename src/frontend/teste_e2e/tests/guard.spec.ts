import { test, expect } from '@playwright/test';
import { loginAs } from '../fixtures/helpers';
import { operatorConfig } from '../fixtures/test-data';

// ─── Auth Guard ──────────────────────────────────────────────────────────────

test.describe('Auth Guard — Proteção de Rotas', () => {

  test('acesso direto a /tela-inicial sem wallet → redireciona para /login', async ({ page }) => {
    // Não injeta mock ethereum — wallet não conectada
    await page.goto('/tela-inicial');
    await page.waitForURL('**/login', { timeout: 10_000 });
    await expect(page).toHaveURL(/login/);
  });

  test('acesso direto a /monitoramento sem wallet → redireciona para /login', async ({ page }) => {
    await page.goto('/monitoramento');
    await page.waitForURL('**/login', { timeout: 10_000 });
    await expect(page).toHaveURL(/login/);
  });

  test('com wallet conectada → acessa /tela-inicial normalmente', async ({ page }) => {
    await loginAs(page, operatorConfig);
    await expect(page).toHaveURL(/tela-inicial/);

    // Sidebar deve estar visível (confirmação de que entrou)
    await expect(page.locator('.sidebar')).toBeVisible();
  });

});
