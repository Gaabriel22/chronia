import type { SceneRecord } from '@chronia/chronology'

interface SceneVisualFallbackProps {
  index: number
  scene: SceneRecord
  variant?: 'chapter' | 'prelude'
}

const orbitStyles = [
  'border-ember/40 shadow-[0_0_5rem_color-mix(in_oklab,var(--color-ember)_14%,transparent)]',
  'border-aurora/35 shadow-[0_0_5rem_color-mix(in_oklab,var(--color-aurora)_12%,transparent)]',
] as const

function PreludeAtmosphere() {
  return (
    <div aria-hidden="true" className="absolute inset-0" data-scene-layer>
      <div className="bg-ember/20 animate-slow-pulse absolute top-[8%] left-[58%] size-[min(58vw,42rem)] rounded-full blur-[120px] motion-reduce:animate-none" />
      <div className="border-starlight/10 absolute -top-72 left-1/2 aspect-square w-[min(95vw,70rem)] -translate-x-1/2 rounded-full border" />
    </div>
  )
}

function ChapterOrbit({ index }: Pick<SceneVisualFallbackProps, 'index'>) {
  const orbitStyle = orbitStyles[index % orbitStyles.length]

  return (
    <div aria-hidden="true" className="absolute inset-0" data-scene-layer>
      <div className={`absolute inset-[8%] rounded-full border ${orbitStyle}`} />
      <div className="border-starlight/10 absolute inset-[24%] rounded-full border" />
      <div className="bg-starlight absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full shadow-[0_0_2rem_var(--color-starlight)]" />
      <span className="text-starlight/40 font-display absolute right-0 bottom-0 text-[8rem] leading-none tabular-nums sm:text-[11rem]">
        {String(index + 1).padStart(2, '0')}
      </span>
    </div>
  )
}

export function SceneVisualFallback({
  index,
  scene,
  variant = 'chapter',
}: SceneVisualFallbackProps) {
  const isPrelude = variant === 'prelude'
  const supportsFocalPin = scene.renderer === 'remotion' || scene.renderer === 'svg'

  return (
    <figure
      className={
        isPrelude
          ? 'pointer-events-none absolute inset-0 -z-10'
          : 'relative mx-auto aspect-square w-full max-w-sm'
      }
      data-pin-scene={supportsFocalPin ? 'true' : undefined}
      data-scene-visual
    >
      {isPrelude ? <PreludeAtmosphere /> : <ChapterOrbit index={index} />}
      <figcaption className="sr-only">{scene.accessibility.visualDescription}</figcaption>
    </figure>
  )
}
