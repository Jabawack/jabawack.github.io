# Section 1: Dynamic Navbar

> **Version:** v2.9.0 | **Priority:** Phase 1

## Web Terms
- **Shrink-on-scroll:** Navbar reduces height after scroll threshold
- **Glassmorphism:** Frosted glass effect (`backdrop-filter: blur()`)

## Current State
`Navigation.tsx` already uses MUI `useScrollTrigger`. Enhance with height/padding animation.

## Enhancement

```typescript
// States to animate
const styles = {
  initial: { py: 3, logoHeight: 40, bg: 'transparent' },
  scrolled: { py: 1.5, logoHeight: 32, bg: 'rgba(255,255,255,0.9)', blur: '12px' }
};
```

## Implementation
1. Add CSS transitions to existing component
2. Animate: padding, logo size, background opacity
3. Add `backdropFilter: blur(12px)` on scroll

## References
- [W3Schools: Shrink Navbar](https://www.w3schools.com/howto/howto_js_navbar_shrink_scroll.asp)
- [MUI useScrollTrigger](https://mui.com/material-ui/react-app-bar/#usescrolltrigger-options-trigger)
