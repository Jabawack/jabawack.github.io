export type MilestoneStatus = 'completed' | 'in-progress' | 'planned';

export interface Milestone {
  version: string;
  title: string;
  status: MilestoneStatus;
}

export interface Chapter {
  id: string;
  title: string;
  status: MilestoneStatus;
  versions: string;
  story: string[];
  milestones: Milestone[];
}

export const chapters: Chapter[] = [
  {
    id: 'chapter-1',
    title: 'Chapter 1: The 9-Year Gap',
    status: 'completed',
    versions: 'v1.0.0 → v2.0.0',
    story: [
      'The original 2017 portfolio was built with jQuery and Materialize CSS—the stack of its era. It worked. For nine years, "working" felt like enough. Life happened: new jobs, new cities, new priorities. The portfolio sat quietly, doing its job of existing.',
      'But technology doesn\'t wait. jQuery became a punchline. Materialize CSS went unmaintained (last update: 2020). The site accumulated UX debt invisibly: inconsistent navigation patterns forced visitors to rebuild mental models on each page. Projects buried three clicks deep with no information scent. A 3-second load time that felt acceptable in 2017 now signaled neglect.',
      'The trigger? Preparing for a job search and realizing the portfolio itself had become an anti-portfolio—demonstrating outdated skills rather than current capabilities. The question became: patch or rebuild?',
      'Patching would preserve the familiar but perpetuate the problems. A ground-up rebuild meant starting from declarative React instead of imperative jQuery, type-safe TypeScript instead of hope-driven JavaScript, component-based architecture instead of copy-paste HTML. The cost was higher upfront, but the foundation would support years of iteration.',
      'The transformation touched everything: from manual FTP uploads (with their deployment anxiety) to git-push-and-forget automation. From vanilla CSS specificity wars to MUI\'s design tokens. From "view source" spaghetti to a codebase that explains itself. Nine years of web evolution, compressed into one rebuild.',
    ],
    milestones: [
      { version: 'v1.0.0', title: 'Original Site (jQuery, Materialize CSS)', status: 'completed' },
      { version: 'v2.0.0', title: 'Complete Rebuild (Next.js 15, MUI 7, TypeScript)', status: 'completed' },
    ],
  },
  {
    id: 'chapter-2',
    title: 'Chapter 2: Foundation & Infrastructure',
    status: 'completed',
    versions: 'v2.0.1 → v2.1.0',
    story: [
      'With the core rebuild complete, attention turned to the "boring" infrastructure that makes everything else possible. Navigation, SEO, architecture—unsexy work that compounds over time.',
      'Navigation design applied Fitts\'s Law: the sticky header keeps navigation within easy reach regardless of scroll position. On mobile, the drawer pattern respects thumb zones—primary actions clustered where thumbs naturally rest. These micro-optimizations reduce motor effort across hundreds of interactions.',
      'SEO infrastructure addressed a hard truth: a beautiful portfolio is worthless if undiscoverable. Sitemap generation, Open Graph tags, Twitter cards, semantic HTML—each piece improves the site\'s legibility to machines that decide what humans see. The archived v2017 site at /v2017/ preserves history while signaling evolution.',
      'The Server/Client component refactor (v2.1.0) exemplified "invisible UX." Users don\'t notice faster initial loads or smaller JavaScript bundles—they just don\'t experience the friction of slowness. By rendering static content on the server and hydrating only interactive elements, the site loads like a static page but behaves like an app.',
    ],
    milestones: [
      { version: 'v2.0.1', title: 'Navigation (Responsive header, mobile drawer)', status: 'completed' },
      { version: 'v2.0.2', title: 'SEO (Sitemap, Open Graph, metadata)', status: 'completed' },
      { version: 'v2.1.0', title: 'Architecture (Server/Client component pattern)', status: 'completed' },
    ],
  },
  {
    id: 'chapter-3',
    title: 'Chapter 3: Polish & UX',
    status: 'in-progress',
    versions: 'v2.2.0 → v2.8.0',
    story: [
      'Infrastructure complete, focus shifts to the experiential layer—microinteractions and feedback loops that build user confidence. Every enhancement follows one question: "Does this reduce friction or add it?"',
      'This case study (v2.2.0) transforms the rebuild process itself into content. Progress bars, chapter navigation, and before/after comparisons turn transparency into engagement. Users don\'t just see a portfolio—they see how it\'s made.',
      'A real example: the original design showed both the narrative chapters AND a detailed changelog on the same page—two chronological views of identical information. The cognitive load was obvious once noticed: users had to process the same content twice in different formats. The solution? Tabs. "Journey" for UX-focused readers who want the story; "Changelog" for engineers who want version details. Same content, different mental models, user chooses.',
      'Light/dark mode respects user autonomy and system preferences. It\'s not just aesthetic—it\'s acknowledging that users have contexts and preferences that deserve accommodation.',
      'The Design System (v2.4.0) extends the "building in public" philosophy to the component level. Storybook transforms isolated components into interactive documentation—each story captures variants, states, and edge cases. Visitors see not just the portfolio, but the systematic thinking behind it. This is meta-portfolio: the tooling itself becomes evidence of capability.',
      'The MDX Blog (v2.5.0) transforms the portfolio from static showcase to living knowledge base. A portfolio shows what you\'ve done; a blog shows how you think. MDX enables embedded interactivity—code examples users can run, diagrams they can explore. The first use case: documenting the orbit-lab-project development journey in real-time.',
      'orbit-lab-project (v2.6.0) represents a new direction—building reusable visualization frameworks. A 3D globe built with React Three Fiber and three-globe, deployed separately on Vercel, but linked as a portfolio piece. The blog documents the journey; the portfolio showcases the result.',
      'Planned enhancements apply established UX heuristics: SpeedDial for contact uses Fitts\'s Law (frequently used actions should be easily reachable). Autocomplete filtering leverages recognition over recall—users see available tags rather than guessing search terms.',
    ],
    milestones: [
      { version: 'v2.2.0', title: 'Building in Public (Case study foundation)', status: 'completed' },
      { version: 'v2.2.1', title: 'UX Refinements (Scroll-spy nav, comparison table)', status: 'completed' },
      { version: 'v2.3.0', title: 'Theme System (Light/dark mode)', status: 'completed' },
      { version: 'v2.4.0', title: 'Design System (Storybook component library)', status: 'completed' },
      { version: 'v2.5.0', title: 'MDX Blog (Articles, RSS feed)', status: 'in-progress' },
      { version: 'v2.6.0', title: 'orbit-lab-project Portfolio Card (3D globe visualization)', status: 'in-progress' },
      { version: 'v2.7.0', title: 'Contact & Engagement (SpeedDial, analytics)', status: 'planned' },
      { version: 'v2.8.0', title: 'Discoverability (Autocomplete filtering)', status: 'planned' },
    ],
  },
];

// Helper functions to derive counts from data
export const getAllMilestones = () => chapters.flatMap((c) => c.milestones);

export const getMilestoneStats = () => {
  const all = getAllMilestones();
  return {
    total: all.length,
    completed: all.filter((m) => m.status === 'completed').length,
    inProgress: all.filter((m) => m.status === 'in-progress').length,
    planned: all.filter((m) => m.status === 'planned').length,
  };
};

export const getMilestoneProgress = () => {
  const { total, completed } = getMilestoneStats();
  return Math.round((completed / total) * 100);
};
