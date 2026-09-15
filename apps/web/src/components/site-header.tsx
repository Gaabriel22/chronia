import type { ChapterShellContent } from '@/content/chapters'

import { ChapterNavigation } from './chapter-navigation'

interface SiteHeaderProps {
  chapters: readonly ChapterShellContent[]
  prelude: ChapterShellContent
}

export function SiteHeader({ chapters, prelude }: SiteHeaderProps) {
  return (
    <header className="px-page relative isolate flex min-h-svh flex-col overflow-hidden">
      <div
        className="bg-ember/20 animate-slow-pulse absolute top-[8%] left-[58%] -z-10 size-[min(58vw,42rem)] rounded-full blur-[120px] motion-reduce:animate-none"
        aria-hidden="true"
      />
      <div
        className="border-starlight/10 absolute -top-72 left-1/2 -z-10 aspect-square w-[min(95vw,70rem)] -translate-x-1/2 rounded-full border"
        aria-hidden="true"
      />

      <div className="border-starlight/10 flex items-center justify-between border-b py-6 text-xs tracking-[0.18em] uppercase">
        <a className="font-semibold" href="#topo" aria-label="Chronia, início">
          Chronia
        </a>
        <p className="text-mist">Escala: cósmica</p>
      </div>

      <div className="flex flex-1 items-center py-20 sm:py-28">
        <div className="max-w-6xl">
          <p className="text-ember mb-8 text-xs font-semibold tracking-[0.28em] uppercase">
            {prelude.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(5.5rem,19vw,15rem)] leading-[0.68] font-medium tracking-[-0.075em]">
            Chronia
          </h1>
          <div className="mt-12 grid gap-8 md:grid-cols-[minmax(0,34rem)_auto] md:items-end md:gap-20">
            <p className="text-mist max-w-2xl text-lg leading-8 text-pretty sm:text-xl">
              {prelude.narrative}
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a
                className="border-starlight/20 hover:border-ember focus-visible:outline-ember inline-flex min-h-12 w-fit items-center gap-3 border-b pb-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4"
                href="#historia"
              >
                Iniciar a travessia <span aria-hidden="true">↓</span>
              </a>
              <a
                className="text-mist hover:text-starlight focus-visible:outline-ember text-sm underline decoration-white/30 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
                href="#fontes-preludio"
              >
                Fontes do prólogo
              </a>
            </div>
          </div>
        </div>
      </div>

      <ChapterNavigation chapters={chapters} />
    </header>
  )
}
