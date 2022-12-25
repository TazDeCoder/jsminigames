import { useMemo } from 'react';
import { useLocalstorageState } from 'rooks';

import { AuthContext, IAuthContext } from './auth-context';
import { IUserCrendentials } from '../../components/interfaces';

type Props = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useLocalstorageState<IUserCrendentials>('user', {});
  const [isLoggedIn, setIsLoggedIn] = useLocalstorageState('isLoggedIn', false);

  const loginHandler = (userCrendetials: IUserCrendentials) => {
    setUser(userCrendetials);
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setUser({});
    setIsLoggedIn(false);
  };

  const authContext: IAuthContext = useMemo(
    () => ({
      user,
      isLoggedIn,
      onLogin: loginHandler,
      onLogout: logoutHandler,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, isLoggedIn],
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
