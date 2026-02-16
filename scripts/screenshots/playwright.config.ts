import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: '.',
  testMatch: '**/*.spec.ts',
  timeout: 60_000,
  fullyParallel: false,
  retries: 0,
  use: {
    baseURL: 'http://localhost:3002',
    viewport: { width: 1280, height: 800 },
    screenshot: 'off',
    video: 'off',
    actionTimeout: 10_000,
    navigationTimeout: 30_000
  },
  outputDir: './test-results'
})
