# Site Architecture Map

## URL Structure & Components

```
/                                    → Home
├── /about/                          → About Me
├── /resume/                         → Resume
└── /portfolio/                      → Portfolio Index
    ├── /portfolio/site-evolution/   → Site Evolution (Case Study)
    └── /portfolio/donation-mentoring/ → Donation Mentoring (Case Study)
```

---

## Page → Component Mapping

| URL | Page File | Client Component | Shared Components |
|-----|-----------|------------------|-------------------|
| `/` | `app/page.tsx` | (inline) | `SiteEvolutionCard` |
| `/about/` | `app/about/page.tsx` | (inline) | — |
| `/resume/` | `app/resume/page.tsx` | (inline) | — |
| `/portfolio/` | `app/portfolio/page.tsx` | `PortfolioClient.tsx` | — |
| `/portfolio/site-evolution/` | `app/portfolio/site-evolution/page.tsx` | `SiteEvolutionClient.tsx` | `SiteEvolutionJourney` |
| `/portfolio/donation-mentoring/` | `app/portfolio/donation-mentoring/page.tsx` | `DonationMentoringClient.tsx` | — |

---

## Component Inventory

### Layout Components (`src/components/`)
| Component | Purpose | Used By |
|-----------|---------|---------|
| `Navigation.tsx` | Sticky header with mobile drawer | `app/layout.tsx` (global) |
| `Footer.tsx` | Footer with social links | `app/layout.tsx` (global) |
| `ThemeRegistry.tsx` | MUI ThemeProvider wrapper | `app/layout.tsx` (global) |

### Feature Components (`src/components/`)
| Component | Purpose | Used By |
|-----------|---------|---------|
| `SiteEvolutionJourney.tsx` | Journey tab (chapters, scroll-spy, milestones) | `SiteEvolutionClient.tsx` |
| `SiteEvolutionChangelog.tsx` | Changelog tab (updates timeline, filters) | `SiteEvolutionClient.tsx` |
| `SiteEvolutionCard.tsx` | "Site Evolution" card for home page | `app/page.tsx` |

### Page Client Components (`src/app/**/`)
| Component | Location | Purpose |
|-----------|----------|---------|
| `PortfolioClient.tsx` | `app/portfolio/` | Portfolio grid with category filter |
| `SiteEvolutionClient.tsx` | `app/portfolio/site-evolution/` | Site Evolution page (Journey + Changelog tabs) |
| `DonationMentoringClient.tsx` | `app/portfolio/donation-mentoring/` | Donation Mentoring case study |

---

## Data Files (`src/data/`)

| File | Exports | Used By |
|------|---------|---------|
| `projects.ts` | `projects`, `Project` type | `PortfolioClient.tsx` |
| `updates.ts` | `updates`, `Update` type, `UpdateStatus`, `UpdateCategory` | `SiteEvolutionClient.tsx` |
| `chapters.ts` | `chapters`, `getMilestoneStats()`, `getMilestoneProgress()` | `SiteEvolutionJourney.tsx`, `SiteEvolutionCard.tsx`, `SiteEvolutionClient.tsx` |

---

## Config Files (`src/config/`)

| File | Exports | Used By |
|------|---------|---------|
| `seo.ts` | `siteConfig`, `getMetadata()`, `allPages` | All `page.tsx` files, `layout.tsx` |
| `statusConfig.ts` | `statusConfig`, `statusColors`, `categoryColors` | `SiteEvolutionJourney.tsx`, `SiteEvolutionClient.tsx` |

---

## Visual Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      app/layout.tsx                         │
│  ┌─────────────────────────────────────────────────────────┐│
│  │                    ThemeRegistry                        ││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │                   Navigation                        │││
│  │  └─────────────────────────────────────────────────────┘││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │                    {children}                       │││
│  │  │                                                     │││
│  │  │   ┌─────────────────────────────────────────────┐   │││
│  │  │   │              Page Content                   │   │││
│  │  │   │  (Server Component → Client Component)      │   │││
│  │  │   └─────────────────────────────────────────────┘   │││
│  │  │                                                     │││
│  │  └─────────────────────────────────────────────────────┘││
│  │  ┌─────────────────────────────────────────────────────┐││
│  │  │                     Footer                          │││
│  │  └─────────────────────────────────────────────────────┘││
│  └─────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

---

## File Tree

```
src/
├── app/
│   ├── layout.tsx                    # Root layout (Navigation, Footer, Theme)
│   ├── page.tsx                      # Home page (/)
│   ├── about/
│   │   └── page.tsx                  # About page (/about/)
│   ├── resume/
│   │   └── page.tsx                  # Resume page (/resume/)
│   └── portfolio/
│       ├── page.tsx                  # Portfolio index (/portfolio/)
│       ├── PortfolioClient.tsx       # Portfolio grid client
│       ├── site-evolution/
│       │   ├── page.tsx              # Site Evolution (/portfolio/site-evolution/)
│       │   └── SiteEvolutionClient.tsx # Journey + Changelog tabs
│       └── donation-mentoring/
│           ├── page.tsx              # Case study (/portfolio/donation-mentoring/)
│           └── DonationMentoringClient.tsx
├── components/
│   ├── Navigation.tsx                # Global header
│   ├── Footer.tsx                    # Global footer
│   ├── ThemeRegistry.tsx             # MUI theme provider
│   ├── SiteEvolutionJourney.tsx      # Journey tab (chapters, milestones)
│   ├── SiteEvolutionChangelog.tsx    # Changelog tab (updates timeline)
│   └── SiteEvolutionCard.tsx         # Home page card for this project
├── config/
│   ├── seo.ts                        # SEO configuration
│   └── statusConfig.ts               # Status colors & icons
├── data/
│   ├── projects.ts                   # Portfolio projects data
│   ├── updates.ts                    # Changelog/updates data
│   └── chapters.ts                   # Site evolution chapters
├── styles/
│   └── globals.css                   # Global CSS variables
└── theme.ts                          # MUI theme configuration
```
