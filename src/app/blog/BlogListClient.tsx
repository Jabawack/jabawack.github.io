'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Box,
  Container,
  Typography,
  Stack,
  Paper,
  Grid,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import Tag from '@/components/Tag';
import type { BlogPostMeta } from '@/lib/blog';
import type { SelectChangeEvent } from '@mui/material';

type SortOption = 'latest' | 'oldest' | 'author';

interface BlogListClientProps {
  posts: BlogPostMeta[];
  allTags: string[];
}

export default function BlogListClient({ posts, allTags }: BlogListClientProps) {
  const theme = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('latest');

  const formatDate = (dateString: string): string => {
    // Parse as local date to avoid timezone shift
    // "2026-01-20" should display as January 20, not January 19
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleTagChange = useCallback((e: SelectChangeEvent<string>) => {
    setSelectedTag(e.target.value);
  }, []);

  const handleSortChange = useCallback((e: SelectChangeEvent<string>) => {
    setSortBy(e.target.value as SortOption);
  }, []);

  const handleTagClick = useCallback((tag: string) => {
    setSelectedTag((prev) => (prev === tag ? '' : tag));
  }, []);

  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts];

    // Filter by search query (title and description)
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.description.toLowerCase().includes(query)
      );
    }

    // Filter by tag
    if (selectedTag) {
      result = result.filter((post) => post.tags.includes(selectedTag));
    }

    // Sort
    switch (sortBy) {
      case 'latest':
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'author':
        result.sort((a, b) => a.author.localeCompare(b.author));
        break;
    }

    return result;
  }, [posts, searchQuery, selectedTag, sortBy]);

  return (
    <Box component="main" sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Stack spacing={4}>
          {/* Header */}
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                mb: 2,
              }}
            >
              Blog
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700 }}>
              Articles about web development, design, and technology.
            </Typography>
          </Box>

          {/* Filters */}
          <Paper sx={{ p: 3 }}>
            <Grid container spacing={2} alignItems="center">
              {/* Search */}
              <Grid size={{ xs: 12, md: 5 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* Tag Filter */}
              <Grid size={{ xs: 6, md: 4 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Filter by Tag</InputLabel>
                  <Select
                    value={selectedTag}
                    label="Filter by Tag"
                    onChange={handleTagChange}
                  >
                    <MenuItem value="">All Tags</MenuItem>
                    {allTags.map((tag) => (
                      <MenuItem key={tag} value={tag}>
                        {tag}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Sort */}
              <Grid size={{ xs: 6, md: 3 }}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sort by</InputLabel>
                  <Select value={sortBy} label="Sort by" onChange={handleSortChange}>
                    <MenuItem value="latest">Latest First</MenuItem>
                    <MenuItem value="oldest">Oldest First</MenuItem>
                    <MenuItem value="author">Author</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Active filters display */}
            {(searchQuery || selectedTag) && (
              <Stack direction="row" spacing={1} sx={{ mt: 2 }} flexWrap="wrap" useFlexGap>
                {searchQuery && (
                  <Tag
                    label={`Search: "${searchQuery}"`}
                    size="small"
                    variant="secondary"
                    onDelete={() => setSearchQuery('')}
                  />
                )}
                {selectedTag && (
                  <Tag
                    label={`Tag: ${selectedTag}`}
                    size="small"
                    variant="secondary"
                    onDelete={() => setSelectedTag('')}
                  />
                )}
              </Stack>
            )}
          </Paper>

          {/* Results count */}
          <Typography variant="body2" color="text.secondary">
            {filteredAndSortedPosts.length === posts.length
              ? `${posts.length} post${posts.length !== 1 ? 's' : ''}`
              : `${filteredAndSortedPosts.length} of ${posts.length} posts`}
          </Typography>

          {/* Posts List */}
          {filteredAndSortedPosts.length === 0 ? (
            <Paper sx={{ p: 4 }}>
              <Typography color="text.secondary">
                {posts.length === 0
                  ? 'No blog posts yet. Check back soon!'
                  : 'No posts match your filters. Try adjusting your search.'}
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredAndSortedPosts.map((post) => (
                <Grid key={post.slug} size={{ xs: 12 }}>
                  <Paper
                    component={Link}
                    href={`/blog/${post.slug}/`}
                    sx={{
                      p: 3,
                      display: 'block',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                      {/* Thumbnail - prefer thumbnail field, fall back to image */}
                      {(post.thumbnail || post.image) && (
                        <Box
                          sx={{
                            position: 'relative',
                            width: { xs: '100%', sm: 200 },
                            minWidth: { sm: 200 },
                            aspectRatio: '16 / 9',
                            borderRadius: 1,
                            overflow: 'hidden',
                            backgroundColor: 'background.default',
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={post.thumbnail || post.image!}
                            alt={post.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 600px) 100vw, 200px"
                          />
                        </Box>
                      )}

                      <Stack spacing={1.5} sx={{ flexGrow: 1 }}>
                        {/* Title first */}
                        <Typography
                          variant="h5"
                          sx={{
                            fontWeight: 600,
                            color: 'text.primary',
                          }}
                        >
                          {post.title}
                        </Typography>

                        {/* Metadata second */}
                        <Stack
                          direction="row"
                          spacing={2}
                          alignItems="center"
                          flexWrap="wrap"
                          useFlexGap
                        >
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

                        {/* Description */}
                        <Typography variant="body2" color="text.secondary">
                          {post.description}
                        </Typography>
                        {post.tags.length > 0 && (
                          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                            {post.tags.map((tag) => (
                              <Tag
                                key={tag}
                                label={tag}
                                variant="secondary"
                                selected={selectedTag === tag}
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleTagClick(tag);
                                }}
                              />
                            ))}
                          </Stack>
                        )}
                      </Stack>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Stack>
      </Container>
    </Box>
  );
}
