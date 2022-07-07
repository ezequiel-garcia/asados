/* eslint-disable prettier/prettier */
import React, { useState, createContext } from 'react';
import { onAuthStateChanged, getAuth, signOut } from 'firebase/auth';

import { loginRequest, registerRequest } from './auth-service';

export const AuthenticationContext = createContext({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
  onLogin: (email, password) => {},
  onRegister: (emailIsValid, password) => {},
  onLogout: () => {},
});

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  onAuthStateChanged(getAuth(), (usr) => {
    if (usr) {
      setUser(usr);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  });

  const onLogin = async (email, password) => {
    setIsLoading(true);
    setError(null);
    try {
      const user = await loginRequest(email, password);
      setUser(user.user);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      setIsLoading(false);
      setError(error.toString());
    }
  };

  const onRegister = async (email, password) => {
    setIsLoading(true);

    try {
      const user = await registerRequest(email, password);
      setUser(user.user);
      setIsLoading(false);
      setError(null);
    } catch (e) {
      setIsLoading(false);
      setError(e.toString());
      console.log(error);
    }
  };

  const onLogout = async () => {
    console.log('byee');
    await signOut(getAuth());
    setUser(null);
  };

  const resetError = () => {
    setError(null);
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        error,
        onLogin,
        onRegister,
        onLogout,
        resetError,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
