import { Box, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import type { IClientMessage } from '../../../../interfaces';

type Props = {
  messages: IClientMessage[];
};

const wrapperStyles: SxProps<Theme> = {
  flexGrow: 1,
  display: 'flex',
  flexDirection: 'column',
  p: 2,
  gap: '4px',
  overflowY: 'auto',
  bgcolor: '#fff',
};

const MessagesList: React.FC<Props> = ({ messages }) => (
  <Box sx={wrapperStyles}>
    {messages.map((message) => (
      <Typography key={Math.random().toString()} sx={{ color: message.color }}>
        {message.text}
      </Typography>
    ))}
  </Box>
);

export default MessagesList;
