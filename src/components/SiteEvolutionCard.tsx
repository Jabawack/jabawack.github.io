'use client';

import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip,
  Stack,
} from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';
import { getMilestoneProgress } from '@/data/chapters';

// Progress derived from shared chapters data
const progressPercent = getMilestoneProgress();

export default function SiteEvolutionCard() {
  return (
    <Card
      component={Link}
      href="/portfolio/site-evolution/"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        background: 'linear-gradient(135deg, rgba(32, 71, 244, 0.15) 0%, rgba(0, 247, 255, 0.08) 100%)',
        border: '1px solid rgba(0, 247, 255, 0.3)',
        transition: 'all 0.3s ease',
        '&:hover': {
          border: '1px solid rgba(0, 247, 255, 0.6)',
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 30px rgba(0, 247, 255, 0.15)',
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
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              '& .MuiLinearProgress-bar': {
                borderRadius: 3,
                background: 'linear-gradient(90deg, #2047f4 0%, #00f7ff 100%)',
              },
            }}
          />
        </Box>

        {/* Tags */}
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
          <Chip
            label="Next.js 15"
            size="small"
            sx={{
              backgroundColor: 'rgba(0, 247, 255, 0.1)',
              color: 'secondary.main',
              fontSize: '0.7rem',
            }}
          />
          <Chip
            label="React 19"
            size="small"
            sx={{
              backgroundColor: 'rgba(32, 71, 244, 0.2)',
              color: '#8fa4f8',
              fontSize: '0.7rem',
            }}
          />
          <Chip
            label="MUI v7"
            size="small"
            sx={{
              backgroundColor: 'rgba(32, 71, 244, 0.2)',
              color: '#8fa4f8',
              fontSize: '0.7rem',
            }}
          />
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
