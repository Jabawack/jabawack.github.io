'use client';

import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
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
  TextField,
  InputAdornment,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';
import { projects } from '@/data/projects';
import Tag from '@/components/ui/Tag';
import ProfileCard from '@/components/ui/ProfileCard';

type StatusFilter = 'all' | 'live' | 'archived';

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

// Curated filter tags (consolidated for cleaner filtering)
const CURATED_TAGS = [
  'React',
  'UX/UI',
  'Responsive',
  'WebGL',
  'Next.js',
  'TypeScript',
  'Leadership',
  'Social Impact',
  'Prototyping',
  'Branding',
  'WordPress',
];

// Number of tags to show by default (up to and including 'Branding')
const DEFAULT_VISIBLE_TAGS = 9;

export default function PortfolioClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showAllTags, setShowAllTags] = useState(false);
  const theme = useTheme();

  // Get all unique tags sorted by frequency
  const allTags = useMemo(() => {
    const tagCount = new Map<string, number>();
    projects.forEach((p) => {
      p.tags.forEach((tag) => {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
      });
    });
    return Array.from(tagCount.entries())
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
  }, []);

  // Tags to display based on toggle
  // When collapsed: first N curated tags
  // When expanded: all curated tags first (in order), then remaining tags sorted by frequency
  const { displayTags, hiddenCount } = useMemo(() => {
    const curatedInUse = CURATED_TAGS.filter((tag) => allTags.includes(tag));
    const remainingTags = allTags.filter((tag) => !CURATED_TAGS.includes(tag));
    const allDisplayableTags = [...curatedInUse, ...remainingTags];

    if (!showAllTags) {
      const visible = curatedInUse.slice(0, DEFAULT_VISIBLE_TAGS);
      return {
        displayTags: visible,
        hiddenCount: allDisplayableTags.length - visible.length,
      };
    }

    return { displayTags: allDisplayableTags, hiddenCount: 0 };
  }, [allTags, showAllTags]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Status filter
      if (statusFilter !== 'all' && p.status !== statusFilter) return false;

      // Search filter (title and description)
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesDescription = p.description.toLowerCase().includes(query);
        const matchesTags = p.tags.some((tag) => tag.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDescription && !matchesTags) return false;
      }

      // Tag filter (must have ALL selected tags)
      if (selectedTags.length > 0) {
        const hasAllTags = selectedTags.every((tag) => p.tags.includes(tag));
        if (!hasAllTags) return false;
      }

      return true;
    });
  }, [statusFilter, searchQuery, selectedTags]);

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
    setSelectedTags([]);
    setShowAllTags(false);
  };

  const hasActiveFilters = searchQuery || statusFilter !== 'all' || selectedTags.length > 0;

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
                Portfolio
              </Typography>
              <Typography variant="body1" color="text.secondary">
                A collection of projects from professional work, side projects, and case studies.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <ProfileCard
                stats={[
                  { value: projects.length, label: 'Projects', color: 'primary.light' },
                  { value: projects.filter((p) => p.status === 'live').length, label: 'Live', color: 'success.light' },
                  { value: projects.filter((p) => p.tags.includes('Social Impact')).length, label: 'Social Impact', color: 'secondary.light' },
                ]}
              />
            </Grid>
          </Grid>

          {/* Filters */}
          <Stack spacing={3}>
            {/* Search and Status */}
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
              <TextField
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="small"
                sx={{ minWidth: 250 }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
              <ToggleButtonGroup
                value={statusFilter}
                exclusive
                onChange={(_, value) => value && setStatusFilter(value)}
                size="small"
              >
                <ToggleButton value="all">All</ToggleButton>
                <ToggleButton value="live">Live</ToggleButton>
                <ToggleButton value="archived">Archived</ToggleButton>
              </ToggleButtonGroup>
              {hasActiveFilters && (
                <Tag
                  label="Clear filters"
                  onClick={clearFilters}
                  onDelete={clearFilters}
                  size="small"
                  variant="default"
                  selected
                />
              )}
            </Stack>

            {/* Tags */}
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap alignItems="center">
              {displayTags.map((tag) => (
                <Tag
                  key={tag}
                  label={tag}
                  size="small"
                  variant="default"
                  selected={selectedTags.includes(tag)}
                  onClick={() => handleTagClick(tag)}
                />
              ))}
              {(hiddenCount > 0 || showAllTags) && (
                <Tag
                  label={showAllTags ? 'Show less' : `+${hiddenCount} more`}
                  size="small"
                  variant="outlined"
                  onClick={() => setShowAllTags(!showAllTags)}
                  sx={{ fontStyle: 'italic' }}
                />
              )}
            </Stack>

            {/* Results count */}
            <Typography variant="body2" color="text.secondary">
              {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
              {hasActiveFilters ? ' found' : ''}
            </Typography>
          </Stack>

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
                        variant={project.status === 'live' ? 'success' : 'default'}
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
