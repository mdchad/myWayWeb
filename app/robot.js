import { MetadataRoute } from 'next'

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: ['/api/og/*', '/api/dynamic-image*'],
      disallow: ['/api/']
    },
    sitemap: 'https://www.myway.my/sitemap.xml',
  }
}