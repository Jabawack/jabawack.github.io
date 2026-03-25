'use client';

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Button,
} from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { motion } from 'framer-motion';
import type { BlogPostMeta } from '@/lib/blog';

interface LatestPostsProps {
  posts: BlogPostMeta[];
}

export default function LatestPosts({ posts }: LatestPostsProps) {
  const theme = useTheme();

  if (posts.length === 0) return null;

  return (
    <Box
      component={motion.section}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
      sx={{
        py: { xs: 8, md: 12 },
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.75rem', md: '2.25rem' },
            fontWeight: 600,
            mb: 4,
            textAlign: 'center',
          }}
        >
          Latest Posts
        </Typography>

        <Grid container spacing={3}>
          {posts.map((post) => (
            <Grid key={post.slug} size={{ xs: 12, md: 4 }}>
              <Card
                component={Link}
                href={`/blog/${post.slug}/`}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: `0 8px 30px ${alpha(theme.palette.common.black, 0.3)}`,
                  },
                }}
              >
                {post.image && (
                  <CardMedia
                    component="img"
                    height="180"
                    image={post.image}
                    alt={post.title}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1, p: 2.5 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ mb: 0.5, display: 'block' }}
                  >
                    {new Date(post.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </Typography>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            component={Link}
            href="/blog/"
            variant="outlined"
            endIcon={<ArrowForwardIcon />}
          >
            View All Posts
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
