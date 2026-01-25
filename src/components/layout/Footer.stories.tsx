import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Footer from './Footer';
import { Box, Typography } from '@mui/material';

const meta: Meta<typeof Footer> = {
  title: 'Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Site footer with copyright and social links (Email, LinkedIn, GitHub).',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Placeholder content */}
        <Box sx={{ flexGrow: 1, p: 4, bgcolor: 'background.default' }}>
          <Typography variant="h4" gutterBottom>
            Page Content
          </Typography>
          <Typography color="text.secondary">
            This placeholder represents the main page content. The footer stays at the bottom.
          </Typography>
        </Box>
        {/* Footer at bottom */}
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};
