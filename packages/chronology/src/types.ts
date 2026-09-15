export const rendererKinds = ['editorial', 'remotion', 'svg', 'canvas', 'layered-css'] as const

export type RendererKind = (typeof rendererKinds)[number]
export type TemporalPrecision = 'exact' | 'approximate' | 'range'
export type ScaleSegmentId = 'cosmic' | 'planetary'
export type SourceKind = 'primary' | 'institutional' | 'scholarly'

export interface TemporalRange {
  readonly startYearsBeforePresent: number
  readonly endYearsBeforePresent: number
  readonly displayLabel: string
  readonly precision: TemporalPrecision
}

export interface SourceRecord {
  readonly id: string
  readonly title: string
  readonly publisher: string
  readonly url: string
  readonly accessedAt: string
  readonly kind: SourceKind
}

export type Uncertainty =
  | { readonly kind: 'established'; readonly note: string }
  | { readonly kind: 'approximate'; readonly note: string }
  | { readonly kind: 'range'; readonly note: string }
  | { readonly kind: 'interpretation'; readonly note: string }
  | { readonly kind: 'disputed'; readonly note: string }

export interface AccessibilityContent {
  readonly summary: string
  readonly visualDescription: string
}

export interface MediaReference {
  readonly poster: string
  readonly desktopClip?: string
  readonly mobileClip?: string
}

export interface SceneRecord {
  readonly id: string
  readonly order: number
  readonly eyebrow: string
  readonly title: string
  readonly narrative: string
  readonly temporal: TemporalRange
  readonly scaleSegment: ScaleSegmentId
  readonly renderer: RendererKind
  readonly scrollWeight: number
  readonly uncertainty: Uncertainty
  readonly sources: readonly SourceRecord[]
  readonly accessibility: AccessibilityContent
  readonly media?: MediaReference
}
