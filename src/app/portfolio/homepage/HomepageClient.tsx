'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Chip,
  Stack,
  Card,
  ToggleButton,
  ToggleButtonGroup,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tabs,
  Tab,
  Breadcrumbs,
  LinearProgress,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import CodeIcon from '@mui/icons-material/Code';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BuildIcon from '@mui/icons-material/Build';
import { updates, type UpdateStatus } from '@/data/updates';
import { statusColors, categoryColors } from '@/config/statusConfig';
import { getMilestoneStats, getMilestoneProgress } from '@/data/chapters';
import BuildingInPublic from '@/components/BuildingInPublic';

export default function HomepageClient() {
  const [activeTab, setActiveTab] = useState(0);
  const [statusFilter, setStatusFilter] = useState<UpdateStatus | 'all'>('all');
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set(['v2.1.0']));

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

  const getStatusIcon = (status: UpdateStatus) => {
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
  };

  const completedCount = updates.filter((u) => u.status === 'completed').length;
  const totalCount = updates.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

  // Progress for shared header - derived from chapters data
  const { total: totalMilestones, completed: completedMilestones } = getMilestoneStats();
  const milestoneProgressPercent = getMilestoneProgress();

  return (
    <Box component="main">
      {/* Page Header Section - Shared across all tabs */}
      <Box sx={{ pt: 4, pb: 3, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Stack spacing={3}>
            {/* Breadcrumbs */}
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
              sx={{ '& .MuiBreadcrumbs-li': { color: 'text.secondary' } }}
            >
              <Link href="/portfolio/" style={{ color: 'inherit', textDecoration: 'none' }}>
                <Typography
                  variant="body2"
                  sx={{ '&:hover': { color: 'secondary.main' }, transition: 'color 0.2s' }}
                >
                  Portfolio
                </Typography>
              </Link>
              <Typography variant="body2" color="text.primary">
                Site Evolution
              </Typography>
            </Breadcrumbs>

            {/* Page Title */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <BuildIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  Site Evolution
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700 }}>
                From 2017 jQuery to Next.js 15 — the complete rebuild of this portfolio.
                Explore the journey, UX decisions, and technical choices.
              </Typography>
            </Box>

            {/* Progress Bar */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Overall Progress
                </Typography>
                <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 600 }}>
                  {milestoneProgressPercent}% ({completedMilestones} of {totalMilestones} milestones)
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={milestoneProgressPercent}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: 'linear-gradient(90deg, #2047f4 0%, #00f7ff 100%)',
                  },
                }}
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Sticky Tab Navigation */}
      <Box sx={{
        position: 'sticky',
        top: 64,
        zIndex: 10,
        backgroundColor: 'background.default',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <Container maxWidth="lg">
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                minHeight: 48,
              },
              '& .Mui-selected': {
                color: 'secondary.main',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'secondary.main',
              },
            }}
          >
            <Tab
              icon={<AutoStoriesIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label="Journey"
            />
            <Tab
              icon={<CodeIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label="Changelog"
            />
          </Tabs>
        </Container>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && <BuildingInPublic showHero={false} />}

      {activeTab === 1 && (
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
            {/* Vertical line - centered with 20px icon */}
            <Box
              sx={{
                position: 'absolute',
                left: 9,
                top: 0,
                bottom: 0,
                width: 2,
                backgroundColor: 'rgba(255,255,255,0.1)',
              }}
            />

            <Stack spacing={3}>
              {filteredUpdates.map((update) => {
                const isExpanded = expandedIds.has(update.id);

                return (
                  <Box key={update.id} sx={{ position: 'relative', pl: 6 }}>
                    {/* Status icon - 20px icon + 4px padding each side = 28px wrapper */}
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
                            <Chip
                              label={update.version}
                              size="small"
                              sx={{
                                backgroundColor: 'primary.main',
                                color: 'white',
                                fontWeight: 600,
                                fontFamily: 'monospace',
                              }}
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
                        <Chip
                          label={update.category}
                          size="small"
                          sx={{
                            backgroundColor: categoryColors[update.category],
                            color: 'white',
                            textTransform: 'capitalize',
                            fontSize: '0.7rem',
                          }}
                        />
                        <Chip
                          label={update.status.replace('-', ' ')}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: statusColors[update.status],
                            color: statusColors[update.status],
                            textTransform: 'capitalize',
                            fontSize: '0.7rem',
                          }}
                        />
                        {update.tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={{
                              backgroundColor: 'rgba(255,255,255,0.05)',
                              color: 'text.secondary',
                              fontSize: '0.7rem',
                            }}
                          />
                        ))}
                      </Stack>

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
      )}
    </Box>
  );
}
