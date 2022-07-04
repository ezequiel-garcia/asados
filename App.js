// import { LogBox } from 'react-native';

// LogBox.ignoreLogs(['ViewPropTypes will be removed']);

import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  "ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from 'deprecated-react-native-prop-types'.",
  'NativeBase: The contrast ratio of',
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';

//import LoginScreen from './screens/LoginScreen';
import Navigation from './navigation/index';

//VAMOS VIENDO ESTO
import app from './config/firebase';

import { AuthenticationContextProvider } from './store/auth/auth-context';

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <AuthenticationContextProvider>
        <Navigation />
      </AuthenticationContextProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
