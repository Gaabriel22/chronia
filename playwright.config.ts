import { defineConfig, devices } from '@playwright/test'

const isContinuousIntegration = Boolean(process.env.CI)
const hasExternalWebServer = process.env.CHRONIA_EXTERNAL_WEB_SERVER === '1'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: isContinuousIntegration,
  retries: isContinuousIntegration ? 2 : 0,
  reporter: isContinuousIntegration ? [['html', { open: 'never' }], ['github']] : 'list',
  use: {
    baseURL: 'http://127.0.0.1:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'desktop-chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
  ],
  webServer: hasExternalWebServer
    ? undefined
    : {
        command: isContinuousIntegration
          ? 'pnpm --filter @chronia/web build && pnpm --filter @chronia/web start'
          : 'node apps/web/test-server.mjs',
        url: 'http://127.0.0.1:3000',
        reuseExistingServer: !isContinuousIntegration,
        timeout: 180_000,
      },
})
