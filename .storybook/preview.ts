import type { Preview, ReactRenderer } from '@storybook/nextjs-vite';
import React from 'react';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { darkTheme, lightTheme } from '../src/theme';
import { ThemeProvider as AppThemeProvider } from '../src/context/ThemeContext';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: 'todo',
    },
    backgrounds: {
      disable: true, // Let MUI theme handle backgrounds
    },
  },
  decorators: [
    // App's custom ThemeProvider for useThemeMode hook
    (Story) => React.createElement(AppThemeProvider, null, React.createElement(Story)),
    // MUI theme provider with theme switcher
    withThemeFromJSXProvider<ReactRenderer>({
      themes: {
        dark: darkTheme,
        light: lightTheme,
      },
      defaultTheme: 'dark',
      Provider: MuiThemeProvider,
      GlobalStyles: CssBaseline,
    }),
  ],
};

export default preview;
