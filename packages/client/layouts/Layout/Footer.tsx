import { Box } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

import { Link } from '../../components/ui';

const footerStyles: SxProps<Theme> = {
  position: 'static',
  display: 'flex',
  justifyContent: 'flex-end',
  p: 3,
  bgcolor: 'secondary.dark',
};

const linkStyles: SxProps<Theme> = {
  color: 'white',
  '&:hover': {
    color: 'accent.main',
  },
};

const Footer: React.FC = () => (
  <Box component="footer" sx={footerStyles}>
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Link color="secondary" href="/" sx={linkStyles}>
        Home
      </Link>
      <Link color="secondary" href="/about/terms-of-service" sx={linkStyles}>
        Terms of service
      </Link>
      <Link color="secondary" href="/about/privacy" sx={linkStyles}>
        Privacy
      </Link>
      <Link
        color="secondary"
        href="mailto:t.uddin9121@gmail.com"
        sx={linkStyles}
      >
        Contact
      </Link>
    </Box>
  </Box>
);

export default Footer;
