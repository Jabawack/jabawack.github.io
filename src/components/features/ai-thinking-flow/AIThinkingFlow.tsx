'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';
import { AIThinkingFlowProps, ThinkingPhase } from './types';
import { AIThinkingFlowSkeleton } from './AIThinkingFlowSkeleton';
import { AIThinkingFlowStatus } from './AIThinkingFlowStatus';
import { useContentReady } from './useContentReady';

import { THINKING_WORDS, STATUS_INTERVAL } from './constants';

export function AIThinkingFlow({
  children,
  enabled = true,
  sessionKey,
  minDuration = 2000,
  maxDuration = 10000,
  waitForImages = true,
  statusMessages = THINKING_WORDS,
  onComplete,
}: AIThinkingFlowProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const hasCheckedSkip = useRef(false);

  // Always start in loading state for consistent SSR/client rendering
  const [phase, setPhase] = useState<ThinkingPhase>('loading');
  const [statusIndex, setStatusIndex] = useState(0);

  // Check skip conditions after mount to avoid hydration mismatch
  useEffect(() => {
    if (hasCheckedSkip.current) return;
    hasCheckedSkip.current = true;

    // Check if we should skip animation
    if (!enabled) {
      setPhase('complete');
      return;
    }

    if (prefersReducedMotion) {
      setPhase('complete');
      return;
    }

    if (sessionKey) {
      const seen = sessionStorage.getItem(`ai-thinking-flow-${sessionKey}`);
      if (seen === 'true') {
        setPhase('complete');
        return;
      }
    }
  }, [enabled, prefersReducedMotion, sessionKey]);

  const contentReady = useContentReady(contentRef, {
    minDuration,
    maxDuration,
    waitForImages,
    enabled: phase !== 'complete',
  });

  // Cycle through status messages
  useEffect(() => {
    if (phase !== 'loading' && phase !== 'waitingForContent') return;

    const interval = setInterval(() => {
      setStatusIndex((prev) => (prev + 1) % statusMessages.length);
    }, STATUS_INTERVAL);

    return () => clearInterval(interval);
  }, [phase, statusMessages.length]);

  // Transition to waitingForContent after minimum duration
  useEffect(() => {
    if (phase === 'loading' && contentReady.minDurationElapsed) {
      setPhase('waitingForContent');
    }
  }, [phase, contentReady.minDurationElapsed]);

  // Transition to fading when content is ready
  useEffect(() => {
    if (phase === 'waitingForContent' && contentReady.isReady) {
      setPhase('fading');
    }
  }, [phase, contentReady.isReady]);

  // Handle skeleton fade complete
  const handleSkeletonFadeComplete = useCallback(() => {
    setPhase('complete');

    // Mark as seen in session storage
    if (sessionKey) {
      sessionStorage.setItem(`ai-thinking-flow-${sessionKey}`, 'true');
    }

    onComplete?.();
  }, [sessionKey, onComplete]);

  // Skip animation - render children directly
  if (phase === 'complete') {
    return <>{children}</>;
  }

  const showSkeleton = phase === 'loading' || phase === 'waitingForContent';
  const showStatus = phase === 'loading' || phase === 'waitingForContent';

  return (
    <Box sx={{ position: 'relative' }}>
      {/* Status indicator */}
      <AIThinkingFlowStatus message={statusMessages[statusIndex]} visible={showStatus} />

      {/* Skeleton overlay */}
      <AIThinkingFlowSkeleton
        visible={showSkeleton}
        cardCount={3}
        onFadeComplete={handleSkeletonFadeComplete}
      />

      {/* Hidden content container - renders but invisible during loading */}
      <Box
        ref={contentRef}
        sx={{
          position: showSkeleton ? 'absolute' : 'relative',
          top: 0,
          left: 0,
          right: 0,
          visibility: showSkeleton ? 'hidden' : 'visible',
          opacity: showSkeleton ? 0 : 1,
        }}
      >
        {phase === 'fading' ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeIn' }}
          >
            {children}
          </motion.div>
        ) : (
          children
        )}
      </Box>
    </Box>
  );
}

export default AIThinkingFlow;
