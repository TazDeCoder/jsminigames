import { Box, Typography, Divider } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

type Props = {
  children: React.ReactNode;
  title: string;
};

const docStyles: SxProps<Theme> = {
  maxWidth: '45rem',
  width: '95%',
  height: '80%',
  p: 3,
  overflowY: 'auto',
  bgcolor: 'secondary.main',
  borderRadius: 1,
};

const Document: React.FC<Props> = ({ children, title }) => (
  <Box sx={docStyles}>
    <Typography component="h1" variant="h4" align="center" mb={1}>
      {title}
    </Typography>
    <Divider sx={{ my: 1 }} />
    <Box
      component="section"
      sx={{
        '& p': {
          my: 1,
        },
        '& h1': {
          color: 'accent.light',
          fontWeight: 600,
        },
        '& h2': {
          color: 'accent.light',
          fontWeight: 900,
        },
      }}
    >
      {children}
    </Box>
  </Box>
);

export default Document;
