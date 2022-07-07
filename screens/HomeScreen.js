import { Text, StyleSheet, View } from 'react-native';
import { useContext } from 'react';

import { AuthenticationContext } from '../store/auth/auth-context';
import Logout from '../components/Auth/Logout';

export default function HomeScreen() {
  const authCtx = useContext(AuthenticationContext);
  console.log(authCtx.user);
  return (
    <View>
      <Text>{authCtx.user.uid}</Text>
      <Text>HomeScreen</Text>
      <Logout />
    </View>
  );
}

const styles = StyleSheet.create({});
