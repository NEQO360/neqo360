import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { TranslationProvider } from './providers/TranslationProvider';
import ToastProvider from './providers/ToastProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Neqo360 - Digital Solutions',
  description: 'We\'re a lean Sri Lankan software development agency. No bloated processes, no complexity. Just high-quality web apps, mobile solutions, and integrated systems that scale.',
  keywords: 'software development, web applications, mobile apps, Sri Lanka, digital solutions',
  authors: [{ name: 'Neqo360' }],
  creator: 'Neqo360',
  publisher: 'Neqo360',
  robots: 'index, follow',
  openGraph: {
    title: 'Neqo360 - Digital Solutions',
    description: 'We\'re a lean Sri Lankan software development agency. No bloated processes, no complexity. Just high-quality web apps, mobile solutions, and integrated systems that scale.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Neqo360',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neqo360 - Digital Solutions',
    description: 'We\'re a lean Sri Lankan software development agency. No bloated processes, no complexity. Just high-quality web apps, mobile solutions, and integrated systems that scale.',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#6366f1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TranslationProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
