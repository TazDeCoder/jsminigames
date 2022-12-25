import { useForm } from 'react-hook-form';
import { Box, Button } from '@mui/material';
import {
  FormContainer,
  TextFieldElement,
  RadioButtonGroup,
  SwitchElement,
} from 'react-hook-form-mui';
import type { SxProps, Theme } from '@mui/material/styles';

import { generateUniqueId } from '../../../utils';
import { ALPHANUMERIC_RGX, ROOM_VALID_CHARS } from '../../../data/constants';
import type { IRoom } from '../../interfaces';

type FormProps = {
  private: boolean;
  password: string;
  rounds: string;
  timer: string;
};

type Props = {
  onSubmit: (room: IRoom) => void;
};

const defaultValues: FormProps = {
  private: false,
  password: '',
  rounds: '8',
  timer: '60000',
};

const roundsOpts = [
  {
    id: '4',
    label: '4 Rounds',
  },
  {
    id: '6',
    label: '6 Rounds',
  },
  {
    id: '8',
    label: '8 Rounds',
  },
  {
    id: '10',
    label: '10 Rounds',
  },
];

const timerOpts = [
  {
    id: '45000',
    label: '45s',
  },
  {
    id: '60000',
    label: '60s',
  },
  {
    id: '90000',
    label: '90s',
  },
  {
    id: '120000',
    label: '120s',
  },
];

const passwordValidation = {
  required: {
    value: true,
    message: 'Room password is empty',
  },
  pattern: {
    value: ALPHANUMERIC_RGX,
    message: 'Room password must be Alphanumeric',
  },
};

const formStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 2,
  p: 1,
};

const NewRoomForm: React.FC<Props> = ({ onSubmit }) => {
  const formContext = useForm({ defaultValues });

  const submitHandler = ({ password, rounds, timer }: FormProps) => {
    const uniqueRoomId = generateUniqueId(ROOM_VALID_CHARS);

    const room: IRoom = {
      roomId: uniqueRoomId,
      action: 'create',
      config: JSON.stringify({
        maxNumRounds: rounds,
        maxTimerLimit: timer,
      }),
    };

    if (password) {
      room.password = password;
    }

    onSubmit(room);
  };

  return (
    <FormContainer formContext={formContext} onSuccess={submitHandler}>
      <Box sx={formStyles}>
        <SwitchElement
          sx={{
            '.Mui-checked.MuiSwitch-switchBase': {
              color: 'secondary.light',
            },
          }}
          name="private"
          label="Private"
        />
        {formContext.watch('private') && (
          <TextFieldElement
            name="password"
            label="Room Password"
            placeholder="Enter password for room"
            color="secondary"
            validation={passwordValidation}
            autoFocus
          />
        )}
        <Box
          sx={{
            display: 'flex',
            gap: 6,
            // Added style to prevent color inconsistency with radio button
            '.MuiRadio-root.Mui-checked, .MuiFormLabel-root.Mui-focused': {
              color: 'secondary.main',
            },
          }}
        >
          <RadioButtonGroup
            name="rounds"
            label="Rounds"
            options={roundsOpts}
            required
          />
          <RadioButtonGroup
            name="timer"
            label="Timer"
            options={timerOpts}
            required
          />
        </Box>
        <Button type="submit" variant="contained" color="accent" size="large">
          Create!
        </Button>
      </Box>
    </FormContainer>
  );
};

export default NewRoomForm;
