import type { Meta, StoryObj } from '@storybook/react';
import { VideoPlayer } from './VideoPlayer';

const meta: Meta<typeof VideoPlayer> = {
  title: 'Components/VideoPlayer',
  component: VideoPlayer,
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
type Story = StoryObj<typeof VideoPlayer>;

// Use a small sample video for testing
// In real usage, this would be a blog post video
export const Default: Story = {
  args: {
    src: '/images/blog/respecting-user-time/01-before-waiting.mp4',
    alt: 'Demo animation',
    width: 600,
  },
};

export const ClickToSkip: Story = {
  args: {
    src: '/images/blog/respecting-user-time/02-after-skip.mp4',
    alt: 'Click to skip demo',
    width: 600,
  },
};
