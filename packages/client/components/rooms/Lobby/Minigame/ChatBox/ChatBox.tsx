import { Box } from '@mui/material';

import MessagesList from './MessagesList';
import MessageForm from './MessageForm';
import type { IClientMessage } from '../../../../interfaces';

type Props = {
  messages: IClientMessage[];
  onSendMessage: (message: string) => void;
};

const ChatBox: React.FC<Props> = ({ messages, onSendMessage }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
    }}
  >
    <MessagesList messages={messages} />
    <MessageForm onSubmit={onSendMessage} />
  </Box>
);

export default ChatBox;
