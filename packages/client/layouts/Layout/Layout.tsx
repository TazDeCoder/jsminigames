import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import Footer from './Footer';
import { Loader } from '../../components/ui';

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted ? (
    <>
      <main>{children}</main>
      <Footer />
    </>
  ) : (
    <Box
      sx={{ position: 'relative', height: '100vh', bgcolor: 'primary.main' }}
    >
      <Loader message="Loading..." />
    </Box>
  );
};

export default Layout;
