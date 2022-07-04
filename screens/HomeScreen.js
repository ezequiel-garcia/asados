import { Text, StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { useContext } from 'react';

import { AuthenticationContext } from '../store/auth/auth-context';

export default function HomeScreen() {
  const authCtx = useContext(AuthenticationContext);
  console.log(authCtx.user);
  return (
    <View>
      <Text>{authCtx.user.uid}</Text>
      <Text>HomeScreen</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
