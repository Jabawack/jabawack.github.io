# Landing Page Redesign Overview

## Version Planning

This redesign spans **v2.8.0 → v2.10.0** as part of Chapter 5 in the site evolution.

| Version | Milestone | Status |
|---------|-----------|--------|
| v2.8.0 | Landing Page Foundation (Hero + Navbar enhancement) | **completed** 2026-02-12 |
| v2.8.1 | Skills Showcase + Personal Statement + ScrollIndicator | **completed** 2026-02-13 |
| v2.9.0 | Project Spotlight + Portfolio Gallery | planned |
| v2.10.0 | Testimonials Grid + Final Polish | planned |

### Chapter Entry

**Chapter 5: Landing Page Evolution**
- versions: `v2.8.0 → v2.10.0`
- status: `planned`
- Story themes: scroll-driven storytelling, modern portfolio patterns, first impressions

---

## Purpose
Transform the portfolio landing page into a modern, scroll-driven experience that effectively presents a Fullstack UX Engineer's skills, projects, and professional story.

## Section Architecture

| # | Section | Component | Doc |
|---|---------|-----------|-----|
| 1 | Dynamic Navbar | `<Navigation />` | [01-navbar.md](./01-navbar.md) |
| 2 | Hero Section | `<HeroSection />` | [02-hero.md](./02-hero.md) |
| 3 | Skills Showcase | `<SkillsShowcase />` | [03-skills-showcase.md](./03-skills-showcase.md) |
| 4 | Personal Statement | `<PersonalStatement />` | [04-personal-statement.md](./04-personal-statement.md) |
| 5 | Project Spotlight | `<ProjectSpotlight />` | [05-project-spotlight.md](./05-project-spotlight.md) |
| 6 | Portfolio Gallery | `<PortfolioGallery />` | [06-portfolio-gallery.md](./06-portfolio-gallery.md) |
| 7 | Testimonials Grid | `<TestimonialsGrid />` | [07-testimonials-grid.md](./07-testimonials-grid.md) |

## Tech Stack
- Next.js 15 + React 19 + MUI v7 (existing)
- Framer Motion (add for animations)
- Lenis (optional, for smooth scroll)

## Implementation Progress

**Phase 1 (v2.8.0) — DONE:**
- Framer Motion integration
- Hero Section with View Resume / View Portfolio CTAs
- Navbar shrink-on-scroll with glassmorphism
- Animated scroll indicator

**Phase 2 (v2.8.1) — DONE:**
- Skills Showcase (Tabbed interface with 5 categories)
- Personal Statement (Scroll-triggered word-by-word color reveal)
- ScrollIndicator reusable component
- Storybook stories for all new components

**Phase 3 (v2.9.0) — Next:**
- Project Spotlight (Split layout carousel, replaces basic Featured Work cards)
- Portfolio Gallery (Sticky parallax card stacking)

**Phase 4 (v2.10.0) — Future:**
- Testimonials Grid (Bento layout with career metrics)
- Performance optimization
- Mobile responsive refinements
- Accessibility audit

## File Structure
```
src/components/landing/
├── HeroSection.tsx          ✅ v2.8.0
├── SkillsShowcase.tsx       ✅ v2.8.1
├── PersonalStatement.tsx    ✅ v2.8.1
├── ScrollIndicator.tsx      ✅ v2.8.1 (reusable, used by Hero + Statement)
├── ProjectSpotlight.tsx     ⬜ v2.9.0
├── PortfolioGallery.tsx     ⬜ v2.9.0
├── TestimonialsGrid.tsx     ⬜ v2.10.0
└── index.ts
```
