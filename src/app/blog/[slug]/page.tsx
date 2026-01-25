import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllSlugs, getPostBySlug } from '@/lib/blog';
import { siteConfig } from '@/config/seo';
import BlogPostHeader from './BlogPostHeader';
import BlogPostContent from './BlogPostContent';
import BlogAuthorFooter from '@/components/features/blog/BlogAuthorFooter';
import { Box, Container, Stack } from '@mui/material';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | ${siteConfig.name}`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `${siteConfig.url}/blog/${slug}/`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { default: MDXContent } = await import(`@/content/blog/${slug}.mdx`);

  return (
    <Box component="main" sx={{ py: 8 }}>
      <Container maxWidth="md">
        <Stack spacing={4}>
          <Box component="article">
            <BlogPostHeader post={post} />
            <BlogPostContent>
              <MDXContent />
            </BlogPostContent>
            <BlogAuthorFooter />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
