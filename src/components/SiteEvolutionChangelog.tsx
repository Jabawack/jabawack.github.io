'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Stack,
  Card,
  ToggleButton,
  ToggleButtonGroup,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Tag from '@/components/Tag';
import { getLineColor } from '@/theme';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ArticleIcon from '@mui/icons-material/Article';
import { updates, type UpdateStatus } from '@/data/updates';
import { statusColors, categoryColors } from '@/config/statusConfig';

// Custom smooth scroll with easing for AI-like effect
// Returns a cancel function to stop the animation
function smoothScrollTo(element: HTMLElement, duration: number = 800): () => void {
  const targetPosition = element.getBoundingClientRect().top + window.scrollY;
  const startPosition = window.scrollY;
  const headerOffset = 120; // Account for sticky header
  const targetY = targetPosition - headerOffset;
  const distance = targetY - startPosition;
  let startTime: number | null = null;
  let animationId: number | null = null;
  let cancelled = false;

  // Ease-out cubic for smooth deceleration
  const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

  function animation(currentTime: number) {
    if (cancelled) return;
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const progress = Math.min(timeElapsed / duration, 1);
    const easedProgress = easeOutCubic(progress);

    window.scrollTo(0, startPosition + distance * easedProgress);

    if (progress < 1 && !cancelled) {
      animationId = requestAnimationFrame(animation);
    }
  }

  animationId = requestAnimationFrame(animation);

  // Return cancel function
  return () => {
    cancelled = true;
    if (animationId !== null) {
      cancelAnimationFrame(animationId);
    }
  };
}

function getStatusIcon(status: UpdateStatus) {
  switch (status) {
    case 'completed':
      return <CheckCircleIcon sx={{ color: statusColors.completed, fontSize: 20 }} />;
    case 'in-progress':
      return (
        <RadioButtonCheckedIcon
          sx={{
            color: statusColors['in-progress'],
            fontSize: 20,
            animation: 'pulse 2s infinite',
            '@keyframes pulse': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0.5 },
            },
          }}
        />
      );
    case 'planned':
      return <ScheduleIcon sx={{ color: statusColors.planned, fontSize: 20 }} />;
  }
}

interface SiteEvolutionChangelogProps {
  highlightVersion?: string | null;
}

