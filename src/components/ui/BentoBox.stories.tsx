import type { Meta, StoryObj } from '@storybook/react';
import { BentoBox, BentoItem } from './BentoBox';
import PeopleIcon from '@mui/icons-material/People';
import FilterListIcon from '@mui/icons-material/FilterList';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import StarIcon from '@mui/icons-material/Star';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import TranslateIcon from '@mui/icons-material/Translate';
import { Typography, Box } from '@mui/material';

const meta: Meta<typeof BentoBox> = {
  title: 'Components/BentoBox',
  component: BentoBox,
  parameters: {
    layout: 'padded',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'charcoal', value: '#1a1a2e' },
        { name: 'navy', value: '#0d1b2a' },
      ],
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BentoBox>;

// Color scheme presets
const colorSchemes = {
  cyan: { primary: '#4dd0e1', secondary: '#ffc107' },
  emerald: { primary: '#34d399', secondary: '#f472b6' },
  violet: { primary: '#a78bfa', secondary: '#fbbf24' },
  coral: { primary: '#fb7185', secondary: '#38bdf8' },
  gold: { primary: '#fbbf24', secondary: '#60a5fa' },
  mint: { primary: '#6ee7b7', secondary: '#f9a8d4' },
};

// Create items with dynamic colors
const createItems = (primaryColor: string): BentoItem[] => [
  {
    id: 'role',
    label: 'My Contribution',
    value: 'Led complete UI/UX redesign: filtering system, dark/light mode, design system, and streamlined booking flow',
    colSpan: 2,
    icon: <StarIcon sx={{ fontSize: 20 }} />,
  },
  { id: 'mentors', icon: <PeopleIcon sx={{ fontSize: 20 }} />, label: 'Mentors', value: '30+' },
  { id: 'spotlight', icon: <StarIcon sx={{ fontSize: 20 }} />, label: 'Daily Spotlight', value: 'Mentor of the Day' },
  { id: 'filters', icon: <FilterListIcon sx={{ fontSize: 20 }} />, label: 'Filter Options', value: '12 fields' },
  { id: 'booking', icon: <TouchAppIcon sx={{ fontSize: 20 }} />, label: 'Booking Steps', value: '1 click' },
  { id: 'bilingual', icon: <TranslateIcon sx={{ fontSize: 20 }} />, label: 'Languages', value: 'KR / EN' },
  {
    id: 'fair',
    icon: <ShuffleIcon sx={{ fontSize: 20 }} />,
    label: 'Fair Exposure',
    value: 'Random order ensures every mentor gets visibility',
    colSpan: 2,
  },
];

// Color Scheme Playground
const ColorSchemePlayground = ({
  colorScheme,
  variant,
  gap,
}: {
  colorScheme: keyof typeof colorSchemes;
  variant: 'default' | 'glass' | 'gradient';
  gap: number;
}) => {
  const colors = colorSchemes[colorScheme];

  return (
    <Box sx={{ p: 2, bgcolor: '#0a0a0a', minHeight: 400 }}>
      {/* Color Preview */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            bgcolor: colors.primary,
          }}
        />
        <Typography variant="caption" sx={{ color: colors.primary }}>
          Primary: {colors.primary}
        </Typography>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 1,
            bgcolor: colors.secondary,
          }}
        />
        <Typography variant="caption" sx={{ color: colors.secondary }}>
          Secondary: {colors.secondary}
        </Typography>
      </Box>

      {/* Bento Box with custom colors */}
      <BentoBox
        items={createItems(colors.primary)}
        columns={{ xs: 2, sm: 2, md: 3 }}
        gap={gap}
        variant={variant}
        primaryColor={colors.primary}
        secondaryColor={colors.secondary}
      />
    </Box>
  );
};

export const ColorPlayground = {
  render: (args: { colorScheme: keyof typeof colorSchemes; variant: 'default' | 'glass' | 'gradient'; gap: number }) => (
    <ColorSchemePlayground
      colorScheme={args.colorScheme}
      variant={args.variant}
      gap={args.gap}
    />
  ),
  args: {
    colorScheme: "emerald",
    variant: "gradient",
    gap: 3,
  },
  argTypes: {
    colorScheme: {
      control: 'select',
      options: ['cyan', 'emerald', 'violet', 'coral', 'gold', 'mint'],
      description: 'Color scheme preset',
    },
    variant: {
      control: 'select',
      options: ['default', 'glass', 'gradient'],
      description: 'Visual style variant',
    },
    gap: {
      control: { type: 'range', min: 1, max: 4, step: 0.5 },
      description: 'Gap between cards',
    },
  },
};

// Multi-accent approach (each BentoBox has its own colors)
const MultiAccentPlayground = ({
  primaryAccent,
  secondaryAccent,
  variant,
}: {
  primaryAccent: string;
  secondaryAccent: string;
  variant: 'default' | 'glass' | 'gradient';
}) => {
  return (
    <Box sx={{ p: 2, bgcolor: '#0a0a0a', minHeight: 400 }}>
      {/* Color Preview */}
      <Box sx={{ mb: 3, display: 'flex', gap: 2, alignItems: 'center' }}>
        <Box sx={{ width: 40, height: 40, borderRadius: 1, bgcolor: primaryAccent }} />
        <Typography variant="caption" sx={{ color: primaryAccent }}>
          Primary: {primaryAccent}
        </Typography>
        <Box sx={{ width: 40, height: 40, borderRadius: 1, bgcolor: secondaryAccent }} />
        <Typography variant="caption" sx={{ color: secondaryAccent }}>
          Secondary: {secondaryAccent}
        </Typography>
      </Box>

      {/* Bento Box with custom colors passed directly */}
      <BentoBox
        items={createItems(primaryAccent)}
        columns={{ xs: 2, sm: 2, md: 3 }}
        gap={2}
        variant={variant}
        primaryColor={primaryAccent}
        secondaryColor={secondaryAccent}
      />
    </Box>
  );
};

export const MultiAccent = {
  render: (args: { primaryAccent: string; secondaryAccent: string; variant: 'default' | 'glass' | 'gradient' }) => (
    <MultiAccentPlayground
      primaryAccent={args.primaryAccent}
      secondaryAccent={args.secondaryAccent}
      variant={args.variant}
    />
  ),
  args: {
    primaryAccent: '#4dd0e1',
    secondaryAccent: '#ffc107',
    variant: 'glass' as const,
  },
  argTypes: {
    primaryAccent: {
      control: 'color',
      description: 'Primary accent color (metrics, main values)',
    },
    secondaryAccent: {
      control: 'color',
      description: 'Secondary accent color (highlights, special items)',
    },
    variant: {
      control: 'select',
      options: ['default', 'glass', 'gradient'],
    },
  },
};

// Basic stories with custom colors
export const Default: Story = {
  args: {
    items: createItems('#4dd0e1'),
    columns: { xs: 2, sm: 3, md: 3 },
    gap: 2,
    variant: 'default',
    primaryColor: '#4dd0e1',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const GlassVariant: Story = {
  args: {
    items: createItems('#fb7185'),
    columns: { xs: 2, sm: 3, md: 3 },
    gap: 2,
    variant: 'glass',
    primaryColor: '#fb7185',
    secondaryColor: "undined"
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

export const GradientVariant: Story = {
  args: {
    items: createItems('#a78bfa'),
    columns: { xs: 2, sm: 3, md: 3 },
    gap: 2,
    variant: 'gradient',
    primaryColor: '#a78bfa',
  },
  parameters: {
    backgrounds: { default: 'dark' },
  },
};
