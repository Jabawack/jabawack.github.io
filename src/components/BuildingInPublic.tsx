'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  LinearProgress,
  Card,
  CardContent,
  Chip,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ToggleButton,
  ToggleButtonGroup,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BuildIcon from '@mui/icons-material/Build';
import ScheduleIcon from '@mui/icons-material/Schedule';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Link from 'next/link';

interface Chapter {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'planned';
  versions: string;
  story: string[];
  milestones: {
    version: string;
    title: string;
    status: 'completed' | 'in-progress' | 'planned';
  }[];
}

const chapters: Chapter[] = [
  {
    id: 'chapter-1',
    title: 'Chapter 1: Why Rebuild?',
    status: 'completed',
    versions: 'v2.0.0 → v2.1.0',
    story: [
      'The 2017 portfolio served its purpose but accumulated significant UX debt. Built with jQuery and Materialize CSS, it suffered from high cognitive load—visitors had to mentally parse inconsistent navigation patterns across pages. The lack of a unified component system meant each section felt like a different site.',
      'Poor information architecture created friction: projects were buried three clicks deep with no clear information scent. Users couldn\'t predict what they\'d find before clicking, violating the principle of recognition over recall.',
      'Rather than patch the existing system, a ground-up rebuild allowed for consistent mental models through MUI\'s design system, reduced interaction cost via intuitive URL structures, and progressive disclosure that respects users\' limited working memory.',
      'The rebuild reduced time-to-content from 3+ clicks to 1. Static export ensures sub-second load times, minimizing perceived wait time and respecting users\' attention.',
    ],
    milestones: [
      { version: 'v2.0.0', title: 'Foundation (Next.js, MUI, TypeScript)', status: 'completed' },
      { version: 'v2.0.1', title: 'Navigation (Responsive header, mobile drawer)', status: 'completed' },
      { version: 'v2.0.2', title: 'SEO (Sitemap, Open Graph, metadata)', status: 'completed' },
      { version: 'v2.1.0', title: 'Architecture (Server/Client component pattern)', status: 'completed' },
    ],
  },
  {
    id: 'chapter-2',
    title: 'Chapter 2: Polish & UX',
    status: 'in-progress',
    versions: 'v2.2.0 → v2.6.0',
    story: [
      'With the structural foundation complete, focus shifts to microinteractions and feedback loops that build user confidence. Every enhancement follows a single question: "Does this reduce friction or add it?"',
      'SpeedDial for contact applies Fitts\'s Law—frequently used actions should be easily reachable. A floating action button reduces motor effort compared to scrolling to the footer.',
      'Autocomplete filtering leverages recognition over recall (Nielsen\'s 6th heuristic). Users see available tags rather than guessing search terms, reducing cognitive effort during exploration.',
      'Stepper components for case studies guide users through a narrative arc with clear progress indicators, reducing uncertainty about content length and improving completion rates.',
    ],
    milestones: [
      { version: 'v2.2.0', title: 'Building in Public (This case study)', status: 'completed' },
      { version: 'v2.3.0', title: 'Theme System (Light/dark mode)', status: 'planned' },
      { version: 'v2.4.0', title: 'Contact & Engagement (SpeedDial, analytics)', status: 'planned' },
      { version: 'v2.5.0', title: 'Content Depth (Case studies, Stepper/Tabs)', status: 'planned' },
      { version: 'v2.6.0', title: 'Discoverability (Autocomplete filtering)', status: 'planned' },
    ],
  },
  {
    id: 'chapter-3',
    title: 'Chapter 3: Content Platform',
    status: 'planned',
    versions: 'v3.0.0',
    story: [
      'The final transformation: from static portfolio to living knowledge base. Blog content creates multiple entry points via search engines, building domain authority and demonstrating ongoing thought leadership.',
      'MDX enables embedded interactivity—code examples users can run, diagrams they can explore—moving beyond passive reading toward active learning. This supports varied learning styles and increases engagement.',
      'RSS feeds serve power users who prefer to consume content through their existing workflows, respecting user autonomy and reducing platform lock-in.',
    ],
    milestones: [
      { version: 'v3.0.0', title: 'MDX Blog (Articles, RSS feed)', status: 'planned' },
    ],
  },
];

