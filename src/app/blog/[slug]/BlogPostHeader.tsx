'use client';

import Image from 'next/image';
import { Typography, Stack, Box } from '@mui/material';
import Tag from '@/components/Tag';
import SiteEvolutionContext from '@/components/SiteEvolutionContext';
import { GifPlayer } from '@/components/GifPlayer';
import BlogBackLink from './BlogBackLink';
import type { BlogPostMeta } from '@/lib/blog';

interface BlogPostHeaderProps {
  post: BlogPostMeta;
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {

  const formatDate = (dateString: string): string => {
    // Parse as local date to avoid timezone shift
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Stack spacing={3} sx={{ mb: 4 }}>
      {/* Back link - shows either "Back to the Journey" or "Back to Blog" based on referrer */}
      <BlogBackLink version={post.version} />

      {/* Hero image - use GifPlayer for animated content */}
      {post.image && (
        post.image.endsWith('.gif') ? (
          <GifPlayer src={post.image} alt={post.title} />
        ) : (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: 2,
              overflow: 'hidden',
              backgroundColor: 'background.paper',
            }}
          >
            <Image
              src={post.image}
              alt={post.title}
              fill
              style={{ objectFit: 'cover' }}
              priority
            />
          </Box>
        )
      )}

      {/* Site Evolution context banner */}
      {post.version && <SiteEvolutionContext version={post.version} />}

      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
        <Typography variant="caption" color="text.secondary">
          {formatDate(post.date)}
          {post.updatedOn && ` · Updated ${formatDate(post.updatedOn)}`}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {post.readingTime}
        </Typography>
        {post.version && (
          <Tag
            label={post.version}
            size="small"
            variant="outlined"
            sx={{ height: 20, fontSize: '0.7rem' }}
          />
        )}
      </Stack>
      {post.tags.length > 0 && (
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {post.tags.map((tag) => (
            <Tag key={tag} label={tag} variant="secondary" />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
