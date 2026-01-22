#!/usr/bin/env tsx
/**
 * Record GIF animations for blog posts
 *
 * Usage:
 *   npx tsx scripts/screenshot/record-gif.ts --skip-animation
 *
 * Requires ffmpeg installed: brew install ffmpeg
 */

import { chromium, Browser, Page } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';
import { CONFIG } from './config';

const OUTPUT_DIR = path.join(CONFIG.OUTPUT_BASE, 'respecting-user-time');

interface RecordingOptions {
  url: string;
  outputName: string;
  duration: number; // ms
  actions?: Array<{
    type: 'click' | 'wait';
    delay: number; // ms from start
    selector?: string;
  }>;
}

async function recordVideo(options: RecordingOptions): Promise<string> {
  const browser = await chromium.launch({ headless: false }); // Need headed for smooth recording
  const context = await browser.newContext({
    viewport: { width: 1200, height: 800 },
    recordVideo: {
      dir: OUTPUT_DIR,
      size: { width: 1200, height: 800 },
    },
  });

  const page = await context.newPage();

  console.log(`Recording: ${options.outputName}`);
  console.log(`  URL: ${options.url}`);
  console.log(`  Duration: ${options.duration}ms`);

  // Navigate
  await page.goto(options.url, { waitUntil: 'networkidle' });

  // Execute timed actions
  if (options.actions) {
    const startTime = Date.now();

    for (const action of options.actions) {
      const elapsed = Date.now() - startTime;
      const waitTime = action.delay - elapsed;

      if (waitTime > 0) {
        await page.waitForTimeout(waitTime);
      }

      if (action.type === 'click' && action.selector) {
        console.log(`  Action: click ${action.selector} at ${action.delay}ms`);
        await page.click(action.selector);
      }
    }

    // Wait remaining duration
    const remaining = options.duration - (Date.now() - startTime);
    if (remaining > 0) {
      await page.waitForTimeout(remaining);
    }
  } else {
    await page.waitForTimeout(options.duration);
  }

  // Close to finalize video
  await context.close();
  await browser.close();

  // Get the video path (Playwright generates a random name)
  const files = fs.readdirSync(OUTPUT_DIR).filter((f) => f.endsWith('.webm'));
  const latestVideo = files
    .map((f) => ({
      name: f,
      time: fs.statSync(path.join(OUTPUT_DIR, f)).mtimeMs,
    }))
    .sort((a, b) => b.time - a.time)[0];

  if (!latestVideo) {
    throw new Error('No video file found');
  }

  const videoPath = path.join(OUTPUT_DIR, latestVideo.name);
  const outputPath = path.join(OUTPUT_DIR, `${options.outputName}.webm`);

  // Rename to desired name
  fs.renameSync(videoPath, outputPath);
  console.log(`  Video saved: ${outputPath}`);

  return outputPath;
}

function convertToGif(
  videoPath: string,
  gifPath: string,
  options?: { fps?: number; width?: number; speedup?: number }
): void {
  const fps = options?.fps || 15;
  const width = options?.width || 800;
  const speedup = options?.speedup || 1;

  console.log(`Converting to GIF: ${gifPath}`);
  console.log(`  FPS: ${fps}, Width: ${width}, Speedup: ${speedup}x`);

  // Two-pass for better quality
  // Pass 1: Generate palette
  const paletteCmd = `ffmpeg -y -i "${videoPath}" -vf "setpts=${1 / speedup}*PTS,fps=${fps},scale=${width}:-1:flags=lanczos,palettegen=stats_mode=diff" "${gifPath}.palette.png"`;

  // Pass 2: Use palette to create GIF
  const gifCmd = `ffmpeg -y -i "${videoPath}" -i "${gifPath}.palette.png" -lavfi "setpts=${1 / speedup}*PTS,fps=${fps},scale=${width}:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=5:diff_mode=rectangle" "${gifPath}"`;

  try {
    execSync(paletteCmd, { stdio: 'pipe' });
    execSync(gifCmd, { stdio: 'pipe' });

    // Cleanup palette
    fs.unlinkSync(`${gifPath}.palette.png`);

    const stats = fs.statSync(gifPath);
    console.log(`  GIF size: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
  } catch (error) {
    console.error('ffmpeg error. Is ffmpeg installed? (brew install ffmpeg)');
    throw error;
  }
}

async function recordSkipAnimation(): Promise<void> {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  const journeyUrl = 'http://localhost:3000/portfolio/site-evolution/?tab=journey';

  // Record 1: Before - watching animation (show ~5 seconds of waiting)
  console.log('\n=== Recording BEFORE (waiting animation) ===\n');
  const beforeVideo = await recordVideo({
    url: journeyUrl,
    outputName: 'before-waiting',
    duration: 6000, // 6 seconds of animation
  });

  // Record 2: After - click to skip (click after 2 seconds)
  console.log('\n=== Recording AFTER (click to skip) ===\n');
  const afterVideo = await recordVideo({
    url: journeyUrl,
    outputName: 'after-skip',
    duration: 4000, // 4 seconds total
    actions: [
      { type: 'wait', delay: 1500 }, // Wait 1.5s to show animation starting
      { type: 'click', delay: 1500, selector: 'body' }, // Click to skip
    ],
  });

  // Convert to GIFs
  console.log('\n=== Converting to GIFs ===\n');

  convertToGif(beforeVideo, path.join(OUTPUT_DIR, '01-before-waiting.gif'), {
    fps: 12,
    width: 700,
  });

  convertToGif(afterVideo, path.join(OUTPUT_DIR, '02-after-skip.gif'), {
    fps: 15,
    width: 700,
  });

  // Cleanup video files
  fs.unlinkSync(beforeVideo);
  fs.unlinkSync(afterVideo);

  console.log('\n=== Done! ===');
  console.log(`GIFs saved to: ${OUTPUT_DIR}`);
  console.log('  - 01-before-waiting.gif');
  console.log('  - 02-after-skip.gif');
}

// Main
const args = process.argv.slice(2);

if (args.includes('--help')) {
  console.log(`
Record GIF animations for blog posts

Usage:
  npx tsx scripts/screenshot/record-gif.ts --skip-animation

Options:
  --skip-animation    Record before/after GIFs for skip animation feature
  --help              Show this help

Requires:
  - Dev server running: npm run dev:next
  - ffmpeg installed: brew install ffmpeg
`);
  process.exit(0);
}

if (args.includes('--skip-animation')) {
  recordSkipAnimation().catch((err) => {
    console.error(err);
    process.exit(1);
  });
} else {
  console.log('Use --skip-animation to record. Use --help for more info.');
}
