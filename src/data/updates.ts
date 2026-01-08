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
  {
    id: 'v2.0.0',
    date: '2026-01-08',
    version: '2.0.0',
    title: 'Portfolio Site Modernization',
    description: 'Complete rebuild using Next.js 15, React 19, and MUI v7. Modern dark theme with minimalist design.',
    category: 'feature',
    status: 'in-progress',
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
    id: 'v2.0.1',
    date: '2026-01-08',
    version: '2.0.1',
    title: 'Navigation & Footer Components',
    description: 'Added responsive navigation with mobile drawer and footer with social links.',
    category: 'feature',
    status: 'in-progress',
    tags: ['Components', 'Responsive', 'Navigation'],
    details: [
      'Sticky header with scroll-triggered background',
      'Mobile-friendly drawer navigation',
      'Social links in footer (Email, LinkedIn, GitHub)',
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

export const getUpdatesByStatus = (status: UpdateStatus) =>
  updates.filter((u) => u.status === status);

export const getUpdatesByCategory = (category: UpdateCategory) =>
  updates.filter((u) => u.category === category);

// Status colors for the timeline
export const statusColors: Record<UpdateStatus, string> = {
  'completed': '#4caf50',
  'in-progress': '#00f7ff',
  'planned': '#666666',
};

// Category colors for chips
export const categoryColors: Record<UpdateCategory, string> = {
  'feature': '#2047f4',
  'enhancement': '#9c27b0',
  'bugfix': '#f44336',
  'design': '#ff9800',
  'ux': '#e91e63',
  'infrastructure': '#607d8b',
};
