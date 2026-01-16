'use client';

import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface StorybookEmbedProps {
  height?: string | number;
  minHeight?: number;
}

// Use env variable for dev, fallback to production path
const STORYBOOK_URL = process.env.NEXT_PUBLIC_STORYBOOK_URL || '/storybook/';

export default function StorybookEmbed({
  height = 'calc(100vh - 300px)',
  minHeight = 600
}: StorybookEmbedProps) {
  const theme = useTheme();

  return (
    <Box
      component="iframe"
      src={STORYBOOK_URL}
      title="Design System - Storybook"
      sx={{
        width: '100%',
        height,
        minHeight,
        border: 'none',
        borderRadius: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#f5f5f5',
      }}
    />
  );
}
