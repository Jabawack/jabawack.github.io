'use client';

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SiteEvolutionCard from '@/components/features/site-evolution/SiteEvolutionCard';
import Tag from '@/components/ui/Tag';
import { HeroSection, SkillsShowcase, PersonalStatement } from '@/components/landing';

export default function Home() {
  const theme = useTheme();

  const featuredWork = [
    {
      id: 'donation-mentoring',
      title: 'Donation Mentoring',
      description: 'A mentoring platform that pairs one-on-one sessions with UNICEF donations.',
      image: '/images/portfolio/donation-mentoring/current.jpg',
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
      {/* Hero Section */}
      <HeroSection />

      {/* Skills Showcase */}
      <SkillsShowcase />

      {/* Personal Statement */}
      <PersonalStatement />

      {/* Featured Work Section */}
      <Box
        sx={{
          py: { xs: 8, md: 12 },
          backgroundColor: 'background.default',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 600,
              mb: 4,
              textAlign: 'center',
            }}
          >
            Featured Work
          </Typography>

          <Grid container spacing={3}>
            {/* Building in Public Card */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ height: '100%', minHeight: { xs: 280, md: 300 } }}>
                <SiteEvolutionCard />
              </Box>
            </Grid>

            {/* Portfolio Items */}
            {featuredWork.map((item) => (
              <Grid key={item.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <Card
                  component={Link}
                  href={item.link}
                  sx={{
                    height: '100%',
                    minHeight: 300,
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
                      ...(item.imageStyle === 'contain' && {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 2,
                      }),
                    }}
                  >
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.title}
                      sx={{
                        ...(item.imageStyle === 'contain'
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
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5, fontSize: '0.85rem' }}>
                      {item.description}
                    </Typography>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
                      {item.tags.slice(0, 3).map((tag) => (
                        <Tag
                          key={tag}
                          label={tag}
                          size="small"
                          variant="secondary"
                          sx={{ fontSize: '0.7rem', height: 22 }}
                        />
                      ))}
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))}

            {/* View Portfolio Card */}
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <Card
                component={Link}
                href="/portfolio/"
                sx={{
                  height: '100%',
                  minHeight: { xs: 100, md: 300 },
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
                      View Portfolio
                    </Typography>
                    <ArrowForwardIcon />
                  </Box>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1, opacity: 0.7 }}>
                    See all work
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
