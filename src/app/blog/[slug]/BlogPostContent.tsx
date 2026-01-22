'use client';

import { Paper } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import type { ReactNode } from 'react';

interface BlogPostContentProps {
  children: ReactNode;
}

export default function BlogPostContent({ children }: BlogPostContentProps) {
  const theme = useTheme();

  return (
    <Paper
      sx={{
        p: { xs: 3, md: 5 },
        '& h1': {
          ...theme.typography.h2,
          fontWeight: 700,
          mt: 0,
          mb: 3,
        },
        '& h2': {
          ...theme.typography.h4,
          fontWeight: 600,
          mt: 4,
          mb: 2,
        },
        '& h3': {
          ...theme.typography.h5,
          fontWeight: 600,
          mt: 3,
          mb: 1.5,
        },
        '& p': {
          ...theme.typography.body1,
          lineHeight: 1.8,
          mb: 2,
        },
        '& ul, & ol': {
          pl: 3,
          mb: 2,
          '& li': {
            ...theme.typography.body1,
            lineHeight: 1.8,
            mb: 0.5,
          },
        },
        '& a': {
          color: 'primary.main',
          textDecoration: 'underline',
          '&:hover': {
            color: 'primary.dark',
          },
        },
        '& code': {
          fontFamily: 'monospace',
          fontSize: '0.9em',
          backgroundColor: alpha(theme.palette.primary.main, 0.1),
          px: 0.75,
          py: 0.25,
          borderRadius: 1,
        },
        '& pre': {
          p: 2,
          borderRadius: 2,
          overflow: 'auto',
          mb: 3,
          '& code': {
            backgroundColor: 'transparent',
            p: 0,
          },
        },
        '& blockquote': {
          borderLeft: `4px solid ${theme.palette.primary.main}`,
          pl: 3,
          py: 2,
          ml: 0,
          my: 3,
          fontStyle: 'italic',
          color: 'text.secondary',
          '& p': {
            m: 0,
          },
        },
        '& img': {
          maxWidth: '100%',
          height: 'auto',
          borderRadius: 2,
          my: 2,
        },
        '& hr': {
          border: 'none',
          borderTop: `1px solid ${theme.palette.divider}`,
          my: 4,
        },
      }}
    >
      {children}
    </Paper>
  );
}
