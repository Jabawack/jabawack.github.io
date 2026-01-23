#!/usr/bin/env tsx
/**
 * Record video clips for blog posts
 *
 * Usage:
 *   npx tsx scripts/screenshot/record-video.ts --url <url> --output <path> --duration <ms>
 *   npx tsx scripts/screenshot/record-video.ts --url <url> --output <path> --click-at <ms>
 *
 * Examples:
 *   # Record 6 seconds of animation
 *   npx tsx scripts/screenshot/record-video.ts \
 *     --url "http://localhost:3000/portfolio/site-evolution/?tab=journey" \
 *     --output "public/images/blog/my-post/before.mp4" \
 *     --duration 6000
 *
 *   # Record with click action at 1.5s
 *   npx tsx scripts/screenshot/record-video.ts \
 *     --url "http://localhost:3000/portfolio/site-evolution/?tab=journey" \
 *     --output "public/images/blog/my-post/after.mp4" \
 *     --click-at 1500 \
 *     --duration 4000
 */

import { chromium } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';
import { execSync } from 'child_process';

interface RecordOptions {
  url: string;
  output: string;
  duration: number;
  clickAt?: number;
  theme?: 'dark' | 'light';
}

async function recordVideo(options: RecordOptions): Promise<void> {
  const { url, output, duration, clickAt, theme = 'dark' } = options;
  const outputDir = path.dirname(output);
  const outputName = path.basename(output, '.mp4');

  fs.mkdirSync(outputDir, { recursive: true });

  const browser = await chromium.launch({ headless: false });

  // First context: set localStorage WITHOUT recording
  const origin = new URL(url).origin;
  const setupContext = await browser.newContext({ viewport: { width: 1200, height: 800 } });
  const setupPage = await setupContext.newPage();
  await setupPage.goto(origin, { waitUntil: 'commit' });
  await setupPage.evaluate((t) => localStorage.setItem('theme-mode', t), theme);
  const storageState = await setupContext.storageState();
  await setupContext.close();

  // Second context: record with localStorage already set
  const tempDir = fs.mkdtempSync(path.join(outputDir, '.recording-'));
  const context = await browser.newContext({
    viewport: { width: 1200, height: 800 },
    storageState,
    recordVideo: { dir: tempDir, size: { width: 1200, height: 800 } },
  });

  const page = await context.newPage();
  console.log(`Recording: ${output}`);
  console.log(`  URL: ${url}`);
  console.log(`  Duration: ${duration}ms${clickAt ? `, click at ${clickAt}ms` : ''}`);

  await page.goto(url, { waitUntil: 'networkidle' });

  if (clickAt !== undefined) {
    await page.waitForTimeout(clickAt);
    console.log('  Clicking...');
    await page.click('body');
    await page.waitForTimeout(duration - clickAt);
  } else {
    await page.waitForTimeout(duration);
  }

  await context.close();
  await browser.close();

  // Find and convert the recorded webm to mp4
  const webmFiles = fs.readdirSync(tempDir).filter((f) => f.endsWith('.webm'));
  if (!webmFiles.length) throw new Error('No video recorded');

  const webmPath = path.join(tempDir, webmFiles[0]);
  const mp4Path = path.join(outputDir, `${outputName}.mp4`);

  console.log('  Converting to MP4...');
  execSync(
    `ffmpeg -y -i "${webmPath}" -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" "${mp4Path}"`,
    { stdio: 'pipe' }
  );

  // Cleanup temp directory
  fs.rmSync(tempDir, { recursive: true });

  const stats = fs.statSync(mp4Path);
  console.log(`  Done: ${mp4Path} (${(stats.size / 1024).toFixed(0)}KB)`);
}

// CLI
function parseArgs(): RecordOptions {
  const args = process.argv.slice(2);
  const get = (flag: string) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : undefined;
  };

  if (args.includes('--help') || !get('--url') || !get('--output')) {
    console.log(`
Record video clips for blog posts

Usage:
  npx tsx scripts/screenshot/record-video.ts --url <url> --output <path> [options]

Options:
  --url <url>         URL to record (required)
  --output <path>     Output MP4 path (required)
  --duration <ms>     Recording duration in milliseconds (default: 5000)
  --click-at <ms>     Click body at this time (optional)
  --theme <mode>      Theme mode: dark or light (default: dark)
  --help              Show this help

Requires:
  - Dev server running: npm run dev
  - ffmpeg installed: brew install ffmpeg
`);
    process.exit(args.includes('--help') ? 0 : 1);
  }

  return {
    url: get('--url')!,
    output: get('--output')!,
    duration: parseInt(get('--duration') || '5000', 10),
    clickAt: get('--click-at') ? parseInt(get('--click-at')!, 10) : undefined,
    theme: (get('--theme') as 'dark' | 'light') || 'dark',
  };
}

recordVideo(parseArgs()).catch((err) => {
  console.error(err);
  process.exit(1);
});
