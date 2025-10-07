import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ToastProvider from './providers/ToastProvider'
import { TranslationProvider } from './providers/TranslationProvider'
import { ThemeProvider } from './providers/ThemeProvider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Neqo360 - Modern Web Development Agency',
    template: '%s | Neqo360'
  },
  description: 'Neqo360 is a modern web development agency specializing in React, Next.js, and TypeScript. We create fast, accessible, and scalable web applications.',
  keywords: [
    'web development',
    'React',
    'Next.js',
    'TypeScript',
    'frontend development',
    'web agency',
    'custom software',
    'responsive design',
    'progressive web apps'
  ],
  authors: [{ name: 'Neqo360 Team' }],
  creator: 'Neqo360',
  publisher: 'Neqo360',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://neqo360.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://neqo360.com',
    title: 'Neqo360 - Modern Web Development Agency',
    description: 'Neqo360 is a modern web development agency specializing in React, Next.js, and TypeScript. We create fast, accessible, and scalable web applications.',
    siteName: 'Neqo360',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Neqo360 - Modern Web Development Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neqo360 - Modern Web Development Agency',
    description: 'Neqo360 is a modern web development agency specializing in React, Next.js, and TypeScript.',
    images: ['/og-image.jpg'],
    creator: '@neqo360',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Neqo360',
              url: 'https://neqo360.com',
              logo: 'https://neqo360.com/logo.png',
              description: 'Modern web development agency specializing in React, Next.js, and TypeScript',
              address: {
                '@type': 'PostalAddress',
                addressCountry: 'US',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'customer service',
                email: 'neqo360@gmail.com',
              },
              sameAs: [
                'https://twitter.com/neqo360',
                'https://linkedin.com/company/neqo360',
                'https://github.com/neqo360',
              ],
              serviceArea: {
                '@type': 'GeoCircle',
                geoMidpoint: {
                  '@type': 'GeoCoordinates',
                  latitude: 40.7128,
                  longitude: -74.0060,
                },
                geoRadius: '50000',
              },
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Web Development Services',
                itemListElement: [
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'Web Development',
                      description: 'Custom web applications built with modern technologies',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'React Development',
                      description: 'React and Next.js applications',
                    },
                  },
                  {
                    '@type': 'Offer',
                    itemOffered: {
                      '@type': 'Service',
                      name: 'TypeScript Development',
                      description: 'Type-safe web applications',
                    },
                  },
                ],
              },
            }),
          }}
        />
        
        <link rel="manifest" href="/site.webmanifest" />
        
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />        
        <link rel="apple-touch-icon" href="/apple-touch-icon-iphone-60x60.png" sizes="60x60" />
        <link rel="apple-touch-icon" href="/apple-touch-icon-ipad-76x76.png" sizes="76x76" />
        <link rel="apple-touch-icon" href="/apple-touch-icon-iphone-retina-120x120.png" sizes="120x120" />
        <link rel="apple-touch-icon" href="/apple-touch-icon-ipad-retina-152x152.png" sizes="152x152" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
        
        <meta httpEquiv="Cache-Control" content="public, max-age=31536000, immutable" />
        
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        
        <meta name="theme-color" content="#6366f1" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        
        <meta name="application-name" content="Neqo360" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Neqo360" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <TranslationProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </TranslationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
