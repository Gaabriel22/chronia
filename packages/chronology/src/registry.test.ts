import { describe, expect, it } from 'vitest'

import type { SceneRecord } from './types'
import { createChronology } from './validate-scenes'

const source = {
  id: 'source',
  title: 'Source',
  publisher: 'Publisher',
  url: 'https://example.com/source',
  accessedAt: '2026-09-15',
  kind: 'institutional',
} as const

function createScene(id: string, order: number, yearsBeforePresent: number): SceneRecord {
  return {
    id,
    order,
    title: id,
    eyebrow: `Capítulo ${order}`,
    narrative: `Narrativa de ${id}`,
    temporal: {
      startYearsBeforePresent: yearsBeforePresent,
      endYearsBeforePresent: yearsBeforePresent,
      displayLabel: `há ${yearsBeforePresent} anos`,
      precision: 'approximate',
    },
    scaleSegment: 'cosmic',
    renderer: 'editorial',
    scrollWeight: 1,
    uncertainty: { kind: 'approximate', note: 'Valor de teste.' },
    sources: [source],
    accessibility: {
      summary: `Resumo de ${id}`,
      visualDescription: `Descrição visual de ${id}`,
    },
  }
}

describe('createChronology', () => {
  it('includes a new valid record without changing the registry consumer', () => {
    const original = createScene('origem', 1, 13_800_000_000)
    const added = createScene('nova-cena', 2, 10_000_000_000)

    expect(createChronology([original, added]).map(({ id }) => id)).toEqual(['origem', 'nova-cena'])
  })
})
