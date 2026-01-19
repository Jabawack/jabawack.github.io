'use client';

import { useState, useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { AIThinkingFlowStatusProps } from './types';

// Pulsing dot animation
const pulse = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.9);
  }
`;

// Blinking cursor animation
const blink = keyframes`
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
`;

const PulsingDot = styled(Box)(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: theme.palette.secondary.main,
  animation: `${pulse} 1.5s ease-in-out infinite`,
  boxShadow: `0 0 8px ${theme.palette.secondary.main}`,
}));

const Cursor = styled('span')(({ theme }) => ({
  display: 'inline-block',
  width: 2,
  height: '1em',
  backgroundColor: theme.palette.secondary.main,
  marginLeft: 2,
  animation: `${blink} 1s step-end infinite`,
  verticalAlign: 'text-bottom',
}));

const TYPING_SPEED = 50; // ms per character

export function AIThinkingFlowStatus({ message, visible }: AIThinkingFlowStatusProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(0);

  // Clear any existing interval
  const clearTypingInterval = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  // Start typing effect when message changes or becomes visible
  useEffect(() => {
    if (!visible) {
      clearTypingInterval();
      setDisplayedText('');
      setIsTyping(false);
      indexRef.current = 0;
      return;
    }

    // Reset and start typing
    clearTypingInterval();
    setDisplayedText('');
    setIsTyping(true);
    indexRef.current = 0;

    intervalRef.current = setInterval(() => {
      if (indexRef.current < message.length) {
        indexRef.current++;
        setDisplayedText(message.slice(0, indexRef.current));
      } else {
        clearTypingInterval();
        setIsTyping(false);
      }
    }, TYPING_SPEED);

    return clearTypingInterval;
  }, [message, visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              mb: 3,
              px: 2,
              py: 1,
              borderRadius: 2,
              backgroundColor: 'action.hover',
              width: 'fit-content',
            }}
          >
            <PulsingDot />
            <Typography
              variant="body2"
              sx={{
                color: 'secondary.main',
                fontWeight: 500,
                fontFamily: 'monospace',
                letterSpacing: '0.02em',
                minWidth: 180,
              }}
            >
              {displayedText}
              <Cursor sx={{ opacity: isTyping ? 1 : 0 }} />
            </Typography>
          </Box>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AIThinkingFlowStatus;
