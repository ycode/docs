import { test } from '@playwright/test'
import { captureScreenshot } from './helpers'

/**
 * General screenshots for documentation.
 *
 * Prerequisites:
 * 1. Ycode app running on localhost:3002
 */

test.describe('General Screenshots', () => {
  test('dashboard', async ({ page }) => {
    await page.goto('/ycode')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    await captureScreenshot(page, 'dashboard-overview')
  })

  test('assets manager', async ({ page }) => {
    await page.goto('/ycode/assets')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    await captureScreenshot(page, 'assets-manager')
  })

  test('project settings', async ({ page }) => {
    await page.goto('/ycode/settings')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    await captureScreenshot(page, 'project-settings')
  })

  test('seo settings', async ({ page }) => {
    await page.goto('/ycode/settings/seo')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    await captureScreenshot(page, 'seo-settings')
  })
})
