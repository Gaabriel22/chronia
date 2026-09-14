import { describe, expect, it } from 'vitest'

import { chronologyPackageReady } from './index'

describe('chronology package', () => {
  it('exports its foundation marker', () => {
    expect(chronologyPackageReady).toBe(true)
  })
})
