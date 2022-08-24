import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrentEvent } from '../../store/redux/eventsActions';
import Background from '../ui/Background';
import DateAndTime from './eventInfoComponents/DateAndTime';
import Description from './eventInfoComponents/Description';
import Participants from './eventInfoComponents/Participants';

//HERE I'LL BRING THE REDUX STORE TO BRING THE CURRENT EVENT
import { events } from '../../dummyData'; //Have to change

const EventInfo = ({ route }) => {
  //const currentEvent = events[0];

  const currentEvent = useSelector(
    (state) => state.events.currentEvent.eventInfo
  );

  console.log(JSON.stringify(currentEvent) + 'CURRENT EVENTTT');

  return (
    <Background>
      <View style={styles.container}>
        <DateAndTime currentEvent={currentEvent} />
        <Description currentEvent={currentEvent} />
        <Participants />
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
