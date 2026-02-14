'use client';

import { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab, Stack } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import LayersIcon from '@mui/icons-material/Layers';
import BrushIcon from '@mui/icons-material/Brush';
import GroupsIcon from '@mui/icons-material/Groups';
import Tag from '@/components/ui/Tag';

const MotionBox = motion.create(Box);

interface SkillCategory {
  label: string;
  icon: React.ReactElement;
  description: string;
  tags: string[];
}

const skillCategories: SkillCategory[] = [
  {
    label: 'Frontend',
    icon: <CodeIcon />,
    description:
      'Building performant, accessible interfaces with modern React patterns. From component architecture to animation systems, I focus on experiences that feel right.',
    tags: [
      'React 19',
      'TypeScript',
      'Next.js 15',
      'MUI v7',
      'Framer Motion',
      'Redux',
      'JavaScript',
      'HTML/CSS',
    ],
  },
  {
    label: 'Backend',
    icon: <StorageIcon />,
    description:
      'Designing APIs and data systems that scale. Python and Django for rapid development, with real-time capabilities through WebSocket and SSE integrations.',
    tags: [
      'Python',
      'Django',
      'Node.js',
      'REST APIs',
      'PostgreSQL',
      'Celery',
      'WebSocket',
      'SSE',
    ],
  },
  {
    label: 'Full Stack',
    icon: <LayersIcon />,
    description:
      'End-to-end delivery from database schema to deploy pipeline. I think in systems, connecting frontend state to backend logic to infrastructure.',
    tags: [
      'CI/CD',
      'GitHub Actions',
      'Docker',
      'Vercel',
      'Supabase',
      'LangGraph',
      'RAG',
      'Langfuse',
    ],
  },
  {
    label: 'Design',
    icon: <BrushIcon />,
    description:
      'Two M.S. degrees across Computer Science and Human Factors. I bring UX research rigor to component libraries, design tokens, and documentation.',
    tags: [
      'Storybook',
      'Design Systems',
      'Prototyping',
      'Usability Testing',
      'A/B Testing',
      'Eye-tracking',
      'Figma',
    ],
  },
  {
    label: 'Leadership',
    icon: <GroupsIcon />,
    description:
      'Mentoring engineers, leading architecture decisions, and setting cross-team standards. The best code I write is the code I help others write.',
    tags: [
      'Code Review',
      'Mentorship',
      'Architecture',
      'Cross-team Standards',
      'Technical Writing',
      'Hiring',
    ],
  },
];

export default function SkillsShowcase() {
  const theme = useTheme();
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="md">
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '1.75rem', md: '2.25rem' },
              fontWeight: 600,
              mb: 4,
              textAlign: 'center',
            }}
          >
            What I Bring
          </Typography>

          <Box
            sx={{
              borderRadius: 3,
              border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
              backgroundColor:
                theme.palette.mode === 'dark'
                  ? alpha(theme.palette.background.paper, 0.4)
                  : theme.palette.background.paper,
              overflow: 'hidden',
            }}
          >
            <Tabs
              value={activeTab}
              onChange={(_, v) => setActiveTab(v)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                borderBottom: `1px solid ${theme.palette.divider}`,
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: { xs: '0.85rem', md: '0.95rem' },
                  minHeight: 56,
                  gap: 0.5,
                },
                '& .Mui-selected': {
                  color: 'secondary.main',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: 'secondary.main',
                },
              }}
            >
              {skillCategories.map((cat) => (
                <Tab key={cat.label} label={cat.label} icon={cat.icon} iconPosition="start" />
              ))}
            </Tabs>

            <Box sx={{ p: { xs: 3, md: 4 }, minHeight: { xs: 180, md: 200 } }}>
              <AnimatePresence mode="wait">
                <MotionBox
                  key={activeTab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                      mb: 3,
                      lineHeight: 1.8,
                      fontSize: { xs: '0.95rem', md: '1.05rem' },
                    }}
                  >
                    {skillCategories[activeTab].description}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    {skillCategories[activeTab].tags.map((tag) => (
                      <Tag key={tag} label={tag} size="small" variant="secondary" />
                    ))}
                  </Stack>
                </MotionBox>
              </AnimatePresence>
            </Box>
          </Box>
        </MotionBox>
      </Container>
    </Box>
  );
}
