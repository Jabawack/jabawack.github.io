import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeRegistry from '@/components/layout/ThemeRegistry';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import { siteConfig } from '@/config/seo';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: 'TK | Fullstack UX Engineer',
    template: '%s | TK',
  },
  description:
    'Fullstack UX Engineer with 20+ years building scalable web apps with React, Python, and Django. Passionate about crafting intuitive products and mentoring engineers.',
  keywords: ['Fullstack Engineer', 'UX Engineer', 'React', 'TypeScript', 'Python', 'Django', 'Portfolio'],
  authors: [{ name: 'TK' }],
  creator: 'TK',
  icons: {
    icon: '/images/logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: 'TK Portfolio',
    title: 'TK | Fullstack UX Engineer',
    description:
      'Fullstack UX Engineer with 20+ years building scalable web apps with React, Python, and Django.',
    images: [
      {
        url: '/images/logo.png',
        width: 512,
        height: 512,
        alt: 'TK - Fullstack UX Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TK | Fullstack UX Engineer',
    description:
      'Fullstack UX Engineer with 20+ years building scalable web apps with React, Python, and Django.',
    images: ['/images/logo.png'],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth">
      <body>
        <ThemeRegistry>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
