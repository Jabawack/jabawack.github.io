# Landing Page Redesign Overview

## Version Planning

This redesign spans **v2.9.0 → v3.0.0** as part of a new chapter in the site evolution.

| Version | Milestone | Status |
|---------|-----------|--------|
| v2.9.0 | Landing Page Foundation (Hero + Navbar enhancement) | planned |
| v2.9.1 | Skills Showcase (Tabbed interface) | planned |
| v2.9.2 | Personal Statement (Scroll text reveal) | planned |
| v2.10.0 | Project Spotlight (Split layout carousel) | planned |
| v2.10.1 | Portfolio Gallery (Sticky parallax stacking) | planned |
| v2.10.2 | Testimonials Grid (Bento layout) | planned |
| v3.0.0 | Landing Page Complete + Polish | planned |

### Suggested Chapter Entry

**Chapter 4: Landing Page Evolution**
- versions: `v2.9.0 → v3.0.0`
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

## Implementation Priority

**Phase 1 (v2.9.x):** Foundation
- Install Framer Motion
- Navbar shrink-on-scroll enhancement
- Hero Section with "Download Resume" CTA

**Phase 2 (v2.9.x cont.):** Core Sections
- Skills Showcase (Tabbed interface)
- Personal Statement (Scroll text reveal)
- Testimonials Grid (Bento layout)

**Phase 3 (v2.10.x):** Advanced Effects
- Project Spotlight (Split layout carousel)
- Portfolio Gallery (Sticky parallax stacking)
- Smooth scrolling with Lenis (optional)

**Phase 4 (v3.0.0):** Polish
- Performance optimization
- Mobile responsive refinements
- Accessibility audit
- Storybook stories for new components

## File Structure
```
src/components/landing/
├── HeroSection.tsx
├── SkillsShowcase.tsx
├── PersonalStatement.tsx
├── ProjectSpotlight.tsx
├── PortfolioGallery.tsx
├── TestimonialsGrid.tsx
└── index.ts
```
