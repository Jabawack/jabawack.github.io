import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { StatCard } from './StatCard';
import { Button, Grid, Stack } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

const meta: Meta<typeof StatCard> = {
    title: 'Components/StatCard',
    component: StatCard,
    parameters: {
        docs: {
            description: {
                component:
                    'A card component displaying key statistics with optional action buttons. Useful for profile summaries, dashboards, and highlight sections.',
            },
        },
    },
    argTypes: {
        stats: {
            description: 'Array of stat items with value, label, and optional color',
        },
        children: {
            description: 'Optional content below the stats (e.g., action buttons)',
        },
    },
};

export default meta;
type Story = StoryObj<typeof StatCard>;

export const Default: Story = {
    args: {
        stats: [
            { value: '20+', label: 'Years', color: 'primary.light' },
            { value: 2, label: 'M.S. Degrees', color: 'secondary.light' },
            { value: 5, label: 'Patents', color: 'success.light' },
        ],
    },
};

export const TwoStats: Story = {
    args: {
        stats: [
            { value: 150, label: 'Projects', color: 'primary.light' },
            { value: '99%', label: 'Satisfaction', color: 'success.light' },
        ],
    },
};

export const FourStats: Story = {
    args: {
        stats: [
            { value: '10K+', label: 'Users', color: 'primary.light' },
            { value: 50, label: 'Projects', color: 'secondary.light' },
            { value: '99.9%', label: 'Uptime', color: 'success.light' },
            { value: 24, label: 'Countries', color: 'warning.light' },
        ],
    },
};

export const WithActions: Story = {
    render: () => (
        <StatCard
            stats={[
                { value: '20+', label: 'Years', color: 'primary.light' },
                { value: 2, label: 'M.S. Degrees', color: 'secondary.light' },
                { value: 5, label: 'Patents', color: 'success.light' },
            ]}
        >
            <Grid container spacing={2}>
                <Grid size={4}>
                    <Button
                        variant="text"
                        size="small"
                        fullWidth
                        startIcon={<LinkedInIcon />}
                        href="https://linkedin.com/in/tkhfes"
                        target="_blank"
                        sx={{ color: 'text.primary' }}
                    >
                        LinkedIn
                    </Button>
                </Grid>
                <Grid size={4}>
                    <Button
                        variant="text"
                        size="small"
                        fullWidth
                        startIcon={<GitHubIcon />}
                        href="https://github.com/jabawack"
                        target="_blank"
                        sx={{ color: 'text.primary' }}
                    >
                        GitHub
                    </Button>
                </Grid>
                <Grid size={4}>
                    <Button
                        variant="text"
                        size="small"
                        fullWidth
                        startIcon={<EmailIcon />}
                        href="mailto:tk.hfes@gmail.com"
                        sx={{ color: 'text.primary' }}
                    >
                        Email
                    </Button>
                </Grid>
            </Grid>
        </StatCard>
    ),
    parameters: {
        docs: {
            description: {
                story: 'StatCard with action buttons for social links or CTAs.',
            },
        },
    },
};

export const NoColors: Story = {
    args: {
        stats: [
            { value: 42, label: 'Projects' },
            { value: 128, label: 'Commits' },
            { value: 15, label: 'Contributors' },
        ],
    },
    parameters: {
        docs: {
            description: {
                story: 'Stats without custom colors use default text.primary.',
            },
        },
    },
};

export const AboutPageExample: Story = {
    render: () => (
        <Stack sx={{ maxWidth: 400 }}>
            <StatCard
                stats={[
                    { value: '20+', label: 'Years', color: 'primary.light' },
                    { value: 2, label: 'M.S. Degrees', color: 'secondary.light' },
                    { value: 5, label: 'Patents', color: 'success.light' },
                ]}
            >
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <Button
                            variant="text"
                            size="small"
                            fullWidth
                            startIcon={<LinkedInIcon />}
                            sx={{ color: 'text.primary' }}
                        >
                            LinkedIn
                        </Button>
                    </Grid>
                    <Grid size={4}>
                        <Button
                            variant="text"
                            size="small"
                            fullWidth
                            startIcon={<GitHubIcon />}
                            sx={{ color: 'text.primary' }}
                        >
                            GitHub
                        </Button>
                    </Grid>
                    <Grid size={4}>
                        <Button
                            variant="text"
                            size="small"
                            fullWidth
                            startIcon={<EmailIcon />}
                            sx={{ color: 'text.primary' }}
                        >
                            Email
                        </Button>
                    </Grid>
                </Grid>
            </StatCard>
        </Stack>
    ),
    parameters: {
        docs: {
            description: {
                story: 'Example usage in the About page context.',
            },
        },
    },
};
