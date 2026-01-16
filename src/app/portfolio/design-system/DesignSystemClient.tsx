'use client';

import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Stack,
  Breadcrumbs,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import WidgetsIcon from '@mui/icons-material/Widgets';
import StorybookEmbed from '@/components/StorybookEmbed';

export default function DesignSystemClient() {
  return (
    <Box component="main" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={<NavigateNextIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
            sx={{ '& .MuiBreadcrumbs-li': { color: 'text.secondary' } }}
          >
            <Link href="/portfolio/" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Typography
                variant="body2"
                sx={{ '&:hover': { color: 'secondary.main' }, transition: 'color 0.2s' }}
              >
                Portfolio
              </Typography>
            </Link>
            <Typography variant="body2" color="text.primary">
              Design System
            </Typography>
          </Breadcrumbs>

          {/* Header */}
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
              <WidgetsIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
              <Typography variant="h3" sx={{ fontWeight: 700 }}>
                Design System
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700 }}>
              Storybook component library showcasing the UI building blocks of this portfolio.
              Explore components, their variants, and accessibility features.
            </Typography>
          </Box>

          {/* Storybook Embed */}
          <StorybookEmbed height="calc(100vh - 280px)" minHeight={700} />
        </Stack>
      </Container>
    </Box>
  );
}
