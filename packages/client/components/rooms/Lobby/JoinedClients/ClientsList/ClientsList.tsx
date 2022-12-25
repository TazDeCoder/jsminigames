import { Box } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

import ClientItem from './ClientItem';

type Props = {
  clients: any[];
};

const wrapperStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 1,
  height: '90%',
  mt: 1,
  mb: 3,
};

const ClientsList: React.FC<Props> = ({ clients }) => (
  <Box sx={wrapperStyles}>
    {clients.map((client: any) => (
      <ClientItem key={client.id} client={client} />
    ))}
  </Box>
);

export default ClientsList;
