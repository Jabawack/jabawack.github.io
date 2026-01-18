export type UpdateStatus = 'completed' | 'in-progress' | 'planned';
export type UpdateCategory = 'feature' | 'enhancement' | 'bugfix' | 'design' | 'ux' | 'infrastructure';
export type UpdateTier = 'roadmap' | 'backlog' | 'icebox';
export type UpdatePriority = 'high' | 'medium' | 'low';

export interface Update {
  id: string;
  date: string;
  version?: string;          // Optional - only for roadmap items
  title: string;
  description: string;
  category: UpdateCategory;
  status: UpdateStatus;
  tier: UpdateTier;          // roadmap (versioned) | backlog (prioritized) | icebox (ideas)
  priority?: UpdatePriority; // For backlog ordering
  tags: string[];
  details?: string[];
}

export const updates: Update[] = [
  // ===================
  // ICEBOX (Ideas, unprioritized)
  // ===================
  {
    id: 'icebox-i18n',
    date: 'TBD',
    title: 'Internationalization (i18n)',
    description: 'Multi-language support for Korean and English.',
    category: 'feature',
    status: 'planned',
    tier: 'icebox',
    tags: ['i18n', 'Localization', 'Korean'],
    details: [
      'next-intl or similar i18n library',
      'Language switcher in navigation',
      'Translated content for key pages',
    ],
  },
  {
    id: 'icebox-pdf-resume',
    date: 'TBD',
    title: 'PDF Resume Generator',
    description: 'Auto-generate PDF resume from site data.',
    category: 'feature',
    status: 'planned',
    tier: 'icebox',
    tags: ['PDF', 'Resume', 'Automation'],
    details: [
      'Generate PDF from structured resume data',
      'Multiple templates/themes',
      'Download button on resume page',
    ],
  },
  {
    id: 'icebox-search',
    date: 'TBD',
    title: 'Site Search',
    description: 'Full-text search across portfolio and blog.',
    category: 'feature',
    status: 'planned',
    tier: 'icebox',
    tags: ['Search', 'UX', 'Algolia'],
    details: [
      'Search modal with keyboard shortcut (Cmd+K)',
      'Index portfolio projects and blog posts',
      'Fuzzy matching and highlighting',
    ],
  },

  // ===================
  // BACKLOG (Prioritized, unversioned)
  // ===================
  {
    id: 'backlog-contact',
    date: 'TBD',
    title: 'Contact SpeedDial',
    description: 'Floating contact button for quick access to email, LinkedIn, GitHub.',
    category: 'feature',
    status: 'planned',
    tier: 'backlog',
    priority: 'high',
    tags: ['Contact', 'Engagement', 'MUI SpeedDial'],
    details: [
      'MUI SpeedDial floating action button',
      'Quick contact options (Email, LinkedIn, GitHub)',
      'Mobile-friendly positioning',
    ],
  },
  {
    id: 'backlog-filtering',
    date: 'TBD',
    title: 'Project Filtering',
    description: 'Filter portfolio projects by technology and category.',
    category: 'enhancement',
    status: 'planned',
    tier: 'backlog',
    priority: 'medium',
    tags: ['UX', 'Filtering', 'MUI Autocomplete'],
    details: [
      'MUI Autocomplete with multi-select',
      'Filter by tag/technology',
      'Chip display for active filters',
    ],
  },
  {
    id: 'backlog-analytics',
    date: 'TBD',
    title: 'Analytics Integration',
    description: 'Privacy-friendly analytics for visitor insights.',
    category: 'enhancement',
    status: 'planned',
    tier: 'backlog',
    priority: 'medium',
    tags: ['Analytics', 'Privacy', 'Plausible'],
    details: [
      'Plausible or Vercel Analytics',
      'No cookie banner needed',
      'Basic page view and referrer tracking',
    ],
  },

  // ===================
  // ROADMAP (Committed, versioned)
  // ===================
  // Chapter 4: Landing Page Evolution
  {
    id: 'v2.9.0',
    date: 'TBD',
    version: '2.9.0',
    title: 'Landing Page Polish',
    description: 'Testimonials grid and final polish for new landing page.',
    category: 'ux',
    status: 'planned',
    tier: 'roadmap',
    tags: ['Landing Page', 'Bento Grid', 'Social Proof'],
    details: [
      'Testimonials bento grid with metrics',
      'Performance optimization',
      'Mobile responsive refinements',
      'Accessibility audit',
    ],
  },
  {
    id: 'v2.8.0',
    date: 'TBD',
    version: '2.8.0',
    title: 'Landing Page Advanced Sections',
    description: 'Project spotlight and portfolio gallery with parallax effects.',
    category: 'ux',
    status: 'planned',
    tier: 'roadmap',
    tags: ['Landing Page', 'Parallax', 'Carousel'],
    details: [
      'Project Spotlight with split layout carousel',
      'Portfolio Gallery with sticky parallax stacking',
      'Smooth scrolling with Lenis',
    ],
  },
  {
    id: 'v2.7.0',
    date: 'TBD',
    version: '2.7.0',
    title: 'Landing Page Foundation',
    description: 'New hero section with CTA, skills showcase, and scroll animations.',
    category: 'ux',
    status: 'planned',
    tier: 'roadmap',
    tags: ['Landing Page', 'Hero', 'Framer Motion', 'CTA'],
    details: [
      'Enhanced navbar with shrink-on-scroll',
      'Hero section with "Download Resume" CTA',
      'Skills showcase with tabbed interface',
      'Personal statement with scroll-triggered text reveal',
      'Install Framer Motion for animations',
    ],
  },
  {
    id: 'v2.6.0',
    date: 'TBD',
    version: '2.6.0',
    title: 'orbit-lab-project Portfolio Card',
    description: 'Add orbit-lab-project 3D globe visualization project to portfolio.',
    category: 'feature',
    status: 'in-progress',
    tier: 'roadmap',
    tags: ['Three.js', 'React Three Fiber', 'WebGL', '3D', 'Portfolio'],
    details: [
      'Portfolio card linking to orbit-lab-project on Vercel',
      'Project screenshots and GIFs',
      'Technology tags (R3F, three-globe, OpenSky API)',
    ],
  },
  {
    id: 'v2.5.0',
    date: 'TBD',
    version: '2.5.0',
    title: 'MDX Blog',
    description: 'Transform portfolio into a living knowledge base with MDX-powered blog.',
    category: 'feature',
    status: 'in-progress',
    tier: 'roadmap',
    tags: ['MDX', 'Blog', 'Content', 'RSS'],
    details: [
      'MDX blog setup with syntax highlighting',
      'Article listing and detail pages',
      'RSS feed generation',
      'First post: documenting orbit-lab-project development journey',
    ],
  },
  {
    id: 'v2.4.0',
    date: '2026-01-15',
    version: '2.4.0',
    title: 'Design System',
    description: 'Public Storybook component library extending the "building in public" philosophy to the component level.',
    category: 'feature',
    status: 'completed',
    tier: 'roadmap',
    tags: ['Storybook', 'Design System', 'Components', 'Documentation', 'Vitest'],
    details: [
      'Storybook 10 with Vite framework (@storybook/nextjs-vite)',
      'Stories for core components (Navigation, Footer, ThemeToggle, SiteEvolutionCard)',
      'Light/dark theme toggle matching portfolio modes',
      'Accessibility testing with @storybook/addon-a11y',
      'Components tab in Site Evolution page',
      'Design System card on Portfolio page',
      'Vitest integration with 83% coverage',
    ],
  },
  {
    id: 'v2.3.0',
    date: '2026-01-11',
    version: '2.3.0',
    title: 'Theme System',
    description: 'Add light/dark mode toggle with system preference detection.',
    category: 'feature',
    status: 'completed',
    tier: 'roadmap',
    tags: ['Theme', 'Dark Mode', 'Light Mode', 'UX'],
    details: [
      'Light/dark mode toggle in navigation',
      'System preference detection (prefers-color-scheme)',
      'Theme persistence via localStorage',
      'CSS variables for scrollbars and text selection',
      'Mode-aware color helpers for consistent theming',
    ],
  },
  {
    id: 'v2.2.1',
    date: '2026-01-11',
    version: '2.2.1',
    title: 'Case Study UX Refinements',
    description: 'Iterative improvements to the Building in Public case study based on UX review.',
    category: 'ux',
    status: 'completed',
    tier: 'roadmap',
    tags: ['UX', 'Navigation', 'MUI Stepper', 'Scroll-spy'],
    details: [
      'Replaced accordions with scrollable sections for visible content length',
      'Added scroll-spy navigation dots (MUI Stepper) for chapter navigation',
      'Side-by-side comparison table replacing toggle view',
      'Breadcrumbs and shared page header with full-width progress bar',
      'Renamed "Portfolio Homepage" to "Site Evolution"',
      'Navigation active state highlighting for current page',
    ],
  },
  {
    id: 'v2.2.0',
    date: '2026-01-10',
    version: '2.2.0',
    title: 'Building in Public',
    description: 'Transform the portfolio into a living case study with chapter-based storytelling and progress visualization.',
    category: 'ux',
    status: 'completed',
    tier: 'roadmap',
    tags: ['UX', 'Storytelling', 'Case Study', 'MUI Accordion', 'MUI Tabs'],
    details: [
      'Hero progress bar showing overall completion',
      'Chapter-based narrative structure (9-Year Gap → Foundation → Polish & UX → Content Platform)',
      'UX storytelling with cognitive psychology terminology',
      'Before/after toggle comparison for v1 to v2 transition',
      'Status chips and expandable chapter cards',
      'Journey/Changelog tabs to serve different audiences (UX readers vs engineers)',
    ],
  },
  {
    id: 'v2.1.0',
    date: '2026-01-10',
    version: '2.1.0',
    title: 'Architecture Cleanup',
    description: 'Refactor to Server + Client component pattern for better performance and maintainability.',
    category: 'infrastructure',
    status: 'completed',
    tier: 'roadmap',
    tags: ['Architecture', 'Performance', 'SEO'],
    details: [
      'Centralize SEO config in single file',
      'Refactor pages to Server Component + Client Component pattern',
      'Remove redundant layout.tsx files',
      'Reduce JavaScript bundle size',
    ],
  },
  {
    id: 'v2.0.2',
    date: '2026-01-10',
    version: '2.0.2',
    title: 'Projects & SEO Update',
    description: 'Added new portfolio projects, fixed project metadata, and implemented SEO improvements.',
    category: 'enhancement',
    status: 'completed',
    tier: 'roadmap',
    tags: ['SEO', 'Portfolio', 'Metadata'],
    details: [
      'Added Bay Area K Group (BAKG) nonprofit project',
      'Updated Workato & Kurbo to IxD Student Projects',
      'Restored progress UI to portfolio homepage',
      'Added SEO (Search Engine Optimization): sitemap.xml, robots.txt, Open Graph, Twitter cards',
    ],
  },
  {
    id: 'v2.0.1',
    date: '2026-01-08',
    version: '2.0.1',
    title: 'Navigation & Footer Components',
    description: 'Added responsive navigation with mobile drawer and footer with social links.',
    category: 'feature',
    status: 'completed',
    tier: 'roadmap',
    tags: ['Components', 'Responsive', 'Navigation'],
    details: [
      'Sticky header with scroll-triggered background',
      'Mobile-friendly drawer navigation',
      'Social links in footer (Email, LinkedIn, GitHub)',
    ],
  },
  {
    id: 'v2.0.0',
    date: '2026-01-08',
    version: '2.0.0',
    title: 'Portfolio Site Modernization',
    description: 'Complete rebuild using Next.js 15, React 19, and MUI v7. Modern dark theme with minimalist design.',
    category: 'feature',
    status: 'completed',
    tier: 'roadmap',
    tags: ['Next.js', 'React', 'MUI', 'TypeScript'],
    details: [
      'Migrated from static HTML/CSS/jQuery to Next.js App Router',
      'Implemented MUI v7 with custom dark theme',
      'Added static export for GitHub Pages deployment',
      'Created agentic-style updates timeline',
      'Archived 2017 site at /v2017/',
    ],
  },
  {
    id: 'v1.0.0',
    date: '2017-01-01',
    version: '1.0.0',
    title: 'Original Static Site',
    description: 'First portfolio using Materialize CSS and jQuery. Now archived at /v2017/.',
    category: 'feature',
    status: 'completed',
    tier: 'roadmap',
    tags: ['Materialize', 'jQuery', 'Legacy'],
    details: [
      'Built with Materialize CSS framework',
      'jQuery for interactions',
      'Font Awesome 4.7 icons',
      'Google Analytics integration',
    ],
  },
];

// Helper functions
export const getRoadmapUpdates = () => updates.filter((u) => u.tier === 'roadmap');
export const getBacklogUpdates = () => updates.filter((u) => u.tier === 'backlog');
export const getIceboxUpdates = () => updates.filter((u) => u.tier === 'icebox');
