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

test('updates the temporal lens across scale boundaries and viewport changes', async ({ page }) => {
  await page.goto('/#sistema-solar')

  const lens = page.getByTestId('temporal-lens-visual')
  await expect(page.locator('#sistema-solar')).toBeInViewport()
  await expect(lens).toHaveAttribute('data-active-scene', 'sistema-solar')
  await expect(lens).toContainText('Escala planetária')

  await page.setViewportSize({ width: 720, height: 860 })
  await page.locator('#big-bang').scrollIntoViewIfNeeded()
  await expect(lens).toHaveAttribute('data-active-scene', 'big-bang')
  await expect(lens).toContainText('Escala cósmica')
})

test('keeps the visual indicator silent for assistive technology', async ({ page }) => {
  await page.goto('/')

  const temporalLens = page.getByRole('complementary', { name: 'Lente temporal' })
  await expect(temporalLens).toBeAttached()
  await expect(temporalLens.locator('[aria-live]')).toHaveCount(0)
  await expect(page.getByTestId('temporal-lens-visual')).toHaveAttribute('aria-hidden', 'true')
})

test.describe('without JavaScript', () => {
  test.use({ javaScriptEnabled: false })

  test('keeps source and uncertainty records available', async ({ page }) => {
    await page.goto('/')

    const sourcePanel = page.getByRole('region', { name: 'Fontes e incerteza' })
    await expect(sourcePanel).toBeVisible()

    const earthSources = page.locator('#fontes-terra')
    await earthSources.locator('summary').click()
    await expect(
      earthSources.getByRole('link', { name: 'Geologic Time: Age of the Earth' }),
    ).toBeVisible()
  })

  test('keeps the complete chronology available as text', async ({ page }) => {
    await page.goto('/')

    const temporalLens = page.getByRole('complementary', { name: 'Lente temporal' })
    await temporalLens.getByText('Como esta escala funciona').click()

    const chronology = temporalLens.getByRole('list', { name: 'Cronologia completa' })
    await expect(chronology.getByRole('listitem')).toHaveCount(6)
    await expect(chronology.getByRole('link', { name: 'A Terra' })).toHaveAttribute(
      'href',
      '#terra',
    )
    await expect(chronology).toContainText('Escala: planetária')
  })
})
