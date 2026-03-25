'use client';

import { Box, Container, Typography, Stack, Button } from '@mui/material';
import { useTheme, alpha } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { motion } from 'framer-motion';

export default function ContactCTA() {
  const theme = useTheme();

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
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: '1.75rem', md: '2.25rem' },
            fontWeight: 600,
            mb: 2,
          }}
        >
          Let&apos;s Connect
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mb: 4, maxWidth: 420, mx: 'auto' }}
        >
          Interested in collaborating or just want to say hi? Reach out through any of these channels.
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
        >
          <Button
            variant="contained"
            color="secondary"
            startIcon={<EmailIcon />}
            href="mailto:tk.hfes@gmail.com"
            size="large"
          >
            Email
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<LinkedInIcon />}
            href="https://www.linkedin.com/in/tkhfes/"
            target="_blank"
            rel="noopener noreferrer"
            size="large"
          >
            LinkedIn
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<GitHubIcon />}
            href="https://github.com/Jabawack/"
            target="_blank"
            rel="noopener noreferrer"
            size="large"
          >
            GitHub
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
