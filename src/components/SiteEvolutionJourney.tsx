'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Container,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Stack,
  Divider,
} from '@mui/material';
import { useTheme, alpha, Theme } from '@mui/material/styles';
import BuildIcon from '@mui/icons-material/Build';
import Tag from '@/components/Tag';
import { ChapterNav } from '@/components/ChapterNav';
import { StreamingChapterCard } from '@/components/AIThinkingFlow';
import { chapters, getMilestoneStats } from '@/data/chapters';
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

// Journey content with collapse support
interface JourneyContentProps {
  sectionRefs: React.MutableRefObject<Map<string, HTMLElement>>;
  theme: Theme;
  beforeAfterData: typeof beforeAfterData;
  expandedChapters: Set<string>;
  manualNavigation: boolean;
  onToggleChapter: (chapterId: string) => void;
  onChapterChange: (chapterId: string) => void;
}

function JourneyContent({ sectionRefs, theme, beforeAfterData, expandedChapters, manualNavigation, onToggleChapter, onChapterChange }: JourneyContentProps) {
  const [activeCard, setActiveCard] = useState(0);

  // Update active chapter when streaming moves to next card
  useEffect(() => {
    const chapter = chapters[activeCard];
    if (chapter) {
      onChapterChange(chapter.id);
    }
  }, [activeCard, onChapterChange]);

  const getChapterDelay = (index: number) => {
    if (index === 0) return 0;
    let totalDelay = 0;
    const statusDuration = 600;
    const speed = 8;
    const staggerDelay = 200;
    for (let i = 0; i < index; i++) {
      const ch = chapters[i];
      const contentLength = ch.title.length + ch.versions.length + ch.story.join('').length + 50;
      totalDelay += statusDuration + (contentLength * speed) + staggerDelay;
    }
    return totalDelay;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Stack spacing={2}>
        {chapters.map((chapter, index) => {
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

          // Collapse logic:
          // - Manual navigation: collapse all except selected
          // - Auto (streaming): only completed chapters collapse
          const isCollapsed = manualNavigation
            ? !expandedChapters.has(chapter.id)
            : index < activeCard && chapter.status === 'completed' && !expandedChapters.has(chapter.id);

          return (
            <StreamingChapterCard
              key={chapter.id}
              chapter={chapter}
              chapterIndex={index}
              delay={getChapterDelay(index)}
              speed={8}
              statusDuration={600}
              collapsed={isCollapsed}
              onToggleCollapse={() => onToggleChapter(chapter.id)}
              onComplete={() => setActiveCard(index + 1)}
              sectionRef={(el) => {
                if (el) sectionRefs.current.set(chapter.id, el);
              }}
              extraContent={beforeAfterTable}
            />
          );
        })}
      </Stack>
    </Box>
  );
}

interface SiteEvolutionJourneyProps {
  showHero?: boolean;
}

export default function SiteEvolutionJourney({ showHero = true }: SiteEvolutionJourneyProps) {
  const [activeChapter, setActiveChapter] = useState<string>('chapter-1');
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [streamingComplete, setStreamingComplete] = useState(false);
  const [manualNavigation, setManualNavigation] = useState(false);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());
  const theme = useTheme();

  // Calculate progress from shared data
  const { total: totalMilestones, completed: completedMilestones } = getMilestoneStats();
  const progressPercent = Math.round((completedMilestones / totalMilestones) * 100);

  // Toggle a single chapter's expanded state
  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) => {
      const next = new Set(prev);
      if (next.has(chapterId)) {
        next.delete(chapterId);
      } else {
        next.add(chapterId);
      }
      return next;
    });
  };

  // Select chapter from sidebar: collapse others, expand this one, scroll to it
  const selectChapter = (chapterId: string) => {
    setManualNavigation(true);
    setExpandedChapters(new Set([chapterId]));
    setActiveChapter(chapterId);
    // Scroll after DOM updates from collapse/expand
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollToChapter(chapterId);
      });
    });
  };

  // Handle chapter change from streaming animation
  const handleChapterChange = useCallback((chapterId: string) => {
    setActiveChapter(chapterId);
    // Mark streaming complete when last chapter is reached
    const lastChapterIndex = chapters.length - 1;
    const currentIndex = chapters.findIndex((c) => c.id === chapterId);
    if (currentIndex === lastChapterIndex) {
      // Small delay to let the last chapter finish streaming
      setTimeout(() => setStreamingComplete(true), 2000);
    }
  }, []);

  // Scroll spy effect - only active after streaming completes
  // Only triggers for expanded chapters (not collapsed ones)
  useEffect(() => {
    if (!streamingComplete) return;

    const observers: IntersectionObserver[] = [];

    chapters.forEach((chapter, index) => {
      const element = sectionRefs.current.get(chapter.id);
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            // Only highlight if chapter is expanded (not collapsed)
            // Completed chapters can be collapsed, others are always expanded
            const isCollapsed = chapter.status === 'completed' && !expandedChapters.has(chapter.id);
            if (entry.isIntersecting && entry.intersectionRatio >= 0.3 && !isCollapsed) {
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
  }, [streamingComplete, expandedChapters]);

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
              <ChapterNav
                activeChapterId={activeChapter}
                onChapterClick={selectChapter}
              />
            </Box>

            {/* Scrollable Content */}
            <JourneyContent
              sectionRefs={sectionRefs}
              theme={theme}
              beforeAfterData={beforeAfterData}
              expandedChapters={expandedChapters}
              manualNavigation={manualNavigation}
              onToggleChapter={toggleChapter}
              onChapterChange={handleChapterChange}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
