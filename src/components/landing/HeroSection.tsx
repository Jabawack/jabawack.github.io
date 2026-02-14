'use client';

import { useRef } from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion, useScroll, useTransform } from 'framer-motion';
import ArticleIcon from '@mui/icons-material/Article';
import { getHeroGradient, getTextGradient } from '@/theme';
import ScrollIndicator from './ScrollIndicator';

const MotionBox = motion.create(Box);
const MotionTypography = motion.create(Typography);
const MotionButton = motion.create(Button);

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delay,
      ease: 'easeOut' as const,
    },
  }),
};

export default function HeroSection() {
  const theme = useTheme();
  const sectionRef = useRef<HTMLElement>(null);

  // Fade out scroll indicator as user scrolls
  const { scrollY } = useScroll();
  const scrollIndicatorOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight - 64,
      behavior: 'smooth',
    });
  };

  return (
    <Box
      component="section"
      ref={sectionRef}
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: 8, md: 0 },
        pb: { xs: 12, md: 10 }, // Add bottom padding for scroll indicator space
      }}
    >
      {/* Background gradient */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: getHeroGradient(theme),
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
        <MotionTypography
          variant="h1"
          initial="hidden"
          animate="visible"
          custom={0}
          variants={fadeInUp}
          sx={{
            fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
            fontWeight: 700,
            background: getTextGradient(theme),
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 2,
          }}
        >
          Taeho (TK) Kim
        </MotionTypography>

        <MotionTypography
          variant="h2"
          color="text.secondary"
          initial="hidden"
          animate="visible"
          custom={0.1}
          variants={fadeInUp}
          sx={{
            fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
            fontWeight: 400,
            mb: 3,
          }}
        >
          Fullstack UX Engineer
        </MotionTypography>

        <MotionTypography
          variant="body1"
          color="text.secondary"
          initial="hidden"
          animate="visible"
          custom={0.2}
          variants={fadeInUp}
          sx={{
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
            lineHeight: 1.8,
            maxWidth: 600,
            mx: 'auto',
            mb: 5,
          }}
        >
          20+ years building scalable web apps with React, Python, and Django.
          Passionate about crafting intuitive products and mentoring engineers.
        </MotionTypography>

        <MotionBox
          initial="hidden"
          animate="visible"
          custom={0.3}
          variants={fadeInUp}
        >
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <MotionButton
              variant="contained"
              color="secondary"
              size="large"
              href="/resume/"
              startIcon={<ArticleIcon />}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                borderRadius: 2,
              }}
            >
              View Resume
            </MotionButton>

            <Button
              variant="outlined"
              color="secondary"
              size="large"
              href="/portfolio/"
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 500,
                borderRadius: 2,
              }}
            >
              View Portfolio
            </Button>
          </Stack>
        </MotionBox>
      </Container>

      {/* Scroll indicator - absolute within section, fades on scroll */}
      <Box
        sx={{
          position: 'absolute',
          bottom: { xs: 48, md: 64 },
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <ScrollIndicator
          onClick={scrollToContent}
          opacityValue={scrollIndicatorOpacity}
          fadeInDelay={1}
        />
      </Box>
    </Box>
  );
}
