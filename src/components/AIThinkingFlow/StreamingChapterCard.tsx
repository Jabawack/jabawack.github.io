'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import {
  Box,
  Card,
  Stack,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tooltip,
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import ArticleIcon from '@mui/icons-material/Article';
import Tag from '@/components/Tag';
import { Chapter } from '@/data/chapters';
import { statusConfig } from '@/config/statusConfig';
import { getUpdateByVersion } from '@/data/updates';
import { THINKING_WORDS } from './constants';

// Blinking cursor
const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
`;

// Fade up animation for skip
const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Cursor = styled('span')(({ theme }) => ({
  display: 'inline-block',
  width: 2,
  height: '1em',
  backgroundColor: theme.palette.secondary.main,
  marginLeft: 2,
  animation: `${blink} 1s step-end infinite`,
  verticalAlign: 'text-bottom',
}));

// Pulsing dot
const pulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.9); }
`;

const PulsingDot = styled(Box)(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.main,
  boxShadow: `0 0 8px ${theme.palette.secondary.main}`,
  animation: `${pulse} 1.5s ease-in-out infinite`,
}));

// Shimmer skeleton line
const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

const SkeletonLine = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'width',
})<{ width: string | number }>(({ theme, width }) => ({
  height: 16,
  width,
  borderRadius: 4,
  backgroundImage: `linear-gradient(90deg, ${theme.palette.action.hover} 25%, ${theme.palette.action.selected} 50%, ${theme.palette.action.hover} 75%)`,
  backgroundSize: '200% 100%',
  animation: `${shimmer} 1.5s infinite`,
}));

// Highlight animation for milestone
const highlightGlow = keyframes`
  0%, 100% {
    background-color: transparent;
  }
  50% {
    background-color: rgba(255, 167, 38, 0.15);
  }
`;

interface StreamingChapterCardProps {
  chapter: Chapter;
  chapterIndex: number;
  delay?: number;
  speed?: number;
  statusDuration?: number;
  statusMessages?: string[];
  onComplete?: () => void;
  onToggleCollapse?: () => void;
  sectionRef?: (el: HTMLElement | null) => void;
  extraContent?: React.ReactNode;
  collapsed?: boolean;
  instant?: boolean;
  highlightVersion?: string | null;
  // Collapse countdown props
  dwellDuration?: number;           // Time in ms before auto-collapse (default: 3500)
  onReadyToCollapse?: () => void;   // Called when dwell period ends
  showCollapseCountdown?: boolean;  // Whether to show countdown UI (default: true when onReadyToCollapse provided)
}

