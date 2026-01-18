# Blog System Architecture

> MDX-powered blog for jabawack.github.io using Next.js 15 App Router with static export.

## Table of Contents

- [Architecture Overview](#architecture-overview)
- [Folder Structure](#folder-structure)
- [Creating a New Post](#creating-a-new-post)
- [Frontmatter Schema](#frontmatter-schema)
- [Content Management](#content-management)
- [MDX Features](#mdx-features)
- [Technical Details](#technical-details)
- [Best Practices](#best-practices)

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        Build Time (SSG)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  src/content/blog/*.mdx                                        │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────┐     ┌─────────────────┐                   │
│  │   gray-matter   │────▶│  BlogPostMeta   │                   │
│  │  (frontmatter)  │     │   (TypeScript)  │                   │
│  └─────────────────┘     └─────────────────┘                   │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────┐     ┌─────────────────┐                   │
│  │   @next/mdx     │────▶│  React Server   │                   │
│  │   + rehype      │     │   Component     │                   │
│  └─────────────────┘     └─────────────────┘                   │
│         │                                                       │
│         ▼                                                       │
│  ┌─────────────────────────────────────────┐                   │
│  │            Static HTML (out/)            │                   │
│  │  /blog/index.html                        │                   │
│  │  /blog/[slug]/index.html                 │                   │
│  └─────────────────────────────────────────┘                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

**Key Design Decisions:**

| Decision | Rationale |
|----------|-----------|
| Local MDX files | No external CMS dependency, version-controlled content |
| `@next/mdx` over `next-mdx-remote` | Better maintained, smaller bundle, SSR-optimized |
| `gray-matter` for frontmatter | Industry standard, YAML parsing |
| `rehype-pretty-code` + Shiki | Syntax highlighting at build time (no client JS) |
| Server Components for MDX | Zero client-side MDX runtime shipped |

---

## Folder Structure

```
src/
├── content/
│   └── blog/
│       ├── README.md                          # This file
│       ├── building-mdx-blog-system.mdx       # v2.5.0 post
│       ├── orbit-lab-project-journey.mdx      # v2.6.0 post (draft)
│       └── [slug].mdx                         # kebab-case naming
│
├── lib/
│   └── blog.ts                                # Blog utilities
│       ├── getAllPosts()                      # List all posts (sorted by date)
│       ├── getPostBySlug()                    # Get single post
│       ├── getAllSlugs()                      # For generateStaticParams
│       ├── getAllTags()                       # Unique tags for filtering
│       ├── getPostsByTag()                    # Filter by tag
│       └── getAllAuthors()                    # Unique authors
│
├── app/
│   └── blog/
│       ├── page.tsx                           # /blog/ listing (Server)
│       ├── BlogListClient.tsx                 # Listing UI with filters (Client)
│       └── [slug]/
│           ├── page.tsx                       # Post page (Server)
│           ├── BlogPostHeader.tsx             # Meta display (Client)
│           └── BlogPostContent.tsx            # MDX wrapper (Client)
│
└── config/
    └── seo.ts                                 # /blog/ metadata

mdx-components.tsx                             # Root-level MDX config (REQUIRED)
```

---

## Creating a New Post

### Step 1: Create MDX File

Create a new `.mdx` file in `src/content/blog/`:

```bash
# Naming convention: kebab-case
src/content/blog/my-new-post.mdx
```

The filename becomes the URL slug: `/blog/my-new-post/`

### Step 2: Add Frontmatter

Every post MUST start with YAML frontmatter:

```yaml
---
title: "Your Post Title"
date: "2026-01-17"
description: "A brief description for SEO and previews (150-160 chars ideal)"
tags: ["React", "TypeScript", "Web Development"]
author: "TK"
---
```

### Step 3: Write Content

After the frontmatter, write your content in MDX (Markdown + JSX).

### Step 4: Verify

```bash
npm run build
```

Check that your post appears at:
- `/blog/` (in the listing)
- `/blog/my-new-post/` (the full post)

---

## Frontmatter Schema

### Required Fields

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `title` | string | Post title (used in H1 and metadata) | `"Building a 3D Flight Tracker"` |
| `date` | string | Publication date (ISO format) | `"2026-01-17"` |
| `description` | string | SEO description (150-160 chars) | `"How I built a real-time..."` |
| `tags` | string[] | Categories for filtering | `["React", "Three.js"]` |
| `author` | string | Post author name | `"TK"` |

### Optional Fields

| Field | Type | Description | Default |
|-------|------|-------------|---------|
| `published` | boolean | Set to `false` for drafts | `true` |
| `version` | string | Associated site version | - |
| `updatedOn` | string | Last update date | - |
| `image` | string | Featured/OG image path | - |
| `category` | string | Primary category | - |

### Example: Complete Frontmatter

```yaml
---
title: "Building orbit-lab-project: A 3D Flight Tracker"
date: "2026-01-20"
description: "How I built a real-time flight tracking visualization using Three.js, React, and WebGL"
tags: ["Three.js", "React", "WebGL", "TypeScript"]
author: "TK"
version: "2.6.0"
published: false
---
```

---

## Content Management

The blog listing page provides several ways to find content:

### Search

- Search by **title** and **description**
- Real-time filtering as you type
- Clear search with the X button

### Tag Filtering

- **Dropdown**: Select a tag from the "Filter by Tag" dropdown
- **Click tags**: Click any tag on a post card to filter by that tag
- Tags highlight when active

### Sorting

| Option | Description |
|--------|-------------|
| Latest First | Newest posts at top (default) |
| Oldest First | Oldest posts at top |
| Author | Alphabetically by author name |

### Drafts

Set `published: false` in frontmatter to hide a post from the listing:

```yaml
---
title: "Work in Progress"
published: false
---
```

Drafts are still generated at build time (for preview URLs) but hidden from the main listing.

---

## MDX Features

### Syntax Highlighting

Code blocks automatically get syntax highlighting via `rehype-pretty-code`:

````mdx
```typescript
interface User {
  id: string;
  name: string;
}
```
````

Supported languages: TypeScript, JavaScript, Python, Bash, JSON, CSS, HTML, and more.

### Standard Markdown

All standard Markdown features work:

```mdx
# Heading 1
## Heading 2
### Heading 3

**Bold** and *italic* text

- Bullet lists
- With items

1. Numbered lists
2. With items

> Blockquotes for callouts

[Links](https://example.com)

![Images](/images/example.png)

---

Horizontal rules
```

### Tables

```mdx
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

### JSX Components (Advanced)

You can import and use React components in MDX:

```mdx
import { Alert } from '@mui/material';

<Alert severity="info">
  This is an info alert inside MDX!
</Alert>
```

> **Note:** Custom components must be added to `mdx-components.tsx` for global availability.

---

## Technical Details

### How Posts Are Loaded

1. **Build time**: `getAllPosts()` reads all `.mdx` files from `src/content/blog/`
2. **Frontmatter parsing**: `gray-matter` extracts YAML metadata
3. **Reading time**: `reading-time` calculates estimated read duration
4. **Draft filtering**: Posts with `published: false` are excluded from listings
5. **Static generation**: `generateStaticParams()` pre-renders all post pages
6. **MDX compilation**: `@next/mdx` transforms MDX to React components

### Dependencies

```json
{
  "@next/mdx": "^15.x",
  "@mdx-js/loader": "^3.x",
  "@mdx-js/react": "^2.x",
  "gray-matter": "^4.x",
  "reading-time": "^1.x",
  "rehype-pretty-code": "^0.x",
  "shiki": "^1.x"
}
```

### Configuration Files

**`next.config.ts`**
```typescript
import createMDX from '@next/mdx';
import rehypePrettyCode from 'rehype-pretty-code';

const withMDX = createMDX({
  options: {
    rehypePlugins: [[rehypePrettyCode, { theme: 'github-dark' }]],
  },
});
```

**`mdx-components.tsx`** (root level - REQUIRED)
```typescript
import type { MDXComponents } from 'mdx/types';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components };
}
```

---

## Best Practices

### Content Guidelines

1. **Title**: Keep under 60 characters for SEO
2. **Description**: 150-160 characters, include keywords
3. **Tags**: 3-5 relevant tags, be consistent across posts
4. **Author**: Use consistent author names
5. **Slug**: Use descriptive kebab-case (e.g., `building-design-system`)

### File Naming

```
✓ my-awesome-post.mdx          # kebab-case
✓ react-hooks-guide.mdx        # descriptive
✓ 2026-01-17-new-feature.mdx   # optional date prefix

✗ MyAwesomePost.mdx            # no PascalCase
✗ my_awesome_post.mdx          # no snake_case
✗ post1.mdx                    # not descriptive
```

### Version Association

Associate posts with site versions using the `version` field:

```yaml
version: "2.5.0"
```

This displays as a badge on the post card and helps track which features were released together.

### Image Handling

Blog images live separately from MDX files to keep content clean:

```
public/
└── images/
    └── blog/
        └── [slug]/                    # folder name = post slug
            ├── hero.png               # featured/OG image
            ├── 01-before-feature.png  # numbered for order
            ├── 02-after-feature.png   # before/after pairs
            ├── 03-diagram.png
            └── ...
```

**Naming Conventions:**

| Pattern | Use Case | Example |
|---------|----------|---------|
| `hero.png` | Featured image for cards/OG | `hero.png` |
| `##-description.png` | Ordered screenshots | `01-old-tags.png` |
| `##-before-*.png` | Before state | `02-before-dark-mode.png` |
| `##-after-*.png` | After state | `03-after-dark-mode.png` |
| `diagram-*.png` | Architectural diagrams | `diagram-flow.png` |

**Reference in MDX:**

```mdx
## Before and After

The tags were hard to see in dark mode:

![Before: Low contrast tags](/images/blog/building-mdx-blog-system/01-before-tags.png)

After implementing the new Tag component:

![After: Improved visibility](/images/blog/building-mdx-blog-system/02-after-tags.png)
```

**Current Blog Image Folders:**

```
public/images/blog/
├── building-mdx-blog-system/    # v2.5.0 - MDX blog post
└── orbit-lab-project-journey/   # v2.6.0 - 3D flight tracker
```

### SEO Optimization

- Each post generates its own `<title>` and `<meta description>`
- Open Graph metadata is auto-generated from frontmatter
- Canonical URLs follow the pattern: `https://jabawack.github.io/blog/[slug]/`

---

## Troubleshooting

### Post not appearing in listing

1. Check frontmatter syntax (must be valid YAML)
2. Ensure `published` is not set to `false`
3. Ensure file extension is `.mdx`
4. Verify date format: `"YYYY-MM-DD"`
5. Run `npm run build` to check for errors

### Syntax highlighting not working

1. Verify language identifier after triple backticks
2. Check `rehype-pretty-code` is configured in `next.config.ts`
3. Rebuild: `npm run build`

### Build errors

```bash
# Check TypeScript
npx tsc --noEmit

# Check for MDX syntax errors
npm run build
```

---

## Future Enhancements

- [x] Draft posts (`published: false` filtering)
- [x] Search functionality
- [x] Tag-based filtering
- [x] Sort by author
- [ ] RSS feed generation
- [ ] Table of contents component
- [ ] Related posts suggestions
- [ ] Pagination (when posts > 10)

---

## References

- [Next.js MDX Guide](https://nextjs.org/docs/app/guides/mdx)
- [Josh Comeau's Blog Architecture](https://www.joshwcomeau.com/blog/how-i-built-my-blog/)
- [MDX Documentation](https://mdxjs.com/)
- [Shiki Syntax Highlighter](https://shiki.style/)
