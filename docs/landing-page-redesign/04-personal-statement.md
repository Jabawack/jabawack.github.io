# Section 4: Personal Statement

> **Version:** v2.9.2 | **Priority:** Phase 2

## Web Terms
- **Scroll-Triggered Text Reveal:** Text highlights as user scrolls
- **Progressive Disclosure:** Content revealed gradually

## Purpose
Share your professional philosophy in an engaging, memorable way. The scroll interaction creates emphasis and encourages reading.

## Structure

```
┌─────────────────────────────────────────────────┐
│                                                 │
│     Making complex systems feel simple.         │  ← Highlighted
│                                                 │
│     Building applications that scale—           │  ← Revealing
│     and teams that thrive.                      │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Content Options

**Option A - Engineering Philosophy:**
> "Making complex systems feel simple.
> Building applications that scale—and teams that thrive."

**Option B - Career Purpose:**
> "Code is just the beginning.
> The real product is the confidence users feel when everything just works."

**Option C - Personal Mission:**
> "Twenty years of learning, building, and teaching.
> Every line of code is a chance to make someone's day easier."

## Implementation

```typescript
// Framer Motion approach
const { scrollYProgress } = useScroll({ target: ref });

// Map scroll to word opacity (0.3 → 1.0)
const opacity = useTransform(scrollYProgress, [start, end], [0.3, 1]);

// Map scroll to color (gray → accent)
const color = useTransform(scrollYProgress, [start, end], ['#666', '#00f7ff']);
```

## Key Details
- Split text into word spans
- Each word animates based on scroll position
- Use theme accent color for highlighted state
- Respect `prefers-reduced-motion`

## References
- [Motion.dev: Scroll Animations](https://motion.dev/docs/react-scroll-animations)
- [Framer Text Scroll Reveal](https://newoffset.com/resources/text-scroll-reveal)