// Reusable hook for countdown with pause-on-hover
function useCollapseCountdown({
  enabled,
  duration,
  onComplete,
}: {
  enabled: boolean;
  duration: number;
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const startTimeRef = useRef<number | null>(null);
  const pausedAtRef = useRef<number>(0);

  useEffect(() => {
    if (!enabled || isPaused) {
      if (isPaused && startTimeRef.current !== null) {
        // Store progress when paused
        pausedAtRef.current = progress;
      }
      return;
    }

    // Resume from paused progress or start fresh
    const resumeFrom = pausedAtRef.current;
    const remainingDuration = duration * (1 - resumeFrom);
    startTimeRef.current = Date.now();

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current!;
      const newProgress = resumeFrom + (elapsed / duration) * (1 - resumeFrom);
      const clampedProgress = Math.min(newProgress, 1);
      setProgress(clampedProgress);

      if (clampedProgress >= 1) {
        clearInterval(interval);
        onComplete();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [enabled, isPaused, duration, onComplete]);

  // Reset when disabled
  useEffect(() => {
    if (!enabled) {
      setProgress(0);
      pausedAtRef.current = 0;
      startTimeRef.current = null;
    }
  }, [enabled]);

  return { progress, isPaused, setIsPaused };
}

type Phase = 'waiting' | 'status' | 'streaming' | 'complete';

export function StreamingChapterCard({
  chapter,
  chapterIndex,
  delay = 0,
  speed = 8,
  statusDuration = 600,
  statusMessages = THINKING_WORDS,
  onComplete,
  onToggleCollapse,
  sectionRef,
  extraContent,
  collapsed = false,
  instant = false,
  highlightVersion,
  dwellDuration = 3500,
  onReadyToCollapse,
  showCollapseCountdown,
}: StreamingChapterCardProps) {
  const [phase, setPhase] = useState<Phase>('waiting');
  const [statusCharIndex, setStatusCharIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [skippedToComplete, setSkippedToComplete] = useState(false);
  // Pick a random thinking word (without the dots - we'll animate them)
  const [statusWord] = useState(() => {
    const word = statusMessages[Math.floor(Math.random() * statusMessages.length)];
    return word.replace(/\.+$/, ''); // Remove trailing dots
  });
  const [dotCount, setDotCount] = useState(1);

  // Collapse countdown - only for completed chapters with auto-collapse enabled
  const shouldShowCountdown = showCollapseCountdown ?? !!onReadyToCollapse;
  const countdownEnabled = phase === 'complete' &&
    chapter.status === 'completed' &&
    !!onReadyToCollapse &&
    !collapsed;

  const handleCountdownComplete = useCallback(() => {
    onReadyToCollapse?.();
  }, [onReadyToCollapse]);

  const { progress: countdownProgress, setIsPaused: setCountdownPaused } = useCollapseCountdown({
    enabled: countdownEnabled,
    duration: dwellDuration,
    onComplete: handleCountdownComplete,
  });

  // Calculate opacity fade (starts at 60% progress, fades to 85% opacity)
  const FADE_START = 0.6;
  const countdownOpacity = countdownEnabled && countdownProgress > FADE_START
    ? 1 - ((countdownProgress - FADE_START) / (1 - FADE_START)) * 0.15
    : 1;

  const StatusIcon = statusConfig[chapter.status].icon;
  const statusColor = statusConfig[chapter.status].color;

  // Build content strings
  const title = chapter.title;
  const version = chapter.versions;
  const statusLabel = statusConfig[chapter.status].label;
  const story = chapter.story.join('\n\n');
  const milestonesHeader = 'Milestones';

  // Content markers
  const titleEnd = title.length;
  const versionEnd = titleEnd + version.length;
  const statusEnd = versionEnd + statusLabel.length;
  const storyEnd = statusEnd + story.length;
  const fullContent = title + version + statusLabel + story + milestonesHeader;

  // Phase 1: Wait for delay
  useEffect(() => {
    const timer = setTimeout(() => setPhase('status'), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Phase 2: Status typewriter - type out word, then animate dots
  useEffect(() => {
    if (phase !== 'status') return;

    // Type out the status word (without dots)
    const typeInterval = setInterval(() => {
      setStatusCharIndex((prev) => {
        if (prev >= statusWord.length) {
          clearInterval(typeInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(typeInterval);
  }, [phase, statusWord]);

  // Animate dots: . → .. → ... → .
  useEffect(() => {
    if (phase !== 'status') return;
    if (statusCharIndex < statusWord.length) return;

    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev % 3) + 1);
    }, 400);

    return () => clearInterval(dotInterval);
  }, [phase, statusCharIndex, statusWord.length]);

  // After status duration, move to streaming
  useEffect(() => {
    if (phase !== 'status') return;
    if (statusCharIndex < statusWord.length) return;

    const timer = setTimeout(() => {
      setPhase('streaming');
    }, statusDuration);

    return () => clearTimeout(timer);
  }, [phase, statusCharIndex, statusWord.length, statusDuration]);

  // Phase 3: Stream content
  useEffect(() => {
    if (phase !== 'streaming') return;

    const interval = setInterval(() => {
      setCharIndex((prev) => {
        if (prev >= fullContent.length) {
          clearInterval(interval);
          setPhase('complete');
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [phase, fullContent.length, speed]);

  // Call onComplete when phase transitions to complete
  useEffect(() => {
    if (phase === 'complete') {
      onComplete?.();
    }
  }, [phase, onComplete]);

  // Handle instant skip - complete immediately, animation handled by CSS
  useEffect(() => {
    if (instant && phase !== 'complete') {
      setSkippedToComplete(true);
      setPhase('complete');
      setCharIndex(fullContent.length);
    }
  }, [instant, phase, fullContent.length]);

  const isComplete = phase === 'complete';

  // Collapsed view - just header (after all hooks)
  if (collapsed && isComplete) {
    return (
      <Box id={chapter.id} ref={sectionRef} component="section">
        <Card
          sx={{
            p: 2,
            opacity: 0.7,
            cursor: 'pointer',
            transition: 'opacity 0.2s, box-shadow 0.2s',
            '&:hover': {
              opacity: 1,
              boxShadow: 2,
            },
          }}
          onClick={(e) => {
            e.stopPropagation();
            onToggleCollapse?.();
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <StatusIcon sx={{ color: statusColor, fontSize: 24 }} />
            <Typography variant="body1" sx={{ fontWeight: 500, color: 'text.secondary' }}>
              {chapter.title}
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Typography variant="caption" color="text.disabled">
              {chapter.versions}
            </Typography>
          </Box>
        </Card>
      </Box>
    );
  }
  const showCursor = (phase === 'status' || phase === 'streaming') && !isComplete;

  // Calculate visible content
  const showTitle = charIndex > 0 ? title.slice(0, Math.min(charIndex, titleEnd)) : '';
  const showVersion = charIndex > titleEnd ? version.slice(0, charIndex - titleEnd) : '';
  const showStatus = charIndex > versionEnd ? statusLabel.slice(0, charIndex - versionEnd) : '';
  const showStory = charIndex > statusEnd ? story.slice(0, charIndex - statusEnd) : '';
  const showMilestonesHeader = charIndex > storyEnd ? milestonesHeader.slice(0, charIndex - storyEnd) : '';

  // Cursor position
  const cursorSection =
    charIndex <= titleEnd ? 'title' :
    charIndex <= versionEnd ? 'version' :
    charIndex <= statusEnd ? 'tag' :
    charIndex <= storyEnd ? 'story' : 'milestones';

  // Lottery ticket effect - skeleton visibility
  const storyProgress = charIndex > statusEnd ? (charIndex - statusEnd) / story.length : 0;
  const showSkeleton1 = storyProgress < 0.25;
  const showSkeleton2 = storyProgress < 0.5;
  const showSkeleton3 = storyProgress < 0.75;
  const showMilestoneSkeleton = charIndex <= storyEnd;

  // Waiting phase - empty card placeholder
  if (phase === 'waiting') {
    return (
      <Box
        id={chapter.id}
        ref={sectionRef}
        component="section"
      >
        <Card sx={{ p: 3, minHeight: 200 }} />
      </Box>
    );
  }

  return (
    <Box
      id={chapter.id}
      ref={sectionRef}
      component="section"
    >
      <Card
        onMouseEnter={() => setCountdownPaused(true)}
        onMouseLeave={() => setCountdownPaused(false)}
        sx={{
          p: 3,
          position: 'relative',
          overflow: 'hidden',
          opacity: countdownOpacity,
          transition: 'opacity 0.1s ease-out',
          ...(skippedToComplete && {
            animation: `${fadeUp} 0.4s ease-out both`,
            animationDelay: `${chapterIndex * 100}ms`,
          }),
        }}
      >
        <Stack spacing={3}>
          {/* Header - clickable to collapse for completed chapters */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              ...(isComplete && chapter.status === 'completed' && onToggleCollapse ? {
                cursor: 'pointer',
                borderRadius: 1,
                mx: -1,
                px: 1,
                '&:hover': {
                  backgroundColor: 'action.hover',
                },
              } : {}),
            }}
            onClick={isComplete && chapter.status === 'completed' ? (e) => {
              e.stopPropagation();
              onToggleCollapse?.();
            } : undefined}
          >
            {/* Icon - pulsing dot until complete */}
            <Box sx={{ width: 28, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {isComplete ? (
                <StatusIcon sx={{ color: statusColor, fontSize: 28 }} />
              ) : (
                <PulsingDot />
              )}
            </Box>

            {/* Title area */}
            <Box sx={{ flexGrow: 1 }}>
              {phase === 'status' ? (
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 400,
                    color: 'text.disabled',
                    fontStyle: 'italic',
                  }}
                >
                  {statusWord.slice(0, statusCharIndex)}
                  {statusCharIndex >= statusWord.length && '.'.repeat(dotCount)}
                </Typography>
              ) : (
                <>
                  <Typography variant="h5" sx={{ fontWeight: 600 }}>
                    {showTitle}
                    {showCursor && cursorSection === 'title' && <Cursor />}
                  </Typography>
                  {charIndex > titleEnd && (
                    <Typography variant="caption" color="text.secondary">
                      {showVersion}
                      {showCursor && cursorSection === 'version' && <Cursor />}
                    </Typography>
                  )}
                </>
              )}
            </Box>

            {/* Tag */}
            <Box sx={{ minWidth: 80, display: 'flex', justifyContent: 'flex-end' }}>
              {charIndex > versionEnd && (
                <Tag
                  label={showStatus || ' '}
                  size="small"
                  variant={
                    chapter.status === 'completed' ? 'success' :
                    chapter.status === 'in-progress' ? 'secondary' : 'default'
                  }
                />
              )}
            </Box>
          </Box>

          {/* Story content + skeleton */}
          <Box>
            {charIndex > statusEnd && (
              <Box sx={{ mb: showSkeleton1 ? 2 : 0 }}>
                {showStory.split('\n\n').map((paragraph, idx) => (
                  <Typography
                    key={idx}
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2, lineHeight: 1.8 }}
                  >
                    {paragraph}
                    {showCursor && cursorSection === 'story' && idx === showStory.split('\n\n').length - 1 && <Cursor />}
                  </Typography>
                ))}
              </Box>
            )}

            {/* Shrinking skeleton lines */}
            {(phase === 'status' || (phase === 'streaming' && charIndex <= storyEnd)) && (
              <Stack spacing={1}>
                {showSkeleton1 && <SkeletonLine width="100%" />}
                {showSkeleton2 && <SkeletonLine width="100%" />}
                {showSkeleton3 && <SkeletonLine width="80%" />}
              </Stack>
            )}
          </Box>

          {charIndex > statusEnd && showStory.length > 0 && <Divider />}

          {/* Milestones */}
          <Box>
            {charIndex > storyEnd && (
              <>
                <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                  {showMilestonesHeader}
                  {showCursor && cursorSection === 'milestones' && <Cursor />}
                </Typography>
                {isComplete && (
                  <List dense disablePadding>
                    {chapter.milestones.map((milestone) => {
                      const MilestoneIcon = statusConfig[milestone.status].icon;
                      const milestoneColor = statusConfig[milestone.status].color;
                      const isHighlighted = highlightVersion === milestone.version;
                      const update = getUpdateByVersion(milestone.version);
                      const blogSlug = update?.blogSlug;
                      return (
                        <ListItem
                          key={milestone.version}
                          id={`milestone-${milestone.version}`}
                          disableGutters
                          sx={{
                            py: 0.5,
                            px: 1,
                            mx: -1,
                            borderRadius: 1,
                            ...(isHighlighted && {
                              animation: `${highlightGlow} 2s ease-in-out infinite`,
                              border: '1px solid',
                              borderColor: 'secondary.main',
                            }),
                          }}
                          secondaryAction={
                            blogSlug && (
                              <Tooltip title="Read the story">
                                <IconButton
                                  component={Link}
                                  href={`/blog/${blogSlug}/?from=journey`}
                                  size="small"
                                  onClick={(e) => e.stopPropagation()}
                                  sx={{
                                    color: 'text.secondary',
                                    '&:hover': { color: 'secondary.main' },
                                  }}
                                >
                                  <ArticleIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )
                          }
                        >
                          <ListItemIcon sx={{ minWidth: 32 }}>
                            <MilestoneIcon sx={{ fontSize: 18, color: milestoneColor }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Typography variant="body2" sx={isHighlighted ? { fontWeight: 600 } : undefined}>
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
                )}
              </>
            )}
            {showMilestoneSkeleton && (phase === 'status' || phase === 'streaming') && (
              <Stack spacing={1}>
                <SkeletonLine width={100} />
                <SkeletonLine width="70%" />
                <SkeletonLine width="65%" />
              </Stack>
            )}
          </Box>

          {/* Extra content (e.g., Before/After table) - shown when complete */}
          {isComplete && extraContent}
        </Stack>

        {/* Collapse countdown progress bar with message */}
        {countdownEnabled && shouldShowCountdown && (
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Message */}
            <Typography
              variant="caption"
              sx={{
                color: 'text.disabled',
                fontSize: '0.7rem',
                mb: 0.5,
                opacity: 0.8,
              }}
            >
              Hover to pause • Collapsing soon
            </Typography>
            {/* Progress bar */}
            <Box
              sx={{
                width: '100%',
                height: 6,
                bgcolor: 'action.hover',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: `${(1 - countdownProgress) * 100}%`,
                  bgcolor: 'secondary.main',
                  transition: 'width 50ms linear',
                }}
              />
            </Box>
          </Box>
        )}
      </Card>
    </Box>
  );
}

export default StreamingChapterCard;
