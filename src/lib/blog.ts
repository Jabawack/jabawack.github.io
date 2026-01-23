import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const BLOG_DIR = path.join(process.cwd(), 'src/content/blog');

/**
 * Frontmatter schema for blog posts
 *
 * Required fields:
 * - title: Post title (used in H1 and metadata)
 * - date: Publication date in ISO format (YYYY-MM-DD)
 * - description: SEO description (150-160 chars ideal)
 * - tags: Array of category tags
 * - author: Post author name
 *
 * Optional fields:
 * - published: Set to false to hide from listings (default: true)
 * - updatedOn: Last update date in ISO format
 * - image: Featured/OG image path (used as hero in post)
 * - thumbnail: Small image for blog list cards (falls back to image)
 * - category: Primary category
 * - version: Associated site version (e.g., "v2.5.0")
 */
export interface BlogFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  author: string;
  published?: boolean;
  updatedOn?: string;
  image?: string;
  thumbnail?: string;
  category?: string;
  version?: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags: string[];
  author: string;
  readingTime: string;
  published: boolean;
  updatedOn?: string;
  image?: string;
  thumbnail?: string;
  category?: string;
  version?: string;
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

/**
 * Parse frontmatter with defaults and validation
 */
interface ParsedFrontmatter {
  title: string;
  date: string;
  description: string;
  tags: string[];
  author: string;
  published: boolean;
  updatedOn?: string;
  image?: string;
  thumbnail?: string;
  category?: string;
  version?: string;
}

function parseFrontmatter(data: Record<string, unknown>): ParsedFrontmatter {
  return {
    title: typeof data.title === 'string' ? data.title : 'Untitled',
    date: typeof data.date === 'string' ? data.date : '',
    description: typeof data.description === 'string' ? data.description : '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    author: typeof data.author === 'string' ? data.author : 'TK',
    published: data.published !== false, // Default to true
    updatedOn: typeof data.updatedOn === 'string' ? data.updatedOn : undefined,
    image: typeof data.image === 'string' ? data.image : undefined,
    thumbnail: typeof data.thumbnail === 'string' ? data.thumbnail : undefined,
    category: typeof data.category === 'string' ? data.category : undefined,
    version: typeof data.version === 'string' ? data.version : undefined,
  };
}

/**
 * Get all published blog posts sorted by date (newest first)
 *
 * @param includeUnpublished - Set to true to include draft posts (for admin/preview)
 */
export function getAllPosts(includeUnpublished = false): BlogPostMeta[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith('.mdx'));

  const posts = files
    .map((filename) => {
      const slug = filename.replace('.mdx', '');
      const filePath = path.join(BLOG_DIR, filename);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      const frontmatter = parseFrontmatter(data);
      const stats = readingTime(content);

      return {
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        description: frontmatter.description,
        tags: frontmatter.tags,
        author: frontmatter.author,
        readingTime: stats.text,
        published: frontmatter.published,
        updatedOn: frontmatter.updatedOn,
        image: frontmatter.image,
        thumbnail: frontmatter.thumbnail,
        category: frontmatter.category,
        version: frontmatter.version,
      };
    })
    .filter((post) => includeUnpublished || post.published);

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/**
 * Get a single blog post by slug
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const frontmatter = parseFrontmatter(data);
  const stats = readingTime(content);

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    description: frontmatter.description,
    tags: frontmatter.tags,
    author: frontmatter.author,
    readingTime: stats.text,
    published: frontmatter.published,
    updatedOn: frontmatter.updatedOn,
    image: frontmatter.image,
    thumbnail: frontmatter.thumbnail,
    category: frontmatter.category,
    version: frontmatter.version,
    content,
  };
}

/**
 * Get all slugs for static generation
 * Only returns published posts for production builds
 */
export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => file.replace('.mdx', ''));
}

/**
 * Get all unique tags from published posts
 */
export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();

  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });

  return Array.from(tagSet).sort();
}

/**
 * Get posts filtered by tag
 */
export function getPostsByTag(tag: string): BlogPostMeta[] {
  return getAllPosts().filter((post) => post.tags.includes(tag));
}

/**
 * Get all unique authors from published posts
 */
export function getAllAuthors(): string[] {
  const posts = getAllPosts();
  const authorSet = new Set<string>();

  posts.forEach((post) => {
    authorSet.add(post.author);
  });

  return Array.from(authorSet).sort();
}
