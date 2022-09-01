/* eslint-disable prettier/prettier */
import React, { useState, createContext } from 'react';
import {
  onAuthStateChanged,
  getAuth,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';

import { fetchCurrentUser, addUserToDB } from '../redux/usersActions';
import { clearEventState } from '../redux/eventsSlice';
import { clearUser, setCurrentUser } from '../redux/currentUserSlice';
import { useDispatch } from 'react-redux';
//USER DATA
import users from '../../users';

import { loginRequest, registerRequest } from './auth-service';

export const AuthenticationContext = createContext({
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
  //VER SI LO DEJO ACA O NO
  userData: null,
  // ----------------
  onLogin: (email, password) => {},
  onRegister: (emailIsValid, password) => {},
  onLogout: () => {},
});

export const AuthenticationContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  onAuthStateChanged(getAuth(), (usr) => {
    if (usr) {
      setUser(usr);
      setCurrentUser(usr.uid);
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
      dispatch(fetchCurrentUser(user.user.uid));

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

      // set new user in the db in firebase
      await addUserToDB(user.user);
      dispatch(fetchCurrentUser(user.user.uid));
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
    dispatch(clearEventState({}));
    dispatch(clearUser());
    setUser(null);
  };

  const resetError = () => {
    setError(null);
  };

  const forgotPassword = (email) => {
    setError(false);
    setIsLoading(true);
    return sendPasswordResetEmail(getAuth(), email)
      .then(() => {
        setIsLoading(false);
        setError(null);
        return true;
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error);
        console.log('error: ' + error);
        return false;
      });
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
        forgotPassword,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
