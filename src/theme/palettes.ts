import type { PaletteOptions } from '@mui/material/styles';

// Dark palette (current default)
export const darkPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#2047f4',
  },
  secondary: {
    main: '#00f7ff',
  },
  background: {
    default: '#000000',
    paper: '#0a0a0a',
  },
  text: {
    primary: '#e0e0e0',
    secondary: '#aeaecb',
  },
  divider: 'rgba(255, 255, 255, 0.1)',
  success: {
    main: '#4caf50',
  },
  warning: {
    main: '#ff9800',
  },
  error: {
    main: '#f44336',
  },
};

// Light palette (soft contrast, gentle on eyes)
export const lightPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#1a3bc7', // Darker blue for contrast
  },
  secondary: {
    main: '#0090a3', // Darker cyan for readability
  },
  background: {
    default: '#fafafa', // Soft off-white
    paper: '#ffffff',   // Cards slightly brighter
  },
  text: {
    primary: '#1a1a1a',   // Near black
    secondary: '#5c5c7a', // Muted purple-gray
  },
  divider: 'rgba(0, 0, 0, 0.08)',
  success: {
    main: '#2e7d32', // Darker green
  },
  warning: {
    main: '#ed6c02',
  },
  error: {
    main: '#d32f2f',
  },
};
