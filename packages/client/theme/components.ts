import type { ThemeOptions } from '@mui/material/styles';

export default {
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          textTransform: 'none',
        },
      },
    },
  },
} as ThemeOptions;
