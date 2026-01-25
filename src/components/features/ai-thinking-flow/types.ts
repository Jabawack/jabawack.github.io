import { ReactNode } from 'react';

export type ThinkingPhase = 'loading' | 'waitingForContent' | 'fading' | 'complete';

export interface AIThinkingFlowProps {
  children: ReactNode;
  /** Enable/disable the thinking animation (default: true) */
  enabled?: boolean;
  /** Session storage key to skip animation on repeat visits */
  sessionKey?: string;
  /** Minimum time to show skeleton in ms (default: 2000) */
  minDuration?: number;
  /** Maximum time to wait before showing content as fallback in ms (default: 10000) */
  maxDuration?: number;
  /** Wait for images within children to load (default: true) */
  waitForImages?: boolean;
  /** Custom status messages to cycle through */
  statusMessages?: string[];
  /** Callback when animation completes */
  onComplete?: () => void;
}

export interface AIThinkingFlowSkeletonProps {
  /** Number of chapter cards to show skeleton for (default: 3) */
  cardCount?: number;
  /** Whether the skeleton is visible */
  visible: boolean;
  /** Callback when fade-out animation completes */
  onFadeComplete?: () => void;
}

export interface AIThinkingFlowStatusProps {
  /** Current message to display */
  message: string;
  /** Whether the status is visible */
  visible: boolean;
}

export interface ContentReadyState {
  /** Whether the minimum duration has elapsed */
  minDurationElapsed: boolean;
  /** Whether the content container is mounted */
  isMounted: boolean;
  /** Whether all images have loaded */
  imagesLoaded: boolean;
  /** Whether we're ready to show content */
  isReady: boolean;
}
