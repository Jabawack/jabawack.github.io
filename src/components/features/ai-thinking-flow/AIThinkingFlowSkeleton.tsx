'use client';

import { Box, Card, Stack, Skeleton, Divider } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import { AIThinkingFlowSkeletonProps } from './types';

// Shimmer animation keyframes
const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

// Styled skeleton with shimmer effect
const ShimmerSkeleton = styled(Skeleton)(({ theme }) => ({
  '&::after': {
    background: `linear-gradient(
      90deg,
      transparent,
      ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)'},
      transparent
    )`,
    backgroundSize: '200% 100%',
    animation: `${shimmer} 1.5s infinite linear`,
  },
}));

function ChapterCardSkeleton() {
  return (
    <Card sx={{ p: 3 }}>
      <Stack spacing={3}>
        {/* Chapter Header: icon + title + badge */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <ShimmerSkeleton variant="circular" width={28} height={28} animation="wave" />
          <Box sx={{ flexGrow: 1 }}>
            <ShimmerSkeleton variant="text" width={280} height={32} animation="wave" />
            <ShimmerSkeleton variant="text" width={100} height={16} animation="wave" />
          </Box>
          <ShimmerSkeleton variant="rounded" width={80} height={24} animation="wave" />
        </Box>

        {/* Story paragraphs */}
        <Box>
          <ShimmerSkeleton variant="text" width="100%" height={20} animation="wave" />
          <ShimmerSkeleton variant="text" width="100%" height={20} animation="wave" />
          <ShimmerSkeleton variant="text" width="85%" height={20} animation="wave" />
          <Box sx={{ mt: 2 }} />
          <ShimmerSkeleton variant="text" width="100%" height={20} animation="wave" />
          <ShimmerSkeleton variant="text" width="60%" height={20} animation="wave" />
        </Box>

        <Divider />

        {/* Milestones section */}
        <Box>
          <ShimmerSkeleton variant="text" width={100} height={18} animation="wave" sx={{ mb: 1 }} />
          <Stack spacing={0.5}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShimmerSkeleton variant="circular" width={18} height={18} animation="wave" />
              <ShimmerSkeleton variant="text" width={60} height={18} animation="wave" />
              <ShimmerSkeleton variant="text" width="50%" height={18} animation="wave" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShimmerSkeleton variant="circular" width={18} height={18} animation="wave" />
              <ShimmerSkeleton variant="text" width={60} height={18} animation="wave" />
              <ShimmerSkeleton variant="text" width="45%" height={18} animation="wave" />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <ShimmerSkeleton variant="circular" width={18} height={18} animation="wave" />
              <ShimmerSkeleton variant="text" width={60} height={18} animation="wave" />
              <ShimmerSkeleton variant="text" width="55%" height={18} animation="wave" />
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Card>
  );
}

export function AIThinkingFlowSkeleton({
  cardCount = 3,
  visible,
  onFadeComplete,
}: AIThinkingFlowSkeletonProps) {
  return (
    <AnimatePresence onExitComplete={onFadeComplete}>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <Stack spacing={6}>
            {Array.from({ length: cardCount }).map((_, index) => (
              <ChapterCardSkeleton key={index} />
            ))}
          </Stack>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AIThinkingFlowSkeleton;