export default function SiteEvolutionChangelog({ highlightVersion }: SiteEvolutionChangelogProps) {
  const [statusFilter, setStatusFilter] = useState<UpdateStatus | 'all'>('all');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['v2.1.0']));
  const theme = useTheme();
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const hasScrolledRef = useRef(false);
  const hasScrolledToHighlightRef = useRef(false);
  const cancelScrollRef = useRef<(() => void) | null>(null);

  const filteredUpdates =
    statusFilter === 'all' ? updates : updates.filter((u) => u.status === statusFilter);

  // Auto-scroll on mount with AI-like delayed smooth scroll
  useEffect(() => {
    if (hasScrolledRef.current) return;

    // Find target: last in-progress, or last planned (next to work on)
    const inProgressItems = updates.filter((u) => u.status === 'in-progress');
    let targetId: string | null = null;

    if (inProgressItems.length > 0) {
      targetId = inProgressItems[inProgressItems.length - 1].id;
    } else {
      const plannedItems = updates.filter((u) => u.status === 'planned');
      if (plannedItems.length > 0) {
        targetId = plannedItems[plannedItems.length - 1].id;
      }
    }

    if (!targetId) return;

    // Delay scroll for subtle AI-like effect (feels intentional)
    const timeoutId = setTimeout(() => {
      const element = itemRefs.current.get(targetId);
      if (element) {
        hasScrolledRef.current = true;
        cancelScrollRef.current = smoothScrollTo(element, 800);
      }
    }, 400);

    return () => {
      clearTimeout(timeoutId);
      if (cancelScrollRef.current) {
        cancelScrollRef.current();
        cancelScrollRef.current = null;
      }
    };
  }, []);

  // Scroll to highlighted version when coming from blog
  useEffect(() => {
    if (!highlightVersion || hasScrolledToHighlightRef.current) return;

    // Find the update that matches this version
    const targetUpdate = updates.find((u) => u.version === highlightVersion);
    if (!targetUpdate) return;

    // Expand the card and scroll to it
    setExpandedIds((prev) => new Set([...prev, targetUpdate.id]));

    const timeoutId = setTimeout(() => {
      const element = itemRefs.current.get(targetUpdate.id);
      if (element) {
        hasScrolledToHighlightRef.current = true;
        hasScrolledRef.current = true; // Prevent default scroll
        cancelScrollRef.current = smoothScrollTo(element, 800);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [highlightVersion]);

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <Box sx={{ py: 4, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Status Summary */}
          <Card sx={{ p: 3 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                Filter by status to see completed, in progress, or planned updates.
              </Typography>
              <Stack direction="row" spacing={3}>
                <Stack alignItems="center" spacing={0.5}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <CheckCircleIcon sx={{ color: statusColors.completed, fontSize: 20 }} />
                    <Typography variant="h5" sx={{ color: statusColors.completed, fontWeight: 700 }}>
                      {updates.filter((u) => u.status === 'completed').length}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">Completed</Typography>
                </Stack>
                <Stack alignItems="center" spacing={0.5}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <RadioButtonCheckedIcon sx={{ color: statusColors['in-progress'], fontSize: 20 }} />
                    <Typography variant="h5" sx={{ color: statusColors['in-progress'], fontWeight: 700 }}>
                      {updates.filter((u) => u.status === 'in-progress').length}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">In Progress</Typography>
                </Stack>
                <Stack alignItems="center" spacing={0.5}>
                  <Stack direction="row" alignItems="center" spacing={0.5}>
                    <ScheduleIcon sx={{ color: statusColors.planned, fontSize: 20 }} />
                    <Typography variant="h5" sx={{ color: statusColors.planned, fontWeight: 700 }}>
                      {updates.filter((u) => u.status === 'planned').length}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="text.secondary">Planned</Typography>
                </Stack>
              </Stack>
            </Stack>
          </Card>

          {/* Filters */}
          <Box>
            <ToggleButtonGroup
              value={statusFilter}
              exclusive
              onChange={(_, value) => value && setStatusFilter(value)}
              size="small"
            >
              <ToggleButton value="all">All</ToggleButton>
              <ToggleButton value="completed">Completed</ToggleButton>
              <ToggleButton value="in-progress">In Progress</ToggleButton>
              <ToggleButton value="planned">Planned</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Timeline */}
          <Box sx={{ position: 'relative' }}>
            {/* Vertical line */}
            <Box
              sx={{
                position: 'absolute',
                left: 9,
                top: 0,
                bottom: 0,
                width: 2,
                backgroundColor: getLineColor(theme),
              }}
            />

            <Stack spacing={3}>
              {filteredUpdates.map((update) => {
                const isExpanded = expandedIds.has(update.id);
                const isHighlighted = highlightVersion && update.version === highlightVersion;

                return (
                  <Box
                    key={update.id}
                    ref={(el: HTMLElement | null) => {
                      if (el) {
                        itemRefs.current.set(update.id, el);
                      } else {
                        itemRefs.current.delete(update.id);
                      }
                    }}
                    sx={{ position: 'relative', pl: 6 }}
                  >
                    {/* Status icon */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: 0,
                        top: 16,
                        zIndex: 1,
                        backgroundColor: 'background.default',
                        p: 0.5,
                      }}
                    >
                      {getStatusIcon(update.status)}
                    </Box>

                    {/* Card */}
                    <Card
                      sx={{
                        p: 3,
                        cursor: update.details ? 'pointer' : 'default',
                        '&:hover': update.details
                          ? { borderColor: 'secondary.main' }
                          : {},
                        ...(isHighlighted && {
                          borderColor: 'secondary.main',
                          animation: 'highlightPulse 2s ease-in-out infinite',
                          '@keyframes highlightPulse': {
                            '0%, 100%': {
                              boxShadow: `0 0 0 0 ${theme.palette.secondary.main}40`,
                            },
                            '50%': {
                              boxShadow: `0 0 20px 4px ${theme.palette.secondary.main}20`,
                            },
                          },
                        }),
                      }}
                      onClick={() => update.details && toggleExpanded(update.id)}
                    >
                      {/* Header */}
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="flex-start"
                        spacing={2}
                      >
                        <Box sx={{ flexGrow: 1 }}>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            flexWrap="wrap"
                            useFlexGap
                            sx={{ mb: 1 }}
                          >
                            <Tag
                              label={update.version ?? ''}
                              size="small"
                              variant="secondary"
                              selected
                              sx={{ fontFamily: 'monospace' }}
                            />
                            <Typography variant="h6" sx={{ fontSize: '1.1rem' }}>
                              {update.title}
                            </Typography>
                          </Stack>
                          <Typography variant="body2" color="text.secondary">
                            {update.description}
                          </Typography>
                        </Box>
                        <Stack alignItems="flex-end" spacing={1}>
                          <Typography variant="caption" color="text.secondary">
                            {update.date}
                          </Typography>
                          {update.details && (
                            isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
                          )}
                        </Stack>
                      </Stack>

                      {/* Tags */}
                      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mt: 2 }}>
                        <Tag
                          label={update.category}
                          size="small"
                          sx={{
                            backgroundColor: categoryColors[update.category],
                            color: 'white',
                            textTransform: 'capitalize',
                            border: 'none',
                          }}
                        />
                        <Tag
                          label={update.status.replace('-', ' ')}
                          size="small"
                          variant={
                            update.status === 'completed'
                              ? 'success'
                              : update.status === 'in-progress'
                                ? 'secondary'
                                : 'default'
                          }
                          sx={{ textTransform: 'capitalize' }}
                        />
                        {update.tags.map((tag) => (
                          <Tag key={tag} label={tag} size="small" variant="secondary" />
                        ))}
                      </Stack>

                      {/* Blog post link */}
                      {update.blogSlug && (
                        <Box sx={{ mt: 2 }}>
                          <Button
                            component={Link}
                            href={`/blog/${update.blogSlug}/?from=changelog`}
                            size="small"
                            startIcon={<ArticleIcon />}
                            onClick={(e) => e.stopPropagation()}
                            sx={{
                              textTransform: 'none',
                            }}
                          >
                            Read the story
                          </Button>
                        </Box>
                      )}

                      {/* Expandable details */}
                      {update.details && (
                        <Collapse in={isExpanded}>
                          <List dense sx={{ mt: 2, pl: 1 }}>
                            {update.details.map((detail, index) => (
                              <ListItem key={index} sx={{ py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 28 }}>
                                  <FiberManualRecordIcon
                                    sx={{ fontSize: 8, color: 'secondary.main' }}
                                  />
                                </ListItemIcon>
                                <ListItemText
                                  primary={detail}
                                  primaryTypographyProps={{
                                    variant: 'body2',
                                    color: 'text.secondary',
                                  }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Collapse>
                      )}
                    </Card>
                  </Box>
                );
              })}
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
