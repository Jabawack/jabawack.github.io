import type { Meta, StoryObj } from '@storybook/react';
import ProjectHeader from './ProjectHeader';
import { BentoItem } from '@/components/ui/BentoBox';
import GitHubIcon from '@mui/icons-material/GitHub';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PublicIcon from '@mui/icons-material/Public';
import FlightIcon from '@mui/icons-material/Flight';
import SpeedIcon from '@mui/icons-material/Speed';
import StorageIcon from '@mui/icons-material/Storage';
import ArticleIcon from '@mui/icons-material/Article';
import { Box, Typography } from '@mui/material';

const meta: Meta<typeof ProjectHeader> = {
  title: 'Portfolio/ProjectHeader',
  component: ProjectHeader,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <Box sx={{ py: 6 }}>
        <Box sx={{ maxWidth: 'lg', mx: 'auto', px: 3 }}>
          <Story />
        </Box>
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ProjectHeader>;

const sampleBentoItems: BentoItem[] = [
  {
    id: 'overview',
    label: 'What It Does',
    value: 'Real-time flight tracking on an interactive 3D globe',
    colSpan: 2,
    icon: <PublicIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: 'flights',
    label: 'Live Flights',
    value: 'Real-time',
    icon: <FlightIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: 'render',
    label: 'Rendering',
    value: '60 FPS',
    icon: <SpeedIcon sx={{ fontSize: 20 }} />,
  },
  {
    id: 'stack',
    label: 'Key Stack',
    value: 'React + Three.js',
    colSpan: 2,
    icon: <StorageIcon sx={{ fontSize: 20 }} />,
  },
];

export const WithImage: Story = {
  args: {
    title: 'Orbit Lab',
    breadcrumbLabel: 'Orbit Lab',
    description:
      'A 3D flight tracking visualization built with React Three Fiber and three-globe. Watch real-time aircraft positions on an interactive globe.',
    media: {
      type: 'image',
      src: '/images/portfolio/orbit-lab-project/preview.jpg',
      alt: 'Orbit Lab 3D globe with flight paths',
    },
    ctaButtons: [
      { label: 'Launch Demo', href: '#', variant: 'contained', icon: <OpenInNewIcon />, target: '_blank' },
      { label: 'View Source', href: '#', variant: 'outlined', icon: <GitHubIcon />, target: '_blank' },
    ],
    bentoItems: sampleBentoItems,
  },
};

export const WithNextImage: Story = {
  args: {
    title: 'Manuscript Alert',
    breadcrumbLabel: 'Manuscript Alert',
    description:
      'Research paper aggregator for Alzheimer\'s disease and neuroimaging researchers.',
    statusChip: { label: 'Contributor', color: 'primary', variant: 'outlined' },
    media: {
      type: 'image',
      src: '/images/portfolio/manuscript-alert/preview.jpg',
      alt: 'Manuscript Alert System',
      useNextImage: true,
    },
    ctaButtons: [
      { label: 'View on GitHub', href: '#', variant: 'contained', icon: <GitHubIcon />, target: '_blank' },
    ],
    bentoItems: [
      { id: 'overview', label: 'What It Does', value: 'Aggregates papers from PubMed, arXiv, bioRxiv, medRxiv', colSpan: 2, icon: <ArticleIcon sx={{ fontSize: 20 }} /> },
      { id: 'sources', label: 'Data Sources', value: '4 APIs', icon: <StorageIcon sx={{ fontSize: 20 }} /> },
      { id: 'stack', label: 'Current Stack', value: 'Python + Streamlit', icon: <SpeedIcon sx={{ fontSize: 20 }} /> },
    ],
  },
};

export const WithCustomMedia: Story = {
  args: {
    title: 'Ask Prism',
    breadcrumbLabel: 'Ask Prism',
    description:
      'Document Analytics Platform with visual citations.',
    media: {
      type: 'custom',
      component: (
        <Box>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Demo: AI-Powered Table Enrichment
          </Typography>
          <Box
            sx={{
              width: '100%',
              aspectRatio: '16/9',
              bgcolor: 'grey.900',
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography color="grey.500">Video placeholder</Typography>
          </Box>
        </Box>
      ),
    },
    ctaButtons: [
      { label: 'View on GitHub', href: '#', variant: 'contained', icon: <GitHubIcon />, target: '_blank' },
    ],
    bentoItems: sampleBentoItems,
  },
};

export const Minimal: Story = {
  args: {
    title: 'My Project',
    breadcrumbLabel: 'My Project',
    description: 'A minimal project header with no media, bento, or CTA buttons.',
  },
};

export const WithStatusChip: Story = {
  args: {
    title: 'Beta Project',
    breadcrumbLabel: 'Beta Project',
    description: 'This project is currently in beta testing.',
    statusChip: { label: 'Beta', color: 'warning', variant: 'filled' },
    ctaButtons: [
      { label: 'Try It', href: '#', variant: 'contained', icon: <OpenInNewIcon /> },
    ],
  },
};
