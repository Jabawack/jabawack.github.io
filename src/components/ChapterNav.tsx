'use client';

import { Box, Stepper, Step, StepLabel, StepConnector } from '@mui/material';
import { styled } from '@mui/material/styles';
import { chapters, Chapter } from '@/data/chapters';
import { statusConfig } from '@/config/statusConfig';

// Custom styled connector
const DotConnector = styled(StepConnector)(({ theme }) => ({
  '&.MuiStepConnector-root': {
    marginLeft: 9,
  },
  '& .MuiStepConnector-line': {
    borderColor: theme.palette.divider,
    borderLeftWidth: 2,
    minHeight: 60,
  },
}));

// Step icon based on status
interface StepIconProps {
  status: Chapter['status'];
  active: boolean;
}

function StepIcon({ status, active }: StepIconProps) {
  const config = statusConfig[status];
  const Icon = config.icon;
  const color = config.color;
  const size = 20;

  if (status === 'in-progress') {
    return (
      <Box
        sx={{
          width: size - 4,
          height: size - 4,
          borderRadius: '50%',
          backgroundColor: color,
          border: `2px solid ${color}`,
          animation: 'pulse 2s infinite',
          '@keyframes pulse': {
            '0%, 100%': { opacity: 1, boxShadow: `0 0 8px ${color}` },
            '50%': { opacity: 0.6, boxShadow: 'none' },
          },
        }}
      />
    );
  }

  return (
    <Icon
      sx={{
        fontSize: size,
        color,
        filter: active ? `drop-shadow(0 0 4px ${color})` : 'none',
      }}
    />
  );
}

export interface ChapterNavProps {
  activeChapterId: string;
  onChapterClick?: (chapterId: string) => void;
}

export function ChapterNav({ activeChapterId, onChapterClick }: ChapterNavProps) {
  return (
    <Stepper
      activeStep={chapters.findIndex((c) => c.id === activeChapterId)}
      orientation="vertical"
      connector={<DotConnector />}
      sx={{ '& .MuiStepLabel-root': { py: 0 } }}
    >
      {chapters.map((chapter, index) => (
        <Step key={chapter.id} completed={false}>
          <StepLabel
            StepIconComponent={() => (
              <StepIcon
                status={chapter.status}
                active={activeChapterId === chapter.id}
              />
            )}
            onClick={() => onChapterClick?.(chapter.id)}
            sx={{
              cursor: onChapterClick ? 'pointer' : 'default',
              '& .MuiStepLabel-label': {
                color: 'text.secondary',
                fontWeight: 400,
                fontSize: '0.875rem',
                transition: 'all 0.3s ease',
              },
              '& .MuiStepLabel-label.Mui-active': {
                color: 'secondary.main',
                fontWeight: 600,
              },
              ...(onChapterClick && {
                '&:hover .MuiStepLabel-label': {
                  color: 'secondary.main',
                },
              }),
            }}
          >
            Chapter {index + 1}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
}

export default ChapterNav;
