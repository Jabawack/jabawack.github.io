'use client';

import { ReactNode } from 'react';
import { Box, Typography, SxProps, Theme } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';

export interface BentoItem {
  id: string;
  icon?: ReactNode;
  label: string;
  value: string | ReactNode;
  /** Grid column span: 1, 2, or 3 */
  colSpan?: 1 | 2 | 3;
  /** Grid row span: 1 or 2 */
  rowSpan?: 1 | 2;
  /** Optional custom content instead of label/value */
  customContent?: ReactNode;
}

type BentoVariant = 'default' | 'glass' | 'gradient';

interface BentoBoxProps {
  items: BentoItem[];
  /** Number of columns in the grid */
  columns?: { xs?: number; sm?: number; md?: number };
  /** Gap between items */
  gap?: number;
  /** Visual variant */
  variant?: BentoVariant;
  /** Custom primary accent color (overrides theme) */
  primaryColor?: string;
  /** Custom secondary accent color (overrides theme) */
  secondaryColor?: string;
  /** Custom sx for the container */
  sx?: SxProps<Theme>;
}

/**
 * BentoBox - A modern asymmetric grid layout component
 *
 * Inspired by Japanese bento boxes and modern UI patterns.
 * Supports varied card sizes through colSpan and rowSpan props.
 *
 * @see https://bentogrids.com for design inspiration
 */
export function BentoBox({
  items,
  columns = { xs: 2, sm: 3, md: 5 },
  gap = 1.5,
  variant = 'default',
  primaryColor,
  secondaryColor,
  sx
}: BentoBoxProps) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: `repeat(${columns.xs || 2}, 1fr)`,
          sm: `repeat(${columns.sm || 3}, 1fr)`,
          md: `repeat(${columns.md || 5}, 1fr)`,
        },
        gap,
        ...sx,
      }}
    >
      {items.map((item) => (
        <BentoCard
          key={item.id}
          item={item}
          variant={variant}
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        />
      ))}
    </Box>
  );
}

interface BentoCardProps {
  item: BentoItem;
  variant?: BentoVariant;
  primaryColor?: string;
  secondaryColor?: string;
}

function BentoCard({ item, variant = 'default', primaryColor, secondaryColor }: BentoCardProps) {
  const theme = useTheme();
  const { icon, label, value, colSpan = 1, rowSpan = 1, customContent } = item;

  // Use custom colors if provided, otherwise fall back to theme
  const accentColor = primaryColor || theme.palette.secondary.main;

  // Determine if this is a featured/large card
  const isLarge = colSpan > 1 || rowSpan > 1;
  const isWide = colSpan > 1;
  const isTall = rowSpan > 1;

  // Variant-specific styles
  const variantStyles = {
    default: {
      bgcolor: alpha(theme.palette.background.paper, 0.25),
      border: '1px solid',
      borderColor: alpha(theme.palette.divider, 0.2),
      '&:hover': {
        borderColor: alpha(accentColor, 0.5),
        bgcolor: alpha(accentColor, 0.08),
        boxShadow: `0 8px 30px ${alpha(accentColor, 0.15)}`,
      },
    },
    glass: {
      background: `linear-gradient(145deg, ${alpha(theme.palette.common.white, 0.08)} 0%, ${alpha(theme.palette.common.white, 0.02)} 100%)`,
      backdropFilter: 'blur(12px)',
      border: '1px solid',
      borderColor: alpha(theme.palette.common.white, 0.12),
      boxShadow: `inset 0 1px 1px ${alpha(theme.palette.common.white, 0.1)}, 0 4px 20px ${alpha(theme.palette.common.black, 0.2)}`,
      '&:hover': {
        background: `linear-gradient(145deg, ${alpha(accentColor, 0.15)} 0%, ${alpha(accentColor, 0.05)} 100%)`,
        borderColor: alpha(accentColor, 0.4),
        boxShadow: `inset 0 1px 1px ${alpha(theme.palette.common.white, 0.12)}, 0 8px 32px ${alpha(accentColor, 0.25)}`,
      },
    },
    gradient: {
      background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.4)} 0%, ${alpha(theme.palette.background.paper, 0.15)} 100%)`,
      border: '1px solid',
      borderColor: alpha(theme.palette.divider, 0.15),
      boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.1)}`,
      '&:hover': {
        background: `linear-gradient(135deg, ${alpha(accentColor, 0.15)} 0%, ${alpha(accentColor, 0.05)} 100%)`,
        borderColor: alpha(accentColor, 0.4),
        boxShadow: `0 8px 32px ${alpha(accentColor, 0.2)}`,
      },
    },
  };

  return (
    <Box
      sx={{
        gridColumn: colSpan > 1 ? `span ${colSpan}` : undefined,
        gridRow: rowSpan > 1 ? `span ${rowSpan}` : undefined,
        p: { xs: 2.5, sm: 3 },
        borderRadius: 2.5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isTall ? 'space-between' : 'flex-start',
        gap: isLarge ? 2 : 1.5,
        minHeight: isTall ? 180 : 'auto',
        transition: 'all 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
        willChange: 'transform, border-color, background-color',
        ...variantStyles[variant],
        '&:hover': {
          transform: 'translateY(-3px)',
          ...variantStyles[variant]['&:hover'],
        },
      }}
    >
      {customContent ? (
        customContent
      ) : (
        <>
          {/* Header: Icon + Label */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            {icon && (
              <Box
                sx={{
                  color: accentColor,
                  opacity: 0.8,
                  display: 'flex',
                  '& svg': {
                    fontSize: isLarge ? 24 : 20,
                  },
                }}
              >
                {icon}
              </Box>
            )}
            <Typography
              variant="caption"
              sx={{
                color: 'text.secondary',
                textTransform: 'uppercase',
                letterSpacing: 0.8,
                fontSize: isLarge ? '0.7rem' : '0.65rem',
                fontWeight: 600,
              }}
            >
              {label}
            </Typography>
          </Box>

          {/* Value */}
          <Box sx={{ mt: isTall ? 0 : 'auto' }}>
            {typeof value === 'string' ? (
              <Typography
                sx={{
                  fontWeight: 700,
                  color: accentColor,
                  lineHeight: 1.3,
                  fontSize: isWide
                    ? { xs: '0.95rem', sm: '1rem' }
                    : isTall
                    ? { xs: '1.25rem', sm: '1.5rem' }
                    : { xs: '1.1rem', sm: '1.25rem' },
                }}
              >
                {value}
              </Typography>
            ) : (
              value
            )}
          </Box>
        </>
      )}
    </Box>
  );
}

export default BentoBox;
