import type { Metadata, MetadataRoute } from 'next'

export const siteName = 'Chronia'
export const siteDescription =
  'Do primeiro instante à formação da Terra em uma história visual sobre as mudanças de escala do tempo.'

const localSiteUrl = new URL('http://localhost:3000')

export function getSiteUrl(
  value = process.env.NEXT_PUBLIC_SITE_URL,
  environment = process.env.NODE_ENV,
): URL {
  if (value) return new URL(value)
  if (environment === 'production') {
    throw new Error('NEXT_PUBLIC_SITE_URL is required in production')
  }

  return localSiteUrl
}

export function createMetadata(siteUrl: URL): Metadata {
  return {
    metadataBase: siteUrl,
    applicationName: siteName,
    title: {
      default: `${siteName} — Uma história visual do tempo`,
      template: `%s — ${siteName}`,
    },
    description: siteDescription,
    alternates: { canonical: siteUrl },
    openGraph: {
      type: 'website',
      locale: 'pt_BR',
      url: siteUrl,
      siteName,
      title: `${siteName} — Uma história visual do tempo`,
      description: siteDescription,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${siteName} — Uma história visual do tempo`,
      description: siteDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}

export function createRobots(siteUrl: URL): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: new URL('/sitemap.xml', siteUrl).href,
  }
}

export function createSitemap(siteUrl: URL): MetadataRoute.Sitemap {
  return [
    {
      url: new URL('/', siteUrl).href,
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}

export function createStructuredData(siteUrl: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteName,
    description: siteDescription,
    inLanguage: 'pt-BR',
    url: new URL('/', siteUrl).href,
  } as const
}

export function serializeStructuredData(structuredData: object): string {
  return JSON.stringify(structuredData).replace(/</g, '\\u003c')
}
