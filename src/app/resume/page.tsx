import { Box, Container, Typography, Stack, Button, Paper, Grid } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import { getMetadata } from '@/config/seo';

export const metadata = getMetadata('/resume/');
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ProfileCard from '@/components/ui/ProfileCard';

const RESUME_PDF_PATH = '/resume/TK_SWE_Resume.pdf';

export default function ResumePage() {
  return (
    <Box component="main" sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <Stack spacing={6}>
          {/* Header */}
          <Grid container spacing={4} alignItems="flex-start">
            <Grid size={{ xs: 12, md: 7 }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                }}
              >
                Resume
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                Download my resume or view it inline below.
              </Typography>
              {/* Download Buttons */}
              <Stack direction="row" spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<DownloadIcon />}
                  component="a"
                  href={RESUME_PDF_PATH}
                  download
                >
                  Download PDF
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<OpenInNewIcon />}
                  component="a"
                  href={RESUME_PDF_PATH}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in New Tab
                </Button>
              </Stack>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <ProfileCard
                stats={[
                  { value: '20+', label: 'Years', color: 'primary.light' },
                  { value: 5, label: 'Patents', color: 'success.light' },
                  { value: 2, label: 'M.S. Degrees', color: 'secondary.light' },
                ]}
              />
            </Grid>
          </Grid>

          {/* PDF Embed */}
          <Paper
            sx={{
              p: 2,
              backgroundColor: 'background.paper',
            }}
          >
            <Box
              component="iframe"
              src={RESUME_PDF_PATH}
              sx={{
                width: '100%',
                height: { xs: '500px', md: '800px' },
                border: 'none',
                borderRadius: 1,
              }}
              title="Taeho (TK) Kim Resume"
            />
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
