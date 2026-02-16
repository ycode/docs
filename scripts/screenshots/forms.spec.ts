import { test } from '@playwright/test'
import { captureScreenshot } from './helpers'

/**
 * Forms screenshots for documentation.
 *
 * Prerequisites:
 * 1. Ycode app running on localhost:3002
 * 2. At least one form exists
 */

test.describe('Forms Screenshots', () => {
  test('forms list', async ({ page }) => {
    await page.goto('/ycode/forms')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    await captureScreenshot(page, 'forms-list')
  })

  test('form builder', async ({ page }) => {
    // Navigate to a form (adjust ID)
    await page.goto('/ycode/forms/1')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    await captureScreenshot(page, 'forms-builder')
  })

  test('form submissions', async ({ page }) => {
    await page.goto('/ycode/forms/1/submissions')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    await captureScreenshot(page, 'forms-submissions')
  })
})
