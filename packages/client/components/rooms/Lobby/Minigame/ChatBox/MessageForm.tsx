import { useForm } from 'react-hook-form';
import { FormContainer, TextFieldElement } from 'react-hook-form-mui';
import { Box, Button } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';
import escape from 'validator/lib/escape';

type Props = {
  onSubmit: (message: string) => void;
};

type FormProps = {
  message: string;
};

const defaultValues: FormProps = {
  message: '',
};

const messageValidation = {
  required: true,
};

const formStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  p: 1,
  bgcolor: 'primary.dark',
};

const MessageForm: React.FC<Props> = ({ onSubmit }) => {
  const formContext = useForm({ defaultValues });

  const submitHandler = ({ message }: FormProps) => {
    const sanitizedMsg = escape(message);
    onSubmit(sanitizedMsg);
    formContext.reset();
  };

  return (
    <FormContainer formContext={formContext} onSuccess={submitHandler}>
      <Box sx={formStyles}>
        <TextFieldElement
          sx={{ flexGrow: 1 }}
          name="message"
          label="Send Message"
          placeholder="Say something nice :¬)"
          color="secondary"
          validation={messageValidation}
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          size="large"
        >
          Send
        </Button>
      </Box>
    </FormContainer>
  );
};

export default MessageForm;
