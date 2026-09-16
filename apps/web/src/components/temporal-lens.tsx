import {
  createTemporalPositions,
  temporalScaleSegments,
  type SceneRecord,
} from '@chronia/chronology'

import { TemporalLensEnhancement } from './temporal-lens-enhancement'

interface TemporalLensProps {
  scenes: readonly SceneRecord[]
}

export function TemporalLens({ scenes }: TemporalLensProps) {
  const positions = createTemporalPositions(scenes)

  return (
    <aside
      aria-labelledby="temporal-lens-title"
      className="bg-ink border-starlight/10 sticky top-0 z-40 border-y"
    >
      <div className="px-page py-4">
        <h2 className="sr-only" id="temporal-lens-title">
          Lente temporal
        </h2>

        <TemporalLensEnhancement positions={positions} />

        <details className="group mt-3">
          <summary className="text-mist hover:text-starlight focus-visible:outline-ember w-fit cursor-pointer text-xs underline decoration-white/30 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4">
            Como esta escala funciona
          </summary>
          <div className="grid gap-8 py-6 lg:grid-cols-[minmax(16rem,0.7fr)_minmax(20rem,1.3fr)]">
            <div className="text-mist space-y-3 text-sm leading-6">
              <p>
                O espaço visual muda de escala para que bilhões de anos e dezenas de milhões de anos
                possam ser compreendidos na mesma travessia.
              </p>
              {temporalScaleSegments.map((segment) => (
                <p key={segment.id}>
                  <strong className="text-starlight">{segment.label}:</strong> {segment.explanation}
                </p>
              ))}
            </div>

            <ol aria-label="Cronologia completa" className="grid gap-3 sm:grid-cols-2">
              {positions.map((position) => (
                <li className="border-starlight/10 border-l pl-4" key={position.id}>
                  <a
                    className="hover:text-ember focus-visible:outline-ember text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4"
                    href={`#${position.id}`}
                  >
                    {position.title}
                  </a>
                  <p className="text-mist mt-1 text-xs leading-5">
                    {position.label} · Escala:{' '}
                    {position.scale === 'cosmic' ? 'cósmica' : 'planetária'}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </details>
      </div>
    </aside>
  )
}
