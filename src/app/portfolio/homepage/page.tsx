import { Box, Container, Typography, Stack, Card, CardContent, Chip, Button } from '@mui/material';
import Link from 'next/link';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const versions = [
  {
    version: 'v2025',
    title: 'Current Version',
    date: 'January 2025',
    description: 'Modern portfolio built with Next.js 15, React 19, and MUI v7. Features dark theme, static export for GitHub Pages, and responsive design.',
    tech: ['Next.js 15', 'React 19', 'MUI v7', 'TypeScript'],
    link: '/',
    status: 'current',
  },
  {
    version: 'v2017',
    title: 'Legacy Version',
    date: '2017',
    description: 'Original portfolio built with Materialize CSS and jQuery. Static HTML/CSS/JS site.',
    tech: ['Materialize CSS', 'jQuery', 'HTML/CSS'],
    link: '/v2017/index.html',
    status: 'archived',
  },
];

export default function HomepagePortfolioPage() {
  return (
    <Box component="main" sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Header */}
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Portfolio Homepage
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700 }}>
              Evolution of my personal portfolio site over the years.
            </Typography>
          </Box>

          {/* Versions */}
          <Stack spacing={3}>
            {versions.map((v) => (
              <Card key={v.version} sx={{ p: 3 }}>
                <CardContent sx={{ p: 0 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
                      <Chip
                        label={v.version}
                        color={v.status === 'current' ? 'primary' : 'default'}
                        sx={{ fontWeight: 600 }}
                      />
                      <Typography variant="h5" sx={{ fontWeight: 600 }}>
                        {v.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {v.date}
                      </Typography>
                    </Stack>

                    <Typography variant="body1" color="text.secondary">
                      {v.description}
                    </Typography>

                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {v.tech.map((t) => (
                        <Chip
                          key={t}
                          label={t}
                          size="small"
                          sx={{
                            backgroundColor: 'rgba(0, 247, 255, 0.1)',
                            color: 'secondary.main',
                          }}
                        />
                      ))}
                    </Stack>

                    <Box>
                      <Button
                        component={Link}
                        href={v.link}
                        variant="outlined"
                        color="secondary"
                        endIcon={<OpenInNewIcon />}
                      >
                        View {v.version}
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
