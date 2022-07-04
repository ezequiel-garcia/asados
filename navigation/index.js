import React, { useContext } from 'react';
import { AuthenticationContext } from '../store/auth/auth-context';
import UserStack from './userStack';
import AuthStack from './authStack';

export default function RootNavigation() {
  const authCtx = useContext(AuthenticationContext);

  const user = authCtx.user;

  return user ? <UserStack /> : <AuthStack />;
}
