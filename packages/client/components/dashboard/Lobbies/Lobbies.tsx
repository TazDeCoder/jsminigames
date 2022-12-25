import { useEffect, useState } from 'react';
import { Box, Button } from '@mui/material';

import { useSocket } from '../../../hooks';
import { Modal, Loader } from '../../ui';
import LobbyList from './LobbyList';
import { SERVER_URL } from '../../../data/configValues';
import type { ILobby, IRoom } from '../../interfaces';

type Props = {
  onJoinRoom: (room: IRoom) => void;
};

const Lobbies: React.FC<Props> = ({ onJoinRoom }) => {
  const [open, setOpen] = useState(false);
  const [lobbies, setLobbies] = useState<ILobby[] | null>(null);

  const { socket } = useSocket({
    uri: `${SERVER_URL}/lobbies`,
    options: {
      path: '/socket/lobbies',
      reconnection: false,
    },
  });

  useEffect(() => {
    if (socket) {
      socket.on('lobby:show-public', (publicRooms: ILobby[]) => {
        setLobbies(publicRooms);
      });
    }
  }, [socket]);

  const toggleModalHandler = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        onClick={toggleModalHandler}
      >
        View Lobbies
      </Button>
      <Modal
        sx={{ height: 480, bgcolor: 'primary.dark' }}
        open={open}
        title="Avalaible Rooms"
        onClose={toggleModalHandler}
      >
        {Array.isArray(lobbies) ? (
          <LobbyList lobbies={lobbies} onJoinRoom={onJoinRoom} />
        ) : (
          <Box sx={{ position: 'relative', height: '70%' }}>
            <Loader message="Loading Lobbies..." />
          </Box>
        )}
      </Modal>
    </div>
  );
};

export default Lobbies;
