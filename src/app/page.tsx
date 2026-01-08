import { Box, Container, Typography, Button, Stack } from '@mui/material';
import Link from 'next/link';

export default function Home() {
  return (
    <Box
      component="main"
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="lg">
        <Stack spacing={4} alignItems="center" textAlign="center">
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              background: 'linear-gradient(135deg, #e0e0e0 0%, #00f7ff 100%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            TK Kim
          </Typography>

          <Typography
            variant="h2"
            color="text.secondary"
            sx={{ fontSize: { xs: '1.25rem', md: '1.5rem' }, fontWeight: 400 }}
          >
            Frontend Engineer & UX Designer
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ maxWidth: 600 }}
          >
            Building scalable web applications with modern technologies.
            Crafting high-performance products that users love.
          </Typography>

          <Stack direction="row" spacing={2} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              href="/updates"
            >
              View Updates
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              component={Link}
              href="/v2017/"
            >
              2017 Archive
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
