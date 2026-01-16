import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ThemeToggle from './ThemeToggle';
import { Box, Typography } from '@mui/material';

const meta: Meta<typeof ThemeToggle> = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    docs: {
      description: {
        component: 'Toggle button for switching between light and dark themes. Shows sun icon in dark mode, moon icon in light mode.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Story />
        <Typography variant="body2" color="text.secondary">
          Click to toggle theme
        </Typography>
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ThemeToggle>;

export const Default: Story = {};
