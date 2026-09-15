import { describe, expect, it } from 'vitest'

import { chroniaChapters, chroniaPrelude, chroniaScenes } from './scenes'

describe('Chronia scene records', () => {
  it('contains the editorial prelude and five sourced chapters', () => {
    expect(chroniaPrelude.id).toBe('preludio')
    expect(chroniaChapters).toHaveLength(5)
    expect(chroniaScenes.every(({ sources }) => sources.length > 0)).toBe(true)
  })

  it('ends at Earth formation before the origin of life', () => {
    const lastScene = chroniaScenes.at(-1)

    expect(lastScene?.id).toBe('terra')
    expect(lastScene?.narrative).toContain('antes da origem da vida')
  })
})
