import { render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import HomePage from './page'

describe('Chronia semantic shell', () => {
  it('renders a navigable document outline for the five chapters', () => {
    render(<HomePage />)

    expect(screen.getByRole('banner')).toBeTruthy()
    expect(screen.getByRole('heading', { level: 1, name: 'Chronia' })).toBeTruthy()

    const navigation = screen.getByRole('navigation', { name: 'Capítulos da origem' })
    expect(within(navigation).getAllByRole('link')).toHaveLength(5)

    const article = screen.getByRole('article', { name: 'Da origem do universo à Terra' })
    expect(within(article).getAllByRole('heading', { level: 2 })).toHaveLength(5)
    expect(screen.getByRole('contentinfo')).toBeTruthy()
  })

  it('provides a focusable skip link to the narrative', () => {
    render(<HomePage />)

    const skipLink = screen.getByRole('link', { name: 'Pular para a história' })
    skipLink.focus()

    expect(document.activeElement).toBe(skipLink)
    expect(skipLink.getAttribute('href')).toBe('#historia')
  })

  it('exposes source and uncertainty records without client-side JavaScript', () => {
    render(<HomePage />)

    const sourcePanel = screen.getByRole('region', { name: 'Fontes e incerteza' })
    expect(within(sourcePanel).getAllByRole('link', { hidden: true })).toHaveLength(7)
    expect(within(sourcePanel).getByText(/incerteza inferior a 1%/i)).toBeTruthy()

    const sourceLink = screen.getByRole('link', {
      name: 'Consultar fontes e incerteza de O princípio',
    })
    expect(sourceLink.getAttribute('href')).toBe('#fontes-big-bang')
  })
})
