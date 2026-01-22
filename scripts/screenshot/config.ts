/**
 * Screenshot capture configuration
 */

export const CONFIG = {
  // Server URLs
  STORYBOOK_URL: process.env.STORYBOOK_URL || 'http://localhost:6006',
  DEV_URL: process.env.DEV_URL || 'http://localhost:3000',

  // Output settings
  OUTPUT_BASE: 'public/images/blog',

  // Browser settings
  VIEWPORT: { width: 1400, height: 900 },
  DEVICE_SCALE_FACTOR: 2, // Retina quality
  HEADLESS: true,

  // Timing
  DEFAULT_WAIT: 1000,
  ANIMATION_WAIT: 500,
  NAVIGATION_TIMEOUT: 30000,

  // Storybook story ID patterns
  STORY_URL_PATTERN: (storyId: string) =>
    `iframe.html?id=${storyId}&viewMode=story`,
};

export type CaptureTarget = {
  id: string;
  name: string;
  url: string;
  waitMs?: number;
  clip?: { x: number; y: number; width: number; height: number };
  actions?: Array<{
    type: 'click' | 'wait' | 'scroll';
    selector?: string;
    ms?: number;
    y?: number;
  }>;
};

export type BlogScreenshotConfig = {
  slug: string;
  targets: CaptureTarget[];
};
