import { Text, StyleSheet, View } from 'react-native';
import { useContext, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthenticationContext } from '../store/auth/auth-context';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEvents } from '../store/redux/eventsActions';
import { fetchCurrentUser } from '../store/redux/usersActions';

import Header from '../components/header/Header';
import Title from '../components/ui/Title';

import PreviousEvents from '../components/events/PreviousEvents';
import UpcomingEvents from '../components/events/UpcomingEvents';
import Background from '../components/ui/Background';

export default function HomeScreen() {
  const authCtx = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // console.log(authCtx.user);
  const currentUser = useSelector((state) => state.user.currentUser);
  const userEvents = useSelector((state) => state.events.events);

  useEffect(() => {
    if (!currentUser) {
      dispatch(fetchCurrentUser(authCtx.user.uid));
      console.log('VACIOO');
    }
  }, [authCtx]);

  useEffect(() => {
    if (userEvents.length > 0) {
      dispatch(fetchEvents(currentUser));
      console.log(userEvents);
    }
  }, [currentUser]);

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
