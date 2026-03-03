# Manuscript Alert v2 Blog Series Plan

> 14 blog posts documenting the migration from Streamlit monolith to FastAPI + Next.js
> Cadence: ~1 blog per day (flexible)
> Project folder: `/Users/tk/code/Manuscript_alert/`

---

## Important Notes

**Manuscript Alert development takes priority over blog writing.** The Manuscript_alert repo is a separate, active project. Migration work there comes first. Blog posts document what's already been done, so they naturally follow behind.

**This plan will evolve.** As migration steps get implemented in Manuscript_alert, the blog plan for those steps (especially Blogs 9-14) may need updates to reflect what actually happened vs. what was planned. Always check the latest state of `/Users/tk/code/Manuscript_alert/` before writing a future-step blog.

**Dates are intentionally omitted.** We don't know the exact pace. Write when ready, publish when done.

---

## How to Write a Blog from This Plan

Use the `/manuscript-blog` slash command. It handles everything:

```
/manuscript-blog
```

This skill will:
1. Read this plan and detect which blogs are already written
2. Show a progress dashboard
3. Gather commit diffs from `/Users/tk/code/Manuscript_alert/`
4. Capture before/after screenshots via git checkout
5. Delegate writing to the `blog-writer` skill (prose quality, style, images)
6. Verify the output (frontmatter, images, quality score)

You can also say "next manuscript blog" or "manuscript blog progress" to trigger it.

---

## Series Overview

Manuscript Alert is a research paper discovery tool for Alzheimer's disease and neuroimaging researchers. It started as a 1,562-line Streamlit monolith (`app.py`). We're rebuilding it as a modern FastAPI + Next.js application with plans for cloud deployment, AI agents, and semantic search.

This series follows the real journey, commit by commit.

**Blogs 1-8:** Based on completed commits (ready to write now)
**Blog 9:** Ready — Step 2 Frontend Redesign completed (commit `c13c083`, 2026-02-28)
**Blogs 10-14:** Based on migration steps not yet implemented (write as work completes)

---

## Blog 1: Saying Goodbye to Streamlit

**Slug:** `manuscript-alert-streamlit-cleanup`
**Tags:** `["Manuscript Alert", "Migration", "UX"]`

**Commits:**
| Phase | SHA | Description |
|-------|-----|-------------|
| Before | `1d6af69~1` (parent of 1d6af69) | Streamlit monolith still intact |
| After | `1d6af69` | Streamlit removed, clean slate |

**Screenshot targets:**
- Before: Streamlit UI (if available from git history, checkout parent commit)
  - `git -C /Users/tk/code/Manuscript_alert show 1d6af69~1:app.py | head -50` (to show the monolith)
- After: Empty canvas, clean directory structure
  - Terminal screenshot of `tree` output showing cleaned project

**Story angle:**
Sometimes the hardest part of building something new is letting go of what already works. The Streamlit app served its purpose, but it was a 1,562-line file that mixed UI, business logic, and data fetching. This post covers why we decided to tear it down and start fresh, focusing on the researchers who use this tool daily and deserve a better experience.

