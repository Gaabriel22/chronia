import type { ChapterShellContent } from '@/content/chapters'

interface ChapterShellProps {
  chapter: ChapterShellContent
  index: number
}

const orbitStyles = [
  'border-ember/40 shadow-[0_0_5rem_color-mix(in_oklab,var(--color-ember)_14%,transparent)]',
  'border-aurora/35 shadow-[0_0_5rem_color-mix(in_oklab,var(--color-aurora)_12%,transparent)]',
] as const

export function ChapterShell({ chapter, index }: ChapterShellProps) {
  const orbitStyle = orbitStyles[index % orbitStyles.length]

  return (
    <section
      className="border-starlight/10 py-section grid min-h-svh scroll-mt-12 items-center border-t"
      id={chapter.id}
    >
      <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.72fr)] lg:gap-24">
        <div className="max-w-3xl">
          <p className="text-ember mb-8 text-xs font-semibold tracking-[0.24em] uppercase">
            {chapter.eyebrow}
          </p>
          <h2 className="font-display text-[clamp(3.5rem,9vw,8.5rem)] leading-[0.82] font-medium tracking-[-0.055em] text-balance">
            {chapter.title}
          </h2>
          <p className="text-mist mt-9 max-w-xl text-base leading-8 text-pretty sm:text-lg">
            {chapter.introduction}
          </p>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-sm" aria-hidden="true">
          <div className={`absolute inset-[8%] rounded-full border ${orbitStyle}`} />
          <div className="border-starlight/10 absolute inset-[24%] rounded-full border" />
          <div className="bg-starlight absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full shadow-[0_0_2rem_var(--color-starlight)]" />
          <span className="text-starlight/40 font-display absolute right-0 bottom-0 text-[8rem] leading-none tabular-nums sm:text-[11rem]">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      </div>
    </section>
  )
}
