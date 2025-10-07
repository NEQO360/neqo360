import { MetadataRoute } from 'next'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/_next/',
        '/admin/',
        '/private/',
        '*.json',
        '*.xml',
      ],
    },
    sitemap: 'https://neqo360.com/sitemap.xml',
    host: 'https://neqo360.com',
  }
} 