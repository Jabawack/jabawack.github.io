import type { Meta, StoryObj } from '@storybook/react';
import { GifPlayer } from './GifPlayer';

const meta: Meta<typeof GifPlayer> = {
  title: 'Components/GifPlayer',
  component: GifPlayer,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    src: { control: 'text' },
    alt: { control: 'text' },
    width: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof GifPlayer>;

// Use a small sample video for testing
// In real usage, this would be a blog post video
export const Default: Story = {
  args: {
    src: '/images/blog/respecting-user-time/01-before-waiting.gif',
    alt: 'Demo animation',
    width: 600,
  },
};

export const ClickToSkip: Story = {
  args: {
    src: '/images/blog/respecting-user-time/02-after-skip.gif',
    alt: 'Click to skip demo',
    width: 600,
  },
};
