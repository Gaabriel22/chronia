import { describe, expect, it } from 'vitest'

import type { TemporalRange } from './types'
import {
  createTemporalPositions,
  findScaleSegment,
  getAuthoredTimeLabel,
  mapTimeToProgress,
  temporalScaleSegments,
  toYearsAfterBigBang,
} from './temporal-scale'

const universeAge = 13_800_000_000

describe('canonical temporal conversion', () => {
  it('converts years before present to years after the Big Bang', () => {
    expect(toYearsAfterBigBang(universeAge)).toBe(0)
    expect(toYearsAfterBigBang(4_600_000_000)).toBe(9_200_000_000)
  })

  it.each([-1, universeAge + 1, Number.MAX_VALUE])(
    'rejects invalid canonical value %s',
    (value) => {
      expect(() => toYearsAfterBigBang(value)).toThrow('outside the supported chronology')
    },
  )
})

describe('piecewise temporal progress', () => {
  it('maps authored segment boundaries deterministically', () => {
    expect(mapTimeToProgress(universeAge)).toBe(0)
    expect(mapTimeToProgress(4_600_000_000)).toBeCloseTo(0.72)
    expect(mapTimeToProgress(4_500_000_000)).toBe(1)
    expect(mapTimeToProgress(4_540_000_000)).toBe(mapTimeToProgress(4_540_000_000))
  })

  it('remains monotonic while chronology moves toward the present', () => {
    const values = [universeAge, 13_400_000_000, 4_600_000_000, 4_540_000_000, 4_500_000_000]
    const progress = values.map(mapTimeToProgress)

    expect(progress).toEqual([...progress].sort((left, right) => left - right))
  })

  it('switches from cosmic to planetary scale at the shared boundary', () => {
    expect(findScaleSegment(4_600_000_001).id).toBe('cosmic')
    expect(findScaleSegment(4_600_000_000).id).toBe('planetary')
    expect(temporalScaleSegments.map(({ id }) => id)).toEqual(['cosmic', 'planetary'])
  })
})

describe('authored temporal labels', () => {
  const temporal: TemporalRange = {
    startYearsBeforePresent: 4_540_000_000,
    endYearsBeforePresent: 4_500_000_000,
    displayLabel: { 'pt-BR': 'há cerca de 4,54 bilhões de anos' },
    precision: 'approximate',
  }

  it('selects the requested locale without parsing display copy', () => {
    expect(getAuthoredTimeLabel(temporal, 'pt-BR')).toBe('há cerca de 4,54 bilhões de anos')
    expect(mapTimeToProgress(temporal.startYearsBeforePresent)).toBeCloseTo(0.888)
  })
})

describe('temporal positions', () => {
  it('derives serializable positions from scene records', () => {
    const scene = {
      id: 'terra',
      title: 'A Terra',
      temporal: {
        startYearsBeforePresent: 4_540_000_000,
        endYearsBeforePresent: 4_500_000_000,
        displayLabel: { 'pt-BR': 'há cerca de 4,54 bilhões de anos' },
        precision: 'approximate',
      },
      scaleSegment: 'planetary',
    } as const

    expect(createTemporalPositions([scene])).toEqual([
      expect.objectContaining({
        id: 'terra',
        label: 'há cerca de 4,54 bilhões de anos',
        progress: expect.closeTo(0.888),
        scale: 'planetary',
      }),
    ])
  })
})
