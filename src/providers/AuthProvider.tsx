/** @format */

import { createContext, useContext, useState } from 'react';
import type { UserType } from '../types/user';

type AuthContextType = {
  isLoggedIn: boolean;
  login: (user: UserType) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('currentUser')));

  const login = (user: UserType) => {
    const { name, email } = user;
    setIsLoggedIn(true);
    localStorage.setItem('currentUser', JSON.stringify({ name, email }));
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('currentUser');
  };

  return <AuthContext.Provider value={{ isLoggedIn, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error();
  return context;
};
