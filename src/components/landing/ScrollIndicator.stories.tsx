import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Box } from '@mui/material';
import ScrollIndicator from './ScrollIndicator';

const meta: Meta<typeof ScrollIndicator> = {
  title: 'Landing/ScrollIndicator',
  component: ScrollIndicator,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Animated scroll indicator with bouncing chevron. Used in the hero section and personal statement section. Supports custom labels, click handlers, and Framer Motion opacity binding for scroll-driven fade.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ScrollIndicator>;

export const Default: Story = {
  render: () => (
    <Box sx={{ position: 'relative', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ScrollIndicator />
    </Box>
  ),
};

export const WithSkipLabel: Story = {
  render: () => (
    <Box sx={{ position: 'relative', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <ScrollIndicator label="Skip" onClick={() => alert('Skip clicked')} />
    </Box>
  ),
};
