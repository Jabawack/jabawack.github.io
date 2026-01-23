'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CodeIcon from '@mui/icons-material/Code';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface BlogBackLinkProps {
  version?: string;
}

function BlogBackLinkInner({ version }: BlogBackLinkProps) {
  const theme = useTheme();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  // Build return URLs with highlight param (version already has 'v' prefix)
  const journeyReturnUrl = version
    ? `/portfolio/site-evolution/?tab=journey&highlight=${version}`
    : null;
  const changelogReturnUrl = version
    ? `/portfolio/site-evolution/?tab=changelog&highlight=${version}`
    : null;

  if (from === 'journey' && journeyReturnUrl) {
    return (
      <Button
        component={Link}
        href={journeyReturnUrl}
        startIcon={<AutoStoriesIcon />}
        size="small"
        sx={{
          alignSelf: 'flex-start',
          textTransform: 'none',
          color: 'text.secondary',
          '&:hover': {
            color: 'secondary.main',
            backgroundColor: alpha(theme.palette.secondary.main, 0.08),
          },
        }}
      >
        Back to the Journey
      </Button>
    );
  }

  if (from === 'changelog' && changelogReturnUrl) {
    return (
      <Button
        component={Link}
        href={changelogReturnUrl}
        startIcon={<CodeIcon />}
        size="small"
        sx={{
          alignSelf: 'flex-start',
          textTransform: 'none',
          color: 'text.secondary',
          '&:hover': {
            color: 'secondary.main',
            backgroundColor: alpha(theme.palette.secondary.main, 0.08),
          },
        }}
      >
        Back to Changelog
      </Button>
    );
  }

  return (
    <Button
      component={Link}
      href="/blog/"
      startIcon={<ArrowBackIcon />}
      sx={{ alignSelf: 'flex-start' }}
    >
      Back to Blog
    </Button>
  );
}

export default function BlogBackLink({ version }: BlogBackLinkProps) {
  return (
    <Suspense
      fallback={
        <Button
          component={Link}
          href="/blog/"
          startIcon={<ArrowBackIcon />}
          sx={{ alignSelf: 'flex-start' }}
        >
          Back to Blog
        </Button>
      }
    >
      <BlogBackLinkInner version={version} />
    </Suspense>
  );
}
