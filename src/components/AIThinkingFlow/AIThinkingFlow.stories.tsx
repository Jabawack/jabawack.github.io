import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState, useEffect } from 'react';
import { Box, Card, Stack, Typography, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { chapters } from '@/data/chapters';
import { statusConfig } from '@/config/statusConfig';
import Tag from '@/components/Tag';
import { AIThinkingFlowSkeleton } from './AIThinkingFlowSkeleton';
import { AIThinkingFlowStatus } from './AIThinkingFlowStatus';

// ============================================
// REUSABLE COMPONENTS
// ============================================
function ChapterCard({ chapterIndex }: { chapterIndex: number }) {
  const chapter = chapters[chapterIndex];
  if (!chapter) return null;

  const StatusIcon = statusConfig[chapter.status].icon;
  const statusColor = statusConfig[chapter.status].color;

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={2}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <StatusIcon sx={{ color: statusColor, fontSize: 28 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              {chapter.title}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {chapter.versions}
            </Typography>
          </Box>
          <Tag
            label={statusConfig[chapter.status].label}
            size="small"
            variant={chapter.status === 'completed' ? 'success' : chapter.status === 'in-progress' ? 'secondary' : 'default'}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
          {chapter.story[0]}
        </Typography>
        <Divider />
        <Typography variant="caption" color="text.secondary">
          {chapter.milestones.length} milestones
        </Typography>
      </Stack>
    </Card>
  );
}

// Default status messages (same as AIThinkingFlow component)
const DEFAULT_STATUS_MESSAGES = ['Thinking...', 'Analyzing chapters...', 'Loading content...'];

// Blinking cursor component
const Cursor = () => (
  <Box
    component="span"
    sx={{
      display: 'inline-block',
      width: 2,
      height: '1em',
      bgcolor: 'secondary.main',
      ml: 0.25,
      animation: 'blink 1s step-end infinite',
      verticalAlign: 'text-bottom',
      '@keyframes blink': { '0%,50%': { opacity: 1 }, '51%,100%': { opacity: 0 } },
    }}
  />
);

// Pulsing dot for status phase
const PulsingDot = () => (
  <Box
    sx={{
      width: 8,
      height: 8,
      borderRadius: '50%',
      bgcolor: 'secondary.main',
      boxShadow: (theme) => `0 0 8px ${theme.palette.secondary.main}`,
      animation: 'pulse 1.5s ease-in-out infinite',
      '@keyframes pulse': {
        '0%, 100%': { opacity: 1, transform: 'scale(1)' },
        '50%': { opacity: 0.5, transform: 'scale(0.9)' },
      },
    }}
  />
);

// Skeleton line component for lottery ticket effect
function SkeletonLine({ width, visible }: { width: string | number; visible: boolean }) {
  if (!visible) return null;
  return (
    <Box
      sx={{
        height: 16,
        width,
        bgcolor: 'action.hover',
        borderRadius: 1,
        animation: 'shimmer 1.5s infinite',
        background: (theme) =>
          `linear-gradient(90deg, ${theme.palette.action.hover} 25%, ${theme.palette.action.selected} 50%, ${theme.palette.action.hover} 75%)`,
        backgroundSize: '200% 100%',
        '@keyframes shimmer': {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
      }}
    />
  );
}

// Streaming card with status inside + lottery ticket reveal
function StreamingChapterCard({
  chapterIndex,
  delay = 0,
  speed = 15,
  statusDuration = 2000,
  statusMessages = DEFAULT_STATUS_MESSAGES,
  onComplete
}: {
  chapterIndex: number;
  delay?: number;
  speed?: number;
  statusDuration?: number;
  statusMessages?: string[];
  onComplete?: () => void;
}) {
  const chapter = chapters[chapterIndex];
  const [phase, setPhase] = useState<'waiting' | 'status' | 'streaming' | 'complete'>('waiting');
  const [statusIndex, setStatusIndex] = useState(0);
  const [statusCharIndex, setStatusCharIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  if (!chapter) return null;

  const StatusIcon = statusConfig[chapter.status].icon;
  const statusColor = statusConfig[chapter.status].color;

  // Build full content string with markers
  const title = chapter.title;
  const version = chapter.versions;
  const story = chapter.story[0];
  const statusLabel = statusConfig[chapter.status].label;
  const milestonesText = `${chapter.milestones.length} milestones`;

  // Total content to stream
  const fullContent = title + version + statusLabel + story + milestonesText;
  const titleEnd = title.length;
  const versionEnd = titleEnd + version.length;
  const statusEnd = versionEnd + statusLabel.length;
  const storyEnd = statusEnd + story.length;

  // Phase 1: Wait for delay
  useEffect(() => {
    const timer = setTimeout(() => setPhase('status'), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  // Phase 2: Status typewriter inside card
  useEffect(() => {
    if (phase !== 'status') return;

    const currentMessage = statusMessages[statusIndex];

    // Type current status message
    const typeInterval = setInterval(() => {
      setStatusCharIndex((prev) => {
        if (prev >= currentMessage.length) {
          clearInterval(typeInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(typeInterval);
  }, [phase, statusIndex, statusMessages]);

  // Advance to next status message or streaming phase
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

  // Phase 3: Stream actual content
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

  const isStreaming = phase === 'streaming';
  const isComplete = phase === 'complete';
  const showCursor = (phase === 'status' || phase === 'streaming') && !isComplete;

  // Calculate what to show based on charIndex
  const showTitle = charIndex > 0 ? title.slice(0, Math.min(charIndex, titleEnd)) : '';
  const showVersion = charIndex > titleEnd ? version.slice(0, Math.min(charIndex - titleEnd, version.length)) : '';
  const showStatus = charIndex > versionEnd ? statusLabel.slice(0, Math.min(charIndex - versionEnd, statusLabel.length)) : '';
  const showStory = charIndex > statusEnd ? story.slice(0, Math.min(charIndex - statusEnd, story.length)) : '';
  const showMilestones = charIndex > storyEnd ? milestonesText.slice(0, Math.min(charIndex - storyEnd, milestonesText.length)) : '';

  // Determine cursor position during streaming
  const cursorSection =
    charIndex <= titleEnd ? 'title' :
    charIndex <= versionEnd ? 'version' :
    charIndex <= statusEnd ? 'status' :
    charIndex <= storyEnd ? 'story' : 'milestones';

  // Calculate skeleton visibility (lottery ticket effect)
  const storyProgress = charIndex > statusEnd ? (charIndex - statusEnd) / story.length : 0;
  const showSkeleton1 = storyProgress < 0.3;
  const showSkeleton2 = storyProgress < 0.5;
  const showSkeleton3 = storyProgress < 0.7;
  const showSkeleton4 = storyProgress < 0.9;
  const showMilestoneSkeleton = charIndex <= storyEnd;

  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={2}>
        {/* Header with vertically centered icon */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Icon - vertically centered, only show after complete */}
          <Box sx={{ width: 28, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {phase === 'complete' ? (
              <StatusIcon sx={{ color: statusColor, fontSize: 28 }} />
            ) : (
              <PulsingDot />
            )}
          </Box>

          {/* Title area - shows status during status phase, then content */}
          <Box sx={{ flexGrow: 1 }}>
            {phase === 'status' ? (
              // Status typewriter in title area - same font as title
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  color: 'secondary.main',
                }}
              >
                {statusMessages[statusIndex].slice(0, statusCharIndex)}
                {showCursor && <Cursor />}
              </Typography>
            ) : (
              // Real content
              <>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {showTitle}
                  {showCursor && cursorSection === 'title' && <Cursor />}
                </Typography>
                {(isStreaming || isComplete) && charIndex > titleEnd && (
                  <Typography variant="caption" color="text.secondary">
                    {showVersion}
                    {showCursor && cursorSection === 'version' && <Cursor />}
                  </Typography>
                )}
              </>
            )}
          </Box>

          {/* Tag area */}
          <Box sx={{ minWidth: 80, display: 'flex', justifyContent: 'flex-end' }}>
            {charIndex > versionEnd && (
              <Tag
                label={showStatus || ' '}
                size="small"
                variant={chapter.status === 'completed' ? 'success' : chapter.status === 'in-progress' ? 'secondary' : 'default'}
              />
            )}
          </Box>
        </Box>

        {/* Story content + skeleton (lottery ticket) */}
        <Box>
          {/* Typed story content */}
          {charIndex > statusEnd && (
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8, mb: 1 }}>
              {showStory}
              {showCursor && cursorSection === 'story' && <Cursor />}
            </Typography>
          )}

          {/* Shrinking skeleton lines */}
          {(phase === 'status' || (isStreaming && charIndex <= storyEnd)) && (
            <Stack spacing={1}>
              <SkeletonLine width="100%" visible={showSkeleton1} />
              <SkeletonLine width="100%" visible={showSkeleton2} />
              <SkeletonLine width="80%" visible={showSkeleton3} />
              <SkeletonLine width="60%" visible={showSkeleton4} />
            </Stack>
          )}
        </Box>

        {/* Divider and milestones */}
        {charIndex > statusEnd && showStory.length > 0 && <Divider />}

        {/* Milestones + skeleton */}
        <Box>
          {charIndex > storyEnd && (
            <Typography variant="caption" color="text.secondary">
              {showMilestones}
              {showCursor && cursorSection === 'milestones' && <Cursor />}
            </Typography>
          )}
          {showMilestoneSkeleton && (phase === 'status' || isStreaming) && (
            <Stack spacing={1} sx={{ mt: charIndex > storyEnd ? 1 : 0 }}>
              <SkeletonLine width={120} visible />
            </Stack>
          )}
        </Box>
      </Stack>
    </Card>
  );
}

// ============================================
// STORY ARGS INTERFACE
// ============================================
interface RevealStoryArgs {
  skeletonDuration: number;
  cardCount: number;
  staggerDelay: number;
  typingSpeed?: number;
  statusDuration?: number;
  messageInterval?: number;
}

// ============================================
// META
// ============================================
const meta: Meta = {
  title: 'Components/AIThinkingFlow',
  parameters: {
    layout: 'padded',
  },
  argTypes: {
    skeletonDuration: {
      control: { type: 'range', min: 500, max: 5000, step: 500 },
      description: 'How long to show skeleton (ms)',
    },
    cardCount: {
      control: { type: 'range', min: 1, max: 4, step: 1 },
      description: 'Number of cards to show',
    },
    staggerDelay: {
      control: { type: 'range', min: 100, max: 1000, step: 100 },
      description: 'Delay between each card animation (ms)',
    },
  },
  args: {
    skeletonDuration: 2000,
    cardCount: 3,
    staggerDelay: 300,
  },
  // Clear storage on story change for fresh testing
  decorators: [
    (Story) => {
      useEffect(() => {
        sessionStorage.removeItem('ai-thinking-flow-journey');
      }, []);
      return <Story />;
    },
  ],
};

export default meta;
type Story = StoryObj<RevealStoryArgs>;

// ============================================
// REVEAL ANIMATION STORIES
// ============================================

export const RevealInstant: Story = {
  args: {
    staggerDelay: 100,
    cardCount: 2,
    skeletonDuration: 2000
  },

  name: '1. Instant (Current)',

  render: ({ skeletonDuration, cardCount }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
      setShow(false);
      const timer = setTimeout(() => setShow(true), skeletonDuration);
      return () => clearTimeout(timer);
    }, [skeletonDuration]);

    return (
      <Box sx={{ maxWidth: 700, mx: 'auto' }}>
        {!show ? (
          <AIThinkingFlowSkeleton visible cardCount={cardCount} />
        ) : (
          <Stack spacing={4}>
            {Array.from({ length: cardCount }).map((_, i) => (
              <ChapterCard key={i} chapterIndex={i} />
            ))}
          </Stack>
        )}
      </Box>
    );
  }
};

export const RevealStreaming: Story = {
  name: '2. Streaming (AI-style)',
  argTypes: {
    typingSpeed: {
      control: { type: 'range', min: 5, max: 50, step: 5 },
      description: 'Typing speed (ms per character)',
    },
    statusDuration: {
      control: { type: 'range', min: 500, max: 3000, step: 250 },
      description: 'How long to show status messages per card (ms)',
    },
  },
  args: {
    typingSpeed: 15,
    statusDuration: 1500,
  },
  render: ({ cardCount, typingSpeed = 15, statusDuration = 1500, staggerDelay }: RevealStoryArgs) => {
    // Calculate delay between cards - each card waits for previous to complete
    const getCardDelay = (index: number) => {
      if (index === 0) return 0;
      // Each card: status phase + content streaming
      let totalDelay = 0;
      for (let i = 0; i < index; i++) {
        const ch = chapters[i];
        if (ch) {
          const contentLength = ch.title.length + ch.versions.length + ch.story[0].length + 20;
          totalDelay += statusDuration + (contentLength * typingSpeed) + staggerDelay;
        }
      }
      return totalDelay;
    };

    return (
      <Box sx={{ maxWidth: 700, mx: 'auto' }}>
        <Stack spacing={4}>
          {Array.from({ length: cardCount }).map((_, i) => (
            <StreamingChapterCard
              key={i}
              chapterIndex={i}
              delay={getCardDelay(i)}
              speed={typingSpeed}
              statusDuration={statusDuration}
            />
          ))}
        </Stack>
      </Box>
    );
  },
};

export const RevealStaggeredFade: Story = {
  name: '3. Staggered Fade Up',
  render: ({ skeletonDuration, cardCount, staggerDelay }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
      setShow(false);
      const timer = setTimeout(() => setShow(true), skeletonDuration);
      return () => clearTimeout(timer);
    }, [skeletonDuration]);

    return (
      <Box sx={{ maxWidth: 700, mx: 'auto' }}>
        {!show ? (
          <AIThinkingFlowSkeleton visible cardCount={cardCount} />
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: staggerDelay / 1000 } } }}
          >
            <Stack spacing={4}>
              {Array.from({ length: cardCount }).map((_, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                  }}
                >
                  <ChapterCard chapterIndex={i} />
                </motion.div>
              ))}
            </Stack>
          </motion.div>
        )}
      </Box>
    );
  },
};

