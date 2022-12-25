import { useContext, useCallback, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Box, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import { RoomContext } from '../store';
import { AuthLayout } from '../layouts';
import { HostRoom, Lobbies, JoinRoom } from '../components/dashboard';
import type { NextPageWithLayout } from './_app';
import type { IRoom } from '../components/interfaces';

const boxStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  height: '90vh',
  p: 3,
  bgcolor: 'primary.main',
};

const Dashboard: NextPageWithLayout = () => {
  const router = useRouter();
  const roomCtx = useContext(RoomContext);

  const joinRoomHandler = useCallback(
    (newRoom: IRoom) => {
      if (roomCtx) {
        roomCtx.onUpdateRoom(newRoom);
        router.replace(`../rooms/${newRoom.roomId}`);
      }
    },
    [roomCtx, router],
  );

  return (
    <Box sx={boxStyles}>
      <Box sx={{ display: 'flex', gap: 2 }}>
        <HostRoom onJoinRoom={joinRoomHandler} />
        <Lobbies onJoinRoom={joinRoomHandler} />
      </Box>
      <JoinRoom onJoinRoom={joinRoomHandler} />
      <Box
        sx={{
          maxWidth: 496,
          textAlign: 'center',
          bgcolor: 'secondary.dark',
          p: 2,
          borderRadius: 4,
        }}
      >
        <Typography component="h2" variant="h5" mb={2}>
          How This Game Works
        </Typography>
        <Typography
          sx={{
            fontWeight: 600,
            '& > br': { mb: 1 },
            '& > span': { color: 'accent.light' },
          }}
        >
          The objective of each minigame is to{' '}
          <span>create your own solution</span> to a problem prompted.
          <br />
          Your solution can be anything as long as it{' '}
          <span>satisfies the prompt.</span>
          <br />
          <span>This is time-based</span> so the quicker you can provide a
          solution, <span>the more points you earn!</span>
          <br />
          The winner of the minigames is the one with the{' '}
          <span>highest score calculated from each minigame.</span>
        </Typography>
      </Box>
    </Box>
  );
};

Dashboard.getLayout = function getLayout(page: ReactElement) {
  return <AuthLayout>{page}</AuthLayout>;
};

export default Dashboard;
