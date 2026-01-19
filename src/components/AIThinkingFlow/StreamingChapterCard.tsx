'use client';

import { useState, useEffect } from 'react';
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
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import Tag from '@/components/Tag';
import { Chapter } from '@/data/chapters';
import { statusConfig } from '@/config/statusConfig';

// Blinking cursor
const blink = keyframes`
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
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

const DEFAULT_STATUS_MESSAGES = ['Thinking...', 'Analyzing...', 'Loading...'];

interface StreamingChapterCardProps {
  chapter: Chapter;
  chapterIndex: number;
  delay?: number;
  speed?: number;
  statusDuration?: number;
  statusMessages?: string[];
  onComplete?: () => void;
  sectionRef?: (el: HTMLElement | null) => void;
  extraContent?: React.ReactNode;
}

type Phase = 'waiting' | 'status' | 'streaming' | 'complete';

export function StreamingChapterCard({
  chapter,
  chapterIndex,
  delay = 0,
  speed = 12,
  statusDuration = 1800,
  statusMessages = DEFAULT_STATUS_MESSAGES,
  onComplete,
  sectionRef,
  extraContent,
}: StreamingChapterCardProps) {
  const [phase, setPhase] = useState<Phase>('waiting');
  const [statusIndex, setStatusIndex] = useState(0);
  const [statusCharIndex, setStatusCharIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

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
  const headerEnd = storyEnd + milestonesHeader.length;
  const fullContent = title + version + statusLabel + story + milestonesHeader;

  // Phase 1: Wait for delay
  useEffect(() => {
    const timer = setTimeout(() => setPhase('status'), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Phase 2: Status typewriter
  useEffect(() => {
    if (phase !== 'status') return;

    const currentMessage = statusMessages[statusIndex];
    const typeInterval = setInterval(() => {
      setStatusCharIndex((prev) => {
        if (prev >= currentMessage.length) {
          clearInterval(typeInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 40);

    return () => clearInterval(typeInterval);
  }, [phase, statusIndex, statusMessages]);

  // Advance status messages
  useEffect(() => {
    if (phase !== 'status') return;

    const currentMessage = statusMessages[statusIndex];
    if (statusCharIndex < currentMessage.length) return;

    const messageDelay = statusDuration / statusMessages.length;
    const timer = setTimeout(() => {
      if (statusIndex < statusMessages.length - 1) {
        setStatusIndex((prev) => prev + 1);
        setStatusCharIndex(0);
      } else {
        setPhase('streaming');
      }
    }, messageDelay);

    return () => clearTimeout(timer);
  }, [phase, statusCharIndex, statusIndex, statusMessages, statusDuration]);

  // Phase 3: Stream content
  useEffect(() => {
    if (phase !== 'streaming') return;

    const interval = setInterval(() => {
      setCharIndex((prev) => {
        if (prev >= fullContent.length) {
          clearInterval(interval);
          setPhase('complete');
          onComplete?.();
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [phase, fullContent.length, speed, onComplete]);

  const isComplete = phase === 'complete';
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
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
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
                <Typography variant="h5" sx={{ fontWeight: 600, color: 'secondary.main' }}>
                  {statusMessages[statusIndex].slice(0, statusCharIndex)}
                  {showCursor && <Cursor />}
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
      </Card>
    </Box>
  );
}

export default StreamingChapterCard;
