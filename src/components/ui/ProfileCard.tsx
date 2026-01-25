'use client';

import React from 'react';
import { Box, Grid, Paper, Typography, Button } from '@mui/material';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import EmailIcon from '@mui/icons-material/Email';

export interface StatItem {
  value: string | number;
  label: string;
  color?: string;
}

export interface ProfileCardProps {
  stats: StatItem[];
}

const socialLinks = [
  { icon: <LinkedInIcon />, label: 'LinkedIn', href: 'https://linkedin.com/in/tkhfes' },
  { icon: <GitHubIcon />, label: 'GitHub', href: 'https://github.com/jabawack' },
  { icon: <EmailIcon />, label: 'Email', href: 'mailto:tk.hfes@gmail.com' },
];

export const ProfileCard: React.FC<ProfileCardProps> = ({ stats }) => {
  const gridSize = 12 / stats.length;

  return (
    <Paper sx={{ p: 3 }}>
      <Grid container sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Grid key={index} size={gridSize} sx={{ textAlign: 'center' }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: stat.color || 'text.primary',
              }}
            >
              {stat.value}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {stat.label}
            </Typography>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={2}>
        {socialLinks.map((link) => (
          <Grid key={link.label} size={4}>
            <Button
              variant="text"
              size="small"
              fullWidth
              startIcon={link.icon}
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              sx={{ color: 'text.primary' }}
            >
              {link.label}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default ProfileCard;
