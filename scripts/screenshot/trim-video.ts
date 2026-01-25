#!/usr/bin/env tsx
/**
 * Trim a video to a specific time range
 *
 * Usage:
 *   npx tsx scripts/screenshot/trim-video.ts --input <path> --output <path> --start <seconds> --duration <seconds>
 *
 * Examples:
 *   # Trim from 15s to 23s (8 seconds duration)
 *   npx tsx scripts/screenshot/trim-video.ts \
 *     --input "public/images/blog/my-post/raw.mp4" \
 *     --output "public/images/blog/my-post/before.mp4" \
 *     --start 15 \
 *     --duration 8
 */

import * as fs from 'fs';
import { execSync } from 'child_process';

interface TrimOptions {
  input: string;
  output: string;
  start: number;
  duration: number;
}

function trimVideo(options: TrimOptions): void {
  const { input, output, start, duration } = options;

  if (!fs.existsSync(input)) {
    throw new Error(`Input file not found: ${input}`);
  }

  console.log(`Trimming video:`);
  console.log(`  Input: ${input}`);
  console.log(`  Output: ${output}`);
  console.log(`  Start: ${start}s`);
  console.log(`  Duration: ${duration}s`);

  execSync(
    `ffmpeg -y -ss ${start} -i "${input}" -t ${duration} -movflags faststart -pix_fmt yuv420p -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" "${output}"`,
    { stdio: 'pipe' }
  );

  const stats = fs.statSync(output);
  console.log(`  Done: ${output} (${(stats.size / 1024).toFixed(0)}KB)`);
}

// CLI
function parseArgs(): TrimOptions {
  const args = process.argv.slice(2);
  const get = (flag: string) => {
    const i = args.indexOf(flag);
    return i !== -1 ? args[i + 1] : undefined;
  };

  if (args.includes('--help') || !get('--input') || !get('--output') || !get('--start') || !get('--duration')) {
    console.log(`
Trim a video to a specific time range

Usage:
  npx tsx scripts/screenshot/trim-video.ts --input <path> --output <path> --start <seconds> --duration <seconds>

Options:
  --input <path>      Input video file (required)
  --output <path>     Output video file (required)
  --start <seconds>   Start time in seconds (required)
  --duration <seconds> Duration in seconds (required)
  --help              Show this help

Examples:
  # Trim from 15s mark, 8 second clip
  npx tsx scripts/screenshot/trim-video.ts --input raw.mp4 --output trimmed.mp4 --start 15 --duration 8
`);
    process.exit(args.includes('--help') ? 0 : 1);
  }

  return {
    input: get('--input')!,
    output: get('--output')!,
    start: parseFloat(get('--start')!),
    duration: parseFloat(get('--duration')!),
  };
}

trimVideo(parseArgs());
