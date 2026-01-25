'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Breadcrumbs,
  useMediaQuery,
  Divider,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import CloseIcon from '@mui/icons-material/Close';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import FilterListIcon from '@mui/icons-material/FilterList';
import TouchAppIcon from '@mui/icons-material/TouchApp';
import StarIcon from '@mui/icons-material/Star';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import TranslateIcon from '@mui/icons-material/Translate';
import Tag from '@/components/Tag';
import { BentoBox } from '@/components/BentoBox';

interface Version {
  version: string;
  title: string;
  date: string;
  myRole?: string;  // Highlight personal contribution
  problem: string;
  painPoints: string[];
  solution: string;
  keyDecisions: { decision: string; why: string }[];
  impact: string;
  notionLimitations?: string[];  // Platform limitations (for v1)
  learning: string;
  tech: string[];
  screenshot: string;
  link?: string;
  status: 'current' | 'archived';
}

const versions: Version[] = [
  {
    version: 'Current',
    title: 'Platform Redesign',
    date: '2026 - Ongoing',
    myRole: 'Led complete UI/UX redesign: filtering system, dark/light mode, design system, and streamlined booking flow',
    problem: 'With 30+ mentors across diverse fields, users struggled to find the right match. No search, no filters - just endless scrolling.',
    painPoints: [
      'Mentee 1: "I can\'t filter by expertise or location. I have to scroll through everyone."',
      'Mentee 2: "Every mentor has a different profile style. Is this even a real platform?"',
      'Mentor 1: "I want to update my availability but I can\'t edit my own page."',
      'Admin 1: "There\'s no way to announce updates. I have to message everyone individually."',
    ],
    solution: 'A complete UX overhaul focused on discoverability and frictionless booking. Mentors manage their own profiles, keeping information fresh without admin overhead.',
    keyDecisions: [
      {
        decision: 'Self-hosted infrastructure',
        why: 'Full control over data, no vendor lock-in, zero monthly hosting costs. Sustainability matters for a nonprofit.',
      },
      {
        decision: 'Decentralized content ownership',
        why: 'Mentors manage their own profiles. No admin bottleneck, always up-to-date availability.',
      },
    ],
    impact: 'Zero-friction booking. Self-maintaining platform. Fair visibility for all mentors.',
    learning: 'Good UX isn\'t about adding features—it\'s about removing obstacles. Every click you eliminate is a user you keep.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Self-hosted'],
    screenshot: '/images/portfolio/donation-mentoring/current.jpg',
    link: 'https://www.donation-mentoring.org/',
    status: 'current',
  },
  {
    version: 'v2',
    title: 'Custom Web App',
    date: 'Late 2025',
    myRole: 'Built by Jaedongshin (project owner)',
    problem: 'Notion couldn\'t scale. The inconsistent profiles and maintenance burden made it clear: we needed a real platform.',
    painPoints: [
      '"Every mentor page is different. I can\'t compare them."',
      '"No search, no filter. Just endless scrolling."',
    ],
    solution: 'Migration from Notion to a custom Next.js application with Supabase backend. Standardized mentor cards replaced freeform pages. Bilingual support (Korean/English) expanded reach.',
    keyDecisions: [
      {
        decision: 'Next.js + Supabase stack',
        why: 'Modern, scalable, and familiar to the development community.',
      },
      {
        decision: 'Standardized card layouts',
        why: 'Consistency enables comparison. Same structure, different content.',
      },
    ],
    impact: 'A functional platform that solved the core problems. Foundation laid for future improvements.',
    learning: 'Moving off Notion was necessary. But the first custom build is rarely the final form.',
    tech: ['Next.js', 'TypeScript', 'Supabase', 'Vercel'],
    screenshot: '/images/portfolio/donation-mentoring/v2.jpg',
    status: 'archived',
  },
  {
    version: 'v1',
    title: 'Notion Platform',
    date: '2024 - Late 2025',
    problem: 'When the mentoring program started with a handful of mentors, Notion made perfect sense. Free, familiar, and already part of everyone\'s workflow. A dedicated website felt like overkill for such a small group. But what works at small scale rarely survives growth.',
    painPoints: [
      '"Only the admin can edit pages. Every time a mentor wants to update their availability, they have to message me and wait."',
      '"Each mentor built their page differently. Some have photos, some don\'t. Some list their expertise clearly, others bury it in paragraphs. Mentees don\'t know what to expect."',
      '"There\'s no way to search or filter. Mentees have to scroll through everyone and hope they find someone relevant."',
      '"The same few mentors get all the bookings. Others are invisible because they\'re buried at the bottom of a long list."',
      '"As we added more mentors, the maintenance burden grew exponentially. Keeping everything updated became a part-time job."',
    ],
    solution: 'Each mentor maintained their own Notion page independently, working around the admin-only editing restriction. An aggregation page linked all mentor profiles together. The system worked. For a while.',
    keyDecisions: [
      {
        decision: 'Notion as the primary platform',
        why: 'With only a few mentors, building a custom website felt unnecessary. Notion was free, everyone knew how to use it, and it could go live immediately. The right tool for that moment.',
      },
      {
        decision: 'Mentor-owned pages',
        why: 'Notion\'s free tier restricted editing to admins only. Letting each mentor own their page was the only way to give them autonomy over their own information.',
      },
      {
        decision: 'Organic growth over structure',
        why: 'No templates, no guidelines. Each mentor expressed themselves freely. Authenticity mattered more than consistency when the community was small and personal.',
      },
    ],
    impact: 'The platform ran successfully for over a year. But as the mentor list grew past 30, the cracks became canyons. What felt personal at 8 mentors felt chaotic at 30+. The traction that validated the program also broke the platform.',
    notionLimitations: [
      'No custom domain on free tier -> stuck with notion.site URLs that look unprofessional',
      'Basic SEO only -> can\'t customize meta tags per page, poor Google discoverability',
      'No search or filtering -> users must scroll through all content manually',
      'Limited design options -> can\'t match brand colors, stuck with default fonts',
      '"Built with Notion" badge -> undermines professional credibility',
      'Slow load times on larger pages -> Notion wasn\'t built for public websites',
    ],
    learning: 'Tools that serve you at one scale can strangle you at another. Notion was the right choice for year one. Recognizing when to graduate from a tool is as important as choosing it in the first place.',
    tech: ['Notion', 'Node.js'],
    screenshot: '/images/portfolio/donation-mentoring/v1.jpg',
    status: 'archived',
  },
];

