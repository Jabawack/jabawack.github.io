import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BlogPostHeader from './BlogPostHeader';
import { Paper } from '@mui/material';
import type { BlogPostMeta } from '@/lib/blog';

const meta: Meta<typeof BlogPostHeader> = {
  title: 'Blog/BlogPostHeader',
  component: BlogPostHeader,
  parameters: {
    docs: {
      description: {
        component:
          'Header component for blog posts displaying metadata like date, reading time, author, version, and tags.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Paper sx={{ p: 3, maxWidth: 800 }}>
        <Story />
      </Paper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof BlogPostHeader>;

const baseMockPost: BlogPostMeta = {
  slug: 'example-post',
  title: 'Example Blog Post Title',
  date: '2026-01-17',
  description: 'This is an example blog post description.',
  tags: ['React', 'TypeScript', 'Next.js'],
  author: 'TK',
  readingTime: '5 min read',
  published: true,
  version: '2.5.0',
};

export const Default: Story = {
  args: {
    post: baseMockPost,
  },
};

export const WithoutVersion: Story = {
  args: {
    post: {
      ...baseMockPost,
      version: undefined,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Post header without a version tag.',
      },
    },
  },
};

export const SingleTag: Story = {
  args: {
    post: {
      ...baseMockPost,
      tags: ['Documentation'],
    },
  },
};

export const ManyTags: Story = {
  args: {
    post: {
      ...baseMockPost,
      tags: ['React', 'TypeScript', 'Next.js', 'MUI', 'Storybook', 'MDX'],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Post with many tags showing wrap behavior.',
      },
    },
  },
};

export const NoTags: Story = {
  args: {
    post: {
      ...baseMockPost,
      tags: [],
      version: undefined,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Post with no tags - only shows date, reading time, and author.',
      },
    },
  },
};

export const LongReadingTime: Story = {
  args: {
    post: {
      ...baseMockPost,
      readingTime: '15 min read',
      tags: ['Deep Dive', 'Tutorial'],
    },
  },
};
