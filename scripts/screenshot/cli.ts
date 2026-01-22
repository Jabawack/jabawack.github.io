#!/usr/bin/env tsx
/**
 * Screenshot capture CLI
 *
 * Usage:
 *   npx tsx scripts/screenshot/cli.ts --blog <slug> --config <path>
 *   npx tsx scripts/screenshot/cli.ts --url <url> --output <path>
 *   npx tsx scripts/screenshot/cli.ts --story <storyId> --output <path>
 *   npx tsx scripts/screenshot/cli.ts --before <feature-name>
 *   npx tsx scripts/screenshot/cli.ts --after <feature-name>
 */

import * as path from 'path';
import * as fs from 'fs';
import {
  captureBlogScreenshots,
  captureUrl,
  captureStory,
  closeBrowser,
  initBrowser,
  createPage,
} from './capture';
import { CONFIG, BlogScreenshotConfig } from './config';

function parseArgs(args: string[]): Record<string, string | boolean> {
  const result: Record<string, string | boolean> = {};
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.startsWith('--')) {
      const key = arg.slice(2);
      const next = args[i + 1];
      if (next && !next.startsWith('--')) {
        result[key] = next;
        i++;
      } else {
        result[key] = true;
      }
    }
  }
  return result;
}

async function captureBeforeAfter(
  featureName: string,
  phase: 'before' | 'after'
): Promise<void> {
  const outputDir = path.join(CONFIG.OUTPUT_BASE, '_captures', featureName);
  fs.mkdirSync(outputDir, { recursive: true });

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const page = await createPage();

  console.log(`\nCapturing ${phase} screenshots for: ${featureName}`);
  console.log(`Output: ${outputDir}\n`);

  // Capture from Storybook if running
  try {
    const storybookUrl = `${CONFIG.STORYBOOK_URL}/?path=/story/`;
    await page.goto(storybookUrl, { timeout: 5000 });

    // Get list of visible stories from sidebar
    await page.waitForTimeout(2000);

    // Capture main Storybook view
    const sbPath = path.join(
      outputDir,
      `${phase}-storybook-${timestamp}.png`
    );
    await page.screenshot({ path: sbPath });
    console.log(`  ✓ Storybook: ${path.basename(sbPath)}`);
  } catch {
    console.log('  ⊘ Storybook not running, skipping');
  }

  // Capture from dev server if running
  try {
    await page.goto(CONFIG.DEV_URL, { timeout: 5000 });
    await page.waitForTimeout(1000);

    const devPath = path.join(outputDir, `${phase}-home-${timestamp}.png`);
    await page.screenshot({ path: devPath });
    console.log(`  ✓ Dev server: ${path.basename(devPath)}`);

    // Also capture any page that might be relevant based on feature name
    const relevantPages = [
      '/portfolio/site-evolution/',
      '/portfolio/design-system/',
      '/blog/',
    ];

    for (const pagePath of relevantPages) {
      try {
        await page.goto(`${CONFIG.DEV_URL}${pagePath}`, { timeout: 5000 });
        await page.waitForTimeout(1500);
        const filename = pagePath.replace(/\//g, '-').replace(/^-|-$/g, '');
        const pageCaptPath = path.join(
          outputDir,
          `${phase}-${filename || 'home'}-${timestamp}.png`
        );
        await page.screenshot({ path: pageCaptPath });
        console.log(`  ✓ ${pagePath}: ${path.basename(pageCaptPath)}`);
      } catch {
        // Page might not exist
      }
    }
  } catch {
    console.log('  ⊘ Dev server not running, skipping');
  }

  await page.context().close();

  // Save metadata
  const metaPath = path.join(outputDir, `${phase}-meta.json`);
  fs.writeFileSync(
    metaPath,
    JSON.stringify(
      {
        feature: featureName,
        phase,
        timestamp: new Date().toISOString(),
        gitBranch: getGitBranch(),
        gitCommit: getGitCommit(),
      },
      null,
      2
    )
  );
  console.log(`\n  Metadata saved: ${path.basename(metaPath)}`);
}

function getGitBranch(): string {
  try {
    const { execSync } = require('child_process');
    return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
  } catch {
    return 'unknown';
  }
}

function getGitCommit(): string {
  try {
    const { execSync } = require('child_process');
    return execSync('git rev-parse --short HEAD').toString().trim();
  } catch {
    return 'unknown';
  }
}

async function main(): Promise<void> {
  const args = parseArgs(process.argv.slice(2));

  try {
    await initBrowser();

    if (args.help) {
      console.log(`
Screenshot Capture CLI

Usage:
  npx tsx scripts/screenshot/cli.ts [options]

Options:
  --blog <slug>        Capture screenshots using blog config
  --config <path>      Path to blog screenshot config JSON
  --url <url>          Capture single URL
  --story <storyId>    Capture Storybook story
  --output <path>      Output path for single captures
  --before <feature>   Capture "before" state for a feature
  --after <feature>    Capture "after" state for a feature
  --wait <ms>          Wait time before capture (default: 1000)
  --help               Show this help

Examples:
  # Capture before implementing a feature
  npx tsx scripts/screenshot/cli.ts --before ai-loading-polish

  # Capture after implementing
  npx tsx scripts/screenshot/cli.ts --after ai-loading-polish

  # Capture specific Storybook story
  npx tsx scripts/screenshot/cli.ts --story components-aithinkingflow--reveal-streaming --output ./screenshot.png

  # Capture from URL
  npx tsx scripts/screenshot/cli.ts --url http://localhost:3000/blog --output ./blog.png
`);
      return;
    }

    if (args.before) {
      await captureBeforeAfter(args.before as string, 'before');
    } else if (args.after) {
      await captureBeforeAfter(args.after as string, 'after');
    } else if (args.blog && args.config) {
      const configPath = path.resolve(args.config as string);
      const config: BlogScreenshotConfig = JSON.parse(
        fs.readFileSync(configPath, 'utf-8')
      );
      config.slug = args.blog as string;
      const result = await captureBlogScreenshots(config);
      if (!result.success) {
        process.exit(1);
      }
    } else if (args.story && args.output) {
      const result = await captureStory(args.story as string, args.output as string, {
        waitMs: args.wait ? parseInt(args.wait as string) : undefined,
      });
      if (!result.success) {
        console.error(`Failed: ${result.error}`);
        process.exit(1);
      }
      console.log(`✓ Captured: ${args.output}`);
    } else if (args.url && args.output) {
      const result = await captureUrl(args.url as string, args.output as string, {
        waitMs: args.wait ? parseInt(args.wait as string) : undefined,
      });
      if (!result.success) {
        console.error(`Failed: ${result.error}`);
        process.exit(1);
      }
      console.log(`✓ Captured: ${args.output}`);
    } else {
      console.error('Invalid arguments. Use --help for usage.');
      process.exit(1);
    }
  } finally {
    await closeBrowser();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
