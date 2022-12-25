import { Box } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import RankItem from './RankItem';

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
  alignItems: 'center',
  gap: 1,
  height: '95%',
  mt: 1,
  mb: 3,
};

const RankedList: React.FC<Props> = ({ leaderboard }) => (
  <Box sx={wrapperStyles}>
    {Object.keys(leaderboard).length > 0 &&
      Object.keys(leaderboard).map((key, idx) => (
        <RankItem key={key} pos={idx + 1} user={leaderboard[key]} />
      ))}
  </Box>
);

export default RankedList;
