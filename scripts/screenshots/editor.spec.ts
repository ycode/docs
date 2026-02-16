import { test } from '@playwright/test'
import { captureScreenshot, captureElement } from './helpers'

/**
 * Editor screenshots for documentation.
 *
 * Prerequisites:
 * 1. Ycode app running on localhost:3002
 * 2. A project with at least one page exists
 *
 * Usage:
 *   npm run screenshots
 *
 * Adjust the URLs and selectors below to match your Ycode instance.
 */

test.describe('Editor Screenshots', () => {
  test('editor overview', async ({ page }) => {
    // Navigate to the editor (adjust URL to match your project/page)
    await page.goto('/ycode/pages/1')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    await captureScreenshot(page, 'editor-overview', { fullPage: false })
  })

  test('layers panel', async ({ page }) => {
    await page.goto('/ycode/pages/1')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    // Capture the layers/left panel area
    await captureElement(page, '[data-testid="layers-panel"], .layers-panel, aside:first-of-type', 'editor-layers-panel')
  })

  test('design controls', async ({ page }) => {
    await page.goto('/ycode/pages/1')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    // Click an element on the canvas to show design controls
    // Adjust selector to target an element on the canvas
    const canvas = page.locator('[data-testid="canvas"], .canvas, main')
    if (await canvas.isVisible()) {
      await canvas.click({ position: { x: 400, y: 300 } })
      await page.waitForTimeout(1000)
    }

    await captureScreenshot(page, 'editor-design-controls')
  })

  test('responsive breakpoints', async ({ page }) => {
    await page.goto('/ycode/pages/1')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)

    // Capture the breakpoint toolbar
    await captureElement(
      page,
      '[data-testid="breakpoint-toolbar"], .breakpoint-toolbar, .device-toolbar',
      'editor-responsive-toolbar'
    )
  })
})
