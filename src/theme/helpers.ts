import { alpha, type Theme } from '@mui/material/styles';

// Helper to get mode-aware overlay colors
export function getOverlay(theme: Theme, opacity: number): string {
  return theme.palette.mode === 'dark'
    ? `rgba(255, 255, 255, ${opacity})`
    : `rgba(0, 0, 0, ${opacity})`;
}

// Helper to get mode-aware background with opacity
export function getBackgroundAlpha(theme: Theme, opacity: number): string {
  return alpha(theme.palette.background.paper, opacity);
}

// Helper to get card border color
export function getCardBorder(theme: Theme): string {
  return theme.palette.mode === 'dark' ? '#1a1a1a' : '#e0e0e0';
}

// Helper to get card hover border color
export function getCardHoverBorder(theme: Theme): string {
  return theme.palette.secondary.main;
}

// Helper to get subtle background for chips/badges
export function getSubtleBackground(theme: Theme, color: string, opacity = 0.1): string {
  return alpha(color, opacity);
}

// Helper for gradient backgrounds (mode-aware)
export function getGradientBackground(theme: Theme): string {
  return theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(32, 71, 244, 0.1) 0%, rgba(0, 247, 255, 0.05) 100%)'
    : 'linear-gradient(135deg, rgba(26, 59, 199, 0.08) 0%, rgba(0, 144, 163, 0.04) 100%)';
}

// Helper for progress bar gradient
export function getProgressGradient(theme: Theme): string {
  return theme.palette.mode === 'dark'
    ? 'linear-gradient(90deg, #2047f4 0%, #00f7ff 100%)'
    : 'linear-gradient(90deg, #1a3bc7 0%, #0090a3 100%)';
}

// Helper for AppBar background
export function getAppBarBackground(theme: Theme): string {
  return theme.palette.mode === 'dark'
    ? 'rgba(0, 0, 0, 0.8)'
    : 'rgba(255, 255, 255, 0.9)';
}

// Helper for timeline/connector lines
export function getLineColor(theme: Theme): string {
  return theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(0, 0, 0, 0.1)';
}

// Helper for hero section radial background gradient
export function getHeroGradient(theme: Theme): string {
  return theme.palette.mode === 'dark'
    ? 'radial-gradient(ellipse at 50% 0%, rgba(32, 71, 244, 0.15) 0%, transparent 60%)'
    : 'radial-gradient(ellipse at 50% 0%, rgba(26, 59, 199, 0.1) 0%, transparent 60%)';
}

// Helper for text gradient (hero title)
export function getTextGradient(theme: Theme): string {
  return theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, #e0e0e0 0%, #00f7ff 50%, #2047f4 100%)'
    : 'linear-gradient(135deg, #1a1a1a 0%, #0090a3 50%, #1a3bc7 100%)';
}
