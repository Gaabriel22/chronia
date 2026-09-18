'use client'

import { useEffect } from 'react'

import { startScrollytelling, type SceneAnimationHandle } from './scrollytelling-runtime'

export function ScrollytellingEnhancement() {
  useEffect(() => {
    if (!window.matchMedia) {
      document.documentElement.dataset.scrollytellingStatus = 'unavailable'
      return
    }

    let controller: SceneAnimationHandle | undefined
    let disposed = false

    void startScrollytelling({
      document,
      motionPreference: window.matchMedia('(prefers-reduced-motion: reduce)'),
    }).then((activeController) => {
      if (disposed) {
        activeController.dispose()
        return
      }
      controller = activeController
    })

    return () => {
      disposed = true
      controller?.dispose()
    }
  }, [])

  return null
}