const statusConfig = {
  completed: { icon: CheckCircleIcon, color: '#4caf50', label: 'Done' },
  'in-progress': { icon: BuildIcon, color: '#00f7ff', label: 'In Progress' },
  planned: { icon: ScheduleIcon, color: '#666666', label: 'Planned' },
};

const beforeAfterData = {
  before: {
    label: '2017 (v1)',
    items: [
      { aspect: 'Framework', value: 'jQuery + Materialize CSS' },
      { aspect: 'Type Safety', value: 'None' },
      { aspect: 'Navigation', value: 'Multi-page, inconsistent' },
      { aspect: 'Projects', value: 'Static grid, no filtering' },
      { aspect: 'Mobile', value: 'Responsive but clunky' },
      { aspect: 'Deployment', value: 'Manual FTP uploads' },
      { aspect: 'Load Time', value: '~3 seconds' },
    ],
  },
  after: {
    label: '2026 (v2)',
    items: [
      { aspect: 'Framework', value: 'Next.js 15 + MUI 7' },
      { aspect: 'Type Safety', value: 'Full TypeScript' },
      { aspect: 'Navigation', value: 'SPA-like, persistent header' },
      { aspect: 'Projects', value: 'Categorized, soon filterable' },
      { aspect: 'Mobile', value: 'Mobile-first, drawer nav' },
      { aspect: 'Deployment', value: 'Git push → auto deploy' },
      { aspect: 'Load Time', value: '<1 second (static)' },
    ],
  },
};

