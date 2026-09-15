import type { MetadataRoute } from 'next'

import { createSitemap, getSiteUrl } from '@/lib/seo'

export default function sitemap(): MetadataRoute.Sitemap {
  return createSitemap(getSiteUrl())
}
