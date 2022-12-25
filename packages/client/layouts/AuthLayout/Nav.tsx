import { useContext } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { Logout } from '@mui/icons-material';

import { AuthContext } from '../../store';
import { Logo } from '../../components/common';
import { Image } from '../../components/ui';
import avatarImg from '../../public/default-avatar.png';
import { APP_VERSION } from '../../data/configValues';

type Props = {
  onLogout: () => void;
};

const Nav: React.FC<Props> = ({ onLogout }) => {
  const authCtx = useContext(AuthContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: 'secondary.dark' }}>
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'baseline',
              gap: 1,
            }}
          >
            <Box sx={{ height: 32 }}>
              <Logo />
            </Box>
            <Typography variant="caption">{`version ${APP_VERSION}`}</Typography>
          </Box>
          <Image
            src={avatarImg}
            alt="profile avatar"
            sx={{ width: 48, height: 48, mx: 2 }}
          />
          {authCtx && <Typography mr={2}>{authCtx.user.username}</Typography>}
          <IconButton
            size="large"
            aria-label="logout"
            aria-controls="menu-appbar"
            color="accent"
            onClick={onLogout}
          >
            <Logout />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
