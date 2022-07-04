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

  //   onAuthStateChanged(getAuth(), (usr) => {
  //     if (usr) {
  //       setUser(usr);
  //       setIsLoading(false);
  //     } else {
  //       setIsLoading(false);
  //     }
  //   });

  const onLogin = (email, password) => {
    setIsLoading(true);
    setError(null);
    loginRequest(email, password)
      .then((u) => {
        setUser(u.user);
        setIsLoading(false);
        setError(null);
      })
      .catch((e) => {
        setIsLoading(false);
        setError(e.toString());
      });
  };

  //   const onRegister = (email, password) => {
  //     setIsLoading(true);

  //     registerRequest(email, password)
  //       .then((u) => {
  //         setUser(u);
  //         setIsLoading(false);
  //       })
  //       .catch((e) => {
  //         setIsLoading(false);
  //         setError(e.toString());
  //       });
  //   };
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

  const onLogout = () => {
    setUser(null);
    signOut(getAuth());
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
