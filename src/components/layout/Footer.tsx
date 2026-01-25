import { Box, Container, Typography, IconButton, Stack } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const socialLinks = [
  { icon: EmailIcon, href: 'mailto:tk.hfes@gmail.com', label: 'Email' },
  { icon: LinkedInIcon, href: 'https://www.linkedin.com/in/tkhfes/', label: 'LinkedIn' },
  { icon: GitHubIcon, href: 'https://github.com/Jabawack/', label: 'GitHub' },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        borderTop: '1px solid',
        borderColor: 'divider',
        backgroundColor: 'background.default',
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          spacing={2}
        >
          <Typography variant="body2" color="text.secondary">
            © 2017 - {new Date().getFullYear()}{' '}
            <Box
              component="a"
              href="https://jabawack.github.io"
              sx={{
                color: 'secondary.main',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              jabawack.github.io
            </Box>
          </Typography>

          <Stack direction="row" spacing={1}>
            {socialLinks.map((link) => (
              <IconButton
                key={link.label}
                component="a"
                href={link.href}
                target={link.href.startsWith('mailto') ? undefined : '_blank'}
                rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                aria-label={link.label}
                sx={{
                  color: 'text.secondary',
                  transition: 'color 0.2s ease, transform 0.2s ease',
                  '&:hover': {
                    color: 'secondary.main',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <link.icon />
              </IconButton>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
