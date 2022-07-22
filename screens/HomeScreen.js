import { Text, StyleSheet, View } from 'react-native';
import { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthenticationContext } from '../store/auth/auth-context';
import Header from '../components/header/Header';
import Title from '../components/ui/Title';

import PreviousEvents from '../components/events/PreviousEvents';
import UpcomingEvents from '../components/events/UpcomingEvents';
import Background from '../components/ui/Background';

export default function HomeScreen() {
  const authCtx = useContext(AuthenticationContext);
  const navigation = useNavigation();
  console.log(authCtx.user);

  return (
    <Background>
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
    </Background>
  );
}

const styles = StyleSheet.create({});
