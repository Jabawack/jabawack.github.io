import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Box, Stack } from '@mui/material';
import { chapters } from '@/data/chapters';
import { ChapterNav } from './ChapterNav';
import { StreamingChapterCard } from './AIThinkingFlow';
import SiteEvolutionJourney from './SiteEvolutionJourney';

// Shared helper for calculating chapter delays
const getChapterDelay = (index: number) => {
  if (index === 0) return 0;
  let totalDelay = 0;
  for (let i = 0; i < index; i++) {
    const ch = chapters[i];
    const contentLength = ch.title.length + ch.versions.length + ch.story.join('').length + 50;
    totalDelay += 600 + contentLength * 8 + 200;
  }
  return totalDelay;
};

const meta: Meta = {
  title: 'Components/JourneyDemo',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

export const FullExperience: Story = {
  name: 'Full Journey Experience',
  render: () => <SiteEvolutionJourney showHero={false} />,
};

export const SidebarOnly: Story = {
  name: 'Sidebar Navigation Only',
  render: () => {
    const [active, setActive] = useState('chapter-4');
    return (
      <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: 400 }}>
        <ChapterNav
          activeChapterId={active}
          onChapterClick={setActive}
        />
      </Box>
    );
  },
};

export const ContentOnly: Story = {
  name: 'Streaming Cards Only',
  render: () => {
    const [activeCard, setActiveCard] = useState(0);
    const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());

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

    return (
      <Box sx={{ p: 4, bgcolor: 'background.default', maxWidth: 800, mx: 'auto' }}>
        <Stack spacing={2}>
          {chapters.map((chapter, index) => {
            const isCollapsed = index < activeCard && chapter.status === 'completed' && !expandedChapters.has(chapter.id);
            return (
              <StreamingChapterCard
                key={chapter.id}
                chapter={chapter}
                chapterIndex={index}
                delay={getChapterDelay(index)}
                speed={8}
                statusDuration={600}
                collapsed={isCollapsed}
                onToggleCollapse={() => toggleChapter(chapter.id)}
                onComplete={() => setActiveCard(index + 1)}
              />
            );
          })}
        </Stack>
      </Box>
    );
  },
};
