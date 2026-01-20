import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState, useRef, useCallback } from 'react';
import { Box, Stack } from '@mui/material';
import { chapters } from '@/data/chapters';
import { ChapterNav } from './ChapterNav';
import { StreamingChapterCard } from './AIThinkingFlow';

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
  render: () => {
    const [activeChapter, setActiveChapter] = useState('chapter-1');
    const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
    const [manualNavigation, setManualNavigation] = useState(false);
    const [activeCard, setActiveCard] = useState(0);
    const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

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

    const scrollToChapter = (chapterId: string) => {
      const element = sectionRefs.current.get(chapterId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    const selectChapter = (chapterId: string) => {
      setManualNavigation(true);
      setExpandedChapters(new Set([chapterId]));
      setActiveChapter(chapterId);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToChapter(chapterId);
        });
      });
    };

    const handleChapterChange = useCallback((chapterId: string) => {
      setActiveChapter(chapterId);
    }, []);

    const getChapterDelay = (index: number) => {
      if (index === 0) return 0;
      let totalDelay = 0;
      const statusDuration = 600;
      const speed = 8;
      const staggerDelay = 200;
      for (let i = 0; i < index; i++) {
        const ch = chapters[i];
        const contentLength = ch.title.length + ch.versions.length + ch.story.join('').length + 50;
        totalDelay += statusDuration + contentLength * speed + staggerDelay;
      }
      return totalDelay;
    };

    return (
      <Box sx={{ display: 'flex', gap: 4, p: 4, bgcolor: 'background.default', minHeight: '100vh' }}>
        {/* Sidebar */}
        <Box sx={{ position: 'sticky', top: 20, height: 'fit-content', minWidth: 180 }}>
          <ChapterNav
            activeChapterId={activeChapter}
            onChapterClick={selectChapter}
          />
        </Box>

        {/* Content */}
        <Box sx={{ flexGrow: 1, maxWidth: 800 }}>
          <Stack spacing={2}>
            {chapters.map((chapter, index) => {
              const isCollapsed = manualNavigation
                ? !expandedChapters.has(chapter.id)
                : index < activeCard && chapter.status === 'completed' && !expandedChapters.has(chapter.id);

              return (
                <Box
                  key={chapter.id}
                  ref={(el: HTMLElement | null) => {
                    if (el) sectionRefs.current.set(chapter.id, el);
                  }}
                >
                  <StreamingChapterCard
                    chapter={chapter}
                    chapterIndex={index}
                    delay={getChapterDelay(index)}
                    speed={8}
                    statusDuration={600}
                    collapsed={isCollapsed}
                    onToggleCollapse={() => toggleChapter(chapter.id)}
                    onComplete={() => {
                      setActiveCard(index + 1);
                      const nextChapter = chapters[index + 1];
                      if (nextChapter) {
                        handleChapterChange(nextChapter.id);
                      }
                    }}
                  />
                </Box>
              );
            })}
          </Stack>
        </Box>
      </Box>
    );
  },
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
