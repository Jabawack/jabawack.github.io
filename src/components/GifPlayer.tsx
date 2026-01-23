'use client';

import { useState, useCallback, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

interface GifPlayerProps {
  src: string;
  alt: string;
  duration?: number; // Not used for video, kept for API compatibility
  width?: number | string;
}

/**
 * Video player that plays once then shows a replay button.
 * Uses MP4 video instead of GIF to prevent auto-looping.
 */
export function GifPlayer({ src, alt, width = '100%' }: GifPlayerProps) {
  const [showReplay, setShowReplay] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Convert .gif path to .mp4
  const videoSrc = src.replace(/\.gif($|\?)/, '.mp4$1');

  const handleEnded = useCallback(() => {
    setShowReplay(true);
  }, []);

  const handleReplay = useCallback(() => {
    if (videoRef.current) {
      setShowReplay(false);
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, []);

  return (
    <Box
      sx={{
        position: 'relative',
        width,
        mx: 'auto',
        my: 3,
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: 'background.paper',
      }}
    >
      <Box
        component="video"
        ref={videoRef}
        src={videoSrc}
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />

      {/* Replay overlay */}
      {showReplay && (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            '&:hover': {
              bgcolor: 'rgba(0, 0, 0, 0.4)',
            },
          }}
          onClick={handleReplay}
        >
          <IconButton
            sx={{
              bgcolor: 'rgba(255, 255, 255, 0.9)',
              color: 'grey.800',
              width: 64,
              height: 64,
              '&:hover': {
                bgcolor: 'white',
              },
            }}
          >
            <ReplayIcon sx={{ fontSize: 32 }} />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
