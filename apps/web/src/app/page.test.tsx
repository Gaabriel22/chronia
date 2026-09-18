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

  it('renders a complete temporal lens before client enhancement', () => {
    render(<HomePage />)

    const lens = screen.getByRole('complementary', { name: 'Lente temporal' })
    expect(within(lens).getByText('Escala cósmica')).toBeTruthy()
    expect(within(lens).getByText('em direção ao presente')).toBeTruthy()
    expect(within(lens).getByText(/espaço visual muda de escala/i)).toBeTruthy()
    expect(within(lens).queryByRole('status')).toBeNull()

    const chronology = within(lens).getByRole('list', { name: 'Cronologia completa' })
    expect(within(chronology).getAllByRole('listitem')).toHaveLength(6)
    expect(
      within(chronology)
        .getByRole('link', { name: /A Terra/i })
        .getAttribute('href'),
    ).toBe('#terra')
  })

  it('renders every scene as a semantic section with a visual fallback', () => {
    const { container } = render(<HomePage />)
    const scenes = Array.from(container.querySelectorAll<HTMLElement>('section[data-scene-id]'))

    expect(scenes.map(({ id }) => id)).toEqual([
      'preludio',
      'big-bang',
      'expansao',
      'primeiras-luzes',
      'sistema-solar',
      'terra',
    ])

    for (const scene of scenes) {
      const visual = scene.querySelector('figure[data-scene-visual]')
      const description = visual?.querySelector('figcaption')?.textContent

      expect(scene.getAttribute('aria-labelledby')).toBeTruthy()
      expect(scene.querySelector('[data-scene-copy]')).toBeTruthy()
      expect(visual).toBeTruthy()
      expect(description?.trim()).not.toBe('')
    }
  })
})
