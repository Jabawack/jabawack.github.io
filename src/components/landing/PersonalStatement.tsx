'use client';

import { useCallback, useRef } from 'react';
import { Box, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollIndicator from './ScrollIndicator';

const MotionSpan = motion.create('span');

const statementLines = [
  'I like making complex things feel simple.',
  'Building apps that grow, and helping teams do the same.',
  'Twenty years of learning, shipping, and teaching along the way.',
  'Good code makes someone\'s day a little easier.',
];

function Word({
  word,
  range,
  progress,
  activeColor,
  dimColor,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
  activeColor: string;
  dimColor: string;
}) {
  const color = useTransform(progress, range, [dimColor, activeColor]);

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
  const dimColor =
    theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.15)';

  // Flatten all words for scroll mapping
  const allWords = statementLines.flatMap((line, lineIdx) =>
    line.split(' ').map((word, wordIdx) => ({
      word,
      lineIdx,
      key: `${lineIdx}-${wordIdx}`,
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
        <Container maxWidth="md">
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
              {statementLines.map((line, i) => (
                <Box key={i} component="span" sx={{ display: 'block' }}>
                  {line}
                </Box>
              ))}
            </Typography>
          ) : (
            <Typography
              component="div"
              sx={{
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.75rem' },
                fontWeight: 600,
                lineHeight: 1.8,
              }}
              aria-label={statementLines.join(' ')}
            >
              {statementLines.map((line, lineIdx) => (
                <Box key={lineIdx} sx={{ display: 'block' }}>
                  {line.split(' ').map((word, wordIdx) => {
                    const globalIdx = allWords.findIndex(
                      (w) => w.lineIdx === lineIdx && w.key === `${lineIdx}-${wordIdx}`
                    );
                    // Map words across 25%–75% of scroll progress
                    const start = 0.25 + (globalIdx / totalWords) * 0.5;
                    const end = 0.25 + ((globalIdx + 1) / totalWords) * 0.5;
                    return (
                      <Word
                        key={`${lineIdx}-${wordIdx}`}
                        word={word}
                        range={[start, end]}
                        progress={scrollYProgress}
                        activeColor={activeColor}
                        dimColor={dimColor}
                      />
                    );
                  })}
                </Box>
              ))}
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
            label="Featured Work"
            onClick={skipSection}
          />
        </Box>
      </Box>
    </Box>
  );
}
