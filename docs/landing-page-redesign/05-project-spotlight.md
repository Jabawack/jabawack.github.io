# Section 5: Project Spotlight

> **Version:** v2.9.0 | **Priority:** Phase 3

## Web Terms
- **Split/Asymmetric Layout:** Unequal two-column layout
- **Media-Text Pattern:** Image on one side, content on other

## Purpose
Deep-dive into key projects. Large visual on left draws attention; carousel on right provides details about different aspects/features.

## Structure

```
┌────────────────────────────────────────────────────────┐
│                                                        │
│          Featured Work                                 │  ← Section title
│                                                        │
├─────────────────────────────┬──────────────────────────┤
│                             │                          │
│   ┌─────────────────────┐   │   Project Name           │
│   │                     │   │   ──────────────         │
│   │  [Project           │   │                          │
│   │   Screenshot]       │   │   Description of this    │
│   │                     │   │   project and your role  │
│   │                     │   │   in building it.        │
│   └─────────────────────┘   │                          │
│                             │      [ View Project → ]  │
│                             │                          │
│                             │      [ ← ]    [ → ]      │  ← Carousel nav
└─────────────────────────────┴──────────────────────────┘
```

## Content Suggestions

| Project | Role | Highlight |
|---------|------|-----------|
| **Donation Mentoring** | Creator | UNICEF integration, social impact |
| **Design System** | Architect | Storybook, component library |
| **Site Evolution** | Developer | Version history, continuous improvement |
| **Bay Area K Group** | VP/IT Lead | Nonprofit, 8,000+ members |

## Implementation
1. CSS Grid: `grid-template-columns: 1.5fr 1fr`
2. Image syncs with carousel selection
3. Subtle parallax on image during scroll
4. Mobile: Stack vertically, image above text

## References
- [React Layout Patterns](https://medium.com/the-tech-pulse/react-design-patterns-layout-components-12b66efc1a9c)
- [Swiper.js](https://swiperjs.com/react)
