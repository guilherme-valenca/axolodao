/**
 * helpers.ts
 *
 * Helpers compartilhados entre todos os specs:
 * - mockRelayer(): intercepta /health e /relay via page.route()
 * - loginAs(): faz login completo como qualquer role
 * - mockIndexerOffline(): desabilita o indexador para evitar chamadas HTTP reais
 */

import { Page } from '@playwright/test';
import { ethereumInitScript, InitConfig } from './mock-ethereum';

// ─── Relayer Mock ─────────────────────────────────────────────────────────────

/**
 * Intercepta as chamadas HTTP ao relayer (/health e /relay).
 * Deve ser chamado ANTES de page.goto().
 */
export async function mockRelayer(page: Page): Promise<void> {
  const healthBody = JSON.stringify({
    status: 'ok',
    relayer: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    wallet: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
    balance: '1.5',
    network: 'sepolia',
  });

  const relayBody = JSON.stringify({
    txHash: '0x' + 'ab'.repeat(32),
    blockNumber: 12345,
    gasUsed: 150000,
  });

  // Use regex to match any URL ending in /health or /relay (catches cross-origin localhost:3000)
  await page.route(/\/health$/, (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: healthBody }),
  );

  await page.route(/\/relay$/, (route) =>
    route.fulfill({ status: 200, contentType: 'application/json', body: relayBody }),
  );
}

// ─── Indexer Mock ─────────────────────────────────────────────────────────────

/**
 * Intercepta chamadas ao indexador (API Supabase/Vercel) para evitar
 * timeouts em chamadas HTTP reais durante testes.
 * Retorna 503 para forçar fallback para blockchain.
 */
export async function mockIndexerOffline(page: Page): Promise<void> {
  await page.route('**/api/caretaker/**', (route) =>
    route.fulfill({ status: 503, body: 'Service Unavailable' }),
  );
  await page.route('**/api/auditor/**', (route) =>
    route.fulfill({ status: 503, body: 'Service Unavailable' }),
  );
  await page.route('**/api/cron/**', (route) =>
    route.fulfill({ status: 503, body: 'Service Unavailable' }),
  );
}

// ─── Login Helper ─────────────────────────────────────────────────────────────

/** Mapa de role → texto do card na tela de login */
const ROLE_CARD_TEXT: Record<string, RegExp> = {
  admin:     /Administrador/,
  gerente:   /Gerente/,
  caretaker: /Cuidador/,
  auditor:   /Auditor/,
};

/**
 * Faz login completo:
 * 1. Injeta mock ethereum + mock relayer + mock indexer offline
 * 2. Navega para /login
 * 3. Conecta carteira
 * 4. Se tem role → clica no card correspondente → aguarda redirect
 * 5. Se não tem role → preenche form de registro → submete → aguarda redirect
 *
 * @param config - InitConfig retornado por buildInitConfig()
 * @param options.skipRedirectWait - Se true, não aguarda redirect para /tela-inicial
 */
export async function loginAs(
  page: Page,
  config: InitConfig,
  options?: { skipRedirectWait?: boolean },
): Promise<void> {
  // Injeta mocks antes de navegar
  await page.addInitScript(ethereumInitScript, config);
  await mockRelayer(page);
  await mockIndexerOffline(page);

  // Navega para login
  await page.goto('/login');
  await page.waitForSelector('.login-card', { state: 'visible' });

  // Conecta carteira
  await page.getByRole('button', { name: 'Conectar Carteira' }).click();

  const role = config.role;

  if (role !== 'none' && ROLE_CARD_TEXT[role]) {
    // Tem role → espera cards de seleção → clica no card
    await page.waitForSelector('.role-cards', { state: 'visible', timeout: 10_000 });

    // For gerente: the gerente card appears asynchronously (after _detectarGerente completes).
    // The caretaker card shows first. We need to wait specifically for the gerente card.
    if (role === 'gerente') {
      // Wait up to 10s for the gerente card to appear (async detection)
      await page.locator('.role-card').filter({ hasText: ROLE_CARD_TEXT[role] }).waitFor({ state: 'visible', timeout: 10_000 });
    }

    await page.locator('.role-card').filter({ hasText: ROLE_CARD_TEXT[role] }).click();
  } else {
    // Sem role → espera form de registro → preenche e submete
    await page.waitForSelector('.wallet-inputs', { state: 'visible', timeout: 10_000 });
    await page.locator('#ensLabel').fill('testuser');
    await page.locator('#ensInst').fill('testinst');
    await page.getByRole('button', { name: 'Registrar Acesso' }).click();
  }

  if (!options?.skipRedirectWait) {
    await page.waitForURL('**/tela-inicial', { timeout: 15_000 });
  }
}
