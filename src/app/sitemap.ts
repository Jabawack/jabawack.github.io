import { MetadataRoute } from 'next';
import { allPages, siteConfig } from '@/config/seo';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

// Priority mapping for different page types
const getPriority = (path: string): number => {
  if (path === '/') return 1.0;
  if (path === '/portfolio/') return 0.9;
  if (path.startsWith('/portfolio/')) return 0.7;
  if (path === '/blog/') return 0.8;
  return 0.8;
};

// Change frequency mapping
const getChangeFrequency = (path: string): 'weekly' | 'monthly' => {
  if (path === '/portfolio/' || path === '/blog/') return 'weekly';
  if (path.startsWith('/portfolio/site-evolution')) return 'weekly';
  return 'monthly';
};

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // Static pages from seo.ts
  const staticPages: MetadataRoute.Sitemap = allPages.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency: getChangeFrequency(path),
    priority: getPriority(path),
  }));

  // Blog posts
  const posts = getAllPosts();
  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteConfig.url}/blog/${post.slug}/`,
    lastModified: post.updatedOn ? new Date(post.updatedOn) : new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...blogPages];
}
