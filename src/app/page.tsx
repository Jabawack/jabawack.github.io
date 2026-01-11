'use client';

import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
} from '@mui/material';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AnimatedSection from '@/components/AnimatedSection';
export default function Home() {
  const featuredProjects = [
    {
      id: 'homepage',
      title: 'Portfolio Homepage',
      description: 'Evolution of my personal portfolio site. Current version built with Next.js 15, React 19, and MUI v7.',
      image: '/images/logo.png',
      tags: ['Next.js', 'React 19', 'MUI v7'],
      link: '/portfolio/homepage/',
      imageStyle: 'contain' as const,
    },
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
      description: 'Bay Area nonprofit organization with 8,000+ members. Serving as VP, IT Support (Webmaster), and Design Committee member.',
      image: 'https://i0.wp.com/bayareakgroup.org/wp-content/uploads/2019/01/cropped-Symbol-Original-on-White.png?fit=512%2C512&ssl=1',
      tags: ['NPO', 'BAKG', 'WordPress', 'Social'],
      link: 'https://bayareakgroup.org',
      imageStyle: 'contain' as const,
    },
  ];

  return (
    <Box component="main">
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
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
            background: 'radial-gradient(ellipse at 50% 0%, rgba(32, 71, 244, 0.15) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />

        <Container maxWidth="lg">
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
                fontWeight: 700,
                background: 'linear-gradient(135deg, #e0e0e0 0%, #00f7ff 50%, #2047f4 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Taeho (TK) Kim
            </Typography>

            <Typography
              variant="h2"
              color="text.secondary"
              sx={{
                fontSize: { xs: '1.25rem', md: '1.75rem' },
                fontWeight: 400,
                maxWidth: 600,
              }}
            >
              Fullstack UX Engineer
            </Typography>

            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 600, fontSize: { xs: '1rem', md: '1.125rem' } }}
            >
              20+ years building scalable web apps with React, Python, and Django.
              Passionate about crafting intuitive products and mentoring engineers.
            </Typography>

          </Stack>
        </Container>

        {/* Scroll indicator */}
        <Box
          component="button"
          onClick={() => {
            document.getElementById('featured-projects')?.scrollIntoView({ behavior: 'smooth' });
          }}
          aria-label="Scroll to projects"
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            cursor: 'pointer',
            background: 'none',
            border: 'none',
            padding: 0,
            animation: 'bounce 3s ease-in-out infinite',
            '@keyframes bounce': {
              '0%, 20%, 50%, 80%, 100%': {
                transform: 'translateX(-50%) translateY(0)',
              },
              '40%': {
                transform: 'translateX(-50%) translateY(-10px)',
              },
              '60%': {
                transform: 'translateX(-50%) translateY(-5px)',
              },
            },
            '&:hover': {
              '& .MuiTypography-root': {
                color: 'secondary.main',
              },
            },
          }}
        >
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, transition: 'color 0.2s' }}>
            Featured Projects
          </Typography>
          <KeyboardArrowDownIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
        </Box>
      </Box>

      {/* Featured Projects Section */}
      <Box id="featured-projects" sx={{ py: 10, backgroundColor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Stack spacing={6}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h2" sx={{ fontSize: { xs: '1.75rem', md: '2.25rem' } }}>
                Featured Projects
              </Typography>
              <Button
                component={Link}
                href="/portfolio"
                endIcon={<ArrowForwardIcon />}
                sx={{ color: 'secondary.main' }}
              >
                View All
              </Button>
            </Box>

            <Grid container spacing={3}>
              {featuredProjects.map((project) => (
                <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                  <Card
                    component={project.link ? Link : 'div'}
                    href={project.link || '#'}
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      textDecoration: 'none',
                      cursor: project.link ? 'pointer' : 'default',
                    }}
                  >
                    <CardMedia
                      sx={{
                        height: 160,
                        backgroundColor: '#111',
                        overflow: 'hidden',
                        ...(project.imageStyle === 'contain' && {
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          p: 3,
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
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h6" gutterBottom>
                        {project.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {project.description}
                      </Typography>
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {project.tags.slice(0, 3).map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(0, 247, 255, 0.1)',
                              color: 'secondary.main',
                              fontSize: '0.75rem',
                            }}
                          />
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

    </Box>
  );
}