export const RevealScaleIn: Story = {
  name: '4. Scale In',
  render: ({ skeletonDuration, cardCount, staggerDelay }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
      setShow(false);
      const timer = setTimeout(() => setShow(true), skeletonDuration);
      return () => clearTimeout(timer);
    }, [skeletonDuration]);

    return (
      <Box sx={{ maxWidth: 700, mx: 'auto' }}>
        {!show ? (
          <AIThinkingFlowSkeleton visible cardCount={cardCount} />
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: staggerDelay / 1000 } } }}
          >
            <Stack spacing={4}>
              {Array.from({ length: cardCount }).map((_, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, scale: 0.9 },
                    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } },
                  }}
                >
                  <ChapterCard chapterIndex={i} />
                </motion.div>
              ))}
            </Stack>
          </motion.div>
        )}
      </Box>
    );
  },
};

export const RevealBlur: Story = {
  name: '5. Blur Reveal',
  render: ({ skeletonDuration, cardCount, staggerDelay }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
      setShow(false);
      const timer = setTimeout(() => setShow(true), skeletonDuration);
      return () => clearTimeout(timer);
    }, [skeletonDuration]);

    return (
      <Box sx={{ maxWidth: 700, mx: 'auto' }}>
        {!show ? (
          <AIThinkingFlowSkeleton visible cardCount={cardCount} />
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: staggerDelay / 1000 } } }}
          >
            <Stack spacing={4}>
              {Array.from({ length: cardCount }).map((_, i) => (
                <motion.div
                  key={i}
                  variants={{
                    hidden: { opacity: 0, filter: 'blur(10px)', scale: 0.95 },
                    visible: { opacity: 1, filter: 'blur(0px)', scale: 1, transition: { duration: 0.5 } },
                  }}
                >
                  <ChapterCard chapterIndex={i} />
                </motion.div>
              ))}
            </Stack>
          </motion.div>
        )}
      </Box>
    );
  },
};

// ============================================
// COMPONENT STORIES
// ============================================

export const SkeletonOnly: Story = {
  name: 'Skeleton Only',
  render: ({ cardCount }) => (
    <Box sx={{ maxWidth: 700, mx: 'auto' }}>
      <AIThinkingFlowSkeleton visible cardCount={cardCount} />
    </Box>
  ),
};

export const StatusTypewriter: Story = {
  name: 'Status Typewriter',
  argTypes: {
    messageInterval: {
      control: { type: 'range', min: 1000, max: 5000, step: 500 },
      description: 'Time between message changes (ms)',
    },
  },
  args: {
    messageInterval: 2000,
  },
  render: ({ messageInterval = 2000 }: RevealStoryArgs) => {
    const messages = ['Thinking...', 'Analyzing chapters...', 'Loading content...'];
    const [index, setIndex] = useState(0);

    useEffect(() => {
      setIndex(0);
      const interval = setInterval(() => setIndex((p) => (p + 1) % messages.length), messageInterval);
      return () => clearInterval(interval);
    }, [messageInterval]);

    return (
      <Box sx={{ maxWidth: 700, mx: 'auto' }}>
        <AIThinkingFlowStatus message={messages[index]} visible />
      </Box>
    );
  },
};
