'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Breadcrumbs,
  Chip,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { BentoBox, BentoItem } from '@/components/ui/BentoBox';

interface CTAButton {
  label: string;
  href: string;
  variant?: 'contained' | 'outlined';
  icon?: React.ReactNode;
  target?: string;
}

interface ProjectMedia {
  type: 'image' | 'custom';
  src?: string;
  alt?: string;
  aspectRatio?: string;
  useNextImage?: boolean;
  component?: React.ReactNode;
}

interface StatusChip {
  label: string;
  color?: 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  variant?: 'filled' | 'outlined';
}

export interface ProjectHeaderProps {
  title: string;
  breadcrumbLabel: string;
  description: string;
  statusChip?: StatusChip;
  media?: ProjectMedia;
  ctaButtons?: CTAButton[];
  bentoItems?: BentoItem[];
  bentoColumns?: { xs?: number; sm?: number; md?: number };
  bentoPrimaryColor?: string;
  children?: React.ReactNode;
}

export default function ProjectHeader({
  title,
  breadcrumbLabel,
  description,
  statusChip,
  media,
  ctaButtons,
  bentoItems,
  bentoColumns = { xs: 2, sm: 3, md: 3 },
  bentoPrimaryColor,
  children,
}: ProjectHeaderProps) {
  const theme = useTheme();

  return (
    <>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
        <Link href="/portfolio/" style={{ color: 'inherit', textDecoration: 'none' }}>
          <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
            Portfolio
          </Typography>
        </Link>
        <Typography variant="body2" color="text.primary">
          {breadcrumbLabel}
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Stack spacing={4} sx={{ mb: 6 }}>
        {/* Media (image-first) */}
        {media && media.type === 'image' && media.src && (
          media.useNextImage ? (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                aspectRatio: media.aspectRatio || '16/9',
                borderRadius: 2,
                overflow: 'hidden',
                bgcolor: alpha(theme.palette.background.paper, 0.5),
              }}
            >
              <Image
                src={media.src}
                alt={media.alt || title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            </Box>
          ) : (
            <Box
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              <Box
                component="img"
                src={media.src}
                alt={media.alt || title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </Box>
          )
        )}

        {media && media.type === 'custom' && media.component}

        {/* Title + Status Chip */}
        <Box>
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h1" sx={{ fontWeight: 700 }}>
              {title}
            </Typography>
            {statusChip && (
              <Chip
                label={statusChip.label}
                size="small"
                color={statusChip.color || 'primary'}
                variant={statusChip.variant || 'outlined'}
              />
            )}
          </Stack>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
            {description}
          </Typography>
          {ctaButtons && ctaButtons.length > 0 && (
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              {ctaButtons.map((btn) => (
                <Button
                  key={btn.label}
                  variant={btn.variant || 'contained'}
                  startIcon={btn.icon}
                  href={btn.href}
                  {...(btn.target && {
                    target: btn.target,
                    rel: 'noopener noreferrer',
                  })}
                >
                  {btn.label}
                </Button>
              ))}
            </Stack>
          )}
        </Box>

        {/* Bento Box Metrics */}
        {bentoItems && bentoItems.length > 0 && (
          <BentoBox
            items={bentoItems}
            columns={bentoColumns}
            gap={2}
            variant="glass"
            primaryColor={bentoPrimaryColor || theme.palette.primary.light}
          />
        )}

        {children}
      </Stack>
    </>
  );
}
