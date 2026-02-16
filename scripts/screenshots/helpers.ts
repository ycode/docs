import { Page } from '@playwright/test'
import path from 'path'

const SCREENSHOTS_DIR = path.resolve(__dirname, '../../public/screenshots')
const VIDEOS_DIR = path.resolve(__dirname, '../../public/videos')

export { SCREENSHOTS_DIR, VIDEOS_DIR }

/**
 * Take a screenshot of the full page and save it to public/screenshots/
 */
export async function captureScreenshot(
  page: Page,
  name: string,
  options?: {
    fullPage?: boolean
    clip?: { x: number; y: number; width: number; height: number }
    delay?: number
  }
) {
  if (options?.delay) {
    await page.waitForTimeout(options.delay)
  }

  await page.waitForLoadState('networkidle')

  const filePath = path.join(SCREENSHOTS_DIR, `${name}.png`)

  await page.screenshot({
    path: filePath,
    fullPage: options?.fullPage ?? false,
    clip: options?.clip,
    animations: 'disabled'
  })

  console.log(`  Captured: ${name}.png`)
  return filePath
}

/**
 * Take a screenshot of a specific element
 */
export async function captureElement(
  page: Page,
  selector: string,
  name: string,
  options?: { padding?: number; delay?: number }
) {
  if (options?.delay) {
    await page.waitForTimeout(options.delay)
  }

  await page.waitForLoadState('networkidle')

  const element = page.locator(selector)
  await element.waitFor({ state: 'visible', timeout: 10_000 })

  const filePath = path.join(SCREENSHOTS_DIR, `${name}.png`)

  await element.screenshot({
    path: filePath,
    animations: 'disabled'
  })

  console.log(`  Captured element: ${name}.png`)
  return filePath
}

/**
 * Login to the Ycode app (adjust selectors based on actual auth flow)
 */
export async function login(page: Page, email: string, password: string) {
  await page.goto('/login')
  await page.fill('input[type="email"]', email)
  await page.fill('input[type="password"]', password)
  await page.click('button[type="submit"]')
  await page.waitForLoadState('networkidle')
}
