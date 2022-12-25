import { Box, Button, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import ClientsList from './ClientsList';

type Props = {
  clients: any[];
  onReadyUp: () => void;
  onLeave: () => void;
};

const wrapperStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  gap: 1,
  maxWidth: '45rem',
  width: '95%',
  height: '70vh',
  p: 2,
  bgcolor: 'secondary.main',
  borderRadius: 1,
};

const JoinedClients: React.FC<Props> = ({ clients, onReadyUp, onLeave }) => (
  <Box sx={wrapperStyles}>
    <Typography variant="h5" paragraph>
      Joined Players
    </Typography>
    <ClientsList clients={clients} />
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        gap: 2,
        p: 1,
      }}
    >
      <Button
        sx={{ fontWeight: 600, color: '#fff' }}
        variant="contained"
        color="success"
        size="large"
        disabled={clients.length === 1}
        onClick={onReadyUp}
      >
        Ready Up!
      </Button>
      <Button
        sx={{ fontWeight: 600, color: '#fff' }}
        variant="contained"
        color="warning"
        size="large"
        onClick={onLeave}
      >
        Leave
      </Button>
    </Box>
  </Box>
);

export default JoinedClients;
