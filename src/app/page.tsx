'use client';

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  Stack,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SiteEvolutionCard from '@/components/SiteEvolutionCard';
import { getHeroGradient, getTextGradient } from '@/theme';

export default function Home() {
  const theme = useTheme();

  const featuredProjects = [
    {
      id: 'donation-mentoring',
      title: 'Donation Mentoring',
      description: 'A mentoring platform that pairs one-on-one sessions with UNICEF donations.',
      image: '/images/portfolio/donation-mentoring/current.png',
      tags: ['Next.js', 'UNICEF', 'Social Impact'],
      link: '/portfolio/donation-mentoring/',
      imageStyle: 'cover' as const,
    },
    {
      id: 'bakg',
      title: 'Bay Area K Group',
      description: 'Bay Area nonprofit with 8,000+ members. VP, IT Support, and Design Committee.',
      image: 'https://i0.wp.com/bayareakgroup.org/wp-content/uploads/2019/01/cropped-Symbol-Original-on-White.png?fit=512%2C512&ssl=1',
      tags: ['NPO', 'WordPress', 'Social'],
      link: 'https://bayareakgroup.org',
      imageStyle: 'contain' as const,
    },
  ];

  return (
    <Box component="main">
      {/* Bento Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          py: { xs: 10, md: 8 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background gradient */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: getHeroGradient(theme),
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={3}>
            {/* Intro - Plain text, not a card */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  height: '100%',
                  minHeight: { xs: 280, md: 320 },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  p: { xs: 2, md: 4 },
                }}
              >
                <Typography
                  variant="h1"
                  sx={{
                    fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' },
                    fontWeight: 700,
                    background: getTextGradient(theme),
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    mb: 2,
                  }}
                >
                  Taeho (TK) Kim
                </Typography>

                <Typography
                  variant="h2"
                  color="text.secondary"
                  sx={{
                    fontSize: { xs: '1.25rem', md: '1.5rem' },
                    fontWeight: 400,
                    mb: 2,
                  }}
                >
                  Fullstack UX Engineer
                </Typography>

                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontSize: { xs: '1rem', md: '1.1rem' }, lineHeight: 1.7 }}
                >
                  20+ years building scalable web apps with React, Python, and Django.
                  Passionate about crafting intuitive products and mentoring engineers.
                </Typography>
              </Box>
            </Grid>

            {/* Building in Public Card - Large */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ height: '100%', minHeight: { xs: 280, md: 320 } }}>
                <SiteEvolutionCard />
              </Box>
            </Grid>

            {/* Project Cards - Smaller */}
            {featuredProjects.map((project) => (
              <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  component={Link}
                  href={project.link}
                  sx={{
                    height: '100%',
                    minHeight: 240,
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: `0 8px 30px ${alpha(theme.palette.common.black, 0.3)}`,
                    },
                  }}
                >
                  <CardMedia
                    sx={{
                      height: 120,
                      backgroundColor: theme.palette.mode === 'dark' ? '#111' : '#f5f5f5',
                      overflow: 'hidden',
                      ...(project.imageStyle === 'contain' && {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2,
                      }),
                    }}
                  >
                    <Box
                      component="img"
                      src={project.image}
                      alt={project.title}
                      sx={{
                        ...(project.imageStyle === 'contain'
                          ? {
                              maxHeight: '100%',
                              maxWidth: '100%',
                              objectFit: 'contain',
                            }
                          : {
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'top',
                            }),
                      }}
                    />
                  </CardMedia>
                  <CardContent sx={{ flexGrow: 1, p: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {project.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.85rem' }}>
                      {project.description}
                    </Typography>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                      {project.tags.slice(0, 3).map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                            color: 'secondary.main',
                            fontSize: '0.7rem',
                            height: 22,
                          }}
                        />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* View All Projects Card */}
            <Grid size={{ xs: 12, sm: 12, md: 4 }}>
              <Card
                component={Link}
                href="/portfolio/"
                sx={{
                  height: '100%',
                  minHeight: { xs: 100, md: 240 },
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  backgroundColor: alpha(theme.palette.common.white, theme.palette.mode === 'dark' ? 0.02 : 0.5),
                  border: `1px dashed ${alpha(theme.palette.text.primary, 0.2)}`,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.secondary.main, 0.05),
                    border: `1px dashed ${alpha(theme.palette.secondary.main, 0.4)}`,
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 1,
                      color: 'text.secondary',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: 'secondary.main',
                      },
                    }}
                  >
                    <Typography variant="h6" sx={{ fontWeight: 500 }}>
                      View All Projects
                    </Typography>
                    <ArrowForwardIcon />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, opacity: 0.7 }}>
                    Explore the full portfolio
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
