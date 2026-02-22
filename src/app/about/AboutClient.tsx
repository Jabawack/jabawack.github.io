'use client';

import { Box, Container, Typography, Stack, Grid, Paper, Link } from '@mui/material';
import Tag from '@/components/ui/Tag';
import ProfileCard from '@/components/ui/ProfileCard';

const patents = [
  {
    title: 'Synchronized Multi-Display Content Playback',
    description: 'Server-side synchronization of video playback across multiple displays using content fingerprinting and reference timing.',
    url: 'https://patents.google.com/patent/US20150095962',
    number: 'US20150095962',
    year: 2015,
    firstInventor: true,
  },
  {
    title: 'Motion Recognition with Pressure Sensing',
    description: 'Combining camera-based body tracking with floor-mounted pressure sensors for precise movement detection in interactive systems.',
    url: 'https://patents.google.com/patent/US20150039259',
    number: 'US20150039259',
    year: 2015,
  },
  {
    title: 'Multi-User Personalized Display',
    description: 'Facial recognition to identify viewers and deliver customized content screens tailored to individual preferences.',
    url: 'https://patents.google.com/patent/US20150019995',
    number: 'US20150019995',
    year: 2015,
  },
  {
    title: 'Interactive Broadcast Applications',
    description: 'Automatic detection and execution of embedded interactive apps within broadcast content using QR codes and watermarks.',
    url: 'https://patents.google.com/patent/US20150002744',
    number: 'US20150002744',
    year: 2015,
  },
  {
    title: 'Mobile-to-Display Control Interface',
    description: 'Web-based remote control of smart displays through a mobile browser, eliminating the need for dedicated control apps.',
    url: 'https://patents.google.com/patent/US20140237397',
    number: 'US20140237397',
    year: 2014,
  },
];

const skills = {
  frontend: ['React', 'Redux', 'TypeScript', 'Next.js', 'JavaScript'],
  backend: ['Python', 'Django', 'Node.js', 'REST APIs', 'Celery'],
  ux: ['Prototyping', 'Usability Testing', 'A/B Testing', 'Eye-tracking'],
  tools: ['GitHub Actions', 'CI/CD', 'WebSocket', 'SSE', 'Langfuse'],
};

export default function AboutClient() {
  return (
    <Box component="main" sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Header */}
          <Grid container spacing={4} alignItems="flex-start">
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                About Me
              </Typography>
              <Typography variant="body1" color="text.secondary">
                I focus on the why behind technical decisions, bridging engineering and
                product to build systems that work for real users. I lead frontend
                architecture, shape cross-team standards, and care deeply about the
                details that make software feel right.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <ProfileCard
                stats={[
                  { value: '20+', label: 'Years', color: 'primary.light' },
                  { value: 2, label: 'M.S. Degrees', color: 'secondary.light' },
                  { value: 5, label: 'Patents', color: 'success.light' },
                ]}
              />
            </Grid>
          </Grid>

          {/* Bio Section */}
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Background
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
              Currently at Powder, I&apos;m building LLM-powered workflows and real-time
              data integrations for a fintech platform. Previously, I led frontend
              architecture at Real Capital Innovation, which was later{' '}
              <Box component="span" sx={{ fontStyle: 'italic', color: 'text.primary' }}>
                acquired by Addepar
              </Box>{' '}
              and evolved into Navigator, a portfolio analysis tool supporting
              advisor workflows at scale.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8, mb: 2 }}>
              Before fintech, I designed touchscreen interfaces for Siemens cardiology
              ultrasound systems. Earlier, I spent 8 years at Samsung leading SmartTV
              platform development and contributing to Galaxy cloud services, where I
              authored multiple patents related to interface design and system behavior.
            </Typography>
            <Typography variant="body1" sx={{ lineHeight: 1.8, fontStyle: 'italic' }}>
              My background in both Computer Science and Human Factors shapes how I
              approach technical decisions, always considering how real users will
              interact with the systems I build.
            </Typography>
          </Paper>

          {/* Education */}
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Education
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="h6" sx={{ color: 'secondary.main' }}>
                  M.S., Human Factors &amp; Ergonomics
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  San Jose State University
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6" sx={{ color: 'secondary.main' }}>
                  M.S., Computer Science
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  University of Utah
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* Patents */}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Patents
            </Typography>

            {/* Featured: First Inventor */}
            {patents.filter((p) => p.firstInventor).map((patent) => (
              <Paper
                key={patent.number}
                sx={{
                  p: { xs: 3, md: 4 },
                  mb: 2,
                  borderLeft: 4,
                  borderColor: 'success.main',
                  transition: 'border-color 0.2s',
                  '&:hover': { borderColor: 'success.light' },
                }}
              >
                <Typography
                  variant="overline"
                  sx={{
                    color: 'success.main',
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    fontSize: '0.75rem',
                  }}
                >
                  First Inventor
                </Typography>
                <Link
                  href={patent.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'secondary.main',
                    textDecoration: 'none',
                    display: 'block',
                    '&:hover': { textDecoration: 'underline' },
                  }}
                >
                  <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
                    {patent.title}
                  </Typography>
                </Link>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {patent.description}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5, display: 'block' }}>
                  {patent.number} · {patent.year}
                </Typography>
              </Paper>
            ))}

            {/* Remaining patents: 2x2 grid */}
            <Grid container spacing={2}>
              {patents.filter((p) => !p.firstInventor).map((patent) => (
                <Grid key={patent.number} size={{ xs: 12, md: 6 }}>
                  <Paper
                    sx={{
                      p: 3,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'border-color 0.2s',
                      borderColor: 'divider',
                      '&:hover': { borderColor: 'secondary.main' },
                    }}
                  >
                    <Link
                      href={patent.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: 'secondary.main',
                        textDecoration: 'none',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                    >
                      <Typography variant="subtitle1" component="span" sx={{ fontWeight: 600 }}>
                        {patent.title}
                      </Typography>
                    </Link>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, flex: 1 }}>
                      {patent.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1.5 }}>
                      {patent.number} · {patent.year}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Skills Section */}
          <Box>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
              Skills
            </Typography>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'primary.main' }}>
                    Frontend
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {skills.frontend.map((skill) => (
                      <Tag key={skill} label={skill} size="small" variant="primary" />
                    ))}
                  </Stack>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'secondary.main' }}>
                    Backend
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {skills.backend.map((skill) => (
                      <Tag key={skill} label={skill} size="small" variant="secondary" />
                    ))}
                  </Stack>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'success.main' }}>
                    UX Research
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {skills.ux.map((skill) => (
                      <Tag key={skill} label={skill} size="small" variant="success" />
                    ))}
                  </Stack>
                </Paper>
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <Paper sx={{ p: 3, height: '100%' }}>
                  <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                    Tools
                  </Typography>
                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {skills.tools.map((skill) => (
                      <Tag key={skill} label={skill} size="small" variant="default" />
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
