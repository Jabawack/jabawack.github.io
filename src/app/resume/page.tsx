import { Box, Container, Typography, Stack, Button, Paper } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

export default function ResumePage() {
  return (
    <Box component="main" sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Header */}
          <Box>
            <Typography
              variant="h1"
              sx={{
                fontSize: { xs: '2rem', md: '3rem' },
                fontWeight: 700,
                mb: 2,
              }}
            >
              Resume
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
              Download my resume or view it inline below.
            </Typography>
          </Box>

          {/* Download Buttons */}
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DownloadIcon />}
              component="a"
              href="/TK_FE_Resume.pdf"
              download
            >
              Download PDF
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<OpenInNewIcon />}
              component="a"
              href="/TK_FE_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in New Tab
            </Button>
          </Stack>

          {/* PDF Embed */}
          <Paper
            sx={{
              p: 2,
              backgroundColor: 'background.paper',
            }}
          >
            <Box
              component="iframe"
              src="/TK_FE_Resume.pdf"
              sx={{
                width: '100%',
                height: { xs: '500px', md: '800px' },
                border: 'none',
                borderRadius: 1,
              }}
              title="TK Kim Resume"
            />
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
