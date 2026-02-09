export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  image: string;
  imageStyle: 'contain' | 'cover';
  tags: string[];
  category: 'ux' | 'fullstack' | 'leadership';
  status: 'live' | 'archived';
  featured: boolean;
  link?: string;
  year: string;              // Display text: "2026", "2025 - Present"
  startDate?: string;        // For sorting: "2026-02", "2025-08" (YYYY-MM format)
  pinned?: boolean;          // Always appears first regardless of date
  role: string;
}

export const projects: Project[] = [
  {
    id: 'site-evolution',
    slug: 'site-evolution',
    title: 'Site Evolution',
    description: 'Evolution of my personal portfolio site. Current version built with Next.js 15, React 19, and MUI v7.',
    image: '/images/logo.png',
    imageStyle: 'contain',
    tags: ['Next.js', 'React', 'MUI v7', 'TypeScript', 'Responsive'],
    category: 'ux',
    status: 'live',
    featured: true,
    link: '/portfolio/site-evolution/',
    year: '2017 - Present',
    startDate: '2026-01',  // v2 rebuild started Jan 2026
    pinned: true,          // Always first - main portfolio showcase
    role: 'Fullstack Engineer',
  },
  {
    id: 'ask-prism',
    slug: 'ask-prism',
    title: 'Ask Prism',
    description: 'Document Analytics Platform with visual citations. Upload PDFs, ask questions, get answers with exact source highlighting using LangGraph RAG pipeline.',
    image: '/images/portfolio/ask-prism/preview.jpg',
    imageStyle: 'cover',
    tags: ['Next.js', 'TypeScript', 'LangGraph', 'Supabase', 'RAG', 'AI/ML'],
    category: 'fullstack',
    status: 'live',
    featured: true,
    link: '/portfolio/ask-prism/',
    year: '2026',
    startDate: '2026-02',
    role: 'Fullstack Engineer',
  },
  {
    id: 'orbit-lab-project',
    slug: 'orbit-lab-project',
    title: 'Orbit Lab',
    description: 'A 3D flight tracking visualization built with React Three Fiber and three-globe. Real-time aircraft positions on an interactive globe.',
    image: '/images/portfolio/orbit-lab-project/preview.jpg',
    imageStyle: 'cover',
    tags: ['React', 'WebGL', 'TypeScript', 'React Three Fiber (R3F)', 'three-globe', 'OpenSky API'],
    category: 'fullstack',
    status: 'live',
    featured: true,
    link: '/portfolio/orbit-lab/',
    year: '2026',
    startDate: '2026-01',
    role: 'Fullstack Engineer',
  },
  {
    id: 'manuscript-alert',
    slug: 'manuscript-alert',
    title: 'Manuscript Alert',
    description: 'Research paper aggregator for Alzheimer\'s & neuroimaging researchers. Fetches from PubMed, arXiv, bioRxiv, medRxiv with smart keyword matching. v2 planned with React/Django.',
    image: '/images/portfolio/manuscript-alert/preview.jpg',
    imageStyle: 'cover',
    tags: ['Python', 'Streamlit', 'API Integration', 'Research Tools', 'Concurrent Processing'],
    category: 'fullstack',
    status: 'live',
    featured: true,
    link: '/portfolio/manuscript-alert/',
    year: '2025 - Present',
    startDate: '2025-08',
    role: 'Contributor',
  },
  {
    id: 'design-system',
    slug: 'design-system',
    title: 'Design System',
    description: 'Storybook component library showcasing the UI building blocks of this portfolio.',
    image: '/images/storybook.svg',
    imageStyle: 'contain',
    tags: ['Storybook', 'React', 'MUI v7', 'Responsive'],
    category: 'fullstack',
    status: 'live',
    featured: true,
    link: '/portfolio/design-system/',
    year: '2026',
    startDate: '2026-01',
    role: 'Component Library',
  },
  {
    id: 'donation-mentoring',
    slug: 'donation-mentoring',
    title: 'Donation Mentoring',
    description: 'A mentoring platform that pairs one-on-one sessions with UNICEF donations.',
    image: '/images/portfolio/donation-mentoring/current.jpg',
    imageStyle: 'cover',
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Social Impact'],
    category: 'fullstack',
    status: 'live',
    featured: true,
    link: '/portfolio/donation-mentoring/',
    year: '2025 - Present',
    startDate: '2025-12',
    role: 'Fullstack Engineer',
  },
  {
    id: 'bakg',
    slug: 'bakg',
    title: 'Bay Area K Group',
    description: 'Bay Area nonprofit organization with 8,000+ members. Serving as Vice President, IT Support (Webmaster), and Design Committee advisor.',
    image: 'https://i0.wp.com/bayareakgroup.org/wp-content/uploads/2019/01/cropped-Symbol-Original-on-White.png?fit=512%2C512&ssl=1',
    imageStyle: 'contain',
    tags: ['NPO', 'BAKG', 'Leadership', 'WordPress', 'Social Impact'],
    category: 'leadership',
    status: 'live',
    featured: true,
    link: 'https://bayareakgroup.org',
    year: '2016 - Present',
    role: 'VP / Design Committee / IT',
  },
  {
    id: 'webreactor',
    slug: 'webreactor',
    title: 'WebReactor',
    description: 'Front-End development, Branding, and Wireframe design for a web development agency.',
    image: '/v2017/images/WebReactor/logo.png',
    imageStyle: 'contain',
    tags: ['UX/UI', 'Branding'],
    category: 'ux',
    status: 'archived',
    featured: true,
    year: '2017',
    role: 'UX Engineer',
  },
  {
    id: 'tapyn',
    slug: 'tapyn',
    title: 'Tapyn, Inc.',
    description: 'React/Redux development and UX research for a social networking startup.',
    image: '/v2017/images/Tapyn/Logo.svg',
    imageStyle: 'contain',
    tags: ['React', 'Redux', 'UX/UI', 'Branding'],
    category: 'ux',
    status: 'archived',
    featured: true,
    year: '2016',
    role: 'UX Engineer Intern',
  },
  {
    id: 'workato',
    slug: 'workato',
    title: 'Workato',
    description: 'Interaction design course project - UI/UX case study for enterprise integration platform.',
    image: '/v2017/images/Workato/workato-logo-small.png',
    imageStyle: 'contain',
    tags: ['UX/UI', 'Prototyping', 'Axure RP'],
    category: 'ux',
    status: 'archived',
    featured: true,
    year: '2017',
    role: 'IxD Student Project',
  },
  {
    id: 'kurbo',
    slug: 'kurbo',
    title: 'Kurbo',
    description: 'Interaction design course project - mobile UI design case study for health and wellness app.',
    image: '/v2017/images/Kurbo/Kurbo_Logo_Tagline.png',
    imageStyle: 'contain',
    tags: ['UX/UI', 'Prototyping', 'Responsive', 'Axure RP'],
    category: 'ux',
    status: 'archived',
    featured: false,
    year: '2016',
    role: 'IxD Student Project',
  },
  {
    id: 'orange-theme',
    slug: 'orange-theme',
    title: 'CSS Design Exercise',
    description: 'Pure CSS design showcase demonstrating layout and styling techniques.',
    image: '/v2017/portfolio/Orange-Theme/images/001.jpg',
    imageStyle: 'cover',
    tags: ['UX/UI', 'Responsive'],
    category: 'ux',
    status: 'archived',
    featured: false,
    link: '/v2017/portfolio/Orange-Theme/index.html',
    year: '2017',
    role: 'UX Engineer',
  },
  {
    id: 'uxday',
    slug: 'uxday',
    title: 'UX Day @ HFES',
    description: 'Led UX Day event planning for the Human Factors and Ergonomics Society while serving as President of UXA, the User Experience Association student chapter at San Jose State University.',
    image: '/v2017/images/PassionProject/Executive1617.png',
    imageStyle: 'contain',
    tags: ['Leadership', 'WordPress'],
    category: 'leadership',
    status: 'archived',
    featured: false,
    year: '2016-2017',
    role: 'Event Organizer',
  },
];

