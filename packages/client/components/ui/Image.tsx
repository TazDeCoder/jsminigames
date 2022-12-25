import OptimizedImage from 'next/image';
import type { StaticImageData } from 'next/image';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';

export interface ImageProps {
  src: string | StaticImageData;
  alt: string;
  sx?: SxProps<Theme>;
}

export const Image: React.FC<ImageProps> = ({ src, alt, sx }) => (
  <Box sx={{ position: 'relative', ...sx }}>
    <OptimizedImage
      src={src}
      alt={alt}
      style={{
        position: 'absolute',
        width: 'inherit',
        height: 'inherit',
      }}
    />
  </Box>
);
