import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://neqo360.com'),
  title: {
    default: "Neqo360 - Top Software Development Agency in Sri Lanka",
    template: "%s | Neqo360 - Software Development Agency"
  },
  description: "Leading software development agency in Sri Lanka. We build fast, scalable web applications, mobile apps, and integrated systems. Expert developers, affordable rates, guaranteed results.",
  keywords: [
    "software development Sri Lanka",
    "web development Colombo", 
    "mobile app development Sri Lanka",
    "software company Sri Lanka",
    "web design Sri Lanka",
    "custom software development",
    "React development Sri Lanka",
    "Next.js development",
    "software agency Colombo",
    "tech startup Sri Lanka",
    "affordable software development",
    "professional web development"
  ],
  authors: [{ name: "Neqo360", url: "https://neqo360.com" }],
  creator: "Neqo360",
  publisher: "Neqo360",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'Software Development',
  classification: 'Business',
  openGraph: {
    title: "Neqo360 - Top Software Development Agency in Sri Lanka",
    description: "Leading software development agency in Sri Lanka. We build fast, scalable web applications, mobile apps, and integrated systems.",
    url: "https://neqo360.com",
    siteName: "Neqo360",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Neqo360 - Software Development Agency Sri Lanka",
      },
    ],
    locale: "en_LK",
    type: "website",
    countryName: "Sri Lanka",
  },
  twitter: {
    card: "summary_large_image",
    title: "Neqo360 - Top Software Development Agency in Sri Lanka",
    description: "Leading software development agency in Sri Lanka. Expert developers, affordable rates, guaranteed results.",
    images: ["/twitter-image.jpg"],
    creator: "@neqo360",
    site: "@neqo360",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: "https://neqo360.com",
    languages: {
      'en-LK': 'https://neqo360.com',
      'si-LK': 'https://neqo360.com/si',
      'ta-LK': 'https://neqo360.com/ta',
    },
  },
  other: {
    'msapplication-TileColor': '#6366f1',
    'theme-color': '#6366f1',
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Neqo360",
  "url": "https://neqo360.com",
  "logo": "https://neqo360.com/logo.png",
  "description": "Leading software development agency in Sri Lanka specializing in web applications, mobile apps, and integrated system solutions.",
  "foundingDate": "2023",
  "founders": [{
    "@type": "Person",
    "name": "Neqo360 Team"
  }],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Colombo",
    "addressCountry": "Sri Lanka"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+94-xxx-xxx-xxxx",
    "contactType": "customer service",
    "email": "hello@neqo360.com",
    "availableLanguage": ["English", "Sinhala", "Tamil"]
  },
  "sameAs": [
    "https://www.linkedin.com/company/neqo360",
    "https://twitter.com/neqo360",
    "https://github.com/neqo360"
  ],
  "serviceArea": {
    "@type": "Country",
    "name": "Sri Lanka"
  },
  "areaServed": ["Sri Lanka", "Southeast Asia", "Global"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Software Development Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Web Application Development",
          "description": "Custom web application development with modern technologies"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "LKR",
          "price": "75000+"
        }
      },
      {
        "@type": "Offer", 
        "itemOffered": {
          "@type": "Service",
          "name": "Mobile App Development",
          "description": "Native and cross-platform mobile application development"
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "LKR",
          "price": "150000+"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "50",
    "bestRating": "5",
    "worstRating": "1"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-LK">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="canonical" href="https://neqo360.com" />
        <meta name="geo.region" content="LK" />
        <meta name="geo.placename" content="Colombo" />
        <meta name="geo.position" content="6.9271;79.8612" />
        <meta name="ICBM" content="6.9271, 79.8612" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#6366f1" />
        <meta name="theme-color" content="#6366f1" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <GoogleAnalytics gaId="GA_MEASUREMENT_ID" />
      </body>
    </html>
  );
}
