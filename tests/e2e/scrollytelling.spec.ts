import { expect, test, type Page } from '@playwright/test'

async function expectTargetBelowStickyLens(page: Page, sceneId: string) {
  const lensBox = await page.getByRole('complementary', { name: 'Lente temporal' }).boundingBox()
  const headingBox = await page.locator(`#${sceneId}`).getByRole('heading').boundingBox()

  expect(lensBox).not.toBeNull()
  expect(headingBox).not.toBeNull()
  expect(headingBox!.y).toBeGreaterThanOrEqual(lensBox!.y + lensBox!.height)
}

test('chapter links and direct fragments keep the target unobscured', async ({ page }) => {
  await page.goto('/')
  await page
    .getByRole('navigation', { name: 'Capítulos da origem' })
    .getByRole('link', {
      name: 'O espaço se abre',
    })
    .click()

  await expect(page).toHaveURL(/#expansao$/)
  await expect(page.locator('#expansao')).toBeInViewport()
  await expectTargetBelowStickyLens(page, 'expansao')

  await page.goto('/#expansao')
  await expect(page.locator('html')).toHaveAttribute('data-scrollytelling-status', 'active')
  await expect(page.locator('#expansao')).toBeInViewport()
  await expectTargetBelowStickyLens(page, 'expansao')
})

test('native wheel, keyboard, and scrollbar-equivalent scrolling remain available', async ({
  page,
}, testInfo) => {
  await page.goto('/#big-bang')
  await expect(page.locator('html')).toHaveAttribute('data-scrollytelling-status', 'active')

  const initialScroll = await page.evaluate(() => window.scrollY)
  await page.mouse.wheel(0, 700)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(initialScroll)

  const forwardScroll = await page.evaluate(() => window.scrollY)
  await page.mouse.wheel(0, -700)
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(forwardScroll)

  await page.keyboard.press('End')
  await expect(page.getByRole('contentinfo')).toBeInViewport()
  if (testInfo.project.name === 'desktop-chromium') {
    const endScroll = await page.evaluate(() => window.scrollY)
    await page.keyboard.press('PageUp')
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(endScroll)
  }

  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight / 2))
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0)
})

test('touch-equivalent scrolling advances the native document', async ({
  page,
  context,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== 'mobile-chromium',
    'touch coverage runs in the mobile project',
  )
  await page.goto('/')

  const initialScroll = await page.evaluate(() => window.scrollY)
  const client = await context.newCDPSession(page)
  await client.send('Input.dispatchTouchEvent', {
    touchPoints: [{ x: 200, y: 700 }],
    type: 'touchStart',
  })
  for (const y of [600, 500, 400, 300, 200]) {
    await client.send('Input.dispatchTouchEvent', {
      touchPoints: [{ x: 200, y }],
      type: 'touchMove',
    })
  }
  await client.send('Input.dispatchTouchEvent', { touchPoints: [], type: 'touchEnd' })

  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(initialScroll)
})

test('reduced motion keeps the narrative static and skips enhancement', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  await expect(page.locator('html')).toHaveAttribute('data-scrollytelling-status', 'reduced')
  await expect(page.getByRole('article', { name: 'Da origem do universo à Terra' })).toBeVisible()
})

test('emits bounded scene activation and progress outside React state', async ({ page }) => {
  await page.addInitScript(() => {
    const events: Array<{ direction: string; progress: number; sceneId: string; type: string }> = []
    Object.defineProperty(window, '__chroniaSceneEvents', { value: events })

    for (const type of ['chronia:scenechange', 'chronia:sceneprogress']) {
      window.addEventListener(type, (event) => {
        const detail = (event as CustomEvent).detail
        events.push({ ...detail, type })
      })
    }
  })
  await page.goto('/#big-bang')
  await expect(page.locator('html')).toHaveAttribute('data-scrollytelling-status', 'active')

  await page.mouse.wheel(0, 900)
  await page.mouse.wheel(0, -900)

  await expect
    .poll(() =>
      page.evaluate(
        () =>
          (
            window as typeof window & {
              __chroniaSceneEvents: Array<unknown>
            }
          ).__chroniaSceneEvents.length,
      ),
    )
    .toBeGreaterThan(0)

  const capturedEvents = await page.evaluate(
    () =>
      (
        window as typeof window & {
          __chroniaSceneEvents: Array<{
            direction: string
            progress: number
            sceneId: string
            type: string
          }>
        }
      ).__chroniaSceneEvents,
  )
  expect(capturedEvents.length).toBeLessThanOrEqual(606)
  expect(capturedEvents.some(({ type }) => type === 'chronia:scenechange')).toBe(true)
  expect(
    capturedEvents
      .filter(({ type }) => type === 'chronia:sceneprogress')
      .every(({ progress }) => progress >= 0 && progress <= 1),
  ).toBe(true)
})

test('profiles scroll work without accumulating triggers', async ({ page, context }, testInfo) => {
  await page.goto('/')
  const root = page.locator('html')
  await expect(root).toHaveAttribute('data-scrollytelling-status', 'active')
  const initialTriggerCount = Number(await root.getAttribute('data-scroll-trigger-count'))

  await page.evaluate(() => {
    const longTasks: number[] = []
    Object.defineProperty(window, '__chroniaLongTasks', { value: longTasks })
    new PerformanceObserver((entries) => {
      entries.getEntries().forEach(({ duration }) => longTasks.push(duration))
    }).observe({ type: 'longtask' })
  })

  const client = await context.newCDPSession(page)
  await client.send('Performance.enable')
  const before = await client.send('Performance.getMetrics')

  for (const progress of [0.2, 0.4, 0.6, 0.8, 1, 0.8, 0.6, 0.4, 0.2, 0]) {
    await page.evaluate((position) => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      window.scrollTo({ behavior: 'instant', top: maxScroll * position })
      return new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
      )
    }, progress)
  }

  const after = await client.send('Performance.getMetrics')
  const longTasks = await page.evaluate(
    () => (window as typeof window & { __chroniaLongTasks: number[] }).__chroniaLongTasks,
  )
  const finalTriggerCount = Number(await root.getAttribute('data-scroll-trigger-count'))
  const metric = (metrics: typeof before.metrics, name: string) =>
    metrics.find((entry) => entry.name === name)?.value ?? 0
  const profile = {
    layoutCount: metric(after.metrics, 'LayoutCount') - metric(before.metrics, 'LayoutCount'),
    longTaskCount: longTasks.length,
    longestTask: Math.max(0, ...longTasks),
    triggerCount: finalTriggerCount,
  }

  await testInfo.attach('scrollytelling-profile', {
    body: JSON.stringify(profile, null, 2),
    contentType: 'application/json',
  })

  expect(finalTriggerCount).toBe(initialTriggerCount)
  expect(finalTriggerCount).toBe(testInfo.project.name === 'desktop-chromium' ? 9 : 6)
  expect(profile.layoutCount).toBeLessThan(120)
  expect(profile.longestTask).toBeLessThan(200)
})
