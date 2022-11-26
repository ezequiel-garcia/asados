import { Text, StyleSheet, View } from 'react-native';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
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
import ModalInvitation from '../components/events/participants/ModalInvitation';
// import { setEvents } from '../store/redux/eventsSlice';

export default function HomeScreen() {
  const authCtx = useContext(AuthenticationContext);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const currentUser = useSelector((state) => state.user.currentUser);
  const userEvents = useSelector((state) => state.user.currentUser?.events);
  const [invitation, setInvitation] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (!currentUser && authCtx.isAuthenticated) {
      dispatch(fetchCurrentUser(authCtx.user.uid));
    }
  }, [authCtx, dispatch]);

  useEffect(() => {
    //console.log(JSON.stringify(userEvents));
    if (currentUser && authCtx.isAuthenticated) {
      dispatch(fetchEvents(currentUser));
    }
    console.log(JSON.stringify(userEvents) + 'USER EVENTSSS');
  }, [userEvents]);

  useEffect(() => {
    if (
      authCtx.isAuthenticated &&
      currentUser?.eventsInvitations &&
      Object.keys(currentUser.eventsInvitations).length > 0
    ) {
      setInvitation(Object.values(currentUser.eventsInvitations)[0]);
      setModalVisible(true);
    }
  }, [currentUser, invitation]);

  return (
    <Background>
      <Header />
      <View style={{ flex: 1 }}>
        <ModalInvitation
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          eventInvitation={invitation}
          currentUser={currentUser}
        />

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
            <Title>Upcoming events!!</Title>

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
