# Site Architecture Map

## URL Structure & Components

```
/                                    → Home
├── /about/                          → About Me
├── /resume/                         → Resume
└── /portfolio/                      → Portfolio Index
    ├── /portfolio/homepage/         → Site Evolution (Case Study)
    └── /portfolio/donation-mentoring/ → Donation Mentoring (Case Study)
```

---

## Page → Component Mapping

| URL | Page File | Client Component | Shared Components |
|-----|-----------|------------------|-------------------|
| `/` | `app/page.tsx` | (inline) | `BuildingInPublicCard` |
| `/about/` | `app/about/page.tsx` | (inline) | — |
| `/resume/` | `app/resume/page.tsx` | (inline) | — |
| `/portfolio/` | `app/portfolio/page.tsx` | `PortfolioClient.tsx` | `BuildingInPublicCard` |
| `/portfolio/homepage/` | `app/portfolio/homepage/page.tsx` | `HomepageClient.tsx` | `BuildingInPublic` |
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
| `BuildingInPublic.tsx` | Site Evolution journey view (chapters, scroll-spy) | `HomepageClient.tsx` |
| `BuildingInPublicCard.tsx` | "Building in Public" card for portfolio grids | `app/page.tsx`, `PortfolioClient.tsx` |

### Page Client Components (`src/app/**/`)
| Component | Location | Purpose |
|-----------|----------|---------|
| `PortfolioClient.tsx` | `app/portfolio/` | Portfolio grid with category filter |
| `HomepageClient.tsx` | `app/portfolio/homepage/` | Site Evolution page (Journey + Changelog tabs) |
| `DonationMentoringClient.tsx` | `app/portfolio/donation-mentoring/` | Donation Mentoring case study |

---

## Data Files (`src/data/`)

| File | Exports | Used By |
|------|---------|---------|
| `projects.ts` | `projects`, `Project` type | `PortfolioClient.tsx` |
| `updates.ts` | `updates`, `Update` type, `UpdateStatus`, `UpdateCategory` | `HomepageClient.tsx` |
| `chapters.ts` | `chapters`, `getMilestoneStats()`, `getMilestoneProgress()` | `BuildingInPublic.tsx`, `BuildingInPublicCard.tsx`, `HomepageClient.tsx` |

---

## Config Files (`src/config/`)

| File | Exports | Used By |
|------|---------|---------|
| `seo.ts` | `siteConfig`, `getMetadata()`, `allPages` | All `page.tsx` files, `layout.tsx` |
| `statusConfig.ts` | `statusConfig`, `statusColors`, `categoryColors` | `BuildingInPublic.tsx`, `HomepageClient.tsx` |

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

## Naming Inconsistencies (For Reference)

| Current | Content | Potential Rename |
|---------|---------|------------------|
| `/portfolio/homepage/` | Site Evolution case study | `/portfolio/site-evolution/` |
| `HomepageClient.tsx` | Site Evolution client | `SiteEvolutionClient.tsx` |
| `BuildingInPublic.tsx` | Journey chapters view | `SiteEvolutionJourney.tsx` |
| `BuildingInPublicCard.tsx` | Portfolio card | `SiteEvolutionCard.tsx` |

**Status:** Keeping current names per KISS principle. URL is already live.

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
│       ├── homepage/
│       │   ├── page.tsx              # Site Evolution (/portfolio/homepage/)
│       │   └── HomepageClient.tsx    # Journey + Changelog tabs
│       └── donation-mentoring/
│           ├── page.tsx              # Case study (/portfolio/donation-mentoring/)
│           └── DonationMentoringClient.tsx
├── components/
│   ├── Navigation.tsx                # Global header
│   ├── Footer.tsx                    # Global footer
│   ├── ThemeRegistry.tsx             # MUI theme provider
│   ├── BuildingInPublic.tsx          # Journey chapters component
│   └── BuildingInPublicCard.tsx      # Portfolio card for this project
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
