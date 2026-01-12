'use client';

import { createTheme, type Theme } from '@mui/material/styles';
import { darkPalette, lightPalette } from './palettes';
import { getComponentOverrides } from './components';

// Shared typography configuration
const typography = {
  fontFamily: 'var(--font-inter), -apple-system, BlinkMacSystemFont, sans-serif',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    fontSize: '3rem',
    lineHeight: 1.2,
  },
  h2: {
    fontWeight: 600,
    fontSize: '2.25rem',
    lineHeight: 1.3,
  },
  h3: {
    fontWeight: 600,
    fontSize: '1.5rem',
    lineHeight: 1.4,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.6,
  },
};

// Shared shape configuration
const shape = {
  borderRadius: 8,
};

// Create theme based on mode
export function createDynamicTheme(mode: 'light' | 'dark'): Theme {
  const palette = mode === 'dark' ? darkPalette : lightPalette;

  return createTheme({
    palette,
    typography,
    shape,
    components: getComponentOverrides(mode),
  });
}

// Pre-created themes for performance
export const darkTheme = createDynamicTheme('dark');
export const lightTheme = createDynamicTheme('light');

// Re-export helpers for use in components
export * from './helpers';
export { darkPalette, lightPalette } from './palettes';
