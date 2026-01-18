import { getMetadata } from '@/config/seo';
import { getAllPosts, getAllTags } from '@/lib/blog';
import BlogListClient from './BlogListClient';

export const metadata = getMetadata('/blog/');

export default function BlogPage() {
  const posts = getAllPosts();
  const allTags = getAllTags();
  return <BlogListClient posts={posts} allTags={allTags} />;
}
