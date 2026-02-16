import { test } from '@playwright/test'
import { captureScreenshot } from './helpers'

/**
 * CMS screenshots for documentation.
 *
 * Prerequisites:
 * 1. Ycode app running on localhost:3002
 * 2. At least one collection with fields and items exists
 */

test.describe('CMS Screenshots', () => {
  test('collections list', async ({ page }) => {
    await page.goto('/ycode/collections')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    await captureScreenshot(page, 'cms-collections-list')
  })

  test('collection fields', async ({ page }) => {
    // Navigate to a collection (adjust ID)
    await page.goto('/ycode/collections/1')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    await captureScreenshot(page, 'cms-collection-fields')
  })

  test('collection items', async ({ page }) => {
    await page.goto('/ycode/collections/1')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    await captureScreenshot(page, 'cms-collection-items')
  })
})
