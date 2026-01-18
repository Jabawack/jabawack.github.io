# Section 3: Skills Showcase

> **Version:** v2.9.1 | **Priority:** Phase 2

## Web Terms
- **Tabbed Interface:** Tabs switching between content panels
- **Feature Carousel:** Rotating content display

## Purpose
Present technical skills with visual evidence. Each tab shows a skill category with supporting screenshot/demo.

## Structure

```
┌─────────────────────────────────────────────────┐
│ [Frontend] [Backend] [Full Stack] [Design] [Leadership]  │  ← Tabs
├─────────────────────────────────────────────────┤
│                                                 │
│      ┌───────────────────────────────┐         │
│      │   [Screenshot / Code Sample]  │         │
│      │                               │         │
│      └───────────────────────────────┘         │
│                                                 │
│      Brief description of expertise             │
│      in this area...                            │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Tab Content

| Tab | Visual | Description |
|-----|--------|-------------|
| **Frontend** | React component screenshot | TypeScript, React 19, Next.js App Router, MUI |
| **Backend** | API code or architecture | Python, Django, PostgreSQL, REST/GraphQL |
| **Full Stack** | App demo screenshot | End-to-end delivery, deployment, monitoring |
| **Design Systems** | Storybook embed | Component libraries, design tokens, documentation |
| **Leadership** | Team/mentoring visual | Code review, mentorship, architecture decisions |

## Implementation
1. MUI `Tabs` + `TabPanel` components
2. Framer Motion `AnimatePresence` for transitions
3. Optional: Auto-advance with progress indicator
4. Link "Learn more" to relevant portfolio items

## References
- [DEV: Product Showcase Carousel](https://dev.to/amaresh_adak/creating-a-dynamic-product-showcase-carousel-with-react-and-tailwind-css-16ai)
- [Flowbite Carousel](https://flowbite-react.com/docs/components/carousel)
