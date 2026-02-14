'use client';

import { Box, Typography } from '@mui/material';
import { motion, MotionValue } from 'framer-motion';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const MotionBox = motion.create(Box);

interface ScrollIndicatorProps {
  /** Text label above the chevron */
  label?: string;
  /** Callback when the indicator is clicked */
  onClick?: () => void;
  /** Optional Framer Motion value to control opacity (e.g. fade on scroll) */
  opacityValue?: MotionValue<number>;
  /** Delay before the indicator fades in (seconds) */
  fadeInDelay?: number;
}

export default function ScrollIndicator({
  label = 'Scroll',
  onClick,
  opacityValue,
  fadeInDelay = 0,
}: ScrollIndicatorProps) {
  return (
    <MotionBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: fadeInDelay, duration: 0.6 }}
      {...(opacityValue ? { style: { opacity: opacityValue } } : {})}
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{
          fontSize: '0.7rem',
          letterSpacing: 1.5,
          textTransform: 'uppercase',
          lineHeight: 1,
        }}
      >
        {label}
      </Typography>
      <MotionBox
        animate={{ y: [0, 8, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <KeyboardArrowDownIcon sx={{ color: 'text.secondary', fontSize: 28 }} />
      </MotionBox>
    </MotionBox>
  );
}
