'use client';

import { Typography, Stack } from '@mui/material';
import Tag from '@/components/Tag';
import SiteEvolutionContext from '@/components/SiteEvolutionContext';
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
    <Stack spacing={2} sx={{ mb: 4 }}>
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
            <Tag key={tag} label={tag} variant="secondary" />
          ))}
        </Stack>
      )}
    </Stack>
  );
}
