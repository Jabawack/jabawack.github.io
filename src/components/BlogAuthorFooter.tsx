'use client';

import React from 'react';
import Link from 'next/link';
import { Box, Typography, Stack, Divider, Button } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';

/**
 * Subtle author footer for blog posts.
 * Appears at the end of each post with a link to About page.
 */
export const BlogAuthorFooter: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 6 }}>
      <Divider sx={{ mb: 4 }} />
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        justifyContent="space-between"
        sx={{
          p: 3,
          borderRadius: 2,
          backgroundColor: alpha(theme.palette.primary.main, 0.04),
        }}
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <Box
            sx={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              backgroundColor: alpha(theme.palette.primary.main, 0.1),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PersonIcon sx={{ color: 'primary.main' }} />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
              Written by TK
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Software Engineer & UX Enthusiast
            </Typography>
          </Box>
        </Stack>
        <Button
          component={Link}
          href="/about/"
          variant="outlined"
          size="small"
          sx={{ textTransform: 'none' }}
        >
          About the author
        </Button>
      </Stack>
    </Box>
  );
};

export default BlogAuthorFooter;