**Key beats:**
1. What Manuscript Alert does (research paper discovery for neuroscience)
2. Why Streamlit worked initially (fast prototyping, single file)
3. Where it broke down (can't customize UI, hard to add features, no mobile)
4. The emotional decision to delete 1,562 lines of working code
5. What we kept (fetchers, processors, services) vs what we deleted

**Word target:** 1200-1500 words

---

## Blog 2: Drawing the Map Before the Journey

**Slug:** `manuscript-alert-migration-plan`
**Tags:** `["Manuscript Alert", "Architecture", "Planning"]`

**Commits:**
| Phase | SHA | Description |
|-------|-----|-------------|
| Before | `1d6af69` | Clean slate, no plan yet |
| After | `6635bce` | Cloud migration plan created |

**Screenshot targets:**
- After: Architecture diagram (`docs/diagram/backend_architecture.jpg`)
- After: Migration plan overview (render the 7-step table from `docs/cloud_migration_plan.md`)

**Story angle:**
Before writing a single line of new code, we needed a map. This post walks through the 7-step migration plan, from testing to AI agents, and explains why each step matters. The focus is on making smart decisions that keep the app usable at every stage, so researchers never lose access to their tools.

**Key beats:**
1. The danger of rewriting without a plan (second system effect)
2. Overview of the 7-step roadmap (Tests → Frontend → Backend → DB → Deploy → Agents → KB)
3. Why "tests first" is non-negotiable
4. The key principle: zero downtime, app works at every step
5. Why we chose FastAPI + Next.js (not Django, not Remix, etc.)
6. What's on the horizon: AI-powered paper discovery

**Word target:** 1000-1200 words

---

## Blog 3: Organizing the Workshop

**Slug:** `manuscript-alert-backend-reorganization`
**Tags:** `["Manuscript Alert", "Backend", "Architecture"]`

**Commits:**
| Phase | SHA | Description |
|-------|-----|-------------|
| Before | `6635bce` | Files scattered in root-level directories |
| After | `a71c920` | Everything under `backend/` folder |

**Screenshot targets:**
- Before: `git -C /Users/tk/code/Manuscript_alert show 6635bce --stat` (scattered dirs)
- After: `tree backend/` showing clean organization
- Diff: side-by-side directory comparison

**Story angle:**
Imagine trying to cook in a kitchen where pots are in the bathroom and spices are in the garage. That was our codebase, with Python modules scattered across the project root next to frontend files. This post covers the first step: giving everything a home.

**Key beats:**
1. Why directory structure matters (especially in a full-stack app)
2. The before: config/, fetchers/, processors/ all at root level alongside frontend/
3. The move: everything into backend/ with proper __init__.py
4. How imports change (and why this is a clean break)
5. Setting up for the next phase: modularity

**Word target:** 800-1000 words

---

## Blog 4: Breaking the Monolith

**Slug:** `manuscript-alert-splitting-monolith`
**Tags:** `["Manuscript Alert", "Backend", "Refactoring"]`

**Commits:**
| Phase | SHA | Description |
|-------|-----|-------------|
| Before | `a71c920` | 688-line `server.py` monolith |
| After | `b2f4d08` | 5 routers + service layer + schemas |

**Screenshot targets:**
- Before: `wc -l server.py` showing 688 lines (checkout `a71c920`)
- After: `tree backend/src/` showing modular structure
- After: API router file showing clean, focused endpoint (e.g., `health.py` at 15 lines)
- Diagram: how requests flow through router → service → fetcher

**Story angle:**
688 lines. That's how long our single API file had grown. Every endpoint, every business rule, every data transformation crammed into one file. This post is about the satisfying process of splitting it apart: 5 focused routers, a proper service layer, and Pydantic schemas for type safety.

**Key beats:**
1. The pain of a monolithic API file (can't find anything, merge conflicts, cognitive overload)
2. The split: health (15 lines), settings (28), papers (151), models (87), backups (56)
3. Extracting the service layer (paper_service at 221 lines, doing the real work)
4. Adding Pydantic schemas for request/response validation
5. The result: each file does one thing, and does it well
6. Stats: +816/-718 lines, but the codebase got simpler

**Word target:** 1200-1500 words

---

## Blog 5: Finding the Right Shape

**Slug:** `manuscript-alert-backend-consolidation`
**Tags:** `["Manuscript Alert", "Backend", "Architecture"]`

**Commits:**
| Phase | SHA | Description |
|-------|-----|-------------|
| Before | `b2f4d08` | Modules split but still at backend/ root |
| After | `2c1be18` | Everything under `backend/src/` package |
| Docs | `04decd7` | Documentation updated to match |

**Screenshot targets:**
- Before/After: directory tree comparison
- After: `tree backend/` showing final structure (src/ for code, config/ for settings, data/ for runtime)
- After: Updated README section showing new structure

**Story angle:**
After splitting the monolith, we still had modules scattered across `backend/`. This post covers the final consolidation: creating a proper Python package at `backend/src/` with clear separation between code, configuration, and data. Plus the often-forgotten step: updating the docs.

**Key beats:**
1. Why the first reorganization wasn't quite right
2. The principle: code in src/, config in config/, data in data/
3. Updating 9 import paths across 5 files (small but careful work)
4. Why documentation matters (commit `04decd7`)
5. The final shape: clean, predictable, ready for testing

**Word target:** 800-1000 words

---

## Blog 6: Upgrading the Toolkit

**Slug:** `manuscript-alert-frontend-modernization`
**Tags:** `["Manuscript Alert", "Frontend", "React"]`

**Commits:**
| Phase | SHA | Description |
|-------|-----|-------------|
| Before | `2c1be18` | Next.js 15, React 18, Tailwind 3 |
| After | `7c92d96` | Next.js 16, React 19, Tailwind 4, new libraries |

**Screenshot targets:**
- After: `package.json` dependencies section (clean, modern versions)
- After: New component structure (`tree frontend/src/components/`)
- After: UI screenshot of the new interface (if available, run the dev server at this commit)

**Story angle:**
Before building the new UI, we needed modern foundations. This wasn't just bumping version numbers. Next.js 16, React 19, and Tailwind CSS 4 are major upgrades that change how you build. This post covers what changed, why it matters for the user experience, and how we prepared the component architecture.

**Key beats:**
1. Why upgrade before building (don't build on old foundations)
2. Next.js 15→16: what researchers get (faster pages, better routing)
3. React 18→19: what it means for interactivity
4. Tailwind 3→4: the design system upgrade
5. New libraries: lucide-react (icons), clsx + tailwind-merge (styling), SSE support
6. The new component architecture: features/ + ui/ + layout/ + hooks/

**Word target:** 1000-1200 words

---

## Blog 7: Building the Safety Net

**Slug:** `manuscript-alert-testing-infrastructure`
**Tags:** `["Manuscript Alert", "Testing", "Quality"]`

**Commits:**
| Phase | SHA | Description |
|-------|-----|-------------|
| Before | `7c92d96` | No automated tests |
| After | `e220ebb` | pytest suite with 344+ tests |

**Screenshot targets:**
- After: Terminal screenshot of `pytest` output showing all tests passing
- After: Test file structure (`tree tests/`)
- After: CI workflow file snippet (GitHub Actions badge)

**Story angle:**
You don't install a fire alarm after the fire. Before touching any more code, we built a comprehensive test suite. 344 tests covering API endpoints, keyword matching, journal scoring, model presets, and backup operations. This post explains why testing comes first in a migration, and what we chose to test.

**Key beats:**
1. Why "tests first" in a migration (you need to know when you break something)
2. What we test: API contracts, keyword matching (136 tests!), journal utils (73 tests)
3. The testing strategy: mock external APIs, use temp directories for file I/O
4. FastAPI TestClient: testing APIs without a running server
5. The confidence boost: 344 tests passing means we can refactor fearlessly
6. Setting up for CI (preview of next post)

**Word target:** 1000-1200 words

---

## Blog 8: Automating Trust

**Slug:** `manuscript-alert-cicd-pipeline`
**Tags:** `["Manuscript Alert", "CI/CD", "DevOps"]`

**Commits:**
| Phase | SHA | Description |
|-------|-----|-------------|
| Before | `e220ebb` | Tests exist but run manually |
| After | `0903208` | Full CI/CD: backend + frontend tests + E2E |
| Fix | `642c644` | Pipeline refinements |
| Share | `036c5cd` | Initial setup shared |

**Screenshot targets:**
- After: GitHub Actions workflow running (green checkmarks)
- After: Playwright E2E test output
- After: CI workflow YAML snippet showing the pipeline stages

**Story angle:**
Tests are only useful if they run every time. This post covers building the CI/CD pipeline: GitHub Actions running backend linting (ruff), 344 pytest tests, frontend component tests (vitest), and full end-to-end tests (Playwright). Every push, every PR, every time. No broken code sneaks through.

**Key beats:**
1. The gap between "I ran tests" and "tests always run"
2. The pipeline: lint → backend tests → frontend tests → build → E2E
3. Adding Playwright E2E tests (152 lines covering full user flows)
4. Frontend component tests: 5 test suites covering all major components
5. The fix cycle (commit `642c644`): even CI/CD needs debugging
6. What "green" means: confidence to move fast

**Word target:** 1000-1200 words

---

## Blog 9: The New Face (Frontend Redesign - Layout & Components)

**Slug:** `manuscript-alert-frontend-redesign`
**Tags:** `["Manuscript Alert", "Frontend", "UX", "Design"]`

**Commits:**
| Phase | SHA | Description |
|-------|-----|-------------|
| Before | `036c5cd` | Pre-redesign (CI/CD pipeline complete) |
| After | `c13c083` | Step 2 Frontend Redesign complete |

**Screenshot targets:**
- Before: Old Streamlit UI (from git history if possible)
- After: New AppShell 3-column layout
- After: SearchPanel with source toggles
- After: PaperFeed with loading states
- After: PaperDetailDrawer expanded view

**Story angle:**
This is where the migration becomes visible. Researchers don't care about routers and schemas. They care about what they see and use. This post covers the frontend redesign: a modern 3-column layout with search controls, paper feed, and detail panel. Built with the new component architecture (features/ + ui/ + layout/).

**Key beats:**
1. What the old Streamlit UI looked like (and its limitations)
2. The new layout: search | feed | detail (3-column AppShell)
3. Key components: SearchPanel, PaperFeed, PaperDetailDrawer, DashboardPanel
4. UI primitives: Card, Toggle, SourceBadge, ScoreIndicator
5. Responsive design: works on mobile (Streamlit didn't)
6. The transition strategy: new components alongside legacy, gradual migration

**Word target:** 1200-1500 words
**Status:** Ready — Step 2 completed 2026-02-28 (commit `c13c083`)

---

## Blog 10: Preparing for the Cloud (Backend v2 API)

**Slug:** `manuscript-alert-backend-v2-api`
**Tags:** `["Manuscript Alert", "Backend", "API", "Architecture"]`

**Commits:**
| Phase | SHA | Description |
|-------|-----|-------------|
| Before | Current main | Unversioned API routes |
| After | Step 3 completion (future) | `/api/v1/` versioned routes, pydantic-settings, SSE |

**Screenshot targets:**
- After: API endpoint table (versioned routes)
- After: SSE streaming demo (if available)
- Diagram: request flow with dependency injection

**Story angle:**
The backend needs to grow up before it can move to the cloud. This post covers versioning the API (`/api/v1/`), adding proper configuration management with pydantic-settings, preparing SSE endpoints for real-time agent updates, and setting up dependency injection. All while keeping the existing frontend working.

**Key beats:**
1. Why API versioning matters (backward compatibility as we evolve)
2. pydantic-settings: configuration from env vars, not hardcoded paths
3. SSE endpoints: preparing for real-time agent activity streams
4. Dependency injection: clean, testable code
5. The backward compatibility strategy: old routes still work during transition

**Word target:** 1000-1200 words

---

## Blog 11: Moving to the Database (Neon Postgres)

**Slug:** `manuscript-alert-neon-database`
**Tags:** `["Manuscript Alert", "Database", "Cloud"]`

**Commits:**
| Phase | SHA | Description |
|-------|-----|-------------|
| Before | Step 3 completion | File-based storage (JSON + Python) |
| After | Step 4 completion (future) | Neon Postgres for all data |

**Screenshot targets:**
- Before: JSON files serving as database (archive.json, settings.py)
- After: Neon dashboard showing tables
- After: Schema diagram showing 4 tables (papers, settings, settings_versions, model_presets)

**Story angle:**
JSON files don't scale. When you want to search, filter, and analyze thousands of papers, you need a real database. This post covers migrating from file-based storage to Neon Postgres: designing the schema, migrating existing data, and keeping a local fallback for offline use.

**Key beats:**
1. Why files hit a wall (can't query, can't share, can't scale)
2. Why Neon (serverless Postgres, free tier, branches for testing)
3. The 4 tables: papers, settings, settings_versions, model_presets
4. Data migration: moving existing JSON/Python data to Postgres
5. The fallback: app still works without DATABASE_URL (local files)
6. What this unlocks: sharing data across devices, proper search

**Word target:** 1000-1200 words

---

## Blog 12: Going Live (Cloud Deployment)

**Slug:** `manuscript-alert-cloud-deployment`
**Tags:** `["Manuscript Alert", "Deployment", "Cloud"]`

**Commits:**
| Phase | SHA | Description |
|-------|-----|-------------|
| Before | Step 4 completion | Local-only application |
| After | Step 5 completion (future) | Vercel (frontend) + Render (backend) + Neon (db) |

**Screenshot targets:**
- After: Live site on Vercel
- After: Architecture diagram showing 3-service deployment
- After: GitHub Actions showing auto-deploy on push

**Story angle:**
From running on one laptop to accessible from anywhere. This post covers deploying the modernized app: frontend to Vercel, backend to Render, database already on Neon. The goal is zero-downtime deployment that auto-updates with every push to main.

**Key beats:**
1. The local-only limitation (only works when your laptop is on)
2. The deployment architecture: Vercel + Render + Neon
3. Frontend on Vercel: automatic builds, global CDN
4. Backend on Render: Docker container, health checks
5. CORS configuration: connecting frontend and backend across domains
6. CI/CD: push to main = auto-deploy everywhere

**Word target:** 1000-1200 words

---

## Blog 13: Teaching the App to Think (AI Agent Pipeline)

**Slug:** `manuscript-alert-ai-agents`
**Tags:** `["Manuscript Alert", "AI", "Agents"]`

**Commits:**
| Phase | SHA | Description |
|-------|-----|-------------|
| Before | Step 5 completion | Manual keyword search only |
| After | Step 6 completion (future) | 7-agent LangGraph pipeline |

**Screenshot targets:**
- After: Agent activity stream in the UI (real-time steps)
- After: Agent pipeline diagram (resolver → fetchers → dedup → summarizer)
- After: Mode switch UI (classic vs agent)

**Story angle:**
What if the app could think like a researcher? Instead of just matching keywords, what if it could understand research context, deduplicate across sources, and summarize trends? This post introduces the AI agent pipeline: 7 specialized agents working together to find and evaluate papers.

**Key beats:**
1. The limitation of keyword matching (misses context, requires expertise)
2. The 7 agents: resolver, 3 fetchers, KB analyst, dedup, summarizer
3. How they work together: LangGraph orchestration
4. Real-time activity stream: watching agents think
5. The classic/agent mode switch (works without API key too)
6. What researchers see: better results, less manual filtering

**Word target:** 1200-1500 words

---

## Blog 14: Building a Research Memory (Knowledge Base)

**Slug:** `manuscript-alert-knowledge-base`
**Tags:** `["Manuscript Alert", "AI", "Knowledge Base"]`

**Commits:**
| Phase | SHA | Description |
|-------|-----|-------------|
| Before | Step 6 completion | No persistent knowledge |
| After | Step 7 completion (future) | Pinecone vector store + SPECTER2 embeddings |

**Screenshot targets:**
- After: KB page showing uploaded papers and projects
- After: Semantic search results (finding related papers by meaning, not keywords)
- Diagram: PDF → chunks → embeddings → Pinecone → search

**Story angle:**
The final piece: giving the app a memory. Researchers build knowledge over years, reading thousands of papers. What if the app could remember what you've read and find new papers that connect to your existing knowledge? This post covers the knowledge base: uploading PDFs, embedding them with SPECTER2, and storing them in Pinecone for semantic search.

**Key beats:**
1. The problem: every search starts from zero (no memory of past reads)
2. SPECTER2: understanding scientific papers (not just keywords)
3. Pinecone: storing and searching paper embeddings
4. The KB workflow: upload PDF → extract → chunk → embed → search
5. Integration with agents: KB analyst scores papers against your library
6. What this means for researchers: personalized paper discovery

**Word target:** 1200-1500 words

---

## Appendix: Commit Reference Table

| # | SHA | Message | Blog(s) | Screenshot Strategy |
|---|-----|---------|---------|-------------------|
| 1 | `1d6af69` | clean up streamlit, getting ready for frontend | Blog 1 | Before: checkout parent, show app.py; After: clean tree |
| 2 | `6635bce` | cloud migration plan | Blog 2 | After: architecture diagram, migration table |
| 3 | `a71c920` | moving files into dedicated backend folder | Blog 3 | Before/After: tree comparison |
| 4 | `b2f4d08` | Split 688-line monolith into FastAPI routers | Blog 4 | Before: wc -l; After: tree backend/src/ |
| 5 | `d39edcf` | README update | Blog 5 | After: README screenshot |
| 6 | `2c1be18` | Consolidate backend under src/ | Blog 5 | Before/After: directory comparison |
| 7 | `04decd7` | Update docs to reflect layout | Blog 5 | After: updated docs |
| 8 | `7c92d96` | frontend libraries update | Blog 6 | After: package.json, component tree |
| 9 | `e220ebb` | test & ci | Blog 7 | After: pytest output, test tree |
| 10 | `0903208` | frontend CI/CD | Blog 8 | After: GitHub Actions, Playwright |
| 11 | `642c644` | pipline fix | Blog 8 | After: green CI |
| 12 | `036c5cd` | share initial setup | Blog 8 | After: final CI state |
| 13 | `c13c083` | Step 2 Frontend Redesign | Blog 9 | Before/After: UI screenshots, component tree |

---

## Screenshot Capture Workflow

For each blog, capture screenshots using git checkout:

```bash
# Navigate to project
cd /Users/tk/code/Manuscript_alert

# Before state (checkout parent of first commit in range)
git stash  # save any local changes
git checkout <before-sha>
# Take screenshots
# ...

# After state
git checkout <after-sha>
# Take screenshots
# ...

# Return to main
git checkout main
git stash pop  # restore local changes
```

For terminal screenshots (directory trees, test output):
```bash
# Use script to capture terminal output
script -q /dev/null tree backend/ | head -40
# Or use the portfolio screenshot tool
npm run screenshot:after <feature-name>
```

For future blogs (Steps 3-7), capture screenshots as work is completed.

---

## Daily Workflow

1. Check which blog is next in the series
2. Read the commit diffs for context:
   ```bash
   git -C /Users/tk/code/Manuscript_alert show <sha> --stat
   git -C /Users/tk/code/Manuscript_alert diff <before-sha>..<after-sha>
   ```
3. Capture screenshots (before/after or after-only)
4. Use `/blog-writer` skill to write the post
5. Place images in `/public/images/blog/<slug>/`
6. Create MDX file at `/src/content/blog/<slug>.mdx`
7. Preview at `localhost:3000/blog/<slug>`

---

## Series Metadata

For `updates.ts` entries, all blogs in this series should use:
- `tier: 'roadmap'`
- `chapter: 'chapter-5'` (or whichever chapter covers external projects)
- Tag with `blogSlug` matching the MDX filename
