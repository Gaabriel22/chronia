import { ChapterShell } from '@/components/chapter-shell'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { chapterShellContent } from '@/content/chapters'
import { createStructuredData, getSiteUrl, serializeStructuredData } from '@/lib/seo'

export default function HomePage() {
  const structuredData = createStructuredData(getSiteUrl())

  return (
    <div className="bg-ink min-h-svh" id="topo">
      <a
        className="bg-starlight text-ink focus-visible:outline-ember z-overlay fixed top-3 left-3 -translate-y-24 px-5 py-3 font-semibold transition-transform focus:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 motion-reduce:transition-none"
        href="#historia"
      >
        Pular para a história
      </a>

      <SiteHeader chapters={chapterShellContent} />

      <main className="px-page" id="historia" tabIndex={-1}>
        <article aria-label="Da origem do universo à Terra">
          {chapterShellContent.map((chapter, index) => (
            <ChapterShell chapter={chapter} index={index} key={chapter.id} />
          ))}
        </article>
      </main>

      <SiteFooter />

      <script
        dangerouslySetInnerHTML={{ __html: serializeStructuredData(structuredData) }}
        type="application/ld+json"
      />
    </div>
  )
}
