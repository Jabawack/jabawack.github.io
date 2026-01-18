# Animation Setup Guide

## Install Framer Motion

```bash
npm install framer-motion
```

## Basic Patterns

### Entrance Animation
```typescript
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  {children}
</motion.div>
```

### Scroll-Linked Animation
```typescript
import { useScroll, useTransform } from 'framer-motion';

const { scrollYProgress } = useScroll({ target: ref });
const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);
```

### Stagger Children
```typescript
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};
```

## Accessibility

```typescript
// Respect reduced motion preference
const prefersReducedMotion =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Or use Framer Motion's built-in
import { useReducedMotion } from 'framer-motion';
const shouldReduceMotion = useReducedMotion();
```

## Smooth Scrolling (Optional)

```bash
npm install @studio-freight/lenis
```

```typescript
// In a provider or layout
useEffect(() => {
  const lenis = new Lenis({ lerp: 0.1 });
  const raf = (time: number) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);
  return () => lenis.destroy();
}, []);
```

## Performance Tips
- Limit concurrent animations to 3-4 elements
- Use `will-change` sparingly
- Prefer `transform` and `opacity` (GPU accelerated)
- Lazy load below-fold sections
