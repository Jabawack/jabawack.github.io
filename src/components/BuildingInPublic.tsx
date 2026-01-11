'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Chip,
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import BuildIcon from '@mui/icons-material/Build';
import { chapters, getMilestoneStats } from '@/data/chapters';
import { statusConfig } from '@/config/statusConfig';

const beforeAfterData = {
  before: {
    label: '2017 (v1)',
    items: [
      { aspect: 'Framework', value: 'jQuery + Materialize CSS' },
      { aspect: 'Type Safety', value: 'None' },
      { aspect: 'Navigation', value: 'Multi-page, inconsistent' },
      { aspect: 'Projects', value: 'Static grid, no filtering' },
      { aspect: 'Mobile', value: 'Responsive but clunky' },
      { aspect: 'Deployment', value: 'Manual FTP uploads' },
      { aspect: 'Load Time', value: '~3 seconds' },
    ],
  },
  after: {
    label: '2026 (v2)',
    items: [
      { aspect: 'Framework', value: 'Next.js 15 + MUI 7' },
      { aspect: 'Type Safety', value: 'Full TypeScript' },
      { aspect: 'Navigation', value: 'SPA-like, persistent header' },
      { aspect: 'Projects', value: 'Categorized, soon filterable' },
      { aspect: 'Mobile', value: 'Mobile-first, drawer nav' },
      { aspect: 'Deployment', value: 'Git push → auto deploy' },
      { aspect: 'Load Time', value: '<1 second (static)' },
    ],
  },
};

// Custom styled connector for the stepper - centered with 20px icons
const DotConnector = styled(StepConnector)(({ theme }) => ({
  '&.MuiStepConnector-root': {
    marginLeft: 9, // Center line with 20px icon: (20/2) - (2/2) = 9
  },
  '& .MuiStepConnector-line': {
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderLeftWidth: 2,
    minHeight: 60,
  },
}));

// Custom icon for the stepper based on status
interface StepIconProps {
  status: 'completed' | 'in-progress' | 'planned';
  active: boolean;
}

function StepIcon({ status, active }: StepIconProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const color = config.color;
  const size = 20;

  // In-progress gets a pulsing dot instead of an icon
  if (status === 'in-progress') {
    return (
      <Box
        sx={{
          width: size - 4,
          height: size - 4,
          borderRadius: '50%',
          backgroundColor: color,
          border: `2px solid ${color}`,
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 1, boxShadow: `0 0 8px ${color}` },
            '50%': { opacity: 0.6, boxShadow: 'none' },
          },
        }}
      />
    );
  }

  return (
    <Icon
      sx={{
        fontSize: size,
        color,
        filter: active ? `drop-shadow(0 0 4px ${color})` : 'none',
      }}
    />
  );
}

interface BuildingInPublicProps {
  showHero?: boolean;
}

