'use client';

import { IconButton, Tooltip } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useThemeMode } from '@/context/ThemeContext';

export default function ThemeToggle() {
  const { resolvedMode, toggleMode } = useThemeMode();

  const isDark = resolvedMode === 'dark';

  return (
    <Tooltip title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <IconButton
        onClick={toggleMode}
        sx={{
          color: 'text.secondary',
          transition: 'color 0.2s ease, transform 0.2s ease',
          '&:hover': {
            color: 'secondary.main',
            transform: 'rotate(15deg)',
          },
        }}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDark ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>
    </Tooltip>
  );
}
