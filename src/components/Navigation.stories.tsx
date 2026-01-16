import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Navigation from './Navigation';
import { Box } from '@mui/material';

const meta: Meta<typeof Navigation> = {
  title: 'Components/Navigation',
  component: Navigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Main site navigation with responsive mobile drawer, scroll-triggered background, and active state highlighting.',
      },
    },
    nextjs: {
      appDirectory: true,
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ minHeight: '200vh', backgroundColor: 'background.default' }}>
        <Story />
        <Box sx={{ p: 4, pt: 12 }}>
          <p>Scroll down to see the navigation background change.</p>
        </Box>
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Navigation>;

export const Default: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
};

export const OnPortfolioPage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/portfolio/',
      },
    },
  },
};

export const OnAboutPage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/about/',
      },
    },
  },
};
