import { Box, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

type Props = {
  pos: number;
  user: {
    username: string;
    score: number;
  };
};

const wrapperStyles: SxProps<Theme> = {
  display: 'flex',
  justifyContent: 'space-around',
  width: '90%',
  py: 1,
  px: 2,
  alignItems: 'baseline',
  bgcolor: 'secondary.dark',
  borderRadius: 1,
};

const RankItem: React.FC<Props> = ({ pos, user }) => (
  <Box sx={wrapperStyles}>
    <Typography sx={{ flexGrow: 1, fontWeight: pos === 1 ? 600 : 'initial' }}>
      {`Rank ${pos} ${user.username}`}
    </Typography>
    <Typography
      sx={{ fontWeight: 600, width: '20%' }}
    >{`Score: ${user.score}`}</Typography>
  </Box>
);

export default RankItem;
