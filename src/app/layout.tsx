import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ThemeRegistry from '@/components/layout/ThemeRegistry';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import AgentationWrapper from '@/components/layout/AgentationWrapper';
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
    'UX Engineer with 20+ years building fullstack web apps with React, TypeScript, Python, and Next.js. From design systems to AI pipelines.',
  keywords: ['UX Engineer', 'Fullstack Engineer', 'React', 'TypeScript', 'Next.js', 'Python', 'Django', 'Frontend Engineer', 'AI', 'LLM', 'Design System', 'Portfolio'],
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
      'UX Engineer with 20+ years building fullstack web apps with React, TypeScript, Python, and Next.js.',
    images: [
      {
        url: '/images/logo.png',
        width: 512,
        height: 512,
        alt: 'TK - UX Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TK | Fullstack UX Engineer',
    description:
      'UX Engineer with 20+ years building fullstack web apps with React, TypeScript, Python, and Next.js.',
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
          <AgentationWrapper />
        </ThemeRegistry>
      </body>
    </html>
  );
}
