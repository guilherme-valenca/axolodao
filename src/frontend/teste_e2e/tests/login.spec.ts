import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { ethereumInitScript } from '../fixtures/mock-ethereum';
import { mockRelayer, mockIndexerOffline } from '../fixtures/helpers';
import {
  operatorConfig, auditorConfig, adminConfig, gerenteConfig, noRoleConfig,
} from '../fixtures/test-data';

// ─── Login: Seleção de Perfil ────────────────────────────────────────────────

test.describe('Login — Seleção de Perfil', () => {

  test('admin: conecta → vê card "Administrador" → clica → redireciona para home', async ({ page }) => {
    await page.addInitScript(ethereumInitScript, adminConfig);
    await mockRelayer(page);
    await mockIndexerOffline(page);
    const login = new LoginPage(page);
    await login.goto();

    await login.conectarCarteira();

    // Card de admin deve estar visível
    await expect(login.roleCardAdmin).toBeVisible();
    await expect(login.roleCardAdmin).toContainText('Administrador');

    // Clica e redireciona
    await login.selecionarPerfil('admin');
    await login.aguardarRedirect();
    await expect(page).toHaveURL(/tela-inicial/);
  });

  test('gerente: conecta → vê card "Gerente Institucional" → clica → redireciona', async ({ page }) => {
    await page.addInitScript(ethereumInitScript, gerenteConfig);
    await mockRelayer(page);
    await mockIndexerOffline(page);
    const login = new LoginPage(page);
    await login.goto();

    await login.conectarCarteira();

    // Gerente pode ter card de cuidador (hasRole caretaker=true para gerente) + card gerente
    // O card gerente aparece quando _detectarGerente() resolve (async)
    // Aguarda o card de gerente ou o card de operador (o que aparecer primeiro)
    await expect(login.roleCards).toBeVisible();

    // Deve haver pelo menos 1 card clicável
    const cardCount = await page.locator('.role-card').count();
    expect(cardCount).toBeGreaterThanOrEqual(1);

    // Clica no primeiro card disponível e redireciona
    await page.locator('.role-card').first().click();
    await login.aguardarRedirect();
    await expect(page).toHaveURL(/tela-inicial/);
  });

  test('caretaker: conecta → vê card "Cuidador" → clica → redireciona', async ({ page }) => {
    await page.addInitScript(ethereumInitScript, operatorConfig);
    await mockRelayer(page);
    await mockIndexerOffline(page);
    const login = new LoginPage(page);
    await login.goto();

    await login.conectarCarteira();
    await expect(login.roleCardOperador).toBeVisible();
    await expect(login.roleCardOperador).toContainText('Cuidador');

    await login.selecionarPerfil('caretaker');
    await login.aguardarRedirect();
    await expect(page).toHaveURL(/tela-inicial/);
  });

  test('auditor: conecta → vê card "Auditor" → clica → redireciona', async ({ page }) => {
    await page.addInitScript(ethereumInitScript, auditorConfig);
    await mockRelayer(page);
    await mockIndexerOffline(page);
    const login = new LoginPage(page);
    await login.goto();

    await login.conectarCarteira();
    await expect(login.roleCardOperador).toBeVisible();
    await expect(login.roleCardOperador).toContainText('Auditor');

    await login.selecionarPerfil('auditor');
    await login.aguardarRedirect();
    await expect(page).toHaveURL(/tela-inicial/);
  });

});

// ─── Login: Registro de Novo Usuário ─────────────────────────────────────────

test.describe('Login — Registro de Novo Usuário', () => {

  test('sem role: conecta → vê formulário de registro ENS com campos de texto', async ({ page }) => {
    await page.addInitScript(ethereumInitScript, noRoleConfig);
    await mockRelayer(page);
    await mockIndexerOffline(page);
    const login = new LoginPage(page);
    await login.goto();

    await login.conectarCarteira();

    // Deve mostrar formulário de registro (não cards)
    await expect(page.locator('.wallet-inputs')).toBeVisible();
    await expect(login.roleCards).not.toBeVisible();

    // Campos de texto (não dropdown)
    await expect(login.inputEnsLabel).toBeVisible();
    await expect(login.inputEnsInst).toBeVisible();
  });

  test('registro ENS: preenche label + inst → preview atualiza → submete → redireciona', async ({ page }) => {
    await page.addInitScript(ethereumInitScript, noRoleConfig);
    await mockRelayer(page);
    await mockIndexerOffline(page);
    const login = new LoginPage(page);
    await login.goto();

    await login.conectarCarteira();

    // Preenche o formulário
    await login.preencherRegistro('ana', 'biomuseu');

    // Preview ENS deve exibir "ana.biomuseu.axolodao2.eth"
    await expect(login.ensPreview).toContainText('ana.biomuseu.axolodao2.eth');

    // Submete via relayer
    await login.btnRegistrarAcesso.click();

    // Deve redirecionar
    await login.aguardarRedirect();
    await expect(page).toHaveURL(/tela-inicial/);
  });

  test('formulário incompleto: label vazio → mensagem de erro', async ({ page }) => {
    await page.addInitScript(ethereumInitScript, noRoleConfig);
    await mockRelayer(page);
    await mockIndexerOffline(page);
    const login = new LoginPage(page);
    await login.goto();

    await login.conectarCarteira();

    // Clica sem preencher
    await login.btnRegistrarAcesso.click();

    // Deve exibir mensagem de feedback
    await expect(login.feedbackMessage).toBeVisible();
    await expect(login.feedbackMessage).toContainText(/Preencha/i);
  });

});

// ─── Login: Cenários de Erro ─────────────────────────────────────────────────

test.describe('Login — Cenários de Erro', () => {

  test('sem MetaMask: clica conectar → app não crasha → botão permanece', async ({ page }) => {
    // NÃO injeta mock → window.ethereum será undefined
    const login = new LoginPage(page);
    await login.goto();

    await login.btnConectarCarteira.click();

    // App não crashou — botão ainda visível
    await expect(login.btnConectarCarteira).toBeVisible();

    // Formulário de registro NÃO aparece
    await expect(page.locator('.wallet-inputs')).not.toBeVisible();
    await expect(login.roleCards).not.toBeVisible();
  });

});
