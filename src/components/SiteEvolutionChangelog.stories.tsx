import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SiteEvolutionChangelog from './SiteEvolutionChangelog';
import { Box } from '@mui/material';

const meta: Meta<typeof SiteEvolutionChangelog> = {
  title: 'Components/SiteEvolutionChangelog',
  component: SiteEvolutionChangelog,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Timeline view of site updates with status filtering and auto-scroll to the current focus item (last in-progress or next planned).',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SiteEvolutionChangelog>;

export const Default: Story = {
  name: 'Default (Auto-scroll)',
  parameters: {
    docs: {
      description: {
        story: 'On mount, auto-scrolls to the next planned item (v2.7.0) with smooth easing animation.',
      },
    },
  },
};
