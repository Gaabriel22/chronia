import { getAuthoredTimeLabel, type SceneRecord } from '@chronia/chronology'

interface SourcePanelProps {
  scenes: readonly SceneRecord[]
}

export function SourcePanel({ scenes }: SourcePanelProps) {
  return (
    <section aria-labelledby="fontes-heading" className="border-starlight/10 py-section border-t">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)]">
        <div>
          <p className="text-ember mb-6 text-xs font-semibold tracking-[0.24em] uppercase">
            Pesquisa editorial
          </p>
          <h2
            className="font-display text-5xl leading-none tracking-[-0.04em] sm:text-7xl"
            id="fontes-heading"
          >
            Fontes e incerteza
          </h2>
          <p className="text-mist mt-7 max-w-lg leading-7">
            Cada data e processo abaixo preserva o grau de precisão sustentado pelas fontes.
          </p>
        </div>

        <div className="divide-starlight/10 border-starlight/10 divide-y border-y">
          {scenes.map((scene) => (
            <details className="group py-6" id={`fontes-${scene.id}`} key={scene.id}>
              <summary className="focus-visible:outline-ember flex min-h-12 cursor-pointer list-none items-center justify-between gap-6 focus-visible:outline-2 focus-visible:outline-offset-4">
                <span>
                  <span className="block font-semibold">{scene.title}</span>
                  <span className="text-mist mt-1 block text-sm">
                    {getAuthoredTimeLabel(scene.temporal, 'pt-BR')}
                  </span>
                </span>
                <span aria-hidden="true" className="text-ember text-xl group-open:rotate-45">
                  +
                </span>
              </summary>

              <div className="text-mist mt-5 max-w-2xl space-y-5 text-sm leading-7">
                <p>
                  <strong className="text-starlight">Tratamento da incerteza:</strong>{' '}
                  {scene.uncertainty.note}
                </p>
                <ol className="space-y-3">
                  {scene.sources.map((source) => (
                    <li key={source.id}>
                      <a
                        className="hover:text-ember focus-visible:outline-ember underline decoration-white/30 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4"
                        href={source.url}
                      >
                        {source.title}
                      </a>{' '}
                      — {source.publisher}, acesso em {source.accessedAt}.
                    </li>
                  ))}
                </ol>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
