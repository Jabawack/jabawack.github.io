import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Tag from './Tag';
import { Box, Stack, Typography, Paper } from '@mui/material';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component:
          'Tag component for categorization and filtering. Designed with accessibility in mind with proper contrast ratios in both light and dark modes.',
      },
    },
  },
  argTypes: {
    label: {
      control: 'text',
      description: 'Tag label text',
    },
    selected: {
      control: 'boolean',
      description: 'Whether the tag is selected/active',
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
      description: 'Size variant',
    },
    variant: {
      control: 'select',
      options: ['default', 'primary', 'secondary', 'success', 'warning'],
      description: 'Color variant',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {
  args: {
    label: 'React',
  },
};

export const Selected: Story = {
  args: {
    label: 'React',
    selected: true,
  },
};

export const Variants: Story = {
  render: () => (
    <Stack spacing={3}>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Default
        </Typography>
        <Stack direction="row" spacing={1}>
          <Tag label="Default" variant="default" />
          <Tag label="Selected" variant="default" selected />
        </Stack>
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Primary
        </Typography>
        <Stack direction="row" spacing={1}>
          <Tag label="Primary" variant="primary" />
          <Tag label="Selected" variant="primary" selected />
        </Stack>
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Secondary
        </Typography>
        <Stack direction="row" spacing={1}>
          <Tag label="Secondary" variant="secondary" />
          <Tag label="Selected" variant="secondary" selected />
        </Stack>
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Success
        </Typography>
        <Stack direction="row" spacing={1}>
          <Tag label="Success" variant="success" />
          <Tag label="Selected" variant="success" selected />
        </Stack>
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Warning
        </Typography>
        <Stack direction="row" spacing={1}>
          <Tag label="Warning" variant="warning" />
          <Tag label="Selected" variant="warning" selected />
        </Stack>
      </Box>
    </Stack>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Stack direction="row" spacing={2} alignItems="center">
      <Tag label="Small" size="small" />
      <Tag label="Medium" size="medium" />
    </Stack>
  ),
};

export const Interactive: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography variant="body2" color="text.secondary">
        Click tags to see interaction states
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Tag label="React" onClick={() => {}} />
        <Tag label="TypeScript" onClick={() => {}} />
        <Tag label="Next.js" onClick={() => {}} selected />
        <Tag label="MUI" onClick={() => {}} />
        <Tag label="Storybook" onClick={() => {}} />
      </Stack>
    </Stack>
  ),
};

export const BlogExample: Story = {
  render: () => (
    <Paper sx={{ p: 3, maxWidth: 600 }}>
      <Stack spacing={2}>
        <Typography variant="caption" color="text.secondary">
          January 17, 2026 · 3 min read · by TK
        </Typography>
        <Typography variant="h6">Why I Added a Blog to My Portfolio</Typography>
        <Typography variant="body2" color="text.secondary">
          The portfolio needed a voice - a place to document decisions...
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Tag label="Portfolio" variant="default" onClick={() => {}} />
          <Tag label="MDX" variant="default" onClick={() => {}} />
          <Tag label="Documentation" variant="default" onClick={() => {}} />
        </Stack>
      </Stack>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of tags used in a blog post card context.',
      },
    },
  },
};
