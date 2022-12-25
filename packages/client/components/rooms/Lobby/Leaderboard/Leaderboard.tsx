import { Box, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import RankedList from './RankedList';

type Props = {
  leaderboard: {
    [key: string]: {
      username: string;
      score: number;
    };
  };
};

const wrapperStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  maxWidth: 720,
  width: '95%',
  height: '70vh',
  p: 2,
  bgcolor: 'secondary.main',
  borderRadius: 1,
};

const Leaderboard: React.FC<Props> = ({ leaderboard }) => (
  <Box sx={wrapperStyles}>
    <Typography variant="h5">Leaderboard</Typography>
    <RankedList leaderboard={leaderboard} />
  </Box>
);

export default Leaderboard;
