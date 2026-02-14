import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Box } from '@mui/material';
import PersonalStatement from './PersonalStatement';

const meta: Meta<typeof PersonalStatement> = {
  title: 'Landing/PersonalStatement',
  component: PersonalStatement,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Scroll-triggered word-by-word text reveal for the landing page. Words transition from muted (opacity 0.15) to accent color as the user scrolls. Respects prefers-reduced-motion with a static fallback. Scroll within the story canvas to see the reveal effect.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PersonalStatement>;

export const Default: Story = {
  render: () => (
    <Box>
      {/* Spacer to enable scrolling for the reveal effect */}
      <Box sx={{ height: '60vh' }} />
      <PersonalStatement />
      <Box sx={{ height: '60vh' }} />
    </Box>
  ),
};
