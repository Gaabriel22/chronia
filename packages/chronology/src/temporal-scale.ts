import type {
  ScaleSegmentId,
  SceneRecord,
  SupportedLocale,
  TemporalPosition,
  TemporalRange,
  TemporalScaleSegment,
} from './types'

export const universeAgeYears = 13_800_000_000

export const temporalScaleSegments = [
  {
    id: 'cosmic',
    label: 'Escala cósmica',
    explanation: 'Bilhões de anos são condensados para revelar as grandes transições do cosmos.',
    startYearsBeforePresent: universeAgeYears,
    endYearsBeforePresent: 4_600_000_000,
    scrollWeight: 0.72,
  },
  {
    id: 'planetary',
    label: 'Escala planetária',
    explanation: 'A escala se aproxima para distinguir a formação do Sistema Solar e da Terra.',
    startYearsBeforePresent: 4_600_000_000,
    endYearsBeforePresent: 4_500_000_000,
    scrollWeight: 0.28,
  },
] as const satisfies readonly TemporalScaleSegment[]

type TemporalScene = Pick<SceneRecord, 'id' | 'title' | 'temporal' | 'scaleSegment'>

function assertSupportedTime(yearsBeforePresent: number) {
  const isSupported =
    Number.isSafeInteger(yearsBeforePresent) &&
    yearsBeforePresent >= temporalScaleSegments.at(-1)!.endYearsBeforePresent &&
    yearsBeforePresent <= universeAgeYears

  if (!isSupported) throw new RangeError(`${yearsBeforePresent}: outside the supported chronology`)
}

function segmentContains(segment: TemporalScaleSegment, yearsBeforePresent: number) {
  return (
    yearsBeforePresent <= segment.startYearsBeforePresent &&
    yearsBeforePresent >= segment.endYearsBeforePresent
  )
}

export function toYearsAfterBigBang(yearsBeforePresent: number) {
  assertSupportedTime(yearsBeforePresent)
  return universeAgeYears - yearsBeforePresent
}

export function findScaleSegment(yearsBeforePresent: number): TemporalScaleSegment {
  assertSupportedTime(yearsBeforePresent)
  const segment = temporalScaleSegments.findLast((candidate) =>
    segmentContains(candidate, yearsBeforePresent),
  )

  if (!segment) throw new RangeError(`${yearsBeforePresent}: outside the supported chronology`)
  return segment
}

function getPriorWeight(activeSegment: TemporalScaleSegment) {
  const activeIndex = temporalScaleSegments.findIndex(({ id }) => id === activeSegment.id)
  return temporalScaleSegments
    .slice(0, activeIndex)
    .reduce((total, segment) => total + segment.scrollWeight, 0)
}

export function mapTimeToProgress(yearsBeforePresent: number) {
  const segment = findScaleSegment(yearsBeforePresent)
  const span = segment.startYearsBeforePresent - segment.endYearsBeforePresent
  const localProgress = (segment.startYearsBeforePresent - yearsBeforePresent) / span
  return getPriorWeight(segment) + localProgress * segment.scrollWeight
}

export function getAuthoredTimeLabel(temporal: TemporalRange, locale: SupportedLocale) {
  return temporal.displayLabel[locale]
}

function getScaleLabel(scale: ScaleSegmentId) {
  return temporalScaleSegments.find(({ id }) => id === scale)!.label
}

export function createTemporalPositions(
  scenes: readonly TemporalScene[],
  locale: SupportedLocale = 'pt-BR',
): readonly TemporalPosition[] {
  return scenes.map((scene) => ({
    id: scene.id,
    title: scene.title,
    label: getAuthoredTimeLabel(scene.temporal, locale),
    scale: scene.scaleSegment,
    scaleLabel: getScaleLabel(scene.scaleSegment),
    progress: mapTimeToProgress(scene.temporal.startYearsBeforePresent),
  }))
}
