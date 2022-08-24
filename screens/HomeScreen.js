import { Text, StyleSheet, View } from 'react-native';
import { useContext, useEffect, useLayoutEffect } from 'react';
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
import { setEvents } from '../store/redux/eventsSlice';

export default function HomeScreen() {
  const authCtx = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const userEvents =
    useSelector((state) => state.user.currentUser?.events) || {};

  //console.log('EVENTOS DEL USUARIO DESDE HOME' + JSON.stringify(userEvents));
  // console.log('CURRENT USER FROM HOME' + currentUser);
  // console.log('CURRENT events FROM HOME' + JSON.stringify(userEvents));

  useEffect(() => {
    if (!currentUser) {
      dispatch(fetchCurrentUser(authCtx.user.uid));
      console.log('VACIOO');
    }
  }, [authCtx, dispatch]);

  useLayoutEffect(() => {
    if (Object.keys(userEvents).length > 0) {
      dispatch(fetchEvents(currentUser));
    }
  }, [userEvents, dispatch]);

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
