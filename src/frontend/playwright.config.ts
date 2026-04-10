import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './teste_e2e/tests',
  fullyParallel: false, // Manter sequencial: cada teste inicia o app do zero via webServer
  forbidOnly: !!process.env['CI'],
  retries: process.env['CI'] ? 1 : 0,
  workers: 1,
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['list'],
  ],

  use: {
    baseURL: 'http://localhost:4200',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
    // Timeout generoso para esperar transações mockadas + Angular render
    actionTimeout: 10_000,
    navigationTimeout: 15_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  // Inicia o Angular automaticamente antes dos testes.
  // reuseExistingServer: true evita reinício quando rodando localmente.
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:4200',
    reuseExistingServer: !process.env['CI'],
    timeout: 60_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },

  outputDir: 'test-results',
});
