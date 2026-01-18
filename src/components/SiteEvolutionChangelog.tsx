'use client';

import { useState } from 'react';
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

export default function SiteEvolutionChangelog() {
  const [statusFilter, setStatusFilter] = useState<UpdateStatus | 'all'>('all');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['v2.1.0']));
  const theme = useTheme();

  const filteredUpdates =
    statusFilter === 'all' ? updates : updates.filter((u) => u.status === statusFilter);

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

                return (
                  <Box key={update.id} sx={{ position: 'relative', pl: 6 }}>
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
                            href={`/blog/${update.blogSlug}/`}
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