export default function BuildingInPublic({ showHero = true }: BuildingInPublicProps) {
  const [activeChapter, setActiveChapter] = useState<string>('chapter-1');
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  // Calculate progress from shared data
  const { total: totalMilestones, completed: completedMilestones } = getMilestoneStats();
  const progressPercent = Math.round((completedMilestones / totalMilestones) * 100);

  // Scroll spy effect
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    chapters.forEach((chapter) => {
      const element = sectionRefs.current.get(chapter.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
              setActiveChapter(chapter.id);
            }
          });
        },
        {
          rootMargin: '-100px 0px -50% 0px',
          threshold: [0.3],
        }
      );

      observer.observe(element);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const scrollToChapter = (chapterId: string) => {
    const element = sectionRefs.current.get(chapterId);
    if (element) {
      const offset = 120; // Account for sticky header
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box sx={{ py: showHero ? 10 : 4, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Hero Section - conditionally rendered */}
          {showHero && (
          <Card
            sx={{
              background: 'linear-gradient(135deg, rgba(32, 71, 244, 0.1) 0%, rgba(0, 247, 255, 0.05) 100%)',
              border: '1px solid rgba(0, 247, 255, 0.2)',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BuildIcon sx={{ color: 'secondary.main' }} />
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Site Evolution
                  </Typography>
                </Box>

                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700 }}>
                  From 2017 jQuery to Next.js 15 — the complete rebuild of this portfolio.
                  Each chapter documents the journey, UX decisions, and technical choices.
                </Typography>

                {/* Progress Bar */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Overall Progress
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 600 }}>
                      {progressPercent}% ({completedMilestones} of {totalMilestones} milestones)
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={progressPercent}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 5,
                        background: 'linear-gradient(90deg, #2047f4 0%, #00f7ff 100%)',
                      },
                    }}
                  />
                </Box>

                {/* Status Legend */}
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <Chip
                      key={key}
                      icon={<config.icon sx={{ fontSize: 16 }} />}
                      label={config.label}
                      size="small"
                      sx={{
                        backgroundColor: `${config.color}20`,
                        color: config.color,
                        '& .MuiChip-icon': { color: config.color },
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </CardContent>
          </Card>
          )}

          {/* Two-column layout: Navigation dots + Content */}
          <Box sx={{ display: 'flex', gap: 4 }}>
            {/* Sticky Navigation Dots */}
            <Box
              sx={{
                display: { xs: 'none', md: 'block' },
                position: 'sticky',
                top: 140,
                height: 'fit-content',
                minWidth: 180,
              }}
            >
              <Stepper
                activeStep={chapters.findIndex((c) => c.id === activeChapter)}
                orientation="vertical"
                connector={<DotConnector />}
                sx={{ '& .MuiStepLabel-root': { py: 0 } }}
              >
                {chapters.map((chapter, index) => (
                  <Step key={chapter.id} completed={false}>
                    <StepLabel
                      StepIconComponent={() => (
                        <StepIcon
                          status={chapter.status}
                          active={activeChapter === chapter.id}
                        />
                      )}
                      onClick={() => scrollToChapter(chapter.id)}
                      sx={{
                        cursor: 'pointer',
                        '& .MuiStepLabel-label': {
                          color: activeChapter === chapter.id ? 'text.primary' : 'text.secondary',
                          fontWeight: activeChapter === chapter.id ? 600 : 400,
                          fontSize: '0.875rem',
                          transition: 'all 0.3s ease',
                        },
                        '&:hover .MuiStepLabel-label': {
                          color: 'secondary.main',
                        },
                      }}
                    >
                      Chapter {index + 1}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>

            {/* Scrollable Content */}
            <Box sx={{ flexGrow: 1 }}>
              <Stack spacing={6}>
                {chapters.map((chapter) => {
                  const StatusIcon = statusConfig[chapter.status].icon;
                  const statusColor = statusConfig[chapter.status].color;

                  return (
                    <Box
                      key={chapter.id}
                      id={chapter.id}
                      ref={(el: HTMLElement | null) => {
                        if (el) sectionRefs.current.set(chapter.id, el);
                      }}
                      component="section"
                    >
                      <Card sx={{ p: 3 }}>
                        <Stack spacing={3}>
                          {/* Chapter Header */}
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <StatusIcon sx={{ color: statusColor, fontSize: 28 }} />
                            <Box sx={{ flexGrow: 1 }}>
                              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                {chapter.title}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {chapter.versions}
                              </Typography>
                            </Box>
                            <Chip
                              label={statusConfig[chapter.status].label}
                              size="small"
                              sx={{
                                backgroundColor: `${statusColor}20`,
                                color: statusColor,
                              }}
                            />
                          </Box>

                          {/* Story */}
                          <Box>
                            {chapter.story.map((paragraph, idx) => (
                              <Typography
                                key={idx}
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 2, lineHeight: 1.8 }}
                              >
                                {paragraph}
                              </Typography>
                            ))}
                          </Box>

                          <Divider />

                          {/* Milestones */}
                          <Box>
                            <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                              Milestones
                            </Typography>
                            <List dense disablePadding>
                              {chapter.milestones.map((milestone) => {
                                const MilestoneIcon = statusConfig[milestone.status].icon;
                                const milestoneColor = statusConfig[milestone.status].color;
                                return (
                                  <ListItem key={milestone.version} disableGutters sx={{ py: 0.5 }}>
                                    <ListItemIcon sx={{ minWidth: 32 }}>
                                      <MilestoneIcon sx={{ fontSize: 18, color: milestoneColor }} />
                                    </ListItemIcon>
                                    <ListItemText
                                      primary={
                                        <Typography variant="body2">
                                          <Box component="span" sx={{ color: 'secondary.main', fontFamily: 'monospace', mr: 1 }}>
                                            {milestone.version}
                                          </Box>
                                          {milestone.title}
                                        </Typography>
                                      }
                                    />
                                  </ListItem>
                                );
                              })}
                            </List>
                          </Box>

                          {/* Before/After for Chapter 1 */}
                          {chapter.id === 'chapter-1' && (
                            <>
                              <Divider />
                              <Box>
                                <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 2 }}>
                                  Before / After Comparison
                                </Typography>

                                <Card
                                  sx={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                  }}
                                >
                                  <CardContent>
                                    {/* Header Row */}
                                    <Box
                                      sx={{
                                        display: 'grid',
                                        gridTemplateColumns: { xs: '1fr 1fr 1fr', sm: '1.5fr 1fr 1fr' },
                                        gap: 2,
                                        pb: 1.5,
                                        mb: 1.5,
                                        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                      }}
                                    >
                                      <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                                        Aspect
                                      </Typography>
                                      <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right' }}>
                                        2017 (v1)
                                      </Typography>
                                      <Typography variant="body2" sx={{ fontWeight: 600, textAlign: 'right', color: 'secondary.main' }}>
                                        2026 (v2)
                                      </Typography>
                                    </Box>

                                    {/* Data Rows */}
                                    <Stack spacing={1}>
                                      {beforeAfterData.before.items.map((item, index) => (
                                        <Box
                                          key={item.aspect}
                                          sx={{
                                            display: 'grid',
                                            gridTemplateColumns: { xs: '1fr 1fr 1fr', sm: '1.5fr 1fr 1fr' },
                                            gap: 2,
                                            py: 0.5,
                                            borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                          }}
                                        >
                                          <Typography variant="body2" color="text.secondary">
                                            {item.aspect}
                                          </Typography>
                                          <Typography variant="body2" sx={{ textAlign: 'right' }}>
                                            {item.value}
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            sx={{ textAlign: 'right', color: 'secondary.main', fontWeight: 500 }}
                                          >
                                            {beforeAfterData.after.items[index].value}
                                          </Typography>
                                        </Box>
                                      ))}
                                    </Stack>
                                  </CardContent>
                                </Card>
                              </Box>
                            </>
                          )}
                        </Stack>
                      </Card>
                    </Box>
                  );
                })}
              </Stack>
            </Box>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
