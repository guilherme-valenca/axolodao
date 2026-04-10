import { test, expect } from '@playwright/test';
import { TelaInicialPage } from '../pages/tela-inicial.page';
import { MonitoramentoPage } from '../pages/monitoramento.page';
import { loginAs } from '../fixtures/helpers';
import { operatorConfig, auditorConfig, MEDICAO_FORM } from '../fixtures/test-data';

// ─── Helper: login + navegar para Monitoramento ──────────────────────────────

async function irParaMonitoramento(page: any) {
  await loginAs(page, operatorConfig);
  const home = new TelaInicialPage(page);
  await home.navegarPara('monitoramento');
  await page.waitForSelector('#mTankId', { state: 'visible', timeout: 8_000 });
}

// ─── Caminho 2: Registro de Medição (Cuidador) ──────────────────────────────

test.describe('Registro de Medição Ambiental', () => {

  test('interface do operador é exibida com select de tanques', async ({ page }) => {
    await irParaMonitoramento(page);
    const mon = new MonitoramentoPage(page);

    await expect(mon.selectTanque).toBeVisible();
    await expect(mon.selectTanque.locator('option', { hasText: 'Tanque Berçário' })).toBeAttached();
    await expect(mon.selectTanque.locator('option', { hasText: 'Tanque Principal' })).toBeAttached();
  });

  test('botão "Registrar" desabilitado com formulário vazio', async ({ page }) => {
    await irParaMonitoramento(page);
    const mon = new MonitoramentoPage(page);

    await expect(mon.btnRegistrarMedicao).toBeDisabled();
  });

  test('"Preencher Teste" popula os campos automaticamente', async ({ page }) => {
    await irParaMonitoramento(page);
    const mon = new MonitoramentoPage(page);

    await mon.clicarPreencherTeste();

    await expect(mon.inputTemp).not.toHaveValue('');
    await expect(mon.inputPh).not.toHaveValue('');
    await expect(mon.inputNh3).not.toHaveValue('');
  });

  test('fluxo feliz: parâmetros normais → sem alerta → SweetAlert de sucesso', async ({ page }) => {
    await irParaMonitoramento(page);
    const mon = new MonitoramentoPage(page);

    await mon.preencherMedicao(MEDICAO_FORM.normal);
    await mon.clicarRegistrarMedicao();

    await mon.aguardarSwal();
    const titulo = await mon.getSwalTitulo();
    expect(titulo).toMatch(/Transação|Sucesso|sucesso/i);

    await mon.confirmarSwal();
  });

  test('temperatura crítica (> 20°C): alerta biológico → confirmar → transação enviada', async ({ page }) => {
    await irParaMonitoramento(page);
    const mon = new MonitoramentoPage(page);

    await mon.preencherMedicao(MEDICAO_FORM.tempCritica);
    await mon.clicarRegistrarMedicao();

    await mon.aguardarSwal();
    expect(await mon.getSwalTitulo()).toMatch(/Par[aâ]metros\s+Cr[ií]ticos/i);
    expect(await mon.getSwalConteudo()).toMatch(/22.*°C|Temperatura/i);

    await mon.swalConfirm.click();

    await expect(mon.swalTitle).toContainText(/Transação|Sucesso/i, { timeout: 8_000 });
    await mon.swalConfirm.click();
    await page.waitForTimeout(300);
  });

  test('temperatura crítica: cancelar alerta → formulário permanece preenchido', async ({ page }) => {
    await irParaMonitoramento(page);
    const mon = new MonitoramentoPage(page);

    await mon.preencherMedicao(MEDICAO_FORM.tempCritica);
    await mon.clicarRegistrarMedicao();

    await mon.aguardarSwal();
    expect(await mon.getSwalTitulo()).toMatch(/Par[aâ]metros\s+Cr[ií]ticos/i);

    await mon.cancelarSwal();
    await expect(mon.inputTemp).toHaveValue('22.0');
  });

  test('pH crítico (< 6.5): alerta biológico aparece', async ({ page }) => {
    await irParaMonitoramento(page);
    const mon = new MonitoramentoPage(page);

    await mon.preencherMedicao(MEDICAO_FORM.phCritico);
    await mon.clicarRegistrarMedicao();

    await mon.aguardarSwal();
    const conteudo = await mon.getSwalConteudo();
    expect(conteudo).toMatch(/pH|5\.5/i);
    await mon.cancelarSwal();
  });

  test('amônia acima de zero: alerta biológico aparece', async ({ page }) => {
    await irParaMonitoramento(page);
    const mon = new MonitoramentoPage(page);

    await mon.preencherMedicao(MEDICAO_FORM.amoniaCritica);
    await mon.clicarRegistrarMedicao();

    await mon.aguardarSwal();
    const conteudo = await mon.getSwalConteudo();
    expect(conteudo).toMatch(/Amônia|amônia|0\.1/i);
    await mon.cancelarSwal();
  });

});

// ─── Auditor: Sidebar ────────────────────────────────────────────────────────

test.describe('Auditor — Visibilidade', () => {

  test('auditor vê "Fila de Validação" na sidebar', async ({ page }) => {
    await loginAs(page, auditorConfig);
    const home = new TelaInicialPage(page);

    await expect(home.navValidacao).toBeVisible();
  });

});
