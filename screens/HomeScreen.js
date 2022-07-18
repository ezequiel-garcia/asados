import { Text, StyleSheet, View } from 'react-native';
import { useContext, useEffect, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthenticationContext } from '../store/auth/auth-context';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/header/Header';
import { Colors } from '../constants/styles';
export default function HomeScreen() {
  const authCtx = useContext(AuthenticationContext);
  const navigation = useNavigation();
  console.log(authCtx.user);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //     title: authCtx.userData.name,
  //     headerLeft: () => <HeaderPicture />,
  //     headerStyle: {
  //       height: '400',
  //     },
  //   });
  // }, [navigation, authCtx]);

  return (
    <LinearGradient
      // colors={[Colors.primary800, Colors.primary500]}
      colors={[Colors.primary800, '#0d1f2d1f']}
      // start={[1, 0]}
      start={[0, 0]}
      end={[0, 1]}
      style={{ flex: 1 }}
    >
      <View>
        <Header />
        <Text>{authCtx.user.uid}</Text>
        <Text>HomeScreen</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
