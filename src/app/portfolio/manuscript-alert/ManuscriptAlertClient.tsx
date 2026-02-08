'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  Breadcrumbs,
  Chip,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArticleIcon from '@mui/icons-material/Article';
import SearchIcon from '@mui/icons-material/Search';
import SpeedIcon from '@mui/icons-material/Speed';
import FilterListIcon from '@mui/icons-material/FilterList';
import StorageIcon from '@mui/icons-material/Storage';
import SyncIcon from '@mui/icons-material/Sync';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Tag from '@/components/ui/Tag';
import { BentoBox, BentoItem } from '@/components/ui/BentoBox';

export default function ManuscriptAlertClient() {
  const theme = useTheme();

  const bentoItems: BentoItem[] = [
    {
      id: 'overview',
      label: 'What It Does',
      value: 'Aggregates papers from PubMed, arXiv, bioRxiv, medRxiv with smart keyword matching and relevance scoring',
      colSpan: 2,
      icon: <ArticleIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: 'sources',
      label: 'Data Sources',
      value: '4 APIs',
      icon: <StorageIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: 'matching',
      label: 'Keyword Match',
      value: '2+ required',
      icon: <FilterListIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: 'relevance',
      label: 'Scoring',
      value: 'Smart ranking',
      icon: <SearchIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: 'stack',
      label: 'Current Stack',
      value: 'Python + Streamlit',
      colSpan: 2,
      icon: <SpeedIcon sx={{ fontSize: 20 }} />,
    },
  ];

  const techStack = [
    'Python',
    'Streamlit',
    'pandas',
    'requests',
    'BeautifulSoup',
    'feedparser',
    'concurrent.futures',
    'PubMed API',
    'arXiv API',
    'bioRxiv API',
  ];

  const v2Stack = [
    'React',
    'Django',
    'PostgreSQL',
    'RAG Pipeline',
    'Semantic Search',
  ];

  return (
    <Box component="main" sx={{ py: 6 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{ mb: 3 }}
        >
          <Link href="/portfolio/" style={{ color: 'inherit', textDecoration: 'none' }}>
            <Typography variant="body2" color="text.secondary" sx={{ '&:hover': { color: 'primary.main' } }}>
              Portfolio
            </Typography>
          </Link>
          <Typography variant="body2" color="text.primary">
            Manuscript Alert
          </Typography>
        </Breadcrumbs>

        {/* Header */}
        <Stack spacing={4} sx={{ mb: 6 }}>
          <Box>
            <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
              <Typography variant="h1" sx={{ fontWeight: 700 }}>
                Manuscript Alert
              </Typography>
              <Chip label="Contributor" size="small" color="primary" variant="outlined" />
            </Stack>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
              Research paper aggregator for Alzheimer&apos;s disease and neuroimaging researchers.
              Stay updated with the latest publications across multiple academic databases.
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Button
                variant="contained"
                startIcon={<GitHubIcon />}
                href="https://github.com/dknkim/Manuscript_alert"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Button>
            </Stack>
          </Box>

          {/* Hero Image */}
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/9',
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: alpha(theme.palette.background.paper, 0.5),
            }}
          >
            <Image
              src="/images/portfolio/manuscript-alert/preview.jpg"
              alt="Manuscript Alert System showing paper search results with relevance scoring"
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </Box>

          {/* Bento Box Metrics */}
          <BentoBox
            items={bentoItems}
            columns={{ xs: 2, sm: 3, md: 3 }}
            gap={2}
            variant="glass"
            primaryColor={theme.palette.primary.light}
          />
        </Stack>

        {/* Architecture Diagram */}
        <Card sx={{ mb: 6, bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Architecture
            </Typography>
            <Box
              component="pre"
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.8rem',
                lineHeight: 1.6,
                overflow: 'auto',
                color: 'text.secondary',
                p: 2,
                bgcolor: alpha(theme.palette.common.black, 0.2),
                borderRadius: 1,
              }}
            >
{`┌─────────────────────────────────────────────────────────────────┐
│                      STREAMLIT APP                              │
│  ┌───────────────┐  ┌───────────────┐  ┌──────────────────┐    │
│  │   Papers Tab  │  │  Models Tab   │  │   Settings Tab   │    │
│  │   (Search)    │  │  (Future RAG) │  │   (Keywords)     │    │
│  └───────────────┘  └───────────────┘  └──────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  PubMed Fetcher │  │  arXiv Fetcher  │  │ bioRxiv Fetcher │
│                 │  │                 │  │ (+ medRxiv)     │
│  NCBI E-utils   │  │  arXiv API      │  │  RSS Feeds      │
└─────────────────┘  └─────────────────┘  └─────────────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              ▼
                    ┌─────────────────┐
                    │ Keyword Matcher │
                    │                 │
                    │ - 2+ match rule │
                    │ - Relevance     │
                    │   scoring       │
                    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Ranked Papers  │
                    │  (Streamlit UI) │
                    └─────────────────┘`}
            </Box>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Stack spacing={4} sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Key Features
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {/* Multi-Source Fetching */}
            <Card sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <SyncIcon color="primary" />
                  <Typography variant="h6">Multi-Source Fetching</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Concurrent API calls to PubMed, arXiv, bioRxiv, and medRxiv for comprehensive coverage.
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  <strong>Performance:</strong> ThreadPoolExecutor enables parallel fetching, reducing wait time from minutes to seconds.
                </Typography>
              </CardContent>
            </Card>

            {/* Smart Keyword Matching */}
            <Card sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <FilterListIcon color="primary" />
                  <Typography variant="h6">Smart Keyword Matching</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Papers must match at least 2 keywords to be displayed, reducing noise significantly.
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  <strong>Algorithm:</strong> Compiled regex patterns for case-insensitive matching with relevance scoring based on match count.
                </Typography>
              </CardContent>
            </Card>

            {/* Relevance Scoring */}
            <Card sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <SearchIcon color="primary" />
                  <Typography variant="h6">Relevance Scoring</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Papers ranked by relevance to research interests, with scores visible in the UI.
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  <strong>Factors:</strong> Keyword frequency, journal quality, recency, and title/abstract weight.
                </Typography>
              </CardContent>
            </Card>

            {/* Journal Quality Filter */}
            <Card sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <ArticleIcon color="primary" />
                  <Typography variant="h6">Journal Quality Filter</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Option to filter for high-impact journals only (Nature, JAMA, Brain, Radiology, etc.).
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  <strong>Use case:</strong> When you want only peer-reviewed, high-quality publications.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Stack>

        {/* v2 Roadmap */}
        <Card sx={{ mb: 6, bgcolor: alpha(theme.palette.warning.main, 0.1), border: `1px solid ${alpha(theme.palette.warning.main, 0.3)}` }}>
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <RocketLaunchIcon color="warning" />
              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                v2 Roadmap
              </Typography>
              <Chip label="Planning" size="small" color="warning" />
            </Box>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Planning a complete rewrite with modern web stack and AI capabilities:
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'warning.main' }}>
                  React + Django Architecture
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Replace Streamlit with React frontend and Django REST backend for better UX, scalability, and deployment flexibility.
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'warning.main' }}>
                  RAG Integration
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Semantic similarity scoring using embeddings—move beyond keyword matching to intelligent manuscript relevance assessment.
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'warning.main' }}>
                  Project-Specific Knowledge Bases
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Enable researchers to create domain-specific knowledge bases that improve over time with accumulated papers.
                </Typography>
              </Box>
            </Stack>
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Planned Tech Stack:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                {v2Stack.map((tech) => (
                  <Tag key={tech} label={tech} />
                ))}
              </Stack>
            </Box>
          </CardContent>
        </Card>

        {/* Current Tech Stack */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Current Tech Stack (v1)
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {techStack.map((tech) => (
              <Tag key={tech} label={tech} />
            ))}
          </Stack>
        </Box>

        {/* Learn More Footer */}
        <Card sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1) }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Learn More
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                startIcon={<GitHubIcon />}
                href="https://github.com/dknkim/Manuscript_alert"
                target="_blank"
                rel="noopener noreferrer"
              >
                Source Code
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}
