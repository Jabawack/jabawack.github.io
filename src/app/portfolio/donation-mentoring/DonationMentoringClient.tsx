'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  Chip,
  Button,
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';

const versions = [
  {
    version: 'Current',
    title: 'Current Version',
    date: 'Ongoing',
    description:
      'Complete redesign with dark/light mode toggle, mentor filtering, design system, and mentor account pages. Streamlined mentor selection with integrated calendar booking. Actively adding new features.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Self-hosted'],
    screenshot: '/images/portfolio/donation-mentoring/current.png',
    link: 'https://www.donation-mentoring.org/',
    status: 'current',
  },
  {
    version: 'v2',
    title: 'Custom Web App',
    date: 'End of 2025',
    description:
      'As the mentor pool grew to 30+, project owner Jaedongshin initiated a full rebuild. Standardized mentor profiles with consistent card layouts replaced the fragmented Notion pages. Each mentor gained flexibility to edit their own profiles. Added English version support with Supabase backend for centralized data management.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Vercel'],
    screenshot: '/images/portfolio/donation-mentoring/v2.png',
    status: 'archived',
  },
  {
    version: 'v1',
    title: 'Notion-Based Platform',
    date: '2025',
    description:
      'Early platform hosted on Notion with Node.js for mentor list management. Each mentor created their own profile page, leading to inconsistent layouts and varying information density. As we scaled to 30 mentors, Notion\'s free tier member limits and the fragmented UX became blockers for growth.',
    tech: ['Notion', 'Node.js'],
    screenshot: '/images/portfolio/donation-mentoring/v1.png',
    status: 'archived',
  },
];

export default function DonationMentoringClient() {
  const [openImage, setOpenImage] = useState<string | null>(null);

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
              Donation Mentoring
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700 }}>
              A mentoring platform that pairs one-on-one sessions with UNICEF donations.
              Connecting mentees with experienced professionals while creating social impact.
            </Typography>
          </Box>

          {/* Live Site Link */}
          <Box>
            <Button
              component="a"
              href="https://www.donation-mentoring.org/"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="primary"
              endIcon={<OpenInNewIcon />}
            >
              Visit Live Site
            </Button>
          </Box>

          {/* Version History */}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              Version History
            </Typography>
            <Stack spacing={3}>
              {versions.map((v) => (
                <Card key={v.version} sx={{ p: 3 }}>
                  <CardContent sx={{ p: 0 }}>
                    <Stack spacing={2}>
                      <Stack
                        direction="row"
                        spacing={2}
                        alignItems="center"
                        flexWrap="wrap"
                        useFlexGap
                      >
                        <Chip
                          label={v.version}
                          color={v.status === 'current' ? 'primary' : 'default'}
                          sx={{ fontWeight: 600 }}
                        />
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
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

                      {/* Screenshot Thumbnail */}
                      {v.screenshot && (
                        <Box
                          onClick={() => setOpenImage(v.screenshot!)}
                          sx={{
                            width: 150,
                            height: 200,
                            borderRadius: 1,
                            border: '1px solid',
                            borderColor: 'divider',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                              transform: 'scale(1.02)',
                              boxShadow: '0 0 20px rgba(0, 247, 255, 0.3)',
                            },
                          }}
                        >
                          <Box
                            component="img"
                            src={v.screenshot}
                            alt={`${v.title} screenshot`}
                            sx={{
                              width: '100%',
                              height: 'auto',
                            }}
                          />
                        </Box>
                      )}

                      {v.link && (
                        <Box>
                          <Button
                            component="a"
                            href={v.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outlined"
                            color="secondary"
                            size="small"
                            endIcon={<OpenInNewIcon />}
                          >
                            View Site
                          </Button>
                        </Box>
                      )}
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>

      {/* Lightbox Dialog */}
      <Dialog
        open={!!openImage}
        onClose={() => setOpenImage(null)}
        maxWidth={false}
        PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            maxHeight: '95vh',
            maxWidth: '95vw',
          },
        }}
      >
        <IconButton
          onClick={() => setOpenImage(null)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.5)',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0, overflow: 'auto' }}>
          {openImage && (
            <Box
              component="img"
              src={openImage}
              alt="Full size screenshot"
              sx={{
                maxWidth: '100%',
                maxHeight: '90vh',
                display: 'block',
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
