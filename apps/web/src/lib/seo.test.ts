import { describe, expect, it } from 'vitest'

import {
  createMetadata,
  createRobots,
  createSitemap,
  createStructuredData,
  getSiteUrl,
} from './seo'

const publicUrl = new URL('https://chronia.test')

describe('Chronia SEO data', () => {
  it('refuses a production build without a public origin', () => {
    expect(() => getSiteUrl(undefined, 'production')).toThrow(
      'NEXT_PUBLIC_SITE_URL is required in production',
    )
    expect(getSiteUrl(undefined, 'development')).toEqual(new URL('http://localhost:3000'))
  })

  it('creates canonical and social metadata from the configured origin', () => {
    const metadata = createMetadata(publicUrl)

    expect(metadata.alternates?.canonical).toBe(publicUrl)
    expect(metadata.openGraph?.url).toBe(publicUrl)
    expect(metadata.openGraph?.locale).toBe('pt_BR')
  })

  it('publishes crawl directives and a homepage sitemap entry', () => {
    expect(createRobots(publicUrl).sitemap).toBe('https://chronia.test/sitemap.xml')
    expect(createSitemap(publicUrl)).toEqual([
      expect.objectContaining({ url: 'https://chronia.test/', changeFrequency: 'monthly' }),
    ])
  })

  it('describes only verified visible website information', () => {
    const structuredData = createStructuredData(publicUrl)

    expect(structuredData).toEqual(
      expect.objectContaining({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Chronia',
        inLanguage: 'pt-BR',
        url: 'https://chronia.test/',
      }),
    )
    expect(structuredData).not.toHaveProperty('author')
    expect(structuredData).not.toHaveProperty('datePublished')
  })
})
