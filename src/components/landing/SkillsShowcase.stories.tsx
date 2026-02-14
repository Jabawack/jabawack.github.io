import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Box } from '@mui/material';
import SkillsShowcase from './SkillsShowcase';

const meta: Meta<typeof SkillsShowcase> = {
  title: 'Landing/SkillsShowcase',
  component: SkillsShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Tabbed skills showcase for the landing page. Five categories (Frontend, Backend, Full Stack, Design, Leadership) with descriptions and tech tags. Uses Framer Motion AnimatePresence for tab transitions and whileInView for entrance animation.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SkillsShowcase>;

export const Default: Story = {
  render: () => (
    <Box sx={{ minHeight: 600, display: 'flex', alignItems: 'center' }}>
      <SkillsShowcase />
    </Box>
  ),
};
