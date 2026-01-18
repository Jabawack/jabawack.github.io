'use client';

import React from 'react';
import { Chip } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';

export type TagVariant = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'outlined';

export interface TagProps {
  /** Tag label text */
  label: string;
  /** Whether the tag is currently selected/active */
  selected?: boolean;
  /** Click handler */
  onClick?: (e: React.MouseEvent) => void;
  /** Delete handler - shows delete icon when provided */
  onDelete?: () => void;
  /** Size variant */
  size?: 'small' | 'medium';
  /** Color variant - uses theme colors */
  variant?: TagVariant;
  /** Icon to display before the label */
  icon?: React.ReactElement;
  /** Additional sx styles for customization */
  sx?: Record<string, unknown>;
}

/**
 * Tag component for categorization and filtering.
 *
 * Uses theme colors for consistency across light/dark modes.
 * All variants derive from theme.palette for proper theming.
 */
export const Tag: React.FC<TagProps> = ({
  label,
  selected = false,
  onClick,
  onDelete,
  size = 'small',
  variant = 'default',
  icon,
  sx: sxOverride,
}) => {
  const theme = useTheme();

  // Get colors from theme palette based on variant
  const getVariantColors = () => {
    const palette = theme.palette;

    switch (variant) {
      case 'primary':
        return {
          bg: alpha(palette.primary.main, 0.15),
          bgHover: alpha(palette.primary.main, 0.25),
          bgSelected: palette.primary.main,
          text: palette.mode === 'dark' ? palette.primary.light : palette.primary.dark,
          textSelected: palette.primary.contrastText,
          border: alpha(palette.primary.main, 0.4),
        };

      case 'secondary':
        return {
          bg: alpha(palette.secondary.main, 0.1),
          bgHover: alpha(palette.secondary.main, 0.2),
          bgSelected: palette.secondary.main,
          text: palette.secondary.main,
          textSelected: palette.mode === 'dark' ? '#000000' : '#ffffff',
          border: alpha(palette.secondary.main, 0.4),
        };

      case 'success':
        return {
          bg: alpha(palette.success.main, 0.15),
          bgHover: alpha(palette.success.main, 0.25),
          bgSelected: palette.success.main,
          text: palette.mode === 'dark' ? palette.success.light : palette.success.dark,
          textSelected: palette.success.contrastText,
          border: alpha(palette.success.main, 0.4),
        };

      case 'warning':
        return {
          bg: alpha(palette.warning.main, 0.15),
          bgHover: alpha(palette.warning.main, 0.25),
          bgSelected: palette.warning.main,
          text: palette.mode === 'dark' ? palette.warning.light : palette.warning.dark,
          textSelected: palette.warning.contrastText,
          border: alpha(palette.warning.main, 0.4),
        };

      case 'error':
        return {
          bg: alpha(palette.error.main, 0.15),
          bgHover: alpha(palette.error.main, 0.25),
          bgSelected: palette.error.main,
          text: palette.mode === 'dark' ? palette.error.light : palette.error.dark,
          textSelected: palette.error.contrastText,
          border: alpha(palette.error.main, 0.4),
        };

      case 'outlined':
        return {
          bg: 'transparent',
          bgHover: alpha(palette.text.primary, 0.05),
          bgSelected: alpha(palette.text.primary, 0.1),
          text: palette.text.secondary,
          textSelected: palette.text.primary,
          border: palette.divider,
        };

      case 'default':
      default:
        return {
          bg: palette.mode === 'dark' ? alpha(palette.text.primary, 0.08) : alpha(palette.text.primary, 0.06),
          bgHover: palette.mode === 'dark' ? alpha(palette.text.primary, 0.12) : alpha(palette.text.primary, 0.1),
          bgSelected: palette.primary.main,
          text: palette.text.secondary,
          textSelected: palette.primary.contrastText,
          border: palette.mode === 'dark' ? alpha(palette.text.primary, 0.15) : alpha(palette.text.primary, 0.12),
        };
    }
  };

  const colors = getVariantColors();

  return (
    <Chip
      label={label}
      size={size}
      icon={icon}
      onClick={onClick}
      onDelete={onDelete}
      sx={{
        backgroundColor: selected ? colors.bgSelected : colors.bg,
        color: selected ? colors.textSelected : colors.text,
        border: `1px solid ${selected ? 'transparent' : colors.border}`,
        fontWeight: 500,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.15s ease-in-out',
        '& .MuiChip-icon': {
          color: 'inherit',
        },
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
        ...sxOverride,
      }}
    />
  );
};

export default Tag;
