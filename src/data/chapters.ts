/**
 * chapters.ts - Chapter definitions with derived milestone data
 *
 * ARCHITECTURE: Single Source of Truth
 * ------------------------------------
 * - updates.ts is the ONLY place to add/edit versions and milestones
 * - This file contains chapter story content (unique narrative)
 * - Milestones, status, and version ranges are DERIVED from updates.ts
 *
 * TO ADD A NEW VERSION:
 * 1. Add entry to updates.ts with `chapter` field (e.g., chapter: 'chapter-4')
 * 2. Done! This file automatically picks it up via getUpdatesByChapter()
 *
 * DO NOT manually add milestones here - they will be overwritten by derived data.
 */
import { getUpdatesByChapter, ChapterId, UpdateStatus } from './updates';

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

/**
 * Chapter definitions with unique content (story).
 * Milestones, status, and version ranges are derived from updates.ts
 */
interface ChapterDefinition {
  id: ChapterId;
  title: string;
  story: string[];
}

const chapterDefinitions: ChapterDefinition[] = [
  {
    id: 'chapter-1',
    title: 'Chapter 1: The 9-Year Gap',
    story: [
      'The original 2017 portfolio was built with jQuery and Materialize CSS—the stack of its era. It worked. For nine years, "working" felt like enough. Life happened: new jobs, new cities, new priorities. The portfolio sat quietly, doing its job of existing.',
      'But technology doesn\'t wait. jQuery became a punchline. Materialize CSS went unmaintained (last update: 2020). The site accumulated UX debt invisibly: inconsistent navigation patterns forced visitors to rebuild mental models on each page. Projects buried three clicks deep with no information scent. A 3-second load time that felt acceptable in 2017 now signaled neglect.',
      'The trigger? Preparing for a job search and realizing the portfolio itself had become an anti-portfolio—demonstrating outdated skills rather than current capabilities. The question became: patch or rebuild?',
      'Patching would preserve the familiar but perpetuate the problems. A ground-up rebuild meant starting from declarative React instead of imperative jQuery, type-safe TypeScript instead of hope-driven JavaScript, component-based architecture instead of copy-paste HTML. The cost was higher upfront, but the foundation would support years of iteration.',
      'The transformation touched everything: from manual FTP uploads (with their deployment anxiety) to git-push-and-forget automation. From vanilla CSS specificity wars to MUI\'s design tokens. From "view source" spaghetti to a codebase that explains itself. Nine years of web evolution, compressed into one rebuild.',
    ],
  },
  {
    id: 'chapter-2',
    title: 'Chapter 2: Foundation & Infrastructure',
    story: [
      'With the core rebuild complete, attention turned to the "boring" infrastructure that makes everything else possible. Navigation, SEO, architecture—unsexy work that compounds over time.',
      'Navigation design applied Fitts\'s Law: the sticky header keeps navigation within easy reach regardless of scroll position. On mobile, the drawer pattern respects thumb zones—primary actions clustered where thumbs naturally rest. These micro-optimizations reduce motor effort across hundreds of interactions.',
      'SEO infrastructure addressed a hard truth: a beautiful portfolio is worthless if undiscoverable. Sitemap generation, Open Graph tags, Twitter cards, semantic HTML—each piece improves the site\'s legibility to machines that decide what humans see. The archived v2017 site at /v2017/ preserves history while signaling evolution.',
      'The Server/Client component refactor (v2.1.0) exemplified "invisible UX." Users don\'t notice faster initial loads or smaller JavaScript bundles—they just don\'t experience the friction of slowness. By rendering static content on the server and hydrating only interactive elements, the site loads like a static page but behaves like an app.',
    ],
  },
  {
    id: 'chapter-3',
    title: 'Chapter 3: Polish & UX',
    story: [
      'Infrastructure complete, focus shifts to the experiential layer—microinteractions and feedback loops that build user confidence. Every enhancement follows one question: "Does this reduce friction or add it?"',
      'This case study (v2.2.0) transforms the rebuild process itself into content. Progress bars, chapter navigation, and before/after comparisons turn transparency into engagement. Users don\'t just see a portfolio—they see how it\'s made.',
      'A real example: the original design showed both the narrative chapters AND a detailed changelog on the same page—two chronological views of identical information. The cognitive load was obvious once noticed: users had to process the same content twice in different formats. The solution? Tabs. "Journey" for UX-focused readers who want the story; "Changelog" for engineers who want version details. Same content, different mental models, user chooses.',
      'Light/dark mode respects user autonomy and system preferences. It\'s not just aesthetic—it\'s acknowledging that users have contexts and preferences that deserve accommodation.',
      'The Design System (v2.4.0) extends the "building in public" philosophy to the component level. Storybook transforms isolated components into interactive documentation—each story captures variants, states, and edge cases. Visitors see not just the portfolio, but the systematic thinking behind it. This is meta-portfolio: the tooling itself becomes evidence of capability.',
    ],
  },
  {
    id: 'chapter-4',
    title: 'Chapter 4: Content & Growth',
    story: [
      'With the foundation polished, the portfolio expands into new territory. orbit-lab-project (v2.5.0) represents a deliberate push into 3D web graphics—React Three Fiber, shader programming, GPU-accelerated rendering. Skills increasingly relevant as web experiences become more immersive. The result: a flight visualization globe deployed on Vercel, opening doors to creative coding.',
      'The MDX Blog (v2.6.0) transforms the portfolio from static showcase to living knowledge base. A portfolio shows what you\'ve done; a blog shows how you think. MDX enables embedded interactivity—code examples, diagrams, videos. The first post documents the orbit-lab-project journey in real-time.',
      'With the blog in place, documentation becomes a first-class feature. Each enhancement gets its own story—not just release notes, but the reasoning behind decisions. Click-to-Skip (v2.6.1) respects user time. Contextual Navigation (v2.6.2) creates bidirectional links between Journey, Changelog, and Blog. Loading Card UX (v2.6.3) adds a dwell period before collapse—small touches that respect attention.',
      'Ask Prism (v2.7.0) showcases AI engineering capabilities—a document analytics platform with visual citations. The project demonstrates LangGraph RAG pipelines, multi-model verification, and a comprehensive AI Elements component library with 40+ patterns for displaying chain-of-thought reasoning, tool usage, and conversational AI interfaces.',
    ],
  },
  {
    id: 'chapter-5',
    title: 'Chapter 5: Landing Page Evolution',
    story: [
      'First impressions matter. The landing page is the portfolio\'s handshake—it needs to communicate who I am, what I do, and why it matters, all within seconds. The current bento-style layout works, but modern portfolio sites have raised the bar with scroll-driven storytelling and purposeful animation.',
      'The redesign draws inspiration from contemporary SaaS landing pages: a clear hero section with a strong call-to-action ("Download Resume"), tabbed skill showcases that let visitors explore at their own pace, and scroll-triggered text reveals that create emphasis without overwhelming.',
      'Technical implementation leverages Framer Motion for performant animations that respect user preferences (prefers-reduced-motion). The sticky parallax gallery creates depth and memorability. The bento testimonials grid provides social proof at a glance—metrics and quotes from colleagues that build credibility.',
      'This chapter represents a shift from "functional portfolio" to "memorable experience." Each section is a dedicated component, built for reusability and tested in Storybook. The goal: a landing page that demonstrates not just what I\'ve built, but how I think about building.',
    ],
  },
];

