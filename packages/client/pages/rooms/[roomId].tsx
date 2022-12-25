import { useContext, useState, useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import type { Socket } from 'socket.io-client';
import { Box } from '@mui/material';

import { AuthContext, RoomContext } from '../../store';
import { useSocket } from '../../hooks';
import { Layout } from '../../layouts';
import { Loader, Dialog } from '../../components/ui';
import { Lobby } from '../../components/rooms';
import { SERVER_URL } from '../../data/configValues';
import { REDIRECT_MS } from '../../data/constants';
import type { NextPageWithLayout } from '../_app';

function roomSubscriptions(socket: Socket) {
  return {
    showClients: (cb: any) => {
      socket.on('client:show-clients', (clients) => cb(clients));
    },
    errorRoomJoin: (cb: any) => {
      socket.on('room:error-join', (message) => cb(message));
    },
    errorRoomCreate: (cb: any) => {
      socket.on('room:error-create', (message) => cb(message));
    },
    successRoomJoin: (cb: any) => {
      socket.on('room:success-join', (roomData) => cb(roomData));
    },
    successRoomCreate: (cb: any) => {
      socket.on('room:success-create', (roomData) => cb(roomData));
    },
  };
}

const RoomId: NextPageWithLayout = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);
  const roomCtx = useContext(RoomContext);

  const [error, setError] = useState<any>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [msg, setMsg] = useState('Loading...');

  const { socket, isConnected, isError, disconnect } = useSocket({
    uri: `${SERVER_URL}/classic`,
    options: {
      path: '/socket/classic',
      query: {
        username: authCtx?.user.username,
        roomId: roomCtx?.room.roomId || router.query.roomId,
        ...roomCtx?.room,
      },
      reconnection: false,
    },
  });

  const onLeaveHandler = () => {
    if (roomCtx) {
      disconnect();
      setMsg('Redirecting to dashboard...');
      roomCtx.onLeaveRoom();
      setTimeout(() => {
        router.replace('../../dashboard');
      }, REDIRECT_MS);
    }
  };

  useEffect(() => {
    if (socket && roomCtx) {
      const sub = roomSubscriptions(socket);
      sub.showClients((newClients: any[]) => {
        roomCtx.onUpdateClients(newClients);
      });
      sub.errorRoomJoin((message: string) => {
        setError({
          title: 'Room Join',
          message,
        });
      });
      sub.errorRoomCreate((message: string) => {
        setError({
          title: 'Room Create',
          message,
        });
      });
      sub.successRoomJoin((newRoomData: any) => {
        roomCtx.onUpdateRoom(newRoomData);
        setIsJoined(true);
      });
      sub.successRoomCreate((newRoomData: any) => {
        roomCtx.onUpdateRoom(newRoomData);
        setIsJoined(true);
      });
    }
  }, [socket, roomCtx]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if ((!isConnected && !isJoined) || isError) {
      if (!authCtx?.isLoggedIn) {
        timeout = setTimeout(() => {
          setMsg('Redirecting to homepage...');
          router.replace('../../dashboard');
        }, REDIRECT_MS);
      } else {
        timeout = setTimeout(() => {
          setMsg('Redirecting to dashboard...');
          router.replace('../../dashboard');
        }, REDIRECT_MS);
      }
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [authCtx, router, isError, isConnected, isJoined]);

  useEffect(() => {
    if (roomCtx?.room.id) {
      setMsg(
        roomCtx.room.action === 'create'
          ? `Creating room ${roomCtx.room.id}...`
          : `Joining room ${roomCtx.room.id}...`,
      );
    }
  }, [roomCtx]);

  if (error) {
    return (
      <Box sx={{ height: '100vh', bgcolor: 'primary.main' }}>
        <Dialog
          title={`Error: ${error.title}`}
          message={error.message}
          buttons={[
            {
              text: 'Go Back',
              onClick: () => {
                setMsg('Redirecting to dashboard...');
                router.replace('../../dashboard');
              },
            },
            {
              text: 'Retry?',
              onClick: () => {
                router.reload();
              },
            },
          ]}
          open
        />
      </Box>
    );
  }

  return socket && isConnected && isJoined ? (
    <Lobby socket={socket} onLeave={onLeaveHandler} />
  ) : (
    <Box
      sx={{ position: 'relative', height: '100vh', bgcolor: 'primary.main' }}
    >
      <Loader message={msg} />
    </Box>
  );
};

RoomId.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default RoomId;
