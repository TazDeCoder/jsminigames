import { useContext, ReactElement } from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Typography } from '@mui/material';
import type { SxProps, Theme } from '@mui/material/styles';

import { AuthContext } from '../store';
import { Layout } from '../layouts';
import { Logo } from '../components/common';
import type { NextPageWithLayout } from './_app';

const pageStyles: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '90vh',
  bgcolor: 'primary.main',
};

const Home: NextPageWithLayout = () => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const newUserHandler = () => {
    if (authCtx) {
      const userCrendentials = {
        username: `user${Math.random().toString().slice(-7)}`,
      };
      authCtx.onLogin(userCrendentials);
      router.replace('/dashboard');
    }
  };

  return (
    <Box sx={pageStyles}>
      <Box sx={{ height: 48, mt: 5, mb: 3 }}>
        <Logo />
      </Box>
      <Box sx={{ width: '50%', mb: 3 }}>
        <Typography component="h2" variant="h5" align="center">
          Compete against Javascript programmers across the globe in a wild
          frenzy of minigames!
        </Typography>
      </Box>
      <Button
        size="large"
        variant="contained"
        color="accent"
        onClick={newUserHandler}
        sx={{ my: 2 }}
      >
        Join Now!
      </Button>
    </Box>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