/**
 * Map UpdateStatus to MilestoneStatus
 */
function toMilestoneStatus(status: UpdateStatus): MilestoneStatus {
  return status as MilestoneStatus;
}

/**
 * Derive chapter status from its milestones
 */
function deriveChapterStatus(milestones: Milestone[]): MilestoneStatus {
  if (milestones.length === 0) return 'planned';
  if (milestones.every((m) => m.status === 'completed')) return 'completed';
  if (milestones.some((m) => m.status === 'in-progress' || m.status === 'completed')) return 'in-progress';
  return 'planned';
}

/**
 * Derive version range string from milestones
 */
function deriveVersionRange(milestones: Milestone[]): string {
  if (milestones.length === 0) return 'TBD';
  if (milestones.length === 1) return milestones[0].version;
  return `${milestones[0].version} → ${milestones[milestones.length - 1].version}`;
}

/**
 * Build chapters by combining definitions with derived data from updates.ts
 */
function buildChapters(): Chapter[] {
  return chapterDefinitions.map((def) => {
    const updates = getUpdatesByChapter(def.id);
    const milestones: Milestone[] = updates.map((u) => ({
      version: u.version || '',
      title: u.title,
      status: toMilestoneStatus(u.status),
    }));

    return {
      id: def.id,
      title: def.title,
      status: deriveChapterStatus(milestones),
      versions: deriveVersionRange(milestones),
      story: def.story,
      milestones,
    };
  });
}

// Export the derived chapters
export const chapters: Chapter[] = buildChapters();

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

export const getChapterByVersion = (version: string) => {
  return chapters.find((chapter) =>
    chapter.milestones.some((m) => m.version === version)
  );
};
