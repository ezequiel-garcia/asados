import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import Background from '../ui/Background';
import DateAndTime from './eventInfoComponents/DateAndTime';
import Description from './eventInfoComponents/Description';
import Participants from './eventInfoComponents/Participants';
import {
  NavigationHelpersContext,
  useNavigation,
} from '@react-navigation/native';

const EventInfo = () => {
  const navigation = useNavigation();
  const currentEvent = useSelector((state) => state.events.currentEvent);
  const currentUser = useSelector((state) => state.user.currentUser);

  //console.log(JSON.stringify(currentEvent));
  useEffect(() => {
    if (currentEvent?.eventInfo?.participants) {
      if (
        Object.keys(currentEvent?.eventInfo?.participants).includes(
          currentUser.uid
        ) == false
      ) {
        navigation.navigate('Home');
      }
    }
  }, [currentEvent]);

  return (
    <Background>
      <View style={styles.container}>
        <DateAndTime currentEvent={currentEvent?.eventInfo} />
        <Description currentEvent={currentEvent?.eventInfo} />
        <Participants currentEvent={currentEvent?.eventInfo} />
      </View>
    </Background>
  );
};

export default EventInfo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: 'center',
  },
});
