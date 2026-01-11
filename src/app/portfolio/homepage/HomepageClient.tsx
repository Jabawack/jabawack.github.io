'use client';

import { useState } from 'react';
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
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { updates, statusColors, categoryColors, type UpdateStatus } from '@/data/updates';

export default function HomepageClient() {
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
        return <RadioButtonUncheckedIcon sx={{ color: statusColors.planned, fontSize: 20 }} />;
    }
  };

  const completedCount = updates.filter((u) => u.status === 'completed').length;
  const totalCount = updates.length;
  const progressPercent = Math.round((completedCount / totalCount) * 100);

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
              Portfolio Homepage
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
              Track the progress of portfolio improvements, new features, and design changes.
              This page serves as a living changelog for the site.
            </Typography>
          </Box>

          {/* Progress Overview */}
          <Card sx={{ p: 3 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center">
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Overall Progress
                </Typography>
                <Box
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    overflow: 'hidden',
                  }}
                >
                  <Box
                    sx={{
                      height: '100%',
                      width: `${progressPercent}%`,
                      borderRadius: 4,
                      background: `linear-gradient(90deg, ${statusColors.completed}, ${statusColors['in-progress']})`,
                      transition: 'width 0.5s ease',
                    }}
                  />
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  {completedCount} of {totalCount} updates completed ({progressPercent}%)
                </Typography>
              </Box>
              <Stack direction="row" spacing={3}>
                <Stack alignItems="center" spacing={0.5}>
                  <Typography variant="h4" sx={{ color: statusColors.completed, fontWeight: 700 }}>
                    {updates.filter((u) => u.status === 'completed').length}
                  </Typography>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <CheckCircleIcon sx={{ color: statusColors.completed, fontSize: 16 }} />
                    <Typography variant="caption" color="text.secondary">
                      Completed
                    </Typography>
                  </Stack>
                </Stack>
                <Stack alignItems="center" spacing={0.5}>
                  <Typography variant="h4" sx={{ color: statusColors['in-progress'], fontWeight: 700 }}>
                    {updates.filter((u) => u.status === 'in-progress').length}
                  </Typography>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <RadioButtonCheckedIcon sx={{ color: statusColors['in-progress'], fontSize: 16 }} />
                    <Typography variant="caption" color="text.secondary">
                      In Progress
                    </Typography>
                  </Stack>
                </Stack>
                <Stack alignItems="center" spacing={0.5}>
                  <Typography variant="h4" sx={{ color: statusColors.planned, fontWeight: 700 }}>
                    {updates.filter((u) => u.status === 'planned').length}
                  </Typography>
                  <Stack direction="row" spacing={0.5} alignItems="center">
                    <RadioButtonUncheckedIcon sx={{ color: statusColors.planned, fontSize: 16 }} />
                    <Typography variant="caption" color="text.secondary">
                      Planned
                    </Typography>
                  </Stack>
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
                left: { xs: 16, md: 24 },
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
                  <Box key={update.id} sx={{ position: 'relative', pl: { xs: 6, md: 8 } }}>
                    {/* Status dot */}
                    <Box
                      sx={{
                        position: 'absolute',
                        left: { xs: 7, md: 15 },
                        top: 20,
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
  );
}
