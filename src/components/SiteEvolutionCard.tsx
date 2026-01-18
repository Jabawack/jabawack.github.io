'use client';

import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Stack,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import Tag from '@/components/Tag';
import BuildIcon from '@mui/icons-material/Build';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { getMilestoneProgress } from '@/data/chapters';
import { getGradientBackground, getProgressGradient } from '@/theme';

// Progress derived from shared chapters data
const progressPercent = getMilestoneProgress();

export default function SiteEvolutionCard() {
  const theme = useTheme();

  return (
    <Card
      component={Link}
      href="/portfolio/site-evolution/"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        background: getGradientBackground(theme),
        border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
        transition: 'all 0.3s ease',
        '&:hover': {
          border: `1px solid ${alpha(theme.palette.secondary.main, 0.6)}`,
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 30px ${alpha(theme.palette.secondary.main, 0.15)}`,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <BuildIcon sx={{ color: 'secondary.main' }} />
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Site Evolution
          </Typography>
        </Box>

        {/* Description */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3, flexGrow: 1 }}>
          How this portfolio evolved from 2017 jQuery to Next.js 15. The rebuild journey, UX decisions, and what&apos;s next.
        </Typography>

        {/* Progress */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
            <Typography variant="caption" color="text.secondary">
              Progress
            </Typography>
            <Typography variant="caption" sx={{ color: 'secondary.main', fontWeight: 600 }}>
              {progressPercent}%
            </Typography>
          </Box>
          <LinearProgress
            variant="determinate"
            value={progressPercent}
            sx={{
              height: 6,
              borderRadius: 3,
              backgroundColor: theme.palette.divider,
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
                background: getProgressGradient(theme),
              },
            }}
          />
        </Box>

        {/* Tags */}
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
          <Tag label="Next.js 15" variant="secondary" size="small" />
          <Tag label="React 19" variant="secondary" size="small" />
          <Tag label="MUI v7" variant="secondary" size="small" />
        </Stack>

        {/* CTA */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            color: 'secondary.main',
            mt: 'auto',
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 500 }}>
            See the journey
          </Typography>
          <ArrowForwardIcon sx={{ fontSize: 16 }} />
        </Box>
      </CardContent>
    </Card>
  );
}
