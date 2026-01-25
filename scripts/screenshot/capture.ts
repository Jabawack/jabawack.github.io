/**
 * Core screenshot capture utilities using Playwright
 */

import { chromium, Browser, Page } from 'playwright';
import * as path from 'path';
import * as fs from 'fs';
import { CONFIG, CaptureTarget, BlogScreenshotConfig } from './config';

let browser: Browser | null = null;

export async function initBrowser(): Promise<Browser> {
  if (!browser) {
    browser = await chromium.launch({ headless: CONFIG.HEADLESS });
  }
  return browser;
}

export async function closeBrowser(): Promise<void> {
  if (browser) {
    await browser.close();
    browser = null;
  }
}

export async function createPage(): Promise<Page> {
  const b = await initBrowser();
  const context = await b.newContext({
    viewport: CONFIG.VIEWPORT,
    deviceScaleFactor: CONFIG.DEVICE_SCALE_FACTOR,
    colorScheme: 'dark', // Default to dark mode for screenshots
  });
  return context.newPage();
}

export async function captureScreenshot(
  page: Page,
  target: CaptureTarget,
  outputPath: string
): Promise<{ success: boolean; path?: string; error?: string }> {
  try {
    // Set dark mode in localStorage before navigating
    await page.addInitScript(() => {
      localStorage.setItem('theme-mode', 'dark');
    });

    // Navigate to URL
    await page.goto(target.url, {
      timeout: CONFIG.NAVIGATION_TIMEOUT,
      waitUntil: 'networkidle',
    });

    // Wait for initial render
    await page.waitForTimeout(target.waitMs || CONFIG.DEFAULT_WAIT);

    // Execute any actions
    if (target.actions) {
      for (const action of target.actions) {
        switch (action.type) {
          case 'click':
            if (action.selector) {
              await page.click(action.selector);
              await page.waitForTimeout(CONFIG.ANIMATION_WAIT);
            }
            break;
          case 'wait':
            await page.waitForTimeout(action.ms || 1000);
            break;
          case 'scroll':
            await page.evaluate((y) => window.scrollTo(0, y), action.y || 0);
            await page.waitForTimeout(CONFIG.ANIMATION_WAIT);
            break;
        }
      }
    }

    // Ensure output directory exists
    const dir = path.dirname(outputPath);
    fs.mkdirSync(dir, { recursive: true });

    // Capture screenshot as JPEG with quality 80 for smaller file sizes
    await page.screenshot({
      path: outputPath,
      clip: target.clip,
      type: outputPath.endsWith('.jpg') || outputPath.endsWith('.jpeg') ? 'jpeg' : 'png',
      quality: outputPath.endsWith('.jpg') || outputPath.endsWith('.jpeg') ? 80 : undefined,
    });

    return { success: true, path: outputPath };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function captureBlogScreenshots(
  config: BlogScreenshotConfig
): Promise<{ success: boolean; captured: string[]; failed: string[] }> {
  const outputDir = path.join(CONFIG.OUTPUT_BASE, config.slug);
  const page = await createPage();
  const captured: string[] = [];
  const failed: string[] = [];

  console.log(`\nCapturing screenshots for: ${config.slug}`);
  console.log(`Output: ${outputDir}\n`);

  for (const target of config.targets) {
    const outputPath = path.join(outputDir, `${target.id}.jpg`);
    console.log(`  ${target.name}...`);

    const result = await captureScreenshot(page, target, outputPath);

    if (result.success) {
      console.log(`    ✓ ${target.id}.jpg`);
      captured.push(target.id);
    } else {
      console.log(`    ✗ Failed: ${result.error}`);
      failed.push(target.id);
    }
  }

  await page.context().close();
  return { success: failed.length === 0, captured, failed };
}

/**
 * Capture a single screenshot from a URL
 */
export async function captureUrl(
  url: string,
  outputPath: string,
  options?: {
    waitMs?: number;
    actions?: CaptureTarget['actions'];
  }
): Promise<{ success: boolean; error?: string }> {
  const page = await createPage();

  const result = await captureScreenshot(
    page,
    {
      id: path.basename(outputPath, '.png'),
      name: outputPath,
      url,
      waitMs: options?.waitMs,
      actions: options?.actions,
    },
    outputPath
  );

  await page.context().close();
  return result;
}

/**
 * Capture Storybook story
 */
export async function captureStory(
  storyId: string,
  outputPath: string,
  options?: {
    waitMs?: number;
    actions?: CaptureTarget['actions'];
  }
): Promise<{ success: boolean; error?: string }> {
  const url = `${CONFIG.STORYBOOK_URL}/${CONFIG.STORY_URL_PATTERN(storyId)}`;
  return captureUrl(url, outputPath, options);
}
