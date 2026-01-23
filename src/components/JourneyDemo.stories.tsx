import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState, useMemo } from 'react';
import { Box, Stack } from '@mui/material';
import { chapters, Chapter } from '@/data/chapters';
import { ChapterNav } from './ChapterNav';
import { StreamingChapterCard } from './AIThinkingFlow';
import SiteEvolutionJourney from './SiteEvolutionJourney';

// Shared helper for calculating chapter delays
const getChapterDelay = (index: number, chapterList: Chapter[]) => {
  if (index === 0) return 0;
  let totalDelay = 0;
  for (let i = 0; i < index; i++) {
    const ch = chapterList[i];
    const contentLength = ch.title.length + ch.versions.length + ch.story.join('').length + 50;
    totalDelay += 600 + contentLength * 8 + 200;
  }
  return totalDelay;
};

// Label length presets
const labelPresets = {
  default: '',
  medium: ' - Lorem Ipsum',
  long: ' - Lorem Ipsum Dolor Sit Amet Consectetur',
  veryLong: ' - Lorem Ipsum Dolor Sit Amet Consectetur Adipiscing Elit Sed Do Eiusmod',
};

const meta: Meta = {
  title: 'Components/JourneyDemo',
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj;

// ============================================
// Full Journey with Controls (Primary Story)
// ============================================
interface FullControlsArgs {
  containerWidth: number;
  navWidth: number;
  labelSuffix: keyof typeof labelPresets;
  instant: boolean;
}

export const FullWithControls: StoryObj<FullControlsArgs> = {
  name: 'Full Journey with Controls',
  args: {
    containerWidth: 780,
    navWidth: 180,
    labelSuffix: 'default',
    instant: false,
  },
  argTypes: {
    containerWidth: {
      control: { type: 'range', min: 320, max: 1400, step: 20 },
      description: 'Container width (320=mobile, 768=tablet, 1200=desktop)',
    },
    navWidth: {
      control: { type: 'range', min: 100, max: 300, step: 10 },
      description: 'ChapterNav sidebar width',
    },
    labelSuffix: {
      control: 'select',
      options: ['default', 'medium', 'long', 'veryLong'],
      description: 'Preset label length',
    },
    instant: {
      control: 'boolean',
      description: 'Skip streaming animation',
    },
  },
  render: ({ containerWidth, navWidth, labelSuffix, instant }) => {
    const [active, setActive] = useState('chapter-3');
    const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set(['chapter-3']));

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

    const selectChapter = (chapterId: string) => {
      setExpandedChapters(new Set([chapterId]));
      setActive(chapterId);
    };

    // Create modified chapters with custom labels
    const modifiedChapters = useMemo(() => {
      const suffix = labelPresets[labelSuffix];
      return chapters.map((ch) => ({
        ...ch,
        title: ch.title + suffix,
      }));
    }, [labelSuffix]);

    const showNav = containerWidth >= 768;

    return (
      <Box sx={{ p: 2, bgcolor: 'background.default' }}>
        <Box
          sx={{
            maxWidth: containerWidth,
            mx: 'auto',
            border: '1px dashed',
            borderColor: 'divider',
          }}
        >
          <Box sx={{ display: 'flex', gap: 4, p: 2 }}>
            {showNav && (
              <Box sx={{ position: 'sticky', top: 20, height: 'fit-content' }}>
                <ChapterNav
                  activeChapterId={active}
                  onChapterClick={selectChapter}
                  chapters={modifiedChapters}
                  sx={{ width: navWidth }}
                  showTitle
                />
              </Box>
            )}
            <Box sx={{ flexGrow: 1 }}>
              <Stack spacing={2}>
                {modifiedChapters.map((chapter, index) => {
                  const isCollapsed = chapter.status === 'completed' && !expandedChapters.has(chapter.id);
                  return (
                    <StreamingChapterCard
                      key={chapter.id}
                      chapter={chapter}
                      chapterIndex={index}
                      delay={instant ? 0 : getChapterDelay(index, modifiedChapters)}
                      speed={8}
                      statusDuration={600}
                      collapsed={isCollapsed}
                      onToggleCollapse={() => toggleChapter(chapter.id)}
                      onComplete={() => {}}
                      instant={instant}
                    />
                  );
                })}
              </Stack>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  },
};

// ============================================
// Full Experience (Uses actual component)
// ============================================
export const FullExperience: Story = {
  name: 'Full Journey Experience',
  render: () => <SiteEvolutionJourney showHero={false} />,
};

// ============================================
// Sidebar Only
// ============================================
interface SidebarControlsArgs {
  navWidth: number;
  labelSuffix: keyof typeof labelPresets;
  customSuffix: string;
}

export const SidebarOnly: StoryObj<SidebarControlsArgs> = {
  name: 'Sidebar Navigation Only',
  args: {
    navWidth: 180,
    labelSuffix: 'default',
    customSuffix: '',
  },
  argTypes: {
    navWidth: {
      control: { type: 'range', min: 100, max: 400, step: 10 },
      description: 'Width of the ChapterNav sidebar',
    },
    labelSuffix: {
      control: 'select',
      options: ['default', 'medium', 'long', 'veryLong'],
      description: 'Preset label length to test wrapping',
    },
    customSuffix: {
      control: 'text',
      description: 'Custom suffix to add to chapter labels',
    },
  },
  render: ({ navWidth, labelSuffix, customSuffix }) => {
    const [active, setActive] = useState('chapter-3');

    // Create modified chapters with custom labels
    const modifiedChapters = useMemo(() => {
      const suffix = customSuffix || labelPresets[labelSuffix];
      return chapters.map((ch) => ({
        ...ch,
        title: ch.title + suffix,
      }));
    }, [labelSuffix, customSuffix]);

    return (
      <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: 400 }}>
        <ChapterNav
          activeChapterId={active}
          onChapterClick={setActive}
          chapters={modifiedChapters}
          sx={{ width: navWidth }}
          showTitle
        />
      </Box>
    );
  },
};

