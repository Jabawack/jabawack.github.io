'use client';

import { Typography, Stack, Chip } from '@mui/material';
import Tag from '@/components/Tag';
import type { BlogPostMeta } from '@/lib/blog';

interface BlogPostHeaderProps {
  post: BlogPostMeta;
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Stack spacing={2} sx={{ mb: 4 }}>
      <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap>
        <Typography variant="caption" color="text.secondary">
          {formatDate(post.date)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {post.readingTime}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          by {post.author}
        </Typography>
        {post.version && (
          <Chip
            label={`v${post.version}`}
            size="small"
            variant="outlined"
            sx={{ height: 20, fontSize: '0.7rem' }}
          />
        )}
      </Stack>
      {post.tags.length > 0 && (
        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
          {post.tags.map((tag) => (
            <Tag key={tag} label={tag} variant="primary" />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
