'use client';

import { useState, useEffect, ReactNode, createContext, useContext, useMemo, memo } from 'react';
import {
  Box,
  Collapse,
  Typography,
  Chip,
  SxProps,
  Theme,
} from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import PsychologyIcon from '@mui/icons-material/Psychology';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CircularProgress from '@mui/material/CircularProgress';
import { SvgIconComponent } from '@mui/icons-material';

// Context for managing open state
interface ChainOfThoughtContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const ChainOfThoughtContext = createContext<ChainOfThoughtContextValue | null>(null);

const useChainOfThought = () => {
  const context = useContext(ChainOfThoughtContext);
  if (!context) {
    throw new Error('ChainOfThought components must be used within ChainOfThought');
  }
  return context;
};

// Main container
export interface ChainOfThoughtProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export const ChainOfThought = memo(function ChainOfThought({
  open,
  defaultOpen = true,
  onOpenChange,
  children,
  sx,
}: ChainOfThoughtProps) {
  const [isOpen, setIsOpenState] = useState(open ?? defaultOpen);

  // Sync with controlled prop
  useEffect(() => {
    if (open !== undefined) {
      setIsOpenState(open);
    }
  }, [open]);

  const setIsOpen = (newOpen: boolean) => {
    setIsOpenState(newOpen);
    onOpenChange?.(newOpen);
  };

  const contextValue = useMemo(() => ({ isOpen, setIsOpen }), [isOpen]);

  return (
    <ChainOfThoughtContext.Provider value={contextValue}>
      <Box sx={{ maxWidth: '65ch', ...sx }}>
        {children}
      </Box>
    </ChainOfThoughtContext.Provider>
  );
});

// Header with toggle
export interface ChainOfThoughtHeaderProps {
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

export const ChainOfThoughtHeader = memo(function ChainOfThoughtHeader({
  children,
  sx,
}: ChainOfThoughtHeaderProps) {
  const theme = useTheme();
  const { isOpen, setIsOpen } = useChainOfThought();

  return (
    <Box
      onClick={() => setIsOpen(!isOpen)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        cursor: 'pointer',
        color: 'text.secondary',
        transition: 'color 0.2s',
        py: 0.5,
        '&:hover': {
          color: 'text.primary',
        },
        ...sx,
      }}
    >
      <PsychologyIcon sx={{ fontSize: 18 }} />
      <Typography
        variant="body2"
        sx={{
          flex: 1,
          fontWeight: 500,
        }}
      >
        {children ?? 'Chain of Thought'}
      </Typography>
      <ExpandMoreIcon
        sx={{
          fontSize: 18,
          transition: 'transform 0.2s',
          transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
        }}
      />
    </Box>
  );
});

// Collapsible content wrapper
export interface ChainOfThoughtContentProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export const ChainOfThoughtContent = memo(function ChainOfThoughtContent({
  children,
  sx,
}: ChainOfThoughtContentProps) {
  const { isOpen } = useChainOfThought();

  return (
    <Collapse in={isOpen}>
      <Box
        sx={{
          mt: 1.5,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          ...sx,
        }}
      >
        {children}
      </Box>
    </Collapse>
  );
});

// Individual step
export type StepStatus = 'pending' | 'active' | 'complete';

export interface ChainOfThoughtStepProps {
  icon?: SvgIconComponent;
  label: ReactNode;
  description?: ReactNode;
  status?: StepStatus;
  children?: ReactNode;
  sx?: SxProps<Theme>;
}

export const ChainOfThoughtStep = memo(function ChainOfThoughtStep({
  icon: Icon,
  label,
  description,
  status = 'complete',
  children,
  sx,
}: ChainOfThoughtStepProps) {
  const theme = useTheme();

  const statusStyles: Record<StepStatus, { color: string; opacity: number }> = {
    complete: { color: theme.palette.text.secondary, opacity: 1 },
    active: { color: theme.palette.primary.main, opacity: 1 },
    pending: { color: theme.palette.text.secondary, opacity: 0.5 },
  };

  const getDefaultIcon = () => {
    switch (status) {
      case 'complete':
        return CheckCircleIcon;
      case 'active':
        return CircularProgress as unknown as SvgIconComponent;
      default:
        return RadioButtonUncheckedIcon;
    }
  };

  const StepIcon = Icon || getDefaultIcon();
  const isSpinner = status === 'active' && !Icon;

  return (
    <Box
      sx={{
        display: 'flex',
        gap: 1.5,
        color: statusStyles[status].color,
        opacity: statusStyles[status].opacity,
        '@keyframes fadeSlideIn': {
          from: {
            opacity: 0,
            transform: 'translateY(-8px)',
          },
          to: {
            opacity: statusStyles[status].opacity,
            transform: 'translateY(0)',
          },
        },
        animation: 'fadeSlideIn 0.3s ease-out',
        ...sx,
      }}
    >
      {/* Icon column with vertical line */}
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 0.25,
        }}
      >
        {isSpinner ? (
          <CircularProgress size={16} sx={{ color: 'inherit' }} />
        ) : (
          <StepIcon sx={{ fontSize: 16 }} />
        )}
        {/* Vertical connector line */}
        <Box
          sx={{
            position: 'absolute',
            top: 24,
            bottom: -12,
            left: '50%',
            width: 1,
            bgcolor: 'divider',
            transform: 'translateX(-50%)',
          }}
        />
      </Box>

      {/* Content column */}
      <Box sx={{ flex: 1, overflow: 'hidden', pb: 1 }}>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          {label}
        </Typography>
        {description && (
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              color: 'text.secondary',
              mt: 0.25,
            }}
          >
            {description}
          </Typography>
        )}
        {children}
      </Box>
    </Box>
  );
});

// Search results container
export interface ChainOfThoughtSearchResultsProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export const ChainOfThoughtSearchResults = memo(function ChainOfThoughtSearchResults({
  children,
  sx,
}: ChainOfThoughtSearchResultsProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 0.75,
        mt: 1,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
});

// Individual search result badge
export interface ChainOfThoughtSearchResultProps {
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export const ChainOfThoughtSearchResult = memo(function ChainOfThoughtSearchResult({
  children,
  sx,
}: ChainOfThoughtSearchResultProps) {
  return (
    <Chip
      label={children}
      size="small"
      variant="outlined"
      sx={{
        fontSize: '0.7rem',
        height: 22,
        ...sx,
      }}
    />
  );
});

// Image container with caption
export interface ChainOfThoughtImageProps {
  caption?: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
}

export const ChainOfThoughtImage = memo(function ChainOfThoughtImage({
  caption,
  children,
  sx,
}: ChainOfThoughtImageProps) {
  const theme = useTheme();

  return (
    <Box sx={{ mt: 1.5, ...sx }}>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: 350,
          overflow: 'hidden',
          borderRadius: 2,
          bgcolor: alpha(theme.palette.background.paper, 0.5),
          p: 1.5,
        }}
      >
        {children}
      </Box>
      {caption && (
        <Typography
          variant="caption"
          sx={{
            display: 'block',
            color: 'text.secondary',
            mt: 0.75,
          }}
        >
          {caption}
        </Typography>
      )}
    </Box>
  );
});

export default ChainOfThought;
