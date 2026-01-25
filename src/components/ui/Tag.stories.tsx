import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Tag from './Tag';
import { Box, Stack, Typography, Paper } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CircleIcon from '@mui/icons-material/Circle';

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
      options: ['default', 'primary', 'secondary', 'success', 'warning', 'error', 'outlined'],
      description: 'Color variant',
    },
    onDelete: {
      action: 'deleted',
      description: 'Delete handler - shows delete icon when provided',
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
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Error
        </Typography>
        <Stack direction="row" spacing={1}>
          <Tag label="Error" variant="error" />
          <Tag label="Selected" variant="error" selected />
        </Stack>
      </Box>
      <Box>
        <Typography variant="subtitle2" gutterBottom>
          Outlined
        </Typography>
        <Stack direction="row" spacing={1}>
          <Tag label="Outlined" variant="outlined" />
          <Tag label="Selected" variant="outlined" selected />
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

export const WithIcons: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography variant="body2" color="text.secondary">
        Tags can include icons for additional context
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Tag label="TypeScript" variant="primary" icon={<CodeIcon sx={{ fontSize: 14 }} />} />
        <Tag label="Completed" variant="success" icon={<CheckCircleIcon sx={{ fontSize: 14 }} />} />
        <Tag label="High" variant="error" icon={<CircleIcon sx={{ fontSize: 8 }} />} />
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Tags with icons for enhanced visual context.',
      },
    },
  },
};

export const Deletable: Story = {
  render: () => (
    <Stack spacing={2}>
      <Typography variant="body2" color="text.secondary">
        Tags with delete functionality for filter chips
      </Typography>
      <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
        <Tag label='Search: "react"' variant="secondary" onDelete={() => {}} />
        <Tag label="Tag: TypeScript" variant="primary" onDelete={() => {}} />
        <Tag label="Status: Active" variant="success" onDelete={() => {}} />
      </Stack>
    </Stack>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Deletable tags commonly used for active filters.',
      },
    },
  },
};

export const BlogExample: Story = {
  render: () => (
    <Paper sx={{ p: 3, maxWidth: 600 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Tag label="v2.5.0" variant="outlined" size="small" sx={{ height: 20, fontSize: '0.7rem' }} />
          <Typography variant="caption" color="text.secondary">
            January 17, 2026 · 3 min read
          </Typography>
        </Stack>
        <Typography variant="h6">Why I Added a Blog to My Portfolio</Typography>
        <Typography variant="body2" color="text.secondary">
          The portfolio needed a voice - a place to document decisions...
        </Typography>
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          <Tag label="Portfolio" variant="secondary" onClick={() => {}} />
          <Tag label="MDX" variant="secondary" onClick={() => {}} />
          <Tag label="Documentation" variant="secondary" onClick={() => {}} />
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

export const RoadmapExample: Story = {
  render: () => (
    <Paper sx={{ p: 3, maxWidth: 600 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap>
          <Tag label="v2.7.0" variant="secondary" size="small" sx={{ fontWeight: 600 }} />
          <Tag label="High" variant="error" size="small" icon={<CircleIcon sx={{ fontSize: 8 }} />} />
          <Tag label="in-progress" variant="secondary" size="small" />
        </Stack>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Landing Page Redesign
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Complete overhaul of the homepage with new bento grid layout...
        </Typography>
        <Stack direction="row" spacing={0.5} flexWrap="wrap" useFlexGap>
          <Tag label="Design" size="small" variant="secondary" />
          <Tag label="UX" size="small" variant="secondary" />
          <Tag label="Frontend" size="small" variant="secondary" />
        </Stack>
      </Stack>
    </Paper>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of tags used in a roadmap item context.',
      },
    },
  },
};
