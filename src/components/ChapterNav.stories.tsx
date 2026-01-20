import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Box } from '@mui/material';
import { ChapterNav } from './ChapterNav';

const meta: Meta<typeof ChapterNav> = {
  title: 'Components/ChapterNav',
  component: ChapterNav,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    activeChapterId: {
      control: 'select',
      options: ['chapter-1', 'chapter-2', 'chapter-3', 'chapter-4'],
      description: 'Currently active chapter',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ChapterNav>;

export const Default: Story = {
  args: {
    activeChapterId: 'chapter-1',
  },
  render: (args) => (
    <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: 400 }}>
      <ChapterNav {...args} />
    </Box>
  ),
};

export const Interactive: Story = {
  name: 'Interactive (Clickable)',
  render: () => {
    const [active, setActive] = useState('chapter-1');
    return (
      <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: 400 }}>
        <ChapterNav
          activeChapterId={active}
          onChapterClick={(id) => setActive(id)}
        />
      </Box>
    );
  },
};

export const Chapter4Active: Story = {
  name: 'Last Chapter Active',
  args: {
    activeChapterId: 'chapter-4',
  },
  render: (args) => (
    <Box sx={{ p: 4, bgcolor: 'background.default', minHeight: 400 }}>
      <ChapterNav {...args} />
    </Box>
  ),
};
