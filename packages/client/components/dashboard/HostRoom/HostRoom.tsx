import { useState } from 'react';
import { Button } from '@mui/material';

import NewRoomForm from './NewRoomForm';
import { Modal } from '../../ui';
import type { IRoom } from '../../interfaces';

type Props = {
  onJoinRoom: (room: IRoom) => void;
};

const HostRoom: React.FC<Props> = ({ onJoinRoom }) => {
  const [open, setOpen] = useState(false);

  const toggleModalHandler = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div>
      <Button
        size="large"
        variant="contained"
        color="secondary"
        onClick={toggleModalHandler}
      >
        Host Room
      </Button>
      <Modal
        sx={{ bgcolor: 'primary.dark' }}
        open={open}
        title="Create Room"
        onClose={toggleModalHandler}
      >
        <NewRoomForm onSubmit={onJoinRoom} />
      </Modal>
    </div>
  );
};

export default HostRoom;
