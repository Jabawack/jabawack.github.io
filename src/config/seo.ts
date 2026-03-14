import type { Metadata } from 'next';

export const siteConfig = {
  url: 'https://jabawack.github.io',
  name: 'TK Portfolio',
  author: 'TK',
  description:
    'UX Engineer with 20+ years building fullstack web apps with React, TypeScript, Python, and Next.js. From design systems to AI pipelines.',
};

// Page-specific SEO config
const pages: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'TK | Fullstack UX Engineer',
    description: siteConfig.description,
  },
  '/about/': {
    title: 'About',
    description: 'Engineer and UX Researcher with 20+ years shipping products. 5 patents, mentors engineers, and bridges the gap between UX and fullstack engineering.',
  },
  '/resume/': {
    title: 'Resume',
    description: "TK's resume — React, TypeScript, Python, Django, Next.js. 20+ years fullstack engineering with UX depth. Available as PDF download.",
  },
  '/portfolio/': {
    title: 'Portfolio',
    description: 'Projects by TK: AI document analytics, 3D flight visualization, research paper tools, and a design system. React, Python, and Next.js.',
  },
  '/portfolio/site-evolution/': {
    title: 'Site Evolution',
    description: 'From 2017 jQuery to Next.js 15 — the complete rebuild journey, UX decisions, and technical choices.',
  },
  '/portfolio/donation-mentoring/': {
    title: 'Donation Mentoring',
    description: 'A mentoring platform that pairs one-on-one sessions with UNICEF donations.',
  },
  '/portfolio/ask-prism/': {
    title: 'Ask Prism',
    description: 'Document Analytics Platform with visual citations - LangGraph RAG pipeline with multi-model verification.',
  },
  '/portfolio/orbit-lab/': {
    title: 'Orbit Lab',
    description: '3D flight tracking visualization with React Three Fiber and three-globe - real-time aircraft on an interactive globe.',
  },
  '/portfolio/design-system/': {
    title: 'Design System',
    description: 'Material UI component library built with Storybook — design tokens, theming, and accessible React components powering this portfolio.',
  },
  '/portfolio/manuscript-alert/': {
    title: 'Manuscript Alert',
    description: 'Research paper aggregator for Alzheimer\'s & neuroimaging - fetches from PubMed, arXiv, bioRxiv, medRxiv with smart keyword matching.',
  },
  '/blog/': {
    title: 'Blog',
    description: 'Case studies and build logs: AI components, React architecture, UX decisions, and the journey from jQuery to Next.js. Written by TK.',
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
