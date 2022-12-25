import { Box, Typography } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

type Props = {
  client: any;
};

const wrapperStyles: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  width: '95%',
  py: 1,
  px: 2,
  bgcolor: 'secondary.dark',
  borderRadius: 1,
};

const ClientItem: React.FC<Props> = ({ client }) => (
  <Box sx={wrapperStyles}>
    <Typography sx={{ fontWeight: 600 }}>{client.username}</Typography>
    <Box
      sx={{
        width: 96,
        p: 1,
        bgcolor: client.isReady ? 'success.main' : 'error.main',
        borderRadius: 2,
      }}
    >
      <Typography
        sx={{
          fontWeight: 600,
          color: 'primary.contrastText',
        }}
        align="center"
      >
        {client.isReady ? 'Ready' : 'Unready'}
      </Typography>
    </Box>
  </Box>
);

export default ClientItem;
