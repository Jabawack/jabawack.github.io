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
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import PublicIcon from '@mui/icons-material/Public';
import FlightIcon from '@mui/icons-material/Flight';
import SpeedIcon from '@mui/icons-material/Speed';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import SatelliteAltIcon from '@mui/icons-material/SatelliteAlt';
import Tag from '@/components/ui/Tag';
import { BentoBox, BentoItem } from '@/components/ui/BentoBox';

export default function OrbitLabClient() {
  const theme = useTheme();

  const bentoItems: BentoItem[] = [
    {
      id: 'overview',
      label: 'What It Does',
      value: 'Real-time flight tracking on an interactive 3D globe with aircraft positions from OpenSky Network',
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
      id: '3d',
      label: '3D Engine',
      value: 'Three.js',
      icon: <ViewInArIcon sx={{ fontSize: 20 }} />,
    },
    {
      id: 'data',
      label: 'Data Source',
      value: 'OpenSky Network API for global flight data',
      colSpan: 2,
      icon: <SatelliteAltIcon sx={{ fontSize: 20 }} />,
    },
  ];

  const techStack = [
    'React',
    'TypeScript',
    'Three.js',
    'React Three Fiber',
    'three-globe',
    'OpenSky API',
    'Vercel',
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
            Orbit Lab
          </Typography>
        </Breadcrumbs>

        {/* Header */}
        <Stack spacing={4} sx={{ mb: 6 }}>
          <Box>
            <Typography variant="h1" sx={{ fontWeight: 700, mb: 2 }}>
              Orbit Lab
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 3, maxWidth: 700 }}>
              A 3D flight tracking visualization built with React Three Fiber and three-globe. Watch real-time aircraft positions on an interactive globe.
            </Typography>
            <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
              <Button
                variant="contained"
                startIcon={<OpenInNewIcon />}
                href="https://orbit-lab-project.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Launch Demo
              </Button>
              <Button
                variant="outlined"
                startIcon={<GitHubIcon />}
                href="https://github.com/Jabawack/orbit-lab-project"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Source
              </Button>
              <Button
                variant="outlined"
                href="/blog/orbit-lab-project-journey/"
              >
                Read Blog Post
              </Button>
            </Stack>
          </Box>

          {/* Preview Image */}
          <Box
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Box
              component="img"
              src="/images/portfolio/orbit-lab-project/preview.jpg"
              alt="Orbit Lab 3D globe with flight paths"
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
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

        {/* Key Features */}
        <Stack spacing={4} sx={{ mb: 6 }}>
          <Typography variant="h5" sx={{ fontWeight: 600 }}>
            Key Features
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {/* Interactive Globe */}
            <Card sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <PublicIcon color="primary" />
                  <Typography variant="h6">Interactive Globe</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Rotate, zoom, and explore the globe with smooth controls. Built on three-globe for optimized WebGL rendering.
                </Typography>
              </CardContent>
            </Card>

            {/* Real-time Data */}
            <Card sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <FlightIcon color="primary" />
                  <Typography variant="h6">Real-time Flights</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Live aircraft positions from OpenSky Network API. See thousands of flights updating in real-time.
                </Typography>
              </CardContent>
            </Card>

            {/* Flight Paths */}
            <Card sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <ViewInArIcon color="primary" />
                  <Typography variant="h6">3D Flight Paths</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Animated arcs show flight trajectories. Aircraft models rendered at correct altitude and heading.
                </Typography>
              </CardContent>
            </Card>

            {/* Performance */}
            <Card sx={{ bgcolor: alpha(theme.palette.background.paper, 0.5) }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                  <SpeedIcon color="primary" />
                  <Typography variant="h6">Optimized Performance</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  GPU-accelerated rendering with React Three Fiber. Maintains 60 FPS even with thousands of aircraft.
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Stack>

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
                href="https://orbit-lab-project.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Live Demo
              </Button>
              <Button
                variant="outlined"
                href="/blog/orbit-lab-project-journey/"
              >
                Read the Full Story
              </Button>
              <Button
                variant="outlined"
                startIcon={<GitHubIcon />}
                href="https://github.com/Jabawack/orbit-lab-project"
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
