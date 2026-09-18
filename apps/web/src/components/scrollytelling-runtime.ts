type GsapApi = (typeof import('gsap'))['gsap']
type ScrollTriggerApi = (typeof import('gsap/ScrollTrigger'))['ScrollTrigger']

export interface SceneAnimationHandle {
  dispose: () => void
}

export interface AnimationRuntime {
  enhanceScene: (scene: HTMLElement) => SceneAnimationHandle
  getTriggerCount: () => number
  refresh: () => void
}

export type ScrollytellingStatus = 'active' | 'reduced' | 'unavailable'

interface ScrollytellingController {
  dispose: () => void
  status: ScrollytellingStatus
}

interface StartScrollytellingOptions {
  document: Document
  loadRuntime?: () => Promise<AnimationRuntime>
  motionPreference: MediaQueryList
}

interface SceneEventDetail {
  direction: 'backward' | 'forward'
  progress: number
  sceneId: string
}

let runSequence = 0

function setStatus(sceneDocument: Document, status: ScrollytellingStatus | 'idle' | 'loading') {
  sceneDocument.documentElement.dataset.scrollytellingStatus = status
}

function dispatchSceneEvent(
  scene: HTMLElement,
  name: 'chronia:scenechange' | 'chronia:sceneprogress',
  detail: SceneEventDetail,
) {
  const view = scene.ownerDocument.defaultView
  if (!view) return

  if (name === 'chronia:scenechange') {
    scene.ownerDocument.documentElement.dataset.activeScene = detail.sceneId
  }

  view.dispatchEvent(new view.CustomEvent(name, { detail }))
}

function createProgressDispatcher(scene: HTMLElement) {
  const view = scene.ownerDocument.defaultView
  let frameId: number | undefined
  let lastProgressStep = -1
  let pendingDetail: SceneEventDetail | undefined

  function schedule(progress: number, direction: number) {
    if (!view) return

    const progressStep = Math.round(Math.min(1, Math.max(0, progress)) * 100)
    if (progressStep === lastProgressStep) return

    pendingDetail = {
      direction: direction < 0 ? 'backward' : 'forward',
      progress: progressStep / 100,
      sceneId: scene.dataset.sceneId ?? scene.id,
    }
    if (frameId !== undefined) return

    frameId = view.requestAnimationFrame(() => {
      frameId = undefined
      if (!pendingDetail) return
      lastProgressStep = Math.round(pendingDetail.progress * 100)
      dispatchSceneEvent(scene, 'chronia:sceneprogress', pendingDetail)
      pendingDetail = undefined
    })
  }

  function dispose() {
    if (frameId !== undefined) view?.cancelAnimationFrame(frameId)
  }

  return { dispose, schedule }
}

function createGsapRuntime(gsap: GsapApi, ScrollTrigger: ScrollTriggerApi): AnimationRuntime {
  function enhanceScene(scene: HTMLElement): SceneAnimationHandle {
    const copy = scene.querySelector<HTMLElement>('[data-scene-copy]')
    const layers = Array.from(scene.querySelectorAll<HTMLElement>('[data-scene-layer]'))
    const visual = scene.querySelector<HTMLElement>('[data-scene-visual]')
    const progress = createProgressDispatcher(scene)

    const context = gsap.context(() => {
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          end: 'bottom 25%',
          onToggle: (trigger) => {
            if (!trigger.isActive) return
            dispatchSceneEvent(scene, 'chronia:scenechange', {
              direction: trigger.direction < 0 ? 'backward' : 'forward',
              progress: trigger.progress,
              sceneId: scene.dataset.sceneId ?? scene.id,
            })
          },
          onUpdate: (trigger) => progress.schedule(trigger.progress, trigger.direction),
          scrub: 0.35,
          start: 'top 75%',
          trigger: scene,
        },
      })

      if (copy) {
        timeline.fromTo(copy, { opacity: 0.72, yPercent: 4 }, { opacity: 1, yPercent: 0 }, 0)
      }
      if (layers.length > 0) {
        timeline.fromTo(
          layers,
          { opacity: 0.42, scale: 0.96, yPercent: 5 },
          { opacity: 1, scale: 1, stagger: 0.08, yPercent: -3 },
          0,
        )
      }

      const allowsPinning =
        scene.ownerDocument.defaultView?.matchMedia('(min-width: 64rem)').matches
      if (visual?.dataset.pinScene === 'true' && allowsPinning) {
        ScrollTrigger.create({
          anticipatePin: 1,
          end: () => {
            const viewportHeight = scene.ownerDocument.defaultView?.innerHeight ?? 0
            return `+=${Math.min(viewportHeight * 0.35, 360)}`
          },
          invalidateOnRefresh: true,
          pin: visual,
          pinSpacing: false,
          start: 'center center',
          trigger: scene,
        })
      }
    }, scene)

    return {
      dispose: () => {
        progress.dispose()
        context.revert()
      },
    }
  }

  return {
    enhanceScene,
    getTriggerCount: () => ScrollTrigger.getAll().length,
    refresh: () => ScrollTrigger.refresh(),
  }
}

async function loadGsapRuntime() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ])

  gsap.registerPlugin(ScrollTrigger)
  return createGsapRuntime(gsap, ScrollTrigger)
}

export async function startScrollytelling({
  document: sceneDocument,
  loadRuntime = loadGsapRuntime,
  motionPreference,
}: StartScrollytellingOptions): Promise<ScrollytellingController> {
  const runId = String(++runSequence)
  sceneDocument.documentElement.dataset.scrollytellingRun = runId

  function releaseStatus() {
    if (sceneDocument.documentElement.dataset.scrollytellingRun !== runId) return
    delete sceneDocument.documentElement.dataset.scrollytellingRun
    delete sceneDocument.documentElement.dataset.scrollTriggerCount
    setStatus(sceneDocument, 'idle')
  }

  if (motionPreference.matches) {
    setStatus(sceneDocument, 'reduced')
    return { dispose: releaseStatus, status: 'reduced' }
  }

  setStatus(sceneDocument, 'loading')

  try {
    const runtime = await loadRuntime()
    const scenes = Array.from(sceneDocument.querySelectorAll<HTMLElement>('[data-enhanced-scene]'))
    const handles = scenes.map((scene) => runtime.enhanceScene(scene))
    runtime.refresh()
    const fragmentAfterLoad = sceneDocument.defaultView?.location.hash
    if (fragmentAfterLoad) {
      sceneDocument.getElementById(decodeURIComponent(fragmentAfterLoad.slice(1)))?.scrollIntoView({
        behavior: 'instant',
        block: 'start',
      })
    }
    sceneDocument.documentElement.dataset.scrollTriggerCount = String(runtime.getTriggerCount())
    setStatus(sceneDocument, 'active')

    return {
      dispose: () => {
        handles.forEach(({ dispose }) => dispose())
        if (sceneDocument.documentElement.dataset.scrollytellingRun !== runId) {
          sceneDocument.documentElement.dataset.scrollTriggerCount = String(
            runtime.getTriggerCount(),
          )
        }
        releaseStatus()
      },
      status: 'active',
    }
  } catch {
    setStatus(sceneDocument, 'unavailable')
    return { dispose: releaseStatus, status: 'unavailable' }
  }
}
