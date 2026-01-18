'use client';

import React from 'react';
import { Chip } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import type { ChipProps } from '@mui/material';

export interface TagProps {
  /** Tag label text */
  label: string;
  /** Whether the tag is currently selected/active */
  selected?: boolean;
  /** Click handler */
  onClick?: (e: React.MouseEvent) => void;
  /** Size variant */
  size?: 'small' | 'medium';
  /** Color variant */
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning';
}

/**
 * Tag component for categorization and filtering.
 *
 * Designed with accessibility in mind:
 * - Minimum 4.5:1 contrast ratio
 * - Visible in both light and dark modes
 * - Clear selected/unselected states
 * - Desaturated colors to reduce eye strain
 */
export const Tag: React.FC<TagProps> = ({
  label,
  selected = false,
  onClick,
  size = 'small',
  variant = 'default',
}) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  // Color mappings for different variants
  const variantColors = {
    default: {
      bg: isDark ? '#1e293b' : '#f1f5f9',
      bgHover: isDark ? '#334155' : '#e2e8f0',
      bgSelected: isDark ? '#3b82f6' : '#2563eb',
      text: isDark ? '#e2e8f0' : '#334155',
      textSelected: '#ffffff',
      border: isDark ? '#334155' : '#cbd5e1',
      borderSelected: 'transparent',
    },
    primary: {
      bg: isDark ? alpha('#3b82f6', 0.15) : alpha('#2563eb', 0.1),
      bgHover: isDark ? alpha('#3b82f6', 0.25) : alpha('#2563eb', 0.2),
      bgSelected: isDark ? '#3b82f6' : '#2563eb',
      text: isDark ? '#93c5fd' : '#1d4ed8',
      textSelected: '#ffffff',
      border: isDark ? alpha('#3b82f6', 0.4) : alpha('#2563eb', 0.3),
      borderSelected: 'transparent',
    },
    secondary: {
      bg: isDark ? alpha('#06b6d4', 0.15) : alpha('#0891b2', 0.1),
      bgHover: isDark ? alpha('#06b6d4', 0.25) : alpha('#0891b2', 0.2),
      bgSelected: isDark ? '#06b6d4' : '#0891b2',
      text: isDark ? '#67e8f9' : '#0e7490',
      textSelected: '#ffffff',
      border: isDark ? alpha('#06b6d4', 0.4) : alpha('#0891b2', 0.3),
      borderSelected: 'transparent',
    },
    success: {
      bg: isDark ? alpha('#22c55e', 0.15) : alpha('#16a34a', 0.1),
      bgHover: isDark ? alpha('#22c55e', 0.25) : alpha('#16a34a', 0.2),
      bgSelected: isDark ? '#22c55e' : '#16a34a',
      text: isDark ? '#86efac' : '#15803d',
      textSelected: '#ffffff',
      border: isDark ? alpha('#22c55e', 0.4) : alpha('#16a34a', 0.3),
      borderSelected: 'transparent',
    },
    warning: {
      bg: isDark ? alpha('#f59e0b', 0.15) : alpha('#d97706', 0.1),
      bgHover: isDark ? alpha('#f59e0b', 0.25) : alpha('#d97706', 0.2),
      bgSelected: isDark ? '#f59e0b' : '#d97706',
      text: isDark ? '#fcd34d' : '#b45309',
      textSelected: '#ffffff',
      border: isDark ? alpha('#f59e0b', 0.4) : alpha('#d97706', 0.3),
      borderSelected: 'transparent',
    },
  };

  const colors = variantColors[variant];

  return (
    <Chip
      label={label}
      size={size}
      onClick={onClick}
      sx={{
        backgroundColor: selected ? colors.bgSelected : colors.bg,
        color: selected ? colors.textSelected : colors.text,
        border: `1px solid ${selected ? colors.borderSelected : colors.border}`,
        fontWeight: 500,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.15s ease-in-out',
        '&:hover': onClick
          ? {
              backgroundColor: selected ? colors.bgSelected : colors.bgHover,
              transform: 'translateY(-1px)',
            }
          : {},
        '&:active': onClick
          ? {
              transform: 'translateY(0)',
            }
          : {},
      }}
    />
  );
};

export default Tag;