export default function BuildingInPublic() {
  const [expanded, setExpanded] = useState<string | false>('chapter-1');
  const [beforeAfterView, setBeforeAfterView] = useState<'before' | 'after'>('after');

  // Calculate progress
  const allMilestones = chapters.flatMap((c) => c.milestones);
  const completedMilestones = allMilestones.filter((m) => m.status === 'completed').length;
  const progressPercent = Math.round((completedMilestones / allMilestones.length) * 100);

  const handleAccordionChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box sx={{ py: 10, backgroundColor: 'background.default' }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Hero Section */}
          <Card
            sx={{
              background: 'linear-gradient(135deg, rgba(32, 71, 244, 0.1) 0%, rgba(0, 247, 255, 0.05) 100%)',
              border: '1px solid rgba(0, 247, 255, 0.2)',
            }}
          >
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <BuildIcon sx={{ color: 'secondary.main' }} />
                  <Typography variant="h4" sx={{ fontWeight: 600 }}>
                    Building TK Portfolio v2
                  </Typography>
                </Box>

                <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700 }}>
                  A live case study: rebuilding my 2017 jQuery portfolio with Next.js 15, React 19, and MUI 7.
                  Follow along as I ship new features and document my UX decisions.
                </Typography>

                {/* Progress Bar */}
                <Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Overall Progress
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'secondary.main', fontWeight: 600 }}>
                      {progressPercent}% ({completedMilestones} of {allMilestones.length} milestones)
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={progressPercent}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      '& .MuiLinearProgress-bar': {
                        borderRadius: 5,
                        background: 'linear-gradient(90deg, #2047f4 0%, #00f7ff 100%)',
                      },
                    }}
                  />
                </Box>

                {/* Status Legend */}
                <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <Chip
                      key={key}
                      icon={<config.icon sx={{ fontSize: 16 }} />}
                      label={config.label}
                      size="small"
                      sx={{
                        backgroundColor: `${config.color}20`,
                        color: config.color,
                        '& .MuiChip-icon': { color: config.color },
                      }}
                    />
                  ))}
                </Stack>
              </Stack>
            </CardContent>
          </Card>

          {/* Chapters */}
          {chapters.map((chapter) => {
            const StatusIcon = statusConfig[chapter.status].icon;
            const statusColor = statusConfig[chapter.status].color;

            return (
              <Accordion
                key={chapter.id}
                expanded={expanded === chapter.id}
                onChange={handleAccordionChange(chapter.id)}
                sx={{
                  backgroundColor: 'background.paper',
                  '&:before': { display: 'none' },
                  border: expanded === chapter.id ? `1px solid ${statusColor}40` : '1px solid transparent',
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    '& .MuiAccordionSummary-content': {
                      alignItems: 'center',
                      gap: 2,
                    },
                  }}
                >
                  <StatusIcon sx={{ color: statusColor }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6">{chapter.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {chapter.versions}
                    </Typography>
                  </Box>
                  <Chip
                    label={statusConfig[chapter.status].label}
                    size="small"
                    sx={{
                      backgroundColor: `${statusColor}20`,
                      color: statusColor,
                    }}
                  />
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={3}>
                    {/* Story */}
                    <Box>
                      {chapter.story.map((paragraph, idx) => (
                        <Typography
                          key={idx}
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2, lineHeight: 1.8 }}
                        >
                          {paragraph}
                        </Typography>
                      ))}
                    </Box>

                    <Divider />

                    {/* Milestones */}
                    <Box>
                      <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                        Milestones
                      </Typography>
                      <List dense disablePadding>
                        {chapter.milestones.map((milestone) => {
                          const MilestoneIcon = statusConfig[milestone.status].icon;
                          const milestoneColor = statusConfig[milestone.status].color;
                          return (
                            <ListItem key={milestone.version} disableGutters sx={{ py: 0.5 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                <MilestoneIcon sx={{ fontSize: 18, color: milestoneColor }} />
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Typography variant="body2">
                                    <Box component="span" sx={{ color: 'secondary.main', fontFamily: 'monospace', mr: 1 }}>
                                      {milestone.version}
                                    </Box>
                                    {milestone.title}
                                  </Typography>
                                }
                              />
                            </ListItem>
                          );
                        })}
                      </List>
                    </Box>

                    {/* Before/After for Chapter 1 */}
                    {chapter.id === 'chapter-1' && (
                      <>
                        <Divider />
                        <Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                              Before / After Comparison
                            </Typography>
                            <ToggleButtonGroup
                              value={beforeAfterView}
                              exclusive
                              onChange={(_, value) => value && setBeforeAfterView(value)}
                              size="small"
                            >
                              <ToggleButton value="before" sx={{ px: 2 }}>
                                2017
                              </ToggleButton>
                              <ToggleButton value="after" sx={{ px: 2 }}>
                                2026
                              </ToggleButton>
                            </ToggleButtonGroup>
                          </Box>

                          <Card
                            sx={{
                              backgroundColor: beforeAfterView === 'after' ? 'rgba(0, 247, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)',
                              border: beforeAfterView === 'after' ? '1px solid rgba(0, 247, 255, 0.2)' : '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                          >
                            <CardContent>
                              <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 600 }}>
                                {beforeAfterData[beforeAfterView].label}
                              </Typography>
                              <Stack spacing={1}>
                                {beforeAfterData[beforeAfterView].items.map((item) => (
                                  <Box
                                    key={item.aspect}
                                    sx={{
                                      display: 'flex',
                                      justifyContent: 'space-between',
                                      py: 0.5,
                                      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                                    }}
                                  >
                                    <Typography variant="body2" color="text.secondary">
                                      {item.aspect}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      sx={{
                                        color: beforeAfterView === 'after' ? 'secondary.main' : 'text.primary',
                                        fontWeight: beforeAfterView === 'after' ? 500 : 400,
                                      }}
                                    >
                                      {item.value}
                                    </Typography>
                                  </Box>
                                ))}
                              </Stack>
                            </CardContent>
                          </Card>
                        </Box>
                      </>
                    )}
                  </Stack>
                </AccordionDetails>
              </Accordion>
            );
          })}

          {/* Link to detailed timeline */}
          <Box sx={{ textAlign: 'center', pt: 2 }}>
            <Typography
              component={Link}
              href="/portfolio/homepage/"
              sx={{
                color: 'secondary.main',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              View detailed timeline
              <ArrowForwardIcon sx={{ fontSize: 18 }} />
            </Typography>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
