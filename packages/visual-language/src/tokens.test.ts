import { describe, expect, it } from 'vitest'

import { visualTokens } from './index'

describe('visual language tokens', () => {
  it('exposes immutable semantic tokens for web and rendered media', () => {
    expect(visualTokens.color.ink).toBe('#07070a')
    expect(visualTokens.font.display).toContain('Cormorant Garamond')
    expect(visualTokens.space.page).toBe('clamp(1.25rem, 4vw, 4rem)')
    expect(visualTokens.motion.duration.slow).toBe(900)
  })
})
