import { Box, Button } from '@mui/material';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import type { SxProps, Theme } from '@mui/material/styles';

import { ROOM_ID_RGX, ALPHANUMERIC_RGX } from '../../../data/constants';
import type { IRoom } from '../../interfaces';

type FormProps = {
  roomId: string;
  password: string;
};

type Props = {
  onSubmit: (room: IRoom) => void;
};

const defaultValues: FormProps = {
  roomId: '',
  password: '',
};

const roomIdValidation = {
  required: {
    value: true,
    message: 'Room Id is empty',
  },
  pattern: {
    value: ROOM_ID_RGX,
    message: 'Room Id must be valid',
  },
};

const passwordValidation = {
  pattern: {
    value: ALPHANUMERIC_RGX,
    message: 'Room password must be valid',
  },
};

const formStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'center',
  gap: 2,
};

const ExistingRoomForm: React.FC<Props> = ({ onSubmit }) => {
  const submitHandler = ({ roomId, password }: FormProps) => {
    const room: IRoom = {
      roomId,
      password,
      action: 'join',
    };
    onSubmit(room);
  };

  return (
    <FormContainer defaultValues={defaultValues} onSuccess={submitHandler}>
      <Box sx={formStyles}>
        <TextFieldElement
          name="roomId"
          label="Room Id"
          placeholder="Enter room id"
          color="secondary"
          validation={roomIdValidation}
        />
        <TextFieldElement
          name="password"
          label="Room Password"
          placeholder="Enter room password"
          color="secondary"
          validation={passwordValidation}
        />
        <Button
          sx={{ flexGrow: 1 }}
          type="submit"
          variant="contained"
          color="accent"
          size="large"
        >
          Join Room
        </Button>
      </Box>
    </FormContainer>
  );
};

export default ExistingRoomForm;
