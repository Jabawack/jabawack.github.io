'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import Link from 'next/link';
import { projects, type Project } from '@/data/projects';

type CategoryFilter = 'all' | Project['category'];

export default function PortfolioClient() {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const theme = useTheme();

  const filteredProjects =
    categoryFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === categoryFilter);

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
              Portfolio
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
              A collection of projects spanning UX design, frontend development, and full-stack
              applications.
            </Typography>
          </Box>

          {/* Filters */}
          <Box>
            <ToggleButtonGroup
              value={categoryFilter}
              exclusive
              onChange={(_, value) => value && setCategoryFilter(value)}
              size="small"
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="ux">UX</ToggleButton>
              <ToggleButton value="frontend">Frontend</ToggleButton>
              <ToggleButton value="design">Design</ToggleButton>
              <ToggleButton value="fullstack">Full Stack</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Projects Grid */}
          <Grid container spacing={3}>
            {filteredProjects.map((project) => (
              <Grid key={project.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card
                  {...(project.link
                    ? { component: Link, href: project.link }
                    : { component: 'div' })}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    textDecoration: 'none',
                    cursor: project.link ? 'pointer' : 'not-allowed',
                    ...(!project.link && {
                      opacity: 0.7,
                      '&:hover': {
                        transform: 'none',
                        boxShadow: 'none',
                      },
                    }),
                  }}
                >
                  <CardMedia
                    sx={{
                      height: 180,
                      backgroundColor: theme.palette.mode === 'dark' ? '#111' : '#f5f5f5',
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
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="h6">{project.title}</Typography>
                      <Chip
                        label={project.status === 'archived' ? 'archived' : 'live'}
                        size="small"
                        sx={{
                          backgroundColor:
                            project.status === 'live' ? 'success.main' : 'transparent',
                          color: project.status === 'live' ? 'white' : 'text.disabled',
                          fontSize: '0.7rem',
                          height: 20,
                          border: project.status === 'archived' ? '1px solid' : 'none',
                          borderColor: 'text.disabled',
                        }}
                      />
                    </Stack>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {project.role} | {project.year}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {project.description}
                    </Typography>
                    <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                      {project.tags.slice(0, 4).map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            backgroundColor: alpha(theme.palette.secondary.main, 0.1),
                            color: 'secondary.main',
                            fontSize: '0.7rem',
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
  );
}
