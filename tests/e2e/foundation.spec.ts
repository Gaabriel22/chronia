import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

function collectBrowserErrors(page: Page) {
  const browserErrors: string[] = []

  page.on('console', (message) => {
    if (message.type() === 'error') browserErrors.push(message.text())
  })
  page.on('pageerror', (error) => browserErrors.push(error.message))

  return browserErrors
}

test('renders the semantic shell without browser or accessibility errors', async ({ page }) => {
  const browserErrors = collectBrowserErrors(page)

  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1, name: 'Chronia' })).toBeVisible()
  await expect(page.getByRole('navigation', { name: 'Capítulos da origem' })).toBeVisible()

  const accessibilityScan = await new AxeBuilder({ page }).analyze()

  expect(accessibilityScan.violations).toEqual([])
  expect(browserErrors).toEqual([])
})

test('supports keyboard skip navigation to the narrative', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Tab')

  const skipLink = page.getByRole('link', { name: 'Pular para a história' })
  await expect(skipLink).toBeFocused()
  await expect(skipLink).toBeVisible()
  await page.keyboard.press('Enter')

  await expect(page).toHaveURL(/#historia$/)
  await expect(page.locator('#historia')).toBeInViewport()
})

test('renders canonical metadata and crawlable SEO resources', async ({ page, request }) => {
  await page.goto('/')

  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    'href',
    'http://localhost:3000',
  )
  await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute('content', 'pt_BR')

  const structuredData = await page.locator('script[type="application/ld+json"]').textContent()
  expect(JSON.parse(structuredData ?? '{}')).toMatchObject({
    '@type': 'WebSite',
    name: 'Chronia',
    inLanguage: 'pt-BR',
  })

  const robotsResponse = await request.get('/robots.txt')
  const sitemapResponse = await request.get('/sitemap.xml')

  expect(robotsResponse.ok()).toBe(true)
  expect(await robotsResponse.text()).toContain('Sitemap: http://localhost:3000/sitemap.xml')
  expect(sitemapResponse.ok()).toBe(true)
  expect(await sitemapResponse.text()).toContain('<loc>http://localhost:3000/</loc>')
})
