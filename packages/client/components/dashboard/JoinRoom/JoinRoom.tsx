import { Box, Typography } from '@mui/material';

import ExistingRoomForm from './ExistingRoomForm';
import type { IRoom } from '../../interfaces';

type Props = {
  onJoinRoom: (room: IRoom) => void;
};

const JoinRoom: React.FC<Props> = ({ onJoinRoom }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: 3,
    }}
  >
    <Typography component="h2" variant="h4" align="center">
      Join By Name
    </Typography>
    <ExistingRoomForm onSubmit={onJoinRoom} />
  </Box>
);

export default JoinRoom;
