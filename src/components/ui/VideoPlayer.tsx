'use client';

import { useState, useCallback, useRef } from 'react';
import { Box, IconButton } from '@mui/material';
import ReplayIcon from '@mui/icons-material/Replay';

interface VideoPlayerProps {
  src: string;
  alt: string;
  width?: number | string;
}

/**
 * Video player that plays once then shows a replay button.
 * Plays MP4 videos without auto-looping.
 */
export function VideoPlayer({ src, alt, width = '100%' }: VideoPlayerProps) {
  const [showReplay, setShowReplay] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleTimeUpdate = useCallback(() => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      if (duration > 0) {
        setProgress((currentTime / duration) * 100);
      }
    }
  }, []);

  const handleEnded = useCallback(() => {
    setShowReplay(true);
    setProgress(100);
  }, []);

  const handleReplay = useCallback(() => {
    if (videoRef.current) {
      setShowReplay(false);
      setProgress(0);
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
        src={src}
        autoPlay
        muted
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        sx={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />

      {/* Progress bar */}
      {!showReplay && (
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 4,
            bgcolor: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: `${progress}%`,
              bgcolor: 'secondary.main',
              transition: 'width 100ms linear',
            }}
          />
        </Box>
      )}

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
