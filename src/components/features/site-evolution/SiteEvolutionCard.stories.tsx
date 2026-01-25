import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SiteEvolutionCard from './SiteEvolutionCard';
import { Box } from '@mui/material';

const meta: Meta<typeof SiteEvolutionCard> = {
  title: 'Components/SiteEvolutionCard',
  component: SiteEvolutionCard,
  parameters: {
    docs: {
      description: {
        component: 'Card linking to the Site Evolution case study with progress indicator and tech stack chips.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 400, p: 2 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SiteEvolutionCard>;

export const Default: Story = {};
