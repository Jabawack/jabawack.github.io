/**
 * Blog Screenshot Capture Utility
 *
 * Usage:
 *   npx ts-node scripts/capture-screenshots.ts [slug] [options]
 *
 * Examples:
 *   # Capture specific URL for a blog post
 *   npx ts-node scripts/capture-screenshots.ts building-mdx-blog-system --url /blog/ --name 01-blog-listing
 *
 *   # Capture with dark mode
 *   npx ts-node scripts/capture-screenshots.ts building-mdx-blog-system --url /blog/ --name 02-dark-mode --dark
 *
 *   # Capture full page
 *   npx ts-node scripts/capture-screenshots.ts orbit-lab-project-journey --url /portfolio/ --name hero --full
 *
 * Prerequisites:
 *   - Run `npm run dev` in another terminal first
 *   - Playwright browsers installed: `npx playwright install chromium`
 */

import { chromium, type Page } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';

interface CaptureOptions {
  slug: string;
  url: string;
  name: string;
  dark?: boolean;
  full?: boolean;
  width?: number;
  height?: number;
  baseUrl?: string;
}

async function captureScreenshot(options: CaptureOptions): Promise<string> {
  const {
    slug,
    url,
    name,
    dark = false,
    full = false,
    width = 1280,
    height = 800,
    baseUrl = 'http://localhost:3000',
  } = options;

  // Ensure output directory exists
  const outputDir = path.join(process.cwd(), 'public', 'images', 'blog', slug);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width, height },
    colorScheme: dark ? 'dark' : 'light',
  });

  const page = await context.newPage();

  // Navigate to the URL
  const fullUrl = url.startsWith('http') ? url : `${baseUrl}${url}`;
  await page.goto(fullUrl, { waitUntil: 'networkidle' });

  // Wait a bit for any animations to settle
  await page.waitForTimeout(500);

  // Generate filename
  const suffix = dark ? '-dark' : '';
  const filename = `${name}${suffix}.png`;
  const filepath = path.join(outputDir, filename);

  // Capture screenshot
  await page.screenshot({
    path: filepath,
    fullPage: full,
  });

  await browser.close();

  return filepath;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args.includes('--help')) {
    console.log(`
Blog Screenshot Capture Utility

Usage:
  npx ts-node scripts/capture-screenshots.ts <slug> --url <path> --name <filename> [options]

Arguments:
  slug              Blog post slug (folder name in public/images/blog/)

Options:
  --url <path>      URL path to capture (e.g., /blog/, /portfolio/)
  --name <name>     Output filename without extension (e.g., 01-listing, hero)
  --dark            Capture in dark mode (adds -dark suffix)
  --full            Capture full page scroll
  --width <px>      Viewport width (default: 1280)
  --height <px>     Viewport height (default: 800)
  --base <url>      Base URL (default: http://localhost:3000)

Examples:
  # Capture blog listing page
  npx ts-node scripts/capture-screenshots.ts building-mdx-blog-system --url /blog/ --name 01-listing

  # Capture in both light and dark mode
  npx ts-node scripts/capture-screenshots.ts building-mdx-blog-system --url /blog/ --name 02-tags
  npx ts-node scripts/capture-screenshots.ts building-mdx-blog-system --url /blog/ --name 02-tags --dark

  # Capture full page
  npx ts-node scripts/capture-screenshots.ts orbit-lab-project-journey --url /blog/orbit-lab-project-journey/ --name hero --full
    `);
    process.exit(0);
  }

  // Parse arguments
  const slug = args[0];
  let url = '';
  let name = '';
  let dark = false;
  let full = false;
  let width = 1280;
  let height = 800;
  let baseUrl = 'http://localhost:3000';

  for (let i = 1; i < args.length; i++) {
    switch (args[i]) {
      case '--url':
        url = args[++i];
        break;
      case '--name':
        name = args[++i];
        break;
      case '--dark':
        dark = true;
        break;
      case '--full':
        full = true;
        break;
      case '--width':
        width = parseInt(args[++i], 10);
        break;
      case '--height':
        height = parseInt(args[++i], 10);
        break;
      case '--base':
        baseUrl = args[++i];
        break;
    }
  }

  if (!url || !name) {
    console.error('Error: --url and --name are required');
    process.exit(1);
  }

  console.log(`Capturing screenshot...`);
  console.log(`  Slug: ${slug}`);
  console.log(`  URL: ${url}`);
  console.log(`  Name: ${name}`);
  console.log(`  Mode: ${dark ? 'dark' : 'light'}`);
  console.log(`  Full page: ${full}`);

  try {
    const filepath = await captureScreenshot({
      slug,
      url,
      name,
      dark,
      full,
      width,
      height,
      baseUrl,
    });
    console.log(`\nSaved: ${filepath}`);
    console.log(`\nUse in MDX:`);
    console.log(`![Description](/images/blog/${slug}/${path.basename(filepath)})`);
  } catch (error) {
    console.error('Error capturing screenshot:', error);
    process.exit(1);
  }
}

main();
