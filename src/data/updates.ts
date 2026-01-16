export type UpdateStatus = 'completed' | 'in-progress' | 'planned';
export type UpdateCategory = 'feature' | 'enhancement' | 'bugfix' | 'design' | 'ux' | 'infrastructure';

export interface Update {
  id: string;
  date: string;
  version: string;
  title: string;
  description: string;
  category: UpdateCategory;
  status: UpdateStatus;
  tags: string[];
  details?: string[];
}

export const updates: Update[] = [
  // Planned
  {
    id: 'v3.0.0',
    date: 'TBD',
    version: '3.0.0',
    title: 'Blog Platform',
    description: 'Add MDX-powered blog for articles and thought leadership.',
    category: 'feature',
    status: 'planned',
    tags: ['MDX', 'Blog', 'Content'],
    details: [
      'MDX blog setup with syntax highlighting',
      'Article listing and detail pages',
      'RSS feed generation',
    ],
  },
  {
    id: 'v2.7.0',
    date: 'TBD',
    version: '2.7.0',
    title: 'Discoverability',
    description: 'Improve project discovery with MUI Autocomplete filtering and better social previews.',
    category: 'enhancement',
    status: 'planned',
    tags: ['UX', 'Filtering', 'OG Image', 'MUI Autocomplete'],
    details: [
      'MUI Autocomplete with multi-select for filtering projects by tag/technology',
      'Chip display for active filters',
      'Custom OG image (1200x630)',
    ],
  },
  {
    id: 'v2.6.0',
    date: 'TBD',
    version: '2.6.0',
    title: 'Content Depth',
    description: 'Add richer project details using MUI Stepper and Tabs for case study presentation.',
    category: 'enhancement',
    status: 'planned',
    tags: ['Content', 'Case Studies', 'Skills', 'MUI Stepper', 'MUI Tabs'],
    details: [
      'MUI Stepper for design process walkthrough (Problem → Research → Design → Outcome)',
      'MUI Tabs for organizing case study sections',
      'Skills visualization with progress indicators',
      'MUI ImageList with Masonry layout for project screenshots',
    ],
  },
  {
    id: 'v2.5.0',
    date: 'TBD',
    version: '2.5.0',
    title: 'Contact & Engagement',
    description: 'Add floating contact button and analytics for visitor insights.',
    category: 'feature',
    status: 'planned',
    tags: ['Contact', 'Analytics', 'Engagement', 'MUI SpeedDial'],
    details: [
      'MUI SpeedDial floating action button for quick contact (Email, LinkedIn, GitHub)',
      'Contact CTA section on homepage',
      'Privacy-friendly analytics (Plausible or Vercel)',
    ],
  },
  {
    id: 'v2.4.0',
    date: 'TBD',
    version: '2.4.0',
    title: 'Design System',
    description: 'Public Storybook component library extending the "building in public" philosophy to the component level.',
    category: 'feature',
    status: 'in-progress',
    tags: ['Storybook', 'Design System', 'Components', 'Documentation'],
    details: [
      'Storybook 10 with Vite framework (@storybook/nextjs-vite)',
      'Deployed to /portfolio/design-system/ path',
      'Stories for core components (Navigation, Footer, Cards)',
      'Light/dark theme toggle matching portfolio modes',
      'Accessibility testing with @storybook/addon-a11y',
      'CTA link from Site Evolution page',
      'Footer link for technical visitors',
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
    tags: ['Theme', 'Dark Mode', 'Light Mode', 'UX'],
    details: [
      'Light/dark mode toggle in navigation',
      'System preference detection (prefers-color-scheme)',
      'Theme persistence via localStorage',
      'CSS variables for scrollbars and text selection',
      'Mode-aware color helpers for consistent theming',
    ],
  },
  // In Progress
  {
    id: 'v2.2.1',
    date: '2026-01-11',
    version: '2.2.1',
    title: 'Case Study UX Refinements',
    description: 'Iterative improvements to the Building in Public case study based on UX review.',
    category: 'ux',
    status: 'completed',
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
    tags: ['Architecture', 'Performance', 'SEO'],
    details: [
      'Centralize SEO config in single file',
      'Refactor pages to Server Component + Client Component pattern',
      'Remove redundant layout.tsx files',
      'Reduce JavaScript bundle size',
    ],
  },
  // Completed
  {
    id: 'v2.0.2',
    date: '2026-01-10',
    version: '2.0.2',
    title: 'Projects & SEO Update',
    description: 'Added new portfolio projects, fixed project metadata, and implemented SEO improvements.',
    category: 'enhancement',
    status: 'completed',
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
    tags: ['Materialize', 'jQuery', 'Legacy'],
    details: [
      'Built with Materialize CSS framework',
      'jQuery for interactions',
      'Font Awesome 4.7 icons',
      'Google Analytics integration',
    ],
  },
];
