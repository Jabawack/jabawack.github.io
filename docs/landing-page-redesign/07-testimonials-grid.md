# Section 7: Testimonials Grid

> **Version:** v2.10.2 | **Priority:** Phase 2

## Web Terms
- **Bento Grid:** Asymmetric grid with varying cell sizes
- **Social Proof:** Evidence others trust/endorse you
- **Metric Cards:** Large numbers with labels

## Purpose
Build credibility through colleague testimonials and career metrics. Bento layout creates visual interest while efficiently using space.

## Structure

```
┌──────────────────────────────┬───────────────────────┐
│                              │                       │
│  "TK's code reviews          │      20+              │
│  transformed how our         │      ────             │
│  team approaches quality."   │      Years            │
│                              │      Experience       │
│  — Former Colleague          │                       │
│                              │                       │
├──────────────┬───────────────┼───────────────────────┤
│              │               │                       │
│  "Rare       │    50+        │  "Clear communicator  │
│  engineer    │    ────       │  who makes complex    │
│  who gets    │   Engineers   │  topics accessible."  │
│  both code   │   Mentored    │                       │
│  and users." │               │  — Mentee             │
│              │               │                       │
└──────────────┴───────────────┴───────────────────────┘
```

## Content

**Metrics:**
| Value | Label |
|-------|-------|
| 20+ | Years of Experience |
| 50+ | Engineers Mentored |
| 100+ | Projects Shipped |

**Testimonials (gather from colleagues):**
- Code review quality
- Mentorship impact
- Technical communication
- Collaboration style

**Optional:** Link metric cards to relevant portfolio/blog content.

## Implementation

```typescript
// Bento grid CSS
const grid = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: 2,
};

// Card spans
const largeCard = { gridColumn: 'span 2', gridRow: 'span 2' };
const smallCard = { gridColumn: 'span 1', gridRow: 'span 1' };
```

## Mobile Behavior
- Collapse to single column
- Or: horizontal swipe carousel
- Show top 5 items, "View all" link

## References
- [Bento Grids vs Carousels](https://medium.com/design-bootcamp/the-death-of-the-carousel-why-i-switched-to-an-animated-bento-grid-for-testimonials-aab96e09a4a9)
- [shadcn Bento Testimonials](https://www.shadcn.io/blocks/testimonials-bento-01)
- [BentoGrids.com](https://bentogrids.com)
