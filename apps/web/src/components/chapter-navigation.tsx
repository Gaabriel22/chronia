import type { ChapterShellContent } from '@/content/chapters'

interface ChapterNavigationProps {
  chapters: readonly ChapterShellContent[]
}

export function ChapterNavigation({ chapters }: ChapterNavigationProps) {
  return (
    <nav aria-label="Capítulos da origem" className="border-starlight/15 border-y py-6">
      <ol className="grid gap-px sm:grid-cols-5">
        {chapters.map((chapter, index) => (
          <li key={chapter.id}>
            <a
              className="group focus-visible:outline-ember flex min-h-20 items-center gap-4 px-3 py-3 text-sm transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-4"
              href={`#${chapter.id}`}
            >
              <span className="text-ember font-display text-2xl tabular-nums" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-mist group-hover:text-starlight leading-tight transition-colors">
                {chapter.title}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
