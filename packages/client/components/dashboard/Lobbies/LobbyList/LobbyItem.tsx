import { Box, Button, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

import { DEFAULT_MAX_PLAYERS } from '../../../../data/constants';
import type { ILobby, IRoom } from '../../../interfaces';

type Props = {
  lobby: ILobby;
  onJoinRoom: (room: IRoom) => void;
};

const lobbyStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: '30px',
  p: 2,
  bgcolor: 'primary.main',
  borderRadius: '5px',
  'span, button': {
    fontWeight: 600,
  },
};

const LobbyItem: React.FC<Props> = ({ lobby, onJoinRoom }) => {
  const { roomId, numPlayers, rounds, status } = lobby;

  const clickedJoinHandler = () => {
    const room: IRoom = {
      roomId,
      action: 'join',
    };
    onJoinRoom(room);
  };

  return (
    <Box sx={lobbyStyles}>
      <Typography>
        Room: <Typography component="span">{roomId}</Typography>
      </Typography>
      <Typography>
        Players:{' '}
        <Typography component="span">
          {`${numPlayers} / ${DEFAULT_MAX_PLAYERS}`}
        </Typography>
      </Typography>
      <Typography>
        Rounds: <Typography component="span">{rounds}</Typography>
      </Typography>
      <Typography
        sx={{
          width: '8rem',
          color: status === 'open' ? 'success.light' : 'error.light',
        }}
      >
        Status:{' '}
        <Typography sx={{ textTransform: 'uppercase' }} component="span">
          {status}
        </Typography>
      </Typography>
      <Button
        color="accent"
        variant="contained"
        disabled={status !== 'open'}
        onClick={clickedJoinHandler}
      >
        Join
      </Button>
    </Box>
  );
};

export default LobbyItem;
