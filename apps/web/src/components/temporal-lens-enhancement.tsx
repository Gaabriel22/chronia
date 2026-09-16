'use client'

import { useEffect, useState } from 'react'

import type { TemporalPosition } from '@chronia/chronology'

interface TemporalLensEnhancementProps {
  positions: readonly TemporalPosition[]
}

function selectMostVisibleScene(entries: readonly IntersectionObserverEntry[]) {
  return entries
    .filter(({ isIntersecting }) => isIntersecting)
    .sort((left, right) => right.intersectionRatio - left.intersectionRatio)[0]
}

export function TemporalLensEnhancement({ positions }: TemporalLensEnhancementProps) {
  const [activeId, setActiveId] = useState(positions[0]?.id)
  const activePosition = positions.find(({ id }) => id === activeId) ?? positions[0]

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(
      (entries) => {
        const activeScene = selectMostVisibleScene(entries)
        const sceneId = activeScene?.target.getAttribute('data-scene-id')
        if (sceneId) setActiveId((currentId) => (currentId === sceneId ? currentId : sceneId))
      },
      { rootMargin: '-28% 0px -52% 0px', threshold: [0, 0.25, 0.5, 0.75] },
    )

    document.querySelectorAll<HTMLElement>('[data-temporal-scene]').forEach((scene) => {
      observer.observe(scene)
    })

    return () => observer.disconnect()
  }, [])

  if (!activePosition) return null

  return (
    <div
      aria-hidden="true"
      className="grid gap-3 md:grid-cols-[minmax(12rem,0.45fr)_minmax(15rem,1fr)_auto] md:items-center md:gap-8"
      data-active-scene={activePosition.id}
      data-testid="temporal-lens-visual"
    >
      <div>
        <p className="text-ember text-[0.65rem] font-semibold tracking-[0.2em] uppercase">
          {activePosition.scaleLabel}
        </p>
        <p className="mt-1 text-sm font-semibold">{activePosition.label}</p>
      </div>

      <div className="bg-starlight/15 h-px overflow-hidden">
        <div
          className="bg-ember h-full origin-left transition-[width] duration-500 motion-reduce:transition-none"
          style={{ width: `${activePosition.progress * 100}%` }}
        />
      </div>

      <p className="text-mist text-[0.65rem] tracking-[0.16em] whitespace-nowrap uppercase">
        em direção ao presente
      </p>
    </div>
  )
}
