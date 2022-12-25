import { createContext } from 'react';

import { IUserCrendentials } from '../../components/interfaces';

export interface IAuthContext {
  user: IUserCrendentials;
  isLoggedIn: boolean;
  onLogin: (userCredentials: IUserCrendentials) => void;
  onLogout: () => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);