// User flow steps
const userFlow = [
  { step: 'Discover', description: 'Find mentors by expertise' },
  { step: 'Explore', description: 'View standardized profiles' },
  { step: 'Book', description: 'One-click calendar scheduling' },
  { step: 'Meet', description: '1:1 mentoring session' },
  { step: 'Impact', description: 'Session fee → UNICEF donation' },
];

export default function DonationMentoringClient() {
  const [openImage, setOpenImage] = useState<string | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box component="main" sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
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
              Donation Mentoring
            </Typography>
          </Breadcrumbs>

          {/* Hero Section */}
          <Box>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              spacing={2}
              sx={{ mb: 2 }}
            >
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 700,
                }}
              >
                Donation Mentoring
              </Typography>
              <Button
                component="a"
                href="https://www.donation-mentoring.org/"
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                color="primary"
                size="large"
                endIcon={<OpenInNewIcon />}
                sx={{ flexShrink: 0 }}
              >
                Visit Live Site
              </Button>
            </Stack>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                maxWidth: 700,
                fontWeight: 400,
                lineHeight: 1.6,
              }}
            >
              Every mentoring session becomes a UNICEF donation.
              Connecting mentees with experienced professionals while creating social impact.
            </Typography>
          </Box>

          {/* Impact Metrics - BentoBox */}
          <BentoBox
            items={[
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
            ]}
            columns={{ xs: 2, sm: 2, md: 3 }}
            gap={2}
            variant="glass"
            primaryColor="#6ee7b7"
          />

          {/* User Flow Diagram */}
          <Box>
            <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
              The User Journey
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                alignItems: { xs: 'stretch', md: 'center' },
                justifyContent: 'space-between',
                gap: { xs: 1, md: 0 },
                p: 3,
                borderRadius: 2,
                bgcolor: alpha(theme.palette.secondary.main, 0.05),
                border: '1px solid',
                borderColor: 'divider',
              }}
            >
              {userFlow.map((item, index) => (
                <Box
                  key={item.step}
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'row', md: 'column' },
                    alignItems: 'center',
                    gap: { xs: 2, md: 1 },
                    flex: 1,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: { xs: 2, md: 0 },
                      flexDirection: { xs: 'row', md: 'column' },
                    }}
                  >
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'secondary.main',
                        color: 'secondary.contrastText',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        flexShrink: 0,
                      }}
                    >
                      {index + 1}
                    </Box>
                    <Box sx={{ textAlign: { xs: 'left', md: 'center' } }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {item.step}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>
                  </Box>
                  {index < userFlow.length - 1 && (
                    <ArrowForwardIcon
                      sx={{
                        color: 'text.disabled',
                        display: { xs: 'none', md: 'block' },
                        mx: 1,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          </Box>

          <Divider />

          {/* The Journey Section */}
          <Box>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              The Evolution
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              From Notion prototype to production platform—each version solved real user problems
              and taught us something valuable.
            </Typography>

            <Stack spacing={0}>
              {versions.map((v, index) => (
                <Box key={v.version}>
                  {/* Version Card */}
                  <Card
                    sx={{
                      p: { xs: 2, md: 3 },
                      border: v.status === 'current' ? '2px solid' : '1px solid',
                      borderColor: v.status === 'current' ? 'secondary.main' : 'divider',
                      position: 'relative',
                      overflow: 'visible',
                    }}
                  >
                    <CardContent sx={{ p: 0 }}>
                      {/* Responsive Grid: Image left, Content right on desktop */}
                      <Box
                        sx={{
                          display: 'grid',
                          gridTemplateColumns: { xs: '1fr', md: '280px 1fr' },
                          gap: { xs: 3, md: 4 },
                        }}
                      >
                        {/* Screenshot Thumbnail + View Site */}
                        <Stack spacing={2} sx={{ minWidth: { xs: '100%', md: 280 }, maxWidth: { xs: '100%', md: 280 } }}>
                          {v.screenshot && (
                            <Box
                              onClick={() => setOpenImage(v.screenshot!)}
                              sx={{
                                borderRadius: 2,
                                border: '1px solid',
                                borderColor: 'divider',
                                cursor: 'pointer',
                                overflow: 'hidden',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                bgcolor: 'background.default',
                                height: { xs: 180, md: 200 },
                                position: 'relative',
                                '&:hover': {
                                  transform: 'scale(1.02)',
                                  boxShadow: `0 8px 32px ${alpha(theme.palette.secondary.main, 0.2)}`,
                                },
                                '&::after': {
                                  content: '"Click to expand"',
                                  position: 'absolute',
                                  bottom: 8,
                                  right: 8,
                                  fontSize: '0.7rem',
                                  color: 'white',
                                  bgcolor: 'rgba(0,0,0,0.6)',
                                  px: 1,
                                  py: 0.5,
                                  borderRadius: 1,
                                  opacity: 0,
                                  transition: 'opacity 0.2s',
                                },
                                '&:hover::after': {
                                  opacity: 1,
                                },
                              }}
                            >
                              <Box
                                component="img"
                                src={v.screenshot}
                                alt={`${v.title} screenshot`}
                                sx={{
                                  width: '100%',
                                  height: '100%',
                                  objectFit: 'cover',
                                  objectPosition: 'top',
                                }}
                              />
                            </Box>
                          )}
                          {v.link && (
                            <Button
                              component="a"
                              href={v.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              variant="contained"
                              color="primary"
                              fullWidth
                              endIcon={<OpenInNewIcon />}
                            >
                              View Live Site
                            </Button>
                          )}
                        </Stack>

                        {/* Content */}
                        <Stack spacing={3}>
                          {/* Header */}
                          <Stack spacing={1.5}>
                            <Stack
                              direction="row"
                              spacing={1.5}
                              alignItems="center"
                              flexWrap="wrap"
                              useFlexGap
                            >
                              <Tag
                                label={v.version}
                                variant={v.status === 'current' ? 'primary' : 'default'}
                                selected={v.status === 'current'}
                                sx={{ fontWeight: 600 }}
                              />
                              <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                {v.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {v.date}
                              </Typography>
                            </Stack>
                            {/* Tech tags */}
                            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                              {v.tech.map((t) => (
                                <Tag key={t} label={t} size="small" variant="secondary" />
                              ))}
                            </Stack>
                            {/* My Role - only show for archived versions (current version shows role in BentoBox above) */}
                            {v.myRole && v.status !== 'current' && (
                              <Box
                                sx={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 1,
                                  px: 2,
                                  py: 1,
                                  borderRadius: 1,
                                  bgcolor: alpha(theme.palette.text.secondary, 0.08),
                                  width: 'fit-content',
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{ color: 'text.secondary' }}
                                >
                                  {v.myRole}
                                </Typography>
                              </Box>
                            )}
                          </Stack>

                          {/* Impact + Learning - Lead with outcomes */}
                          <Box
                            sx={{
                              p: 2,
                              borderRadius: 2,
                              bgcolor: alpha(theme.palette.background.paper, 0.5),
                              border: '1px solid',
                              borderColor: 'divider',
                            }}
                          >
                            <Stack
                              direction={{ xs: 'column', sm: 'row' }}
                              spacing={2}
                              divider={
                                <Divider
                                  orientation={isMobile ? 'horizontal' : 'vertical'}
                                  flexItem
                                />
                              }
                            >
                              <Box sx={{ flex: 1 }}>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                                  <TrendingUpIcon
                                    sx={{ fontSize: 16, color: 'secondary.main' }}
                                  />
                                  <Typography
                                    variant="overline"
                                    sx={{
                                      color: 'secondary.main',
                                      letterSpacing: 1,
                                      fontSize: '0.65rem',
                                      fontWeight: 600,
                                    }}
                                  >
                                    Impact
                                  </Typography>
                                </Stack>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: 'secondary.main',
                                    fontWeight: 500,
                                  }}
                                >
                                  {v.impact}
                                </Typography>
                              </Box>
                              <Box sx={{ flex: 1 }}>
                                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                                  <LightbulbIcon
                                    sx={{ fontSize: 16, color: 'warning.main' }}
                                  />
                                  <Typography
                                    variant="overline"
                                    sx={{
                                      color: 'warning.main',
                                      letterSpacing: 1,
                                      fontSize: '0.65rem',
                                      fontWeight: 600,
                                    }}
                                  >
                                    Learning
                                  </Typography>
                                </Stack>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: 'text.secondary',
                                    fontStyle: 'italic',
                                  }}
                                >
                                  {v.learning}
                                </Typography>
                              </Box>
                            </Stack>
                          </Box>

                          {/* The Challenge */}
                          <Box>
                            <Typography
                              variant="overline"
                              sx={{
                                color: 'text.secondary',
                                letterSpacing: 1,
                                fontSize: '0.7rem',
                              }}
                            >
                              The Challenge
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.primary', mb: 2 }}>
                              {v.problem}
                            </Typography>

                            {/* Pain Points as quotes */}
                            <Stack spacing={1}>
                              {v.painPoints.map((point, i) => (
                                <Box
                                  key={i}
                                  sx={{
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 1,
                                    pl: 2,
                                    borderLeft: '2px solid',
                                    borderColor: 'error.main',
                                    opacity: 0.85,
                                  }}
                                >
                                  <Typography
                                    variant="body2"
                                    sx={{ fontStyle: 'italic', color: 'text.secondary' }}
                                  >
                                    {point}
                                  </Typography>
                                </Box>
                              ))}
                            </Stack>
                          </Box>

                          {/* The Solution */}
                          <Box>
                            <Typography
                              variant="overline"
                              sx={{
                                color: 'text.secondary',
                                letterSpacing: 1,
                                fontSize: '0.7rem',
                              }}
                            >
                              The Solution
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                              {v.solution}
                            </Typography>
                          </Box>

                          {/* Platform Limitations (Notion-specific) */}
                          {v.notionLimitations && (
                            <Box>
                              <Typography
                                variant="overline"
                                sx={{
                                  color: 'warning.main',
                                  letterSpacing: 1,
                                  fontSize: '0.7rem',
                                }}
                              >
                                Platform Limitations
                              </Typography>
                              <Box
                                sx={{
                                  mt: 1,
                                  p: 2,
                                  borderRadius: 1,
                                  bgcolor: alpha(theme.palette.warning.main, 0.05),
                                  border: '1px solid',
                                  borderColor: alpha(theme.palette.warning.main, 0.2),
                                }}
                              >
                                <Stack spacing={0.75}>
                                  {v.notionLimitations.map((limitation, i) => (
                                    <Typography
                                      key={i}
                                      variant="body2"
                                      color="text.secondary"
                                      sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 1,
                                        '&::before': {
                                          content: '"•"',
                                          color: 'warning.main',
                                          fontWeight: 700,
                                        },
                                      }}
                                    >
                                      {limitation}
                                    </Typography>
                                  ))}
                                </Stack>
                              </Box>
                            </Box>
                          )}

                          {/* Key Decisions */}
                          <Box>
                            <Typography
                              variant="overline"
                              sx={{
                                color: 'text.secondary',
                                letterSpacing: 1,
                                fontSize: '0.7rem',
                              }}
                            >
                              Key Decisions
                            </Typography>
                            <Stack spacing={1.5} sx={{ mt: 1 }}>
                              {v.keyDecisions.map((kd, i) => (
                                <Box
                                  key={i}
                                  sx={{
                                    p: 2,
                                    borderRadius: 1,
                                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                                    border: '1px solid',
                                    borderColor: 'divider',
                                  }}
                                >
                                  <Typography
                                    variant="subtitle2"
                                    sx={{ fontWeight: 600, mb: 0.5 }}
                                  >
                                    {kd.decision}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {kd.why}
                                  </Typography>
                                </Box>
                              ))}
                            </Stack>
                          </Box>

                        </Stack>
                      </Box>
                    </CardContent>
                  </Card>

                  {/* Timeline connector */}
                  {index < versions.length - 1 && (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        py: 3,
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <Box
                          sx={{
                            width: 3,
                            height: 32,
                            bgcolor: 'secondary.main',
                            opacity: 0.4,
                            borderRadius: 1,
                          }}
                        />
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            my: 1,
                            px: 2,
                            py: 0.5,
                            borderRadius: 2,
                            bgcolor: alpha(theme.palette.secondary.main, 0.1),
                          }}
                        >
                          <ArrowDownwardIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'secondary.main',
                              fontWeight: 500,
                              textTransform: 'uppercase',
                              letterSpacing: 0.5,
                            }}
                          >
                            Evolved from
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            width: 3,
                            height: 32,
                            bgcolor: 'secondary.main',
                            opacity: 0.4,
                            borderRadius: 1,
                          }}
                        />
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>
          </Box>
        </Stack>
      </Container>

      {/* Lightbox Dialog */}
      <Dialog
        open={!!openImage}
        onClose={() => setOpenImage(null)}
        maxWidth={false}
        PaperProps={{
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            maxHeight: '95vh',
            maxWidth: '95vw',
          },
        }}
      >
        <IconButton
          onClick={() => setOpenImage(null)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.5)',
            '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' },
            zIndex: 1,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ p: 0, overflow: 'auto' }}>
          {openImage && (
            <Box
              component="img"
              src={openImage}
              alt="Full size screenshot"
              sx={{
                maxWidth: '100%',
                maxHeight: '90vh',
                display: 'block',
              }}
            />
          )}
        </DialogContent>
      </Dialog>
    </Box>
  );
}