// ============================================
// Content Only (Streaming Cards)
// ============================================
interface ContentControlsArgs {
  containerWidth: number;
  instant: boolean;
  labelSuffix: keyof typeof labelPresets;
}

export const ContentOnly: StoryObj<ContentControlsArgs> = {
  name: 'Streaming Cards Only',
  args: {
    containerWidth: 800,
    instant: true,
    labelSuffix: 'default',
  },
  argTypes: {
    containerWidth: {
      control: { type: 'range', min: 320, max: 1200, step: 20 },
      description: 'Container width for responsive testing (320=mobile, 768=tablet, 1200=desktop)',
    },
    instant: {
      control: 'boolean',
      description: 'Skip streaming animation',
    },
    labelSuffix: {
      control: 'select',
      options: ['default', 'medium', 'long', 'veryLong'],
      description: 'Preset label length to test wrapping',
    },
  },
  render: ({ containerWidth, instant, labelSuffix }) => {
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

    // Create modified chapters with custom labels
    const modifiedChapters = useMemo(() => {
      const suffix = labelPresets[labelSuffix];
      return chapters.map((ch) => ({
        ...ch,
        title: ch.title + suffix,
      }));
    }, [labelSuffix]);

    return (
      <Box sx={{ p: 2, bgcolor: 'background.default' }}>
        <Box
          sx={{
            maxWidth: containerWidth,
            mx: 'auto',
            border: '1px dashed',
            borderColor: 'divider',
            p: 2,
          }}
        >
          <Stack spacing={2}>
            {modifiedChapters.map((chapter, index) => {
              const isCollapsed = index < activeCard && chapter.status === 'completed' && !expandedChapters.has(chapter.id);
              return (
                <StreamingChapterCard
                  key={chapter.id}
                  chapter={chapter}
                  chapterIndex={index}
                  delay={getChapterDelay(index, modifiedChapters)}
                  speed={8}
                  statusDuration={600}
                  collapsed={isCollapsed}
                  onToggleCollapse={() => toggleChapter(chapter.id)}
                  onComplete={() => setActiveCard(index + 1)}
                  instant={instant}
                />
              );
            })}
          </Stack>
        </Box>
      </Box>
    );
  },
};
