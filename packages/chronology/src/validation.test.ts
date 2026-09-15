import { describe, expect, it } from 'vitest'

import type { SceneRecord } from './types'
import { validateScenes } from './validate-scenes'

const source = {
  id: 'nasa-universe-overview',
  title: 'Overview',
  publisher: 'NASA Science',
  url: 'https://science.nasa.gov/universe/overview/',
  accessedAt: '2026-09-15',
  kind: 'institutional',
} as const

const validScene: SceneRecord = {
  id: 'big-bang',
  order: 1,
  title: 'O princípio',
  eyebrow: 'Capítulo 01',
  narrative: 'O universo observável começa em um estado quente e denso.',
  temporal: {
    startYearsBeforePresent: 13_800_000_000,
    endYearsBeforePresent: 13_800_000_000,
    displayLabel: 'há cerca de 13,8 bilhões de anos',
    precision: 'approximate',
  },
  scaleSegment: 'cosmic',
  renderer: 'remotion',
  scrollWeight: 1,
  uncertainty: {
    kind: 'approximate',
    note: 'A idade é arredondada conforme a síntese da fonte.',
  },
  sources: [source],
  accessibility: {
    summary: 'O universo inicia sua expansão.',
    visualDescription: 'Um ponto luminoso se expande sobre fundo escuro.',
  },
}

function scene(overrides: Partial<SceneRecord> = {}): SceneRecord {
  return { ...validScene, ...overrides }
}

describe('validateScenes', () => {
  it('accepts valid scenes in chronological order', () => {
    const scenes = [
      validScene,
      scene({
        id: 'terra',
        order: 2,
        temporal: {
          startYearsBeforePresent: 4_540_000_000,
          endYearsBeforePresent: 4_540_000_000,
          displayLabel: 'há cerca de 4,54 bilhões de anos',
          precision: 'approximate',
        },
      }),
    ]

    expect(validateScenes(scenes)).toBe(scenes)
  })

  it.each([
    ['duplicate scene IDs', [validScene, scene({ order: 2 })], 'big-bang: duplicate scene id'],
    [
      'invalid ordering',
      [validScene, scene({ id: 'terra', order: 3 })],
      'terra: expected order 2, received 3',
    ],
    [
      'unsafe integers',
      [scene({ temporal: { ...validScene.temporal, startYearsBeforePresent: Number.MAX_VALUE } })],
      'big-bang: temporal values must be safe integers',
    ],
    [
      'invalid temporal ranges',
      [
        scene({
          temporal: {
            ...validScene.temporal,
            startYearsBeforePresent: 4_500_000_000,
            endYearsBeforePresent: 4_600_000_000,
          },
        }),
      ],
      'big-bang: temporal range runs backward',
    ],
    [
      'unsupported renderers',
      [scene({ renderer: 'webgl' as SceneRecord['renderer'] })],
      'big-bang: unsupported renderer "webgl"',
    ],
    ['missing sources', [scene({ sources: [] })], 'big-bang: at least one source is required'],
    [
      'missing accessibility content',
      [scene({ accessibility: { summary: '', visualDescription: '' } })],
      'big-bang: accessibility content is required',
    ],
  ])('rejects %s with a scene-specific error', (_case, scenes, message) => {
    expect(() => validateScenes(scenes)).toThrow(message)
  })

  it('rejects chronology that moves away from the present', () => {
    const scenes = [
      validScene,
      scene({
        id: 'older-again',
        order: 2,
        temporal: {
          ...validScene.temporal,
          startYearsBeforePresent: 13_900_000_000,
          endYearsBeforePresent: 13_900_000_000,
        },
      }),
    ]

    expect(() => validateScenes(scenes)).toThrow(
      'older-again: chronology must move toward the present',
    )
  })
})
