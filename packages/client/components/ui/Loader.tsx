import { motion } from 'framer-motion';
import Box from '@mui/material/Box';
import type { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { SxProps, Theme } from '@mui/material/styles';

export interface LoaderProps extends BoxProps {
  message: string;
}

const wrapperStyles: SxProps<Theme> = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%)',
};

export const Loader: React.FC<LoaderProps> = ({ message, sx, ...props }) => (
  <Box sx={{ ...wrapperStyles, ...sx }} {...props}>
    <Typography
      component={motion.p}
      initial={{ opacity: 0.2 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, repeat: Infinity, repeatType: 'reverse' }}
      variant="h4"
      align="center"
    >
      {message}
    </Typography>
  </Box>
);
