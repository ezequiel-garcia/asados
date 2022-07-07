import React, { useContext } from 'react';
import { AuthenticationContext } from '../store/auth/auth-context';
import UserStack from './userStack';
import AuthStack from './authStack';

export default function RootNavigation() {
  const { isAuthenticated } = useContext(AuthenticationContext);

  return isAuthenticated ? <UserStack /> : <AuthStack />;
}
