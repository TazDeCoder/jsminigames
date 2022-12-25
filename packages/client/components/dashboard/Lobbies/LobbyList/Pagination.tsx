import { Box, IconButton, Typography } from '@mui/material';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import type { SxProps, Theme } from '@mui/material/styles';

type Props = {
  currPage: number;
  onBack: () => void;
  onForward: () => void;
};

const boxStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 2,
  height: '2rem',
  p: 3,
  color: 'primary.contrastText',
  bgcolor: 'primary.main',
  borderRadius: '5px',
};

const Pagination: React.FC<Props> = ({ currPage, onBack, onForward }) => (
  <Box sx={boxStyles}>
    <IconButton color="inherit" onClick={onBack}>
      <ArrowCircleLeftIcon />
    </IconButton>
    <Typography>{`Page ${currPage}`}</Typography>
    <IconButton color="inherit" onClick={onForward}>
      <ArrowCircleRightIcon />
    </IconButton>
  </Box>
);

export default Pagination;
