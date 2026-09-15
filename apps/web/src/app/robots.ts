import type { MetadataRoute } from 'next'

import { createRobots, getSiteUrl } from '@/lib/seo'

export default function robots(): MetadataRoute.Robots {
  return createRobots(getSiteUrl())
}
