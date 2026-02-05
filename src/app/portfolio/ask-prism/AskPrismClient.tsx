'use client';

import Link from 'next/link';
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
import PsychologyIcon from '@mui/icons-material/Psychology';
import VerifiedIcon from '@mui/icons-material/Verified';
import StorageIcon from '@mui/icons-material/Storage';
import SearchIcon from '@mui/icons-material/Search';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import Tag from '@/components/ui/Tag';
import { BentoBox, BentoItem } from '@/components/ui/BentoBox';
import { VideoPlayer } from '@/components/ui/VideoPlayer';

export default function AskPrismClient() {
  const theme = useTheme();

  const bentoItems: BentoItem[] = [
    {
      id: 'overview',
      label: 'What It Does',
      value: 'Upload PDFs, ask questions, get answers with clickable citations that highlight exact source text',
      colSpan: 2,
      icon: <ArticleIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: 'ai-elements',
      label: 'AI Components',
      value: '40+',
      icon: <PsychologyIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: 'verification',
      label: 'Verification',
      value: 'Multi-model',
      icon: <VerifiedIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: 'accuracy',
      label: 'Accuracy',
      value: '~96%',
      icon: <FactCheckIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: 'stack',
      label: 'Key Stack',
      value: 'LangGraph + Supabase + pgvector',
      colSpan: 2,
      icon: <StorageIcon sx={{ fontSize: 20 }} />,
    },
  ];

  const techStack = [
    'Next.js 15',
    'TypeScript',
    'LangGraph',
    'Supabase',
    'pgvector',
    'GPT-5 Mini',
    'Claude Haiku 4.5',
    'Flowbite',
    'Tailwind CSS',
    'LangSmith',
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
            Ask Prism
          </Typography>
        </Breadcrumbs>

        {/* Header */}
        <Stack spacing={4} sx={{ mb: 6 }}>
          <Box>
            <Typography variant="h1" sx={{ fontWeight: 700, mb: 2 }}>
              Ask Prism
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
              Document Analytics Platform with visual citations—click a citation and the PDF scrolls to the exact passage, highlighted with bounding boxes.
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Button
                variant="contained"
                startIcon={<GitHubIcon />}
                href="https://github.com/Jabawack/ask-prism"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Button>
              <Button
                variant="outlined"
                startIcon={<OpenInNewIcon />}
                href="/storybook/?path=/docs/components-chainofthought--docs"
                target="_blank"
              >
                ChainOfThought in Storybook
              </Button>
              <Button
                variant="outlined"
                href="/blog/ask-prism-ai-components/"
              >
                Read Blog Post
              </Button>
            </Stack>
          </Box>

          {/* Demo Video */}
          <Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Demo: AI-Powered Table Enrichment
            </Typography>
            <VideoPlayer
              src="/images/portfolio/ask-prism/demo.mp4"
              alt="Ask Prism table assistant demo showing AI-powered data enrichment"
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
│                         VERCEL                                  │
│  ┌───────────────┐  ┌───────────────┐  ┌──────────────────┐    │
│  │   Next.js     │  │  API Routes   │  │   Upstash Redis  │    │
│  │   Frontend    │  │  (SSE stream) │  │   (Query Cache)  │    │
│  └───────────────┘  └───────────────┘  └──────────────────┘    │
└─────────────────────────────────────────────────────────────────┘
         │                           │
         ▼                           ▼
┌─────────────────┐       ┌─────────────────────────┐
│    LangGraph    │       │       Supabase          │
│   (Q&A Agent)   │       │  PostgreSQL + pgvector  │
│                 │       │                         │
│  routeQuery     │       │  - documents            │
│      ↓          │◄─────►│  - chunks (embeddings)  │
│  retrieve       │       │  - conversations        │
│      ↓          │       └─────────────────────────┘
│  verify         │
│      ↓          │       ┌─────────────────┐
│  generate       │──────►│   LangSmith     │
└─────────────────┘       │   (Tracing)     │
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
            {/* Visual Citations */}
            <Card sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <SearchIcon color="primary" />
                  <Typography variant="h6">Visual Citations</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Click any citation to scroll the PDF to the exact location with bounding box highlighting.
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  <strong>How:</strong> PDF parsing extracts text with position data (bounding boxes),
                  chunks preserve bbox coordinates, and react-pdf-highlighter-extended renders highlights.
                </Typography>
              </CardContent>
            </Card>

            {/* Multi-Model Verification */}
            <Card sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <VerifiedIcon color="primary" />
                  <Typography variant="h6">Multi-Model Verification</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Dual LLM verification catches hallucinations before users see them.
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  <strong>Pipeline:</strong> GPT-5 Mini (primary) → Claude Haiku 4.5 (verification) → o3 (reconciliation if disagreement)
                </Typography>
              </CardContent>
            </Card>

            {/* Chain of Thought UI */}
            <Card sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <PsychologyIcon color="primary" />
                  <Typography variant="h6">Chain of Thought UI</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Transparent AI reasoning with collapsible step-by-step visualization.
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  <strong>Ported to:</strong>{' '}
                  <Link href="/storybook/?path=/docs/components-chainofthought--docs" style={{ color: theme.palette.primary.main }}>
                    Storybook Design System
                  </Link>
                </Typography>
              </CardContent>
            </Card>

            {/* AI Elements Library */}
            <Card sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <AutoFixHighIcon color="primary" />
                  <Typography variant="h6">AI Elements Library</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  40+ reusable components for building AI interfaces.
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  <strong>Categories:</strong> Reasoning, Messages, Verification, Citations, Processing, Code
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Stack>

        {/* Design Decisions */}
        <Card sx={{ mb: 6, bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
              Key Design Decisions
            </Typography>
            <Stack spacing={3}>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  Why dual parsers?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  pdfjs-dist is free but struggles with complex layouts. Reducto handles tables and scans but costs credits. Users choose based on document complexity.
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  Why multi-model verification?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Single LLMs can hallucinate. Using different models (GPT-5 Mini + Claude Haiku) catches errors. Research shows dual verification achieves ~96% accuracy vs ~85% baseline.
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: 'primary.main' }}>
                  Why bounding boxes?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Page-level citations aren't precise enough. Bounding box extraction enables exact text highlighting, building trust and enabling quick verification.
                </Typography>
              </Box>
            </Stack>
          </CardContent>
        </Card>

        {/* Tech Stack */}
        <Box sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
            Tech Stack
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
                startIcon={<OpenInNewIcon />}
                href="/storybook/?path=/story/components-chainofthought--processing-animation"
                target="_blank"
              >
                Interactive Demo
              </Button>
              <Button
                variant="outlined"
                href="/blog/ask-prism-ai-components/"
              >
                Read the Full Story
              </Button>
              <Button
                variant="outlined"
                startIcon={<GitHubIcon />}
                href="https://github.com/Jabawack/ask-prism"
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
