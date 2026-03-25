'use client';

import { useCallback, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollIndicator from './ScrollIndicator';

const MotionSpan = motion.create('span');

// Segments with optional accent highlights
const statementSegments: { text: string; accent?: boolean }[] = [
  { text: 'I like making' },
  { text: 'complex things feel simple.', accent: true },
  { text: 'Building apps that' },
  { text: 'grow,', accent: true },
  { text: 'and helping teams do the same. Twenty years of learning,' },
  { text: 'shipping,', accent: true },
  { text: 'and bridging along the way.' },
  { text: 'Thoughtful design', accent: true },
  { text: "makes someone's day a little easier." },
];

const fullText = statementSegments.map((s) => s.text).join(' ');

function Word({
  word,
  range,
  progress,
  targetColor,
  dimColor,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  targetColor: string;
  dimColor: string;
}) {
  const color = useTransform(progress, range, [dimColor, targetColor]);

  return (
    <MotionSpan style={{ color }} aria-hidden>
      {word}{' '}
    </MotionSpan>
  );
}

export default function PersonalStatement() {
  const theme = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const prefersReducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const activeColor = theme.palette.text.primary;
  const accentColor = theme.palette.secondary.main;
  const dimColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';

  // Flatten all segments into words, preserving accent flag
  const allWords = statementSegments.flatMap((segment) =>
    segment.text.split(' ').map((word) => ({
      word,
      accent: !!segment.accent,
    }))
  );

  const totalWords = allWords.length;

  const skipSection = useCallback(() => {
    if (!containerRef.current) return;
    const sectionBottom = containerRef.current.offsetTop + containerRef.current.offsetHeight;
    window.scrollTo({
      top: sectionBottom,
      behavior: 'smooth',
    });
  }, []);

  return (
    <Box
      component="section"
      ref={containerRef}
      sx={{
        // Tall section for slow scroll-through
        height: '300vh',
        position: 'relative',
        backgroundColor: 'background.default',
      }}
    >
      {/* Sticky keeps text pinned to center of viewport */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          {prefersReducedMotion ? (
            <Typography
              variant="h3"
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.75rem' },
                fontWeight: 600,
                lineHeight: 1.8,
                color: 'text.primary',
              }}
            >
              {fullText}
            </Typography>
          ) : (
            <Typography
              component="p"
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.75rem' },
                fontWeight: 600,
                lineHeight: 1.8,
              }}
              aria-label={fullText}
            >
              {allWords.map((w, idx) => {
                const start = 0.25 + (idx / totalWords) * 0.5;
                const end = 0.25 + ((idx + 1) / totalWords) * 0.5;
                return (
                  <Word
                    key={idx}
                    word={w.word}
                    range={[start, end]}
                    progress={scrollYProgress}
                    targetColor={w.accent ? accentColor : activeColor}
                    dimColor={dimColor}
                  />
                );
              })}
            </Typography>
          )}
        </Container>

        {/* Skip indicator at bottom of sticky viewport */}
        <Box
          sx={{
            position: 'absolute',
            bottom: { xs: 48, md: 64 },
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <ScrollIndicator
            label="Latest Posts"
            onClick={skipSection}
          />
        </Box>
      </Box>
    </Box>
  );
}
