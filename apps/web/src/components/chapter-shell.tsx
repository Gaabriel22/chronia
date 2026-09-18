import { getAuthoredTimeLabel } from '@chronia/chronology'

import type { ChapterShellContent } from '@/content/chapters'

import { SceneVisualFallback } from './scene-visual-fallback'

interface ChapterShellProps {
  chapter: ChapterShellContent
  index: number
}

export function ChapterShell({ chapter, index }: ChapterShellProps) {
  return (
    <section
      aria-labelledby={`${chapter.id}-heading`}
      className="border-starlight/10 py-section grid min-h-svh scroll-mt-40 items-center border-t"
      data-enhanced-scene
      data-scene-id={chapter.id}
      data-temporal-scene
      id={chapter.id}
    >
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:gap-24">
        <div className="max-w-3xl" data-scene-copy>
          <p className="text-ember mb-8 text-xs font-semibold tracking-[0.24em] uppercase">
            {chapter.eyebrow}
          </p>
          <p className="text-mist mb-5 text-sm tracking-[0.08em] uppercase">
            {getAuthoredTimeLabel(chapter.temporal, 'pt-BR')}
          </p>
          <h2
            className="font-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.82] font-medium tracking-[-0.055em] text-balance"
            id={`${chapter.id}-heading`}
          >
            {chapter.title}
          </h2>
          <p className="text-mist mt-9 max-w-xl text-base leading-8 text-pretty sm:text-lg">
            {chapter.narrative}
          </p>
          <a
            aria-label={`Consultar fontes e incerteza de ${chapter.title}`}
            className="text-ember focus-visible:outline-ember mt-7 inline-flex min-h-11 items-center border-b border-current text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4"
            href={`#fontes-${chapter.id}`}
          >
            Fontes e incerteza
          </a>
        </div>

        <SceneVisualFallback index={index} scene={chapter} />
      </div>
    </section>
  )
}
