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
**Blog 10:** Ready — Step 3 Backend Restructure & SSE completed (commit `bdf9ea8`, 2026-03-01; fix `b424ef4`, 2026-03-02)
**Blogs 11-14:** Based on migration steps not yet implemented (write as work completes)

## Real Backstory (for writing context)

**Authors:** TK (engineering, all migration commits) and [DK](https://github.com/dknkim)/Donghoon (domain expert, daily power user, tester). Blog is written from TK's perspective ("I") with DK referenced as collaborator. **First mention of DK in each blog post should link to his GitHub:** `[DK](https://github.com/dknkim)`. Subsequent mentions in the same post use plain "DK".

**How the v2 started:** DK had already added React in a `frontend/` folder but hadn't removed Streamlit. TK and DK discussed and decided to do a full v2 revamp together.

**The actual execution sequence and reasoning:**

1. **Backend reorganization** (`a71c920`): Since DK had already created `frontend/`, TK moved all Python code into `backend/` to keep the monorepo structure consistent. This was about giving the project clear boundaries, not about test paths.

2. **Monolith split** (`b2f4d08`): Once the backend reorganization was confirmed working, TK split the 688-line `server.py` into dedicated router and service files. The primary principle applied was **Single Responsibility** (each file has one clear job). The refactor followed practical conventions (routers, services, schemas) rather than textbook SOLID.

3. **README update** (`d39edcf`): TK noticed the README still had Streamlit-era instructions and updated the backend documentation.

4. **Frontend modernization** (`7c92d96`): Proactive major version upgrades (Next.js 15→16, Tailwind 3→4, React 19.0→19.1). NOT security/dependabot driven. Intentional modernization before building the new UI.

5. **Backend consolidation + docs** (`2c1be18`, `04decd7`): Further organization (modules under `backend/src/`) and documentation updates.

6. **Tests & CI/CD** (`e220ebb`, `0903208`, `642c644`, `036c5cd`): Written AFTER all structural work was complete. TK and DK manually tested throughout the reorganization days, with DK as the daily power user validating existing features still worked. Automated tests and CI/CD were added once the codebase had its final shape, because after this point the real feature improvements were about to begin.

**Key pattern:** Changes were split across multiple days intentionally. After each structural change, DK tested the app as a daily user to confirm existing features and behavior remained intact. This manual validation was the safety net before automated tests existed.

**Important:** Do NOT invent motivations or reasoning not supported by the commit data or this backstory. When unsure about why a decision was made, state what happened and leave it at that. Do not fabricate design debates or tradeoff analyses.

---

## Blog 1: Saying Goodbye to Streamlit

**Slug:** `manuscript-alert-01-streamlit-cleanup`
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

**Thumbnail prompt:**
> Isometric illustration of a cozy workshop with a glowing Streamlit app on a screen being gently unplugged. Beside it, a clean empty workbench awaits with blueprints and modern tools. Soft blue and teal tones with warm amber accents. No text. Landscape 1200x630.

---

## Blog 2: Drawing the Map Before the Journey

**Slug:** `manuscript-alert-02-migration-plan`
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

**Thumbnail prompt:**
> Isometric illustration of an architect's desk with a large unrolled blueprint showing a 7-step roadmap path winding through a landscape. Small milestones marked along the path with tiny flags. Compass and ruler beside the map. Blue and teal palette with golden path highlights. No text. Landscape 1200x630.

---

## Blog 3: Organizing the Workshop

**Slug:** `manuscript-alert-03-backend-reorganization`
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
DK had already added `frontend/`. The Python code needed a matching home. This commit gives the project clear top-level boundaries so both contributors can navigate it.

**Key beats:**
1. The starting point: 6 Python dirs at root alongside frontend/ that DK had already created
2. The move: everything into backend/ to match frontend/, keeping the monorepo consistent
3. Import paths updated in server.py (6 imports, 2 path constants)
4. 54 stale backup files cleaned out in the same commit
5. DK validated existing features still worked after the change

**Word target:** 800-1000 words

**Thumbnail prompt:**
> Isometric illustration of a tidy workshop with labeled shelves and bins. Files and folders being sorted from a messy pile into neatly organized compartments labeled "backend" and "frontend". Clean lines, blue and teal tones with warm wood textures. No text. Landscape 1200x630.

---

## Blog 4: Making Space for What's Next

**Slug:** `manuscript-alert-04-splitting-monolith`
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
Once the backend reorganization was confirmed working (with DK testing daily), TK split the 688-line server.py into dedicated files. The primary principle applied was Single Responsibility: each file gets one clear job.

**Key beats:**
1. 688-line server.py handling every endpoint in one file
2. The split: health (15 lines), settings (28), papers (151), models (87), backups (56)
3. Extracting the service layer (paper_service at 221 lines)
4. Adding Pydantic schemas for request/response validation
5. Primary principle: Single Responsibility (each file has one job). NOT a full SOLID refactor — no dependency injection, no interfaces, no abstraction layers.
6. DK tested existing features after the split to confirm nothing broke

**Word target:** 1200-1500 words

**Thumbnail prompt:**
> Isometric illustration representing "Making Space for What's Next". A bright, airy room where one wall has been opened up to reveal a spacious new addition being built. The existing room is cozy but full. The new space beyond is clean, open, and flooded with natural light. Construction is gentle, not chaotic. Blue-teal and warm wood tones. No text. Landscape 1200x630.

---

## Blog 5: Finding the Right Shape

**Slug:** `manuscript-alert-05-backend-consolidation`
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

**Thumbnail prompt:**
> Isometric illustration of puzzle pieces clicking into their final positions inside a clean container. Some pieces are labeled with subtle icons (gear, document, data). The container has a "src/" label embossed on it. Satisfying precision-fit composition. Blue and teal palette with soft green accents. No text. Landscape 1200x630.

---

## Blog 6: Upgrading the Toolkit

**Slug:** `manuscript-alert-06-frontend-modernization`
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
Proactive major version upgrades before building the new UI. Next.js 15→16, Tailwind 3→4, React 19.0→19.1. This was intentional modernization (not security/dependabot driven). Removed autoprefixer (no longer needed with Tailwind v4), simplified config files.

**Key beats:**
1. Why upgrade before building (don't build on old foundations)
2. Next.js 15→16: what researchers get (faster pages, better routing)
3. React 18→19: what it means for interactivity
4. Tailwind 3→4: the design system upgrade
5. New libraries: lucide-react (icons), clsx + tailwind-merge (styling), SSE support
6. The new component architecture: features/ + ui/ + layout/ + hooks/

**Word target:** 1000-1200 words

**Thumbnail prompt:**
> Isometric illustration of a workbench where old tools are being swapped for shiny new modern ones. A toolbox lid open showing fresh versions of a wrench, screwdriver, and hammer, each with a small version number tag. The old tools sit in a "retired" bin nearby. Blue-teal tones with metallic silver highlights. No text. Landscape 1200x630.

---

## Blog 7: Building the Safety Net

**Slug:** `manuscript-alert-07-testing-infrastructure`
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

**Thumbnail prompt:**
> Isometric illustration of a safety net being woven beneath a tightrope walker (representing code). The net is made of interconnected test nodes glowing green. A scoreboard shows "344 passed". Circus/acrobat theme with blue-teal palette and bright green accent for passing tests. No text. Landscape 1200x630.

---

## Blog 8: Automating Trust

**Slug:** `manuscript-alert-08-cicd-pipeline`
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

**Thumbnail prompt:**
> Isometric illustration of a conveyor belt assembly line with code blocks moving through checkpoints. Each checkpoint has a green checkmark stamp. A robot arm performs automated quality control. Pipeline tubes connect the stations. Blue-teal industrial palette with green status lights. No text. Landscape 1200x630.

---

## Blog 9: The New Face (Frontend Redesign - Layout & Components)

**Slug:** `manuscript-alert-09-frontend-redesign`
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

**Thumbnail prompt:**
> Isometric illustration of a building facade being renovated. The left half shows an old plain interface, the right half reveals a modern 3-column glass panel design with search, feed, and detail sections. Scaffolding and a paint roller in transition. Blue-teal palette with warm orange construction accents. No text. Landscape 1200x630.

---

## Blog 10: Preparing for the Cloud (Backend v2 API)

**Slug:** `manuscript-alert-10-backend-v2-api`
**Tags:** `["Manuscript Alert", "Backend", "API", "Architecture"]`

**Commits:**
| Phase | SHA | Description |
|-------|-----|-------------|
| Before | `c13c083` | Pre-restructure (Step 2 Frontend Redesign) |
| After | `bdf9ea8` | Step 3 Backend Restructure & SSE link to FE (+1497/-146 lines, 34 files) |
| Fix | `b424ef4` | Fix failing test + README update |

**Screenshot targets:**
- After: API endpoint table (versioned `/api/v1/` routes)
- After: SSE streaming demo (AgentActivityStream component)
- After: `tree backend/src/api/v1/` showing modular route structure
- Diagram: request flow with dependency injection (`deps.py`)

**Story angle:**
The backend needs to grow up before it can move to the cloud. This post covers versioning the API (`/api/v1/`), adding proper configuration management with pydantic-settings, preparing SSE endpoints for real-time agent updates, and setting up dependency injection. All while keeping the existing frontend working — the SSE stream is already wired into the frontend.

**Key beats:**
1. Why API versioning matters (backward compatibility as we evolve)
2. pydantic-settings: configuration from env vars, not hardcoded paths (`.env.example`)
3. SSE endpoints: real-time agent activity streams (`events.py` + `useAgentStream.ts`)
4. Dependency injection: clean, testable code (`deps.py` at 57 lines)
5. New v1 routes: health, settings, papers, models, backups, kb
6. Frontend integration: `AgentActivityStream` component (248+ lines) wired to SSE
7. The backward compatibility strategy: old `server.py` routes still work during transition

**Word target:** 1000-1200 words
**Status:** Ready — Step 3 completed 2026-03-01 (commit `bdf9ea8`)

**Thumbnail prompt:**
> Isometric illustration of a launchpad with an API rocket being prepared for takeoff. Ground crew connects versioned fuel lines (labeled v1). A control tower monitors SSE signal streams flowing to a nearby screen. Blue-teal space theme with warm exhaust glow. No text. Landscape 1200x630.

---

## Blog 11: Moving to the Database (Neon Postgres)

**Slug:** `manuscript-alert-11-neon-database`
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

**Thumbnail prompt:**
> Isometric illustration of JSON files being loaded onto a conveyor belt that feeds into a glowing Postgres database cylinder. Data transforms from flat documents into structured table rows as it moves. A neon-green glow emanates from the database. Blue-teal palette with neon green accents. No text. Landscape 1200x630.

---

## Blog 12: Going Live (Cloud Deployment)

**Slug:** `manuscript-alert-12-cloud-deployment`
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

**Thumbnail prompt:**
> Isometric illustration of a control room with three screens showing a live deployment. One screen shows a frontend (Vercel logo hint), one shows a backend server (Render), one shows a database (Neon). Green status indicators everywhere. A "LIVE" beacon glows on top. Blue-teal palette with celebratory warm tones. No text. Landscape 1200x630.

---

## Blog 13: Teaching the App to Think (AI Agent Pipeline)

**Slug:** `manuscript-alert-13-ai-agents`
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

**Thumbnail prompt:**
> Isometric illustration of 7 specialized robot workers on an assembly line, each doing a distinct task (searching, fetching, analyzing, deduplicating, summarizing). Research papers flow through the pipeline. A real-time activity monitor shows agent progress. Blue-teal palette with warm AI-orange glowing eyes on the robots. No text. Landscape 1200x630.

---

## Blog 14: Building a Research Memory (Knowledge Base)

**Slug:** `manuscript-alert-14-knowledge-base`
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

**Thumbnail prompt:**
> Isometric illustration of a glowing brain-shaped library where research papers float into organized shelves. A magnifying glass searches by meaning (connected dots) rather than keywords (letters). Pinecone-shaped data structures store embeddings. Blue-teal palette with warm purple knowledge-glow. No text. Landscape 1200x630.

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
| 14 | `bdf9ea8` | Step 3 Backend Restructure & SSE link to FE | Blog 10 | After: v1 routes, SSE stream, deps.py |
| 15 | `b424ef4` | fix the failing test | Blog 10 | After: green tests, updated README |

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
