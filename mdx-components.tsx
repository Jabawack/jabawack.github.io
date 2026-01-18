import type { MDXComponents } from 'mdx/types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Link as MuiLink,
} from '@mui/material';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    // Table components
    table: ({ children }) => (
      <TableContainer component={Paper} sx={{ my: 3 }}>
        <Table size="small">{children}</Table>
      </TableContainer>
    ),
    thead: ({ children }) => <TableHead>{children}</TableHead>,
    tbody: ({ children }) => <TableBody>{children}</TableBody>,
    tr: ({ children }) => <TableRow>{children}</TableRow>,
    th: ({ children }) => (
      <TableCell
        sx={{
          fontWeight: 600,
          backgroundColor: 'action.hover',
        }}
      >
        {children}
      </TableCell>
    ),
    td: ({ children }) => <TableCell>{children}</TableCell>,
    // Typography
    h1: ({ children }) => (
      <Typography variant="h1" sx={{ mt: 4, mb: 2 }}>
        {children}
      </Typography>
    ),
    h2: ({ children }) => (
      <Typography variant="h2" sx={{ mt: 4, mb: 2 }}>
        {children}
      </Typography>
    ),
    h3: ({ children }) => (
      <Typography variant="h3" sx={{ mt: 3, mb: 1.5 }}>
        {children}
      </Typography>
    ),
    h4: ({ children }) => (
      <Typography variant="h4" sx={{ mt: 2, mb: 1 }}>
        {children}
      </Typography>
    ),
    p: ({ children }) => (
      <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.7 }}>
        {children}
      </Typography>
    ),
    // Links
    a: ({ href, children }) => (
      <MuiLink href={href} target={href?.startsWith('http') ? '_blank' : undefined}>
        {children}
      </MuiLink>
    ),
    // Lists
    ul: ({ children }) => (
      <Box component="ul" sx={{ mb: 2, pl: 3 }}>
        {children}
      </Box>
    ),
    ol: ({ children }) => (
      <Box component="ol" sx={{ mb: 2, pl: 3 }}>
        {children}
      </Box>
    ),
    li: ({ children }) => (
      <Typography component="li" variant="body1" sx={{ mb: 0.5 }}>
        {children}
      </Typography>
    ),
    // Blockquote
    blockquote: ({ children }) => (
      <Box
        component="blockquote"
        sx={{
          borderLeft: 4,
          borderColor: 'primary.main',
          pl: 2,
          py: 1,
          my: 2,
          bgcolor: 'action.hover',
          borderRadius: 1,
        }}
      >
        {children}
      </Box>
    ),
    // Inline code
    code: ({ children, className }) => {
      // If it has a className, it's a code block (handled by rehype-pretty-code)
      if (className) {
        return <code className={className}>{children}</code>;
      }
      // Inline code
      return (
        <Box
          component="code"
          sx={{
            bgcolor: 'action.hover',
            px: 0.75,
            py: 0.25,
            borderRadius: 0.5,
            fontSize: '0.875em',
            fontFamily: 'monospace',
          }}
        >
          {children}
        </Box>
      );
    },
    // Horizontal rule
    hr: () => (
      <Box
        component="hr"
        sx={{
          my: 4,
          border: 'none',
          borderTop: 1,
          borderColor: 'divider',
        }}
      />
    ),
    // Strong/Bold
    strong: ({ children }) => (
      <Box component="strong" sx={{ fontWeight: 600 }}>
        {children}
      </Box>
    ),
    // Emphasis/Italic
    em: ({ children }) => <Box component="em">{children}</Box>,
  };
}
