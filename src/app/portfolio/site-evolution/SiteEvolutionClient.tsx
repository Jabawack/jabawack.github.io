'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Box,
  Container,
  Typography,
  Stack,
  Tabs,
  Tab,
  Breadcrumbs,
  LinearProgress,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import CodeIcon from '@mui/icons-material/Code';
import WidgetsIcon from '@mui/icons-material/Widgets';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BuildIcon from '@mui/icons-material/Build';
import { getMilestoneStats, getMilestoneProgress } from '@/data/chapters';
import SiteEvolutionJourney from '@/components/SiteEvolutionJourney';
import SiteEvolutionRoadmap from '@/components/SiteEvolutionRoadmap';
import SiteEvolutionChangelog from '@/components/SiteEvolutionChangelog';
import StorybookEmbed from '@/components/StorybookEmbed';
import { getProgressGradient } from '@/theme';

const TAB_MAP: Record<string, number> = {
  journey: 0,
  roadmap: 1,
  changelog: 2,
  components: 3,
};

const TAB_NAMES = ['journey', 'roadmap', 'changelog', 'components'];

export default function SiteEvolutionClient() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get('tab');
  const highlightParam = searchParams.get('highlight');
  const initialTab = tabParam && TAB_MAP[tabParam] !== undefined ? TAB_MAP[tabParam] : 0;

  const [activeTab, setActiveTab] = useState(initialTab);
  const [highlightVersion, setHighlightVersion] = useState<string | null>(highlightParam);
  const theme = useTheme();

  // Update tab and highlight when URL params change
  useEffect(() => {
    if (tabParam && TAB_MAP[tabParam] !== undefined) {
      const newTab = TAB_MAP[tabParam];
      setActiveTab(newTab);
      // Reset scroll for non-changelog tabs (changelog handles its own scroll)
      // Skip reset if we have a highlight param (let Journey handle scrolling)
      if (newTab !== 2 && !highlightParam) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    }
    // Update highlight version when param changes
    setHighlightVersion(highlightParam);
  }, [tabParam, highlightParam]);

  const { total: totalMilestones, completed: completedMilestones } = getMilestoneStats();
  const milestoneProgressPercent = getMilestoneProgress();

  return (
    <Box component="main">
      {/* Page Header Section */}
      <Box sx={{ pt: 4, pb: 3, backgroundColor: 'background.default' }}>
        <Container maxWidth="lg">
          <Stack spacing={3}>
            {/* Breadcrumbs */}
            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" sx={{ color: 'text.secondary' }} />}
              sx={{ '& .MuiBreadcrumbs-li': { color: 'text.secondary' } }}
            >
              <Link href="/portfolio/" style={{ color: 'inherit', textDecoration: 'none' }}>
                <Typography
                  variant="body2"
                  sx={{ '&:hover': { color: 'secondary.main' }, transition: 'color 0.2s' }}
                >
                  Portfolio
                </Typography>
              </Link>
              <Typography variant="body2" color="text.primary">
                Site Evolution
              </Typography>
            </Breadcrumbs>

            {/* Page Title */}
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                <BuildIcon sx={{ color: 'secondary.main', fontSize: 32 }} />
                <Typography variant="h3" sx={{ fontWeight: 700 }}>
                  Site Evolution
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700 }}>
                From 2017 jQuery to Next.js 15 — the complete rebuild of this portfolio.
                Explore the journey, UX decisions, and technical choices.
              </Typography>
            </Box>

            {/* Progress Bar */}
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                <Typography variant="body2" color="text.secondary">
                  Overall Progress
                </Typography>
                <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 600 }}>
                  {milestoneProgressPercent}% ({completedMilestones} of {totalMilestones} milestones)
                </Typography>
              </Box>
              <LinearProgress
                variant="determinate"
                value={milestoneProgressPercent}
                sx={{
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: theme.palette.divider,
                  '& .MuiLinearProgress-bar': {
                    borderRadius: 4,
                    background: getProgressGradient(theme),
                  },
                }}
              />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Sticky Tab Navigation */}
      <Box sx={{
        position: 'sticky',
        top: 64,
        zIndex: 10,
        backgroundColor: 'background.default',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}>
        <Container maxWidth="lg">
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => {
              setActiveTab(newValue);
              // Update URL with tab param (preserves on reload)
              const newUrl = `/portfolio/site-evolution/?tab=${TAB_NAMES[newValue]}`;
              window.history.replaceState(null, '', newUrl);
              // Reset scroll for non-changelog tabs (changelog handles its own scroll)
              if (newValue !== 2) {
                window.scrollTo({ top: 0, behavior: 'instant' });
              }
            }}
            sx={{
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                minHeight: 48,
              },
              '& .Mui-selected': {
                color: 'secondary.main',
              },
              '& .MuiTabs-indicator': {
                backgroundColor: 'secondary.main',
              },
            }}
          >
            <Tab
              icon={<AutoStoriesIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label="Journey"
            />
            <Tab
              icon={<RocketLaunchIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label="Roadmap"
            />
            <Tab
              icon={<CodeIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label="Changelog"
            />
            <Tab
              icon={<WidgetsIcon sx={{ fontSize: 18 }} />}
              iconPosition="start"
              label="Components"
            />
          </Tabs>
        </Container>
      </Box>

      {/* Tab Content */}
      {activeTab === 0 && <SiteEvolutionJourney showHero={false} highlightVersion={highlightVersion} />}
      {activeTab === 1 && <SiteEvolutionRoadmap />}
      {activeTab === 2 && <SiteEvolutionChangelog highlightVersion={highlightVersion} />}
      {activeTab === 3 && (
        <Box sx={{ px: 2 }}>
          <StorybookEmbed height="calc(100vh - 64px - 48px - 200px)" />
        </Box>
      )}
    </Box>
  );
}