/**
 * Parse startDate (YYYY-MM) or fall back to year string
 * Returns a comparable number: YYYYMM (e.g., 202602 for Feb 2026)
 */
function parseSortDate(project: Project): number {
  // Use startDate if available (YYYY-MM format)
  if (project.startDate) {
    const [year, month] = project.startDate.split('-').map(Number);
    return year * 100 + (month || 1);
  }

  // Fall back to parsing year string
  const match = project.year.match(/^(\d{4})/);
  const year = match ? parseInt(match[1], 10) : 0;
  return year * 100 + 1; // Default to January if no month
}

/**
 * Sort projects with priority:
 * 1. Pinned projects first (by pinned order if number, otherwise by date)
 * 2. Live projects by date (newest first)
 * 3. Archived projects by date (newest first)
 */
function sortProjects(a: Project, b: Project): number {
  // Pinned projects always first
  if (a.pinned && !b.pinned) return -1;
  if (!a.pinned && b.pinned) return 1;

  // If both pinned, sort by pinned order (if number) or date
  if (a.pinned && b.pinned) {
    // If using numbered pins, sort by number
    if (typeof a.pinned === 'number' && typeof b.pinned === 'number') {
      return a.pinned - b.pinned;
    }
  }

  // Live projects before archived
  if (a.status === 'live' && b.status === 'archived') return -1;
  if (a.status === 'archived' && b.status === 'live') return 1;

  // Within same status, sort by date descending (newest first)
  const dateA = parseSortDate(a);
  const dateB = parseSortDate(b);
  if (dateA !== dateB) {
    return dateB - dateA;
  }

  // If same date, "Present" projects come first
  const aIsPresent = a.year.includes('Present');
  const bIsPresent = b.year.includes('Present');
  if (aIsPresent && !bIsPresent) return -1;
  if (!aIsPresent && bIsPresent) return 1;

  return 0;
}

// Sorted exports: pinned → live (by date) → archived (by date)
export const sortedProjects = [...projects].sort(sortProjects);
export const featuredProjects = sortedProjects.filter((p) => p.featured);
