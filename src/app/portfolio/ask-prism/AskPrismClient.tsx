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
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArticleIcon from '@mui/icons-material/Article';
import PsychologyIcon from '@mui/icons-material/Psychology';
import VerifiedIcon from '@mui/icons-material/Verified';
import StorageIcon from '@mui/icons-material/Storage';
import SearchIcon from '@mui/icons-material/Search';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ScannerIcon from '@mui/icons-material/Scanner';
import Tag from '@/components/ui/Tag';
import { BentoItem } from '@/components/ui/BentoBox';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import ProjectHeader from '@/components/portfolio/ProjectHeader';

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
      id: 'llms',
      label: 'LLMs',
      value: '3 Models',
      icon: <AutoAwesomeIcon sx={{ fontSize: 20 }} />,
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
      id: 'parsing',
      label: 'Parsing',
      value: 'Dual',
      icon: <ScannerIcon sx={{ fontSize: 20 }} />,
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
        <ProjectHeader
          title="Ask Prism"
          breadcrumbLabel="Ask Prism"
          description="Document Analytics Platform with visual citations—click a citation and the PDF scrolls to the exact passage, highlighted with bounding boxes."
          media={{
            type: 'custom',
            component: (
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Demo: AI-Powered Table Enrichment
                </Typography>
                <VideoPlayer
                  src="/images/portfolio/ask-prism/demo.mp4"
                  alt="Ask Prism table assistant demo showing AI-powered data enrichment"
                />
              </Box>
            ),
          }}
          ctaButtons={[
            {
              label: 'View on GitHub',
              href: 'https://github.com/Jabawack/ask-prism',
              variant: 'contained',
              icon: <GitHubIcon />,
              target: '_blank',
            },
            {
              label: 'ChainOfThought in Storybook',
              href: '/storybook/?path=/docs/components-chainofthought--docs',
              variant: 'outlined',
              icon: <OpenInNewIcon />,
              target: '_blank',
            },
            {
              label: 'Read Blog Post',
              href: '/blog/ask-prism-ai-components/',
              variant: 'outlined',
            },
          ]}
          bentoItems={bentoItems}
          bentoPrimaryColor={theme.palette.primary.light}
        />

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
