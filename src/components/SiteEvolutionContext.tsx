'use client';

import React from 'react';
import Link from 'next/link';
import { Box, Paper, Typography, Button, Stack } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import TimelineIcon from '@mui/icons-material/Timeline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { getChapterByVersion } from '@/data/chapters';
import { getUpdateByVersion } from '@/data/updates';

interface SiteEvolutionContextProps {
  version: string;
}

/**
 * Displays a contextual banner linking a blog post to its corresponding
 * Site Evolution milestone. Shows version, chapter title, and a link
 * to view the post in the context of the site's evolution.
 */
export const SiteEvolutionContext: React.FC<SiteEvolutionContextProps> = ({ version }) => {
  const theme = useTheme();
  const chapter = getChapterByVersion(version);
  const update = getUpdateByVersion(version);

  if (!chapter || !update) {
    return null;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        mb: 4,
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
        borderRadius: 2,
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1.5} alignItems="center">
          <TimelineIcon
            sx={{
              color: 'primary.main',
              fontSize: 20,
            }}
          />
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 600 }}>
              Part of v{version} · {chapter.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {update.title}
            </Typography>
          </Box>
        </Stack>
        <Button
          component={Link}
          href={`/portfolio/site-evolution/?highlight=${version}`}
          size="small"
          endIcon={<ArrowForwardIcon />}
          sx={{
            textTransform: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          View in Site Evolution
        </Button>
      </Stack>
    </Paper>
  );
};

export default SiteEvolutionContext;
