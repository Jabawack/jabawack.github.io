'use client';

import { Box, Container, Typography, Stack, Chip, Grid, Paper } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';

const skills = {
  frontend: ['React', 'Redux', 'TypeScript', 'Next.js', 'JavaScript'],
  backend: ['Python', 'Django', 'Node.js', 'REST APIs', 'Celery'],
  ux: ['User Research', 'Prototyping', 'Usability Testing', 'A/B Testing', 'Eye-tracking'],
  tools: ['GitHub Actions', 'CI/CD', 'WebSocket', 'SSE', 'Langfuse'],
};

export default function AboutClient() {
  const theme = useTheme();

  return (
    <Box component="main" sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Header */}
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              About Me
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 700 }}
            >
              I&apos;m Taeho (TK) Kim, a Fullstack UX Engineer with over 20 years of experience
              building scalable web applications and user-centric interfaces.
            </Typography>
          </Box>

          {/* Bio Section */}
          <Paper sx={{ p: 4 }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Background
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.8 }}>
              With deep expertise in React, Python, and Django, I&apos;ve led cross-functional
              teams and implemented robust CI/CD pipelines. My work includes scaling fintech
              platforms, integrating complex data sources, and enhancing real-time workflows.
              I hold multiple patents and am passionate about crafting intuitive products
              and mentoring engineers.
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
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          color: 'primary.main',
                        }}
                      />
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
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                          color: 'secondary.main',
                        }}
                      />
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
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          backgroundColor: alpha(theme.palette.success.main, 0.1),
                          color: 'success.main',
                        }}
                      />
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
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{ backgroundColor: theme.palette.divider, color: 'text.secondary' }}
                      />
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
