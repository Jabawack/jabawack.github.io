import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BlogListClient from './BlogListClient';
import type { BlogPostMeta } from '@/lib/blog';

const meta: Meta<typeof BlogListClient> = {
  title: 'Blog/BlogListClient',
  component: BlogListClient,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Blog listing component with search, tag filtering, and sorting capabilities.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BlogListClient>;

const mockPosts: BlogPostMeta[] = [
  {
    slug: 'building-mdx-blog-system',
    title: 'Why I Added a Blog to My Portfolio',
    date: '2026-01-17',
    description:
      "The portfolio needed a voice - a place to document decisions, share the journey, and explain the 'why' behind each feature",
    tags: ['Portfolio', 'MDX', 'Documentation'],
    author: 'TK',
    readingTime: '4 min read',
    published: true,
    version: '2.5.0',
  },
  {
    slug: 'orbit-lab-project-journey',
    title: 'Building orbit-lab-project: A 3D Flight Tracker',
    date: '2026-01-20',
    description:
      'How I built a real-time flight tracking visualization using Three.js, React, and WebGL',
    tags: ['Three.js', 'React', 'WebGL', 'TypeScript'],
    author: 'TK',
    readingTime: '8 min read',
    published: true,
    version: '2.6.0',
  },
  {
    slug: 'design-system-journey',
    title: 'Building a Design System with Storybook',
    date: '2026-01-15',
    description: 'How I implemented a comprehensive design system for component documentation',
    tags: ['Storybook', 'Design System', 'React'],
    author: 'TK',
    readingTime: '6 min read',
    published: true,
    version: '2.4.0',
  },
  {
    slug: 'performance-optimization',
    title: 'Optimizing React Performance',
    date: '2026-01-10',
    description: 'Techniques for improving React application performance',
    tags: ['React', 'Performance', 'TypeScript'],
    author: 'Jane Doe',
    readingTime: '10 min read',
    published: true,
  },
];

const allTags = [
  'Portfolio',
  'MDX',
  'Documentation',
  'Three.js',
  'React',
  'WebGL',
  'TypeScript',
  'Storybook',
  'Design System',
  'Performance',
];

export const Default: Story = {
  args: {
    posts: mockPosts,
    allTags,
  },
};

export const SinglePost: Story = {
  args: {
    posts: [mockPosts[0]],
    allTags: ['Portfolio', 'MDX', 'Documentation'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Blog list with a single post.',
      },
    },
  },
};

export const NoPosts: Story = {
  args: {
    posts: [],
    allTags: [],
  },
  parameters: {
    docs: {
      description: {
        story: 'Empty state when no posts exist.',
      },
    },
  },
};

export const ManyPosts: Story = {
  args: {
    posts: [
      ...mockPosts,
      {
        slug: 'typescript-tips',
        title: 'Advanced TypeScript Tips',
        date: '2026-01-05',
        description: 'Advanced TypeScript patterns for better code',
        tags: ['TypeScript', 'Tips'],
        author: 'TK',
        readingTime: '7 min read',
        published: true,
      },
      {
        slug: 'nextjs-app-router',
        title: 'Migrating to Next.js App Router',
        date: '2026-01-01',
        description: 'Guide to migrating from Pages Router to App Router',
        tags: ['Next.js', 'React', 'Migration'],
        author: 'TK',
        readingTime: '12 min read',
        published: true,
      },
    ],
    allTags: [...allTags, 'Tips', 'Next.js', 'Migration'],
  },
  parameters: {
    docs: {
      description: {
        story: 'Blog list with many posts to show scrolling behavior.',
      },
    },
  },
};

const postsWithThumbnails: BlogPostMeta[] = [
  {
    ...mockPosts[0],
    image: '/images/blog/building-mdx-blog-system/03-blog-listing.png',
  },
  {
    ...mockPosts[1],
    image: '/images/blog/orbit-lab-project-journey/01-globe-overview.jpg',
  },
  {
    ...mockPosts[2],
    image: '/images/blog/ai-loading-visual-polish/05-storybook-controls.jpg',
  },
  mockPosts[3], // No thumbnail
];

export const WithThumbnails: Story = {
  args: {
    posts: postsWithThumbnails,
    allTags,
  },
  parameters: {
    docs: {
      description: {
        story: 'Blog list with thumbnail images for some posts.',
      },
    },
  },
};

export const AllWithThumbnails: Story = {
  args: {
    posts: mockPosts.map((post, index) => ({
      ...post,
      image: index % 2 === 0
        ? '/images/blog/building-mdx-blog-system/03-blog-listing.png'
        : '/images/blog/orbit-lab-project-journey/01-globe-overview.jpg',
    })),
    allTags,
  },
  parameters: {
    docs: {
      description: {
        story: 'Blog list where all posts have thumbnail images.',
      },
    },
  },
};
