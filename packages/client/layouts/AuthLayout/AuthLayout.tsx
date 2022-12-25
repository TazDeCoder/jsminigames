import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Box } from '@mui/material';

import { AuthContext } from '../../store';
import { Loader } from '../../components/ui';
import Nav from './Nav';

type Props = {
  children: React.ReactNode;
};

const AuthLayout: React.FC<Props> = ({ children }) => {
  const router = useRouter();
  const authCtx = useContext(AuthContext);

  const [isMounted, setIsMounted] = useState(false);
  const [msg, setMsg] = useState('Loading...');

  const logoutHandler = async () => {
    if (authCtx) {
      await router.replace('/');
      authCtx.onLogout();
    }
  };

  useEffect(() => {
    if (!authCtx?.isLoggedIn) {
      router.replace('/');
      setMsg('Redirecting to homepage...');
    } else {
      setIsMounted(true);
    }
  }, [authCtx, router]);

  return isMounted ? (
    <Box>
      <Nav onLogout={logoutHandler} />
      <main>{children}</main>
    </Box>
  ) : (
    <Box
      sx={{ position: 'relative', height: '100vh', bgcolor: 'primary.main' }}
    >
      <Loader message={msg} />
    </Box>
  );
};

export default AuthLayout;
