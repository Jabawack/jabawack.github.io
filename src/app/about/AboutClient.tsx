'use client';

import { Box, Container, Typography, Stack, Grid, Paper } from '@mui/material';
import Tag from '@/components/ui/Tag';
import ProfileCard from '@/components/ui/ProfileCard';

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
                  { value: 5, label: 'Patents', color: 'success.light' },
                  { value: 2, label: 'M.S. Degrees', color: 'secondary.light' },
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
