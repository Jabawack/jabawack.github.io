'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Container,
  useScrollTrigger,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Portfolio', href: '/portfolio/' },
  { label: 'About', href: '/about/' },
  { label: 'Resume', href: '/resume/' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const scrollTrigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  // Only use scroll trigger after mount to avoid hydration mismatch
  const trigger = mounted && scrollTrigger;

  // Check if nav item is active (exact match for home, startsWith for others)
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    // Normalize: remove trailing slash for consistent comparison
    const normalizedHref = href.replace(/\/$/, '');
    const normalizedPath = pathname.replace(/\/$/, '');
    return normalizedPath === normalizedHref || normalizedPath.startsWith(normalizedHref + '/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={trigger ? 4 : 0}
        sx={{
          backgroundColor: trigger ? 'rgba(0, 0, 0, 0.95)' : 'transparent',
          transition: 'background-color 0.3s ease',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
            {/* Logo */}
            <Link href="/">
              <Box
                component="img"
                src="/images/logo.svg"
                alt="TK"
                sx={{
                  height: 32,
                  width: 'auto',
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Button
                    key={item.label}
                    component={Link}
                    href={item.href}
                    sx={{
                      color: active ? 'secondary.main' : 'text.primary',
                      fontWeight: active ? 600 : 400,
                      position: 'relative',
                      '&::after': active ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 6,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '60%',
                        height: 2,
                        backgroundColor: 'secondary.main',
                        borderRadius: 1,
                      } : {},
                      '&:hover': {
                        color: 'secondary.main',
                        backgroundColor: 'transparent',
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                );
              })}
            </Box>

            {/* Mobile Menu Button */}
            <IconButton
              color="inherit"
              aria-label="open menu"
              edge="end"
              onClick={handleDrawerToggle}
              sx={{ display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{
          display: { md: 'none' },
          '& .MuiDrawer-paper': {
            width: '100%',
            maxWidth: 300,
            backgroundColor: 'background.default',
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'flex-end' }}>
          <IconButton onClick={handleDrawerToggle} color="inherit">
            <CloseIcon />
          </IconButton>
        </Box>
        <List>
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={Link}
                  href={item.href}
                  onClick={handleDrawerToggle}
                  sx={{
                    py: 2,
                    backgroundColor: active ? 'rgba(0, 247, 255, 0.1)' : 'transparent',
                    borderLeft: active ? '3px solid' : '3px solid transparent',
                    borderColor: active ? 'secondary.main' : 'transparent',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 247, 255, 0.1)',
                    },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '1.25rem',
                      fontWeight: active ? 600 : 500,
                      color: active ? 'secondary.main' : 'text.primary',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>

      {/* Toolbar spacer */}
      <Toolbar />
    </>
  );
}
