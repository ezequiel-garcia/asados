import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  initializeAuth,
  signInWithEmailAndPassword,
  getReactNativePersistence,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

import app from '../../config/firebase';

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const loginRequest = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const registerRequest = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);
