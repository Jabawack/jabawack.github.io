import type { Metadata } from 'next';

export const siteConfig = {
  url: 'https://jabawack.github.io',
  name: 'TK Portfolio',
  author: 'TK',
  description:
    'Fullstack UX Engineer with 20+ years building scalable web apps with React, Python, and Django. Passionate about crafting intuitive products and mentoring engineers.',
};

// Page-specific SEO config
const pages: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'TK | Fullstack UX Engineer',
    description: siteConfig.description,
  },
  '/about/': {
    title: 'About',
    description: 'Learn about TK - Fullstack UX Engineer with 20+ years of experience building web applications.',
  },
  '/resume/': {
    title: 'Resume',
    description: "View or download TK's resume - Fullstack UX Engineer with 20+ years of experience.",
  },
  '/portfolio/': {
    title: 'Portfolio',
    description: 'Explore projects by TK - web applications, UX design, and fullstack development.',
  },
  '/portfolio/site-evolution/': {
    title: 'Site Evolution',
    description: 'From 2017 jQuery to Next.js 15 — the complete rebuild journey, UX decisions, and technical choices.',
  },
  '/portfolio/donation-mentoring/': {
    title: 'Donation Mentoring',
    description: 'A mentoring platform that pairs one-on-one sessions with UNICEF donations.',
  },
  '/portfolio/design-system/': {
    title: 'Design System',
    description: 'Storybook component library showcasing the UI building blocks of this portfolio.',
  },
  '/blog/': {
    title: 'Blog',
    description: 'Articles about web development, design, and technology.',
  },
};

/**
 * Get metadata for a specific page path
 * Merges page-specific config with defaults
 */
export function getMetadata(path: string): Metadata {
  const page = pages[path] || pages['/'];

  return {
    title: page.title,
    description: page.description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: `${siteConfig.url}${path}`,
    },
  };
}

// Export pages for sitemap generation
export const allPages = Object.keys(pages);
