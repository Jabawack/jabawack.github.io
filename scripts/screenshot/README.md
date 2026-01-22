# Screenshot Capture Utility

Playwright-based screenshot capture for blog posts and documentation.

## Quick Start

```bash
# Capture "before" state before implementing a feature
npm run screenshot:before ai-loading-polish

# Implement your changes...

# Capture "after" state
npm run screenshot:after ai-loading-polish
```

## CLI Usage

```bash
# Full help
npx tsx scripts/screenshot/cli.ts --help

# Capture before/after for a feature
npx tsx scripts/screenshot/cli.ts --before <feature-name>
npx tsx scripts/screenshot/cli.ts --after <feature-name>

# Capture specific Storybook story
npx tsx scripts/screenshot/cli.ts --story components-aithinkingflow--reveal-streaming --output ./screenshot.png

# Capture from any URL
npx tsx scripts/screenshot/cli.ts --url http://localhost:3000/blog --output ./blog.png

# With custom wait time
npx tsx scripts/screenshot/cli.ts --url http://localhost:3000 --output ./home.png --wait 3000
```

## Before/After Workflow

When implementing a feature that needs blog documentation:

### 1. Before Implementation

```bash
npm run screenshot:before my-feature-name
```

This captures:
- Storybook main view (if running)
- Dev server home page
- Key pages (/portfolio/site-evolution/, /portfolio/design-system/, /blog/)

Screenshots saved to: `public/images/blog/_captures/my-feature-name/`

### 2. Implement Your Changes

Make your code changes as normal.

### 3. After Implementation

```bash
npm run screenshot:after my-feature-name
```

Captures the same pages with the new changes.

### 4. Use in Blog Post

Move relevant screenshots to your blog post directory:

```bash
mkdir -p public/images/blog/my-blog-post-slug
cp public/images/blog/_captures/my-feature-name/before-*.png public/images/blog/my-blog-post-slug/01-before.png
cp public/images/blog/_captures/my-feature-name/after-*.png public/images/blog/my-blog-post-slug/02-after.png
```

## Blog Config Files

For complex blog posts with multiple screenshots, create a config file:

```json
{
  "targets": [
    {
      "id": "01-streaming",
      "name": "Streaming animation",
      "url": "http://localhost:6006/iframe.html?id=components-aithinkingflow--reveal-streaming&viewMode=story",
      "waitMs": 500
    },
    {
      "id": "02-controls",
      "name": "Storybook controls",
      "url": "http://localhost:6006/?path=/story/components-aithinkingflow--reveal-streaming",
      "waitMs": 2000
    }
  ]
}
```

Then run:

```bash
npx tsx scripts/screenshot/cli.ts --blog my-blog-slug --config ./my-config.json
```

## Finding Storybook Story IDs

```bash
# List all stories
curl -s http://localhost:6006/index.json | jq 'keys'

# Or check in browser: http://localhost:6006
# The story ID is in the URL: ?path=/story/<story-id>
```

## Requirements

- Storybook running on port 6006 (`npm run storybook`)
- Dev server running on port 3000 (`npm run dev:next`)
- Playwright installed (included in devDependencies)

## Output

Screenshots are saved at 2x resolution (retina) with 1400x900 viewport.

Metadata JSON is saved with each capture:
```json
{
  "feature": "my-feature",
  "phase": "before",
  "timestamp": "2026-01-20T...",
  "gitBranch": "feature-branch",
  "gitCommit": "abc1234"
}
```
