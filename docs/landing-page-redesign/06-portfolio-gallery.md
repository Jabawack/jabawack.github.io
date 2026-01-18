# Section 6: Portfolio Gallery

> **Version:** v2.10.1 | **Priority:** Phase 3

## Web Terms
- **Sticky Parallax:** Elements stick during scroll, creating depth
- **Card Stacking:** Cards appear to stack as user scrolls

## Purpose
Showcase portfolio items in a memorable, interactive way. Each card represents a project that "stacks" as user scrolls, creating visual hierarchy.

## Structure

```
┌─────────────────────────────────────────────────┐
│                                                 │
│    ┌───────────────────────────────────┐       │  ← Card 1 (stacked)
│    │  Donation Mentoring Platform      │       │
│    │  [Screenshot]  Brief description  │       │
│    └───────────────────────────────────┘       │
│    ┌───────────────────────────────────┐       │  ← Card 2 (stacking)
│    │  Design System & Storybook        │       │
│    │  [Screenshot]  Brief description  │       │
│    └───────────────────────────────────┘       │
│    ┌───────────────────────────────────┐       │  ← Card 3 (entering)
│    │  Site Evolution Journey           │       │
│    │  [Screenshot]  Brief description  │       │
│    └───────────────────────────────────┘       │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Implementation

```typescript
// CSS for sticky stacking
const cardStyle = {
  position: 'sticky',
  top: `calc(80px + ${index * 20}px)`,  // Offset by index
  height: '70vh',
};

// Framer Motion for scale effect
const scale = useTransform(scrollYProgress, [0.8, 1], [1, 0.95]);
```

## Key Details
1. Each card: `position: sticky` with incremental `top`
2. Container height creates scroll distance
3. Scale down previous card as next approaches
4. Each card links to full portfolio page
5. Limit to 4-5 featured projects

## Card Content
- Project thumbnail
- Project name
- One-line description
- Tech stack chips
- "View details" link

## References
- [Cards Parallax Tutorial](https://blog.olivierlarose.com/tutorials/cards-parallax)
- [GSAP Stacking Cards](https://gsap.com/community/forums/topic/39367-scrolltrigger-stacking-cards-animation-logic-to-create-any-effect-yes-even-yours/)
