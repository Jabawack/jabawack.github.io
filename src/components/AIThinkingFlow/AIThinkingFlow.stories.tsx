import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState, useEffect } from 'react';
import { Box, Card, Stack, Typography, Divider } from '@mui/material';
import { motion } from 'framer-motion';
import { chapters } from '@/data/chapters';
import { statusConfig } from '@/config/statusConfig';
import Tag from '@/components/Tag';
import { AIThinkingFlowSkeleton } from './AIThinkingFlowSkeleton';
import { StreamingChapterCard } from './StreamingChapterCard';
import { THINKING_WORDS } from './constants';

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
      description: 'Initial loading skeleton duration before content appears (for non-streaming modes)',
      table: { category: 'Timing' },
    },
    cardCount: {
      control: { type: 'range', min: 1, max: 4, step: 1 },
      description: 'Number of chapter cards to display',
      table: { category: 'Content' },
    },
    staggerDelay: {
      control: { type: 'range', min: 0, max: 1000, step: 100 },
      description: 'Gap between one card completing and next card starting (ms)',
      table: { category: 'Timing' },
    },
    typingSpeed: {
      control: { type: 'range', min: 1, max: 30, step: 1 },
      description: 'Content typing speed - lower = faster (ms per character)',
      table: { category: 'Timing' },
    },
    statusDuration: {
      control: { type: 'range', min: 200, max: 2000, step: 100 },
      description: 'How long "Thinking..." status shows before content streams',
      table: { category: 'Timing' },
    },
  },
  args: {
    skeletonDuration: 1500,
    cardCount: 3,
    staggerDelay: 200,
    typingSpeed: 8,
    statusDuration: 600,
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

export const RevealStreaming: Story = {
  name: '1. Streaming (AI-style)',
  render: ({ cardCount, typingSpeed = 8, statusDuration = 600, staggerDelay = 200 }: RevealStoryArgs) => {
    const [activeCard, setActiveCard] = useState(0);
    const [expandedChapters, setExpandedChapters] = useState<Set<number>>(new Set());

    const toggleChapter = (index: number) => {
      setExpandedChapters((prev) => {
        const next = new Set(prev);
        if (next.has(index)) {
          next.delete(index);
        } else {
          next.add(index);
        }
        return next;
      });
    };

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
        <Stack spacing={2}>
          {Array.from({ length: cardCount }).map((_, i) => {
            const chapter = chapters[i];
            if (!chapter) return null;
            const isCollapsed = i < activeCard && chapter.status === 'completed' && !expandedChapters.has(i);
            return (
              <StreamingChapterCard
                key={i}
                chapter={chapter}
                chapterIndex={i}
                delay={getCardDelay(i)}
                speed={typingSpeed}
                statusDuration={statusDuration}
                collapsed={isCollapsed}
                onToggleCollapse={() => toggleChapter(i)}
                onComplete={() => setActiveCard(i + 1)}
              />
            );
          })}
        </Stack>
      </Box>
    );
  },
};

export const RevealInstant: Story = {
  name: '2. Instant',
  args: {
    staggerDelay: 100,
    cardCount: 2,
    skeletonDuration: 2000
  },
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
    statusDuration: {
      control: { type: 'range', min: 1000, max: 5000, step: 500 },
      description: 'Duration before picking new word (ms)',
    },
  },
  args: {
    statusDuration: 2000,
  },
  render: ({ statusDuration = 2000 }: RevealStoryArgs) => {
    const [word, setWord] = useState(() =>
      THINKING_WORDS[Math.floor(Math.random() * THINKING_WORDS.length)].replace(/\.+$/, '')
    );
    const [charIndex, setCharIndex] = useState(0);
    const [dotCount, setDotCount] = useState(1);

    // Type out the word
    useEffect(() => {
      setCharIndex(0);
      const typeInterval = setInterval(() => {
        setCharIndex((prev) => {
          if (prev >= word.length) {
            clearInterval(typeInterval);
            return prev;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(typeInterval);
    }, [word]);

    // Animate dots
    useEffect(() => {
      if (charIndex < word.length) return;
      const dotInterval = setInterval(() => {
        setDotCount((prev) => (prev % 3) + 1);
      }, 400);
      return () => clearInterval(dotInterval);
    }, [charIndex, word.length]);

    // Pick new random word after duration
    useEffect(() => {
      if (charIndex < word.length) return;
      const timer = setTimeout(() => {
        setWord(THINKING_WORDS[Math.floor(Math.random() * THINKING_WORDS.length)].replace(/\.+$/, ''));
        setCharIndex(0);
        setDotCount(1);
      }, statusDuration);
      return () => clearTimeout(timer);
    }, [charIndex, word.length, statusDuration]);

    return (
      <Box sx={{ maxWidth: 700, mx: 'auto', p: 3 }}>
        <Card sx={{ p: 3 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 400,
              color: 'text.disabled',
              fontStyle: 'italic',
            }}
          >
            {word.slice(0, charIndex)}
            {charIndex >= word.length && '.'.repeat(dotCount)}
          </Typography>
        </Card>
      </Box>
    );
  },
};
