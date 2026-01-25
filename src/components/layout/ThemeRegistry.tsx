'use client';

import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, useThemeMode } from '@/context/ThemeContext';
import { darkTheme, lightTheme } from '@/theme';

// Inner component that uses the theme context
function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedMode } = useThemeMode();
  const theme = resolvedMode === 'dark' ? darkTheme : lightTheme;

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

// Main registry that provides both contexts
export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <MuiThemeWrapper>{children}</MuiThemeWrapper>
    </ThemeProvider>
  );
}
