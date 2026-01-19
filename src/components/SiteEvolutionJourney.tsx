'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Stack,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  Divider,
} from '@mui/material';
import { styled, useTheme, alpha } from '@mui/material/styles';
import BuildIcon from '@mui/icons-material/Build';
import Tag from '@/components/Tag';
import { StreamingChapterCard } from '@/components/AIThinkingFlow';
import { chapters, getMilestoneStats, Chapter } from '@/data/chapters';
import { statusConfig } from '@/config/statusConfig';
import { getGradientBackground, getProgressGradient } from '@/theme';

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
    borderColor: theme.palette.divider,
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

interface SiteEvolutionJourneyProps {
  showHero?: boolean;
}

export default function SiteEvolutionJourney({ showHero = true }: SiteEvolutionJourneyProps) {
  const [activeChapter, setActiveChapter] = useState<string>('chapter-1');
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const theme = useTheme();

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
              background: getGradientBackground(theme),
              border: `1px solid ${alpha(theme.palette.secondary.main, 0.2)}`,
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
                      backgroundColor: theme.palette.divider,
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 5,
                        background: getProgressGradient(theme),
                      },
                    }}
                  />
                </Box>

                {/* Status Legend */}
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  {Object.entries(statusConfig).map(([key, config]) => {
                    const variantMap: Record<string, 'success' | 'secondary' | 'default'> = {
                      completed: 'success',
                      'in-progress': 'secondary',
                      planned: 'default',
                    };
                    return (
                      <Tag
                        key={key}
                        icon={<config.icon sx={{ fontSize: 16 }} />}
                        label={config.label}
                        size="small"
                        variant={variantMap[key] || 'default'}
                      />
                    );
                  })}
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
                {chapters.map((chapter, index) => {
                  // Calculate delay based on previous chapters' content length
                  const getChapterDelay = () => {
                    if (index === 0) return 0;
                    let totalDelay = 0;
                    const statusDuration = 1800;
                    const speed = 12;
                    const staggerDelay = 500;
                    for (let i = 0; i < index; i++) {
                      const ch = chapters[i];
                      const contentLength = ch.title.length + ch.versions.length + ch.story.join('').length + 50;
                      totalDelay += statusDuration + (contentLength * speed) + staggerDelay;
                    }
                    return totalDelay;
                  };

                  // Before/After table for Chapter 1
                  const beforeAfterTable = chapter.id === 'chapter-1' ? (
                    <>
                      <Divider />
                      <Box>
                        <Typography variant="subtitle2" sx={{ color: 'text.secondary', mb: 2 }}>
                          Before / After Comparison
                        </Typography>
                        <Card
                          sx={{
                            backgroundColor: alpha(theme.palette.background.paper, 0.5),
                            border: `1px solid ${theme.palette.divider}`,
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
                                borderBottom: `1px solid ${theme.palette.divider}`,
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
                              {beforeAfterData.before.items.map((item, idx) => (
                                <Box
                                  key={item.aspect}
                                  sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr 1fr 1fr', sm: '1.5fr 1fr 1fr' },
                                    gap: 2,
                                    py: 0.5,
                                    borderBottom: `1px solid ${theme.palette.divider}`,
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
                                    {beforeAfterData.after.items[idx].value}
                                  </Typography>
                                </Box>
                              ))}
                            </Stack>
                          </CardContent>
                        </Card>
                      </Box>
                    </>
                  ) : undefined;

                  return (
                    <StreamingChapterCard
                      key={chapter.id}
                      chapter={chapter}
                      chapterIndex={index}
                      delay={getChapterDelay()}
                      speed={12}
                      statusDuration={1800}
                      statusMessages={['Thinking...', 'Analyzing...', 'Loading...']}
                      sectionRef={(el) => {
                        if (el) sectionRefs.current.set(chapter.id, el);
                      }}
                      extraContent={beforeAfterTable}
                    />
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
