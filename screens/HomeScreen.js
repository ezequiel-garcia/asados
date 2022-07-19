import { Text, StyleSheet, View } from 'react-native';
import { useContext, useEffect, useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthenticationContext } from '../store/auth/auth-context';
import { LinearGradient } from 'expo-linear-gradient';
import Header from '../components/header/Header';
import { Colors } from '../constants/styles';
import Title from '../components/ui/Title';

import PreviousEvents from '../components/events/PreviousEvents';
import UpcomingEvents from '../components/events/UpcomingEvents';

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
      start={[0, 0]}
      end={[0, 1]}
      style={{ flex: 1 }}
    >
      <Header />
      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 1,
            padding: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
            //height: '70%',
            // overflow: 'hidden',
          }}
        >
          <View
            style={{
              flex: 6,
              // justifyContent: 'flex-start',

              alignItems: 'center',
            }}
          >
            <Title>Upcoming events</Title>

            <UpcomingEvents />
          </View>

          <View
            style={{
              flex: 3,
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <Title>Previous events</Title>

            <PreviousEvents />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
