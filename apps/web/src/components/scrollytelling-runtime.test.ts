import { describe, expect, it, vi } from 'vitest'

import { startScrollytelling, type AnimationRuntime } from './scrollytelling-runtime'

function createMotionPreference(matches: boolean) {
  return { matches } as MediaQueryList
}

function createSceneDocument() {
  document.body.innerHTML = `
    <nav aria-label="Capítulos"><a href="#big-bang">O princípio</a></nav>
    <section data-enhanced-scene data-scene-id="big-bang">
      <h2>O princípio</h2>
      <p>Conteúdo legível.</p>
    </section>
  `
  return document
}

describe('scrollytelling progressive enhancement', () => {
  it('does not load the animation runtime when reduced motion is preferred', async () => {
    const loadRuntime = vi.fn<() => Promise<AnimationRuntime>>()

    const controller = await startScrollytelling({
      document: createSceneDocument(),
      loadRuntime,
      motionPreference: createMotionPreference(true),
    })

    expect(controller.status).toBe('reduced')
    expect(loadRuntime).not.toHaveBeenCalled()
  })

  it('keeps semantic content when the animation runtime fails to load', async () => {
    const sceneDocument = createSceneDocument()

    const controller = await startScrollytelling({
      document: sceneDocument,
      loadRuntime: () => Promise.reject(new Error('GSAP unavailable')),
      motionPreference: createMotionPreference(false),
    })

    expect(controller.status).toBe('unavailable')
    expect(sceneDocument.querySelector('h2')?.textContent).toBe('O princípio')
    expect(sceneDocument.querySelector('nav a')?.getAttribute('href')).toBe('#big-bang')
  })

  it('enhances each scene once and disposes every local context', async () => {
    const firstDispose = vi.fn()
    const secondDispose = vi.fn()
    const runtime: AnimationRuntime = {
      enhanceScene: vi
        .fn()
        .mockReturnValueOnce({ dispose: firstDispose })
        .mockReturnValueOnce({ dispose: secondDispose }),
      getTriggerCount: () => 2,
      refresh: vi.fn(),
    }
    const sceneDocument = createSceneDocument()
    sceneDocument.body.insertAdjacentHTML(
      'beforeend',
      '<section data-enhanced-scene data-scene-id="expansao"><h2>Expansão</h2></section>',
    )

    const controller = await startScrollytelling({
      document: sceneDocument,
      loadRuntime: () => Promise.resolve(runtime),
      motionPreference: createMotionPreference(false),
    })

    expect(controller.status).toBe('active')
    expect(runtime.enhanceScene).toHaveBeenCalledTimes(2)
    expect(runtime.refresh).toHaveBeenCalledOnce()
    expect(sceneDocument.documentElement.dataset.scrollTriggerCount).toBe('2')

    controller.dispose()

    expect(firstDispose).toHaveBeenCalledOnce()
    expect(secondDispose).toHaveBeenCalledOnce()
    expect(sceneDocument.documentElement.dataset.scrollTriggerCount).toBeUndefined()
  })
})
