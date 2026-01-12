import type { Components, Theme } from '@mui/material/styles';

// Get mode-aware component overrides
export function getComponentOverrides(mode: 'light' | 'dark'): Components<Theme> {
  const isDark = mode === 'dark';

  return {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollBehavior: 'smooth',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
          border: `1px solid ${isDark ? '#1a1a1a' : '#e0e0e0'}`,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background-color 0.3s ease',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: isDark
              ? '0 0 20px rgba(0, 247, 255, 0.15)'
              : '0 4px 20px rgba(0, 0, 0, 0.1)',
            borderColor: isDark ? '#00f7ff' : '#0090a3',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          transition: 'background-color 0.3s ease',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: isDark ? '#0a0a0a' : '#ffffff',
          transition: 'background-color 0.3s ease',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          '&.Mui-selected': {
            backgroundColor: isDark ? 'rgba(0, 247, 255, 0.1)' : 'rgba(0, 144, 163, 0.1)',
          },
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };
}
