'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  Popover,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
import { projects, type Project } from '@/data/projects';
import Tag from '@/components/Tag';

type CategoryFilter = 'all' | Project['category'];

interface TagListProps {
  tags: string[];
}

function TagList({ tags }: TagListProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(tags.length);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [measured, setMeasured] = useState(false);

  const calculateVisibleTags = useCallback(() => {
    if (!containerRef.current || !measureRef.current) return;

    const containerWidth = containerRef.current.offsetWidth;
    const moreButtonWidth = 70; // Approximate width of "+N more" button
    let totalWidth = 0;
    let count = 0;

    // Get all measured tag elements
    const tagElements = measureRef.current.children;
    for (let i = 0; i < tagElements.length; i++) {
      const tagWidth = (tagElements[i] as HTMLElement).offsetWidth + 8; // 8px gap
      if (totalWidth + tagWidth <= containerWidth - (i < tags.length - 1 ? moreButtonWidth : 0)) {
        totalWidth += tagWidth;
        count++;
      } else {
        break;
      }
    }

    setVisibleCount(Math.max(1, count));
    setMeasured(true);
  }, [tags.length]);

  useEffect(() => {
    // Initial calculation after render
    const timer = setTimeout(calculateVisibleTags, 0);

    const handleResize = () => {
      setMeasured(false);
      setTimeout(calculateVisibleTags, 0);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateVisibleTags]);

  const hiddenCount = tags.length - visibleCount;

  const handleMoreClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(e.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* Hidden measurement container */}
      <Box
        ref={measureRef}
        sx={{
          position: 'absolute',
          visibility: 'hidden',
          display: 'flex',
          gap: 1,
          pointerEvents: 'none',
        }}
      >
        {tags.map((tag) => (
          <Tag
            key={tag}
            label={tag}
            size="small"
            variant="secondary"
            sx={{ fontSize: '0.7rem', flexShrink: 0 }}
          />
        ))}
      </Box>

      {/* Visible tags */}
      <Stack
        ref={containerRef}
        direction="row"
        spacing={1}
        sx={{
          flexWrap: 'nowrap',
          overflow: 'hidden',
          opacity: measured ? 1 : 0,
          transition: 'opacity 0.1s',
        }}
      >
        {tags.slice(0, visibleCount).map((tag) => (
          <Tag
            key={tag}
            label={tag}
            size="small"
            variant="secondary"
            sx={{ fontSize: '0.7rem', flexShrink: 0 }}
          />
        ))}
        {hiddenCount > 0 && (
          <Tag
            label={`+${hiddenCount} more`}
            size="small"
            variant="outlined"
            onClick={handleMoreClick}
            sx={{ fontSize: '0.7rem', flexShrink: 0 }}
          />
        )}
      </Stack>

      {/* Popover for all tags */}
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        onClick={(e) => e.stopPropagation()}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        slotProps={{
          paper: {
            sx: { mt: 1 },
          },
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          flexWrap="wrap"
          useFlexGap
          sx={{ p: 2, maxWidth: 280 }}
        >
          {tags.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              size="small"
              variant="secondary"
              sx={{ fontSize: '0.7rem' }}
            />
          ))}
        </Stack>
      </Popover>
    </>
  );
}

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
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                    }}
                  >
                    {/* Title and status */}
                    <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                      <Typography variant="h6">{project.title}</Typography>
                      <Tag
                        label={project.status === 'archived' ? 'archived' : 'live'}
                        size="small"
                        variant={project.status === 'live' ? 'success' : 'outlined'}
                        sx={{ height: 20, fontSize: '0.7rem' }}
                      />
                    </Stack>

                    {/* Role and year */}
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                      {project.role} | {project.year}
                    </Typography>

                    {/* Description - fixed height, 3 lines max */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        mb: 2,
                        minHeight: '3.6em', // ~3 lines (1.2em line-height * 3)
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        lineHeight: 1.2,
                      }}
                    >
                      {project.description}
                    </Typography>

                    {/* Tags - pushed to bottom */}
                    <Box sx={{ mt: 'auto' }}>
                      <TagList tags={project.tags} />
                    </Box>
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
