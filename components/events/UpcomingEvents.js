import Events from './Events';

import { useSelector } from 'react-redux';

import { Text, View } from 'react-native';
import { upcoming } from '../../store/redux/eventsSlice';
import { useState } from 'react';
import { useLayoutEffect } from 'react';

//DUMMY DATA
//import { events } from '../../dummyData';

const UpcomingEvents = () => {
  const events = useSelector((state) => state.events.events);
  const currentUser = useSelector((state) => state.user.currentUser);
  const upc = useSelector((state) => upcoming(state));

  const [upcom, setUpcoming] = useState([]);

  useLayoutEffect(() => {
    setUpcoming(
      upc.filter((event) =>
        Object.keys(event?.participants).includes(currentUser.uid)
      )
    );
  }, [currentUser?.events, events]);

  // console.log(upc);

  // if (Object.keys(events).length > 0) {
  //   let arrayEvents = [];

  //   arrayEvents = Object.values(events);

  //   const upcoming = arrayEvents
  //     .filter((e) => e.date >= new Date())
  //     .sort((a, b) => a.date - b.date);

  // if (upcoming.length > 0) {
  //   return <Events dataEvents={upcoming} />;
  // }
  // }

  return upcom.length > 0 ? (
    <Events dataEvents={upcom} />
  ) : (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <Text
        style={{
          color: '#ffffff8c',
          fontSize: 15,
          fontFamily: 'Montserrat_400Regular',
        }}
      >
        {'No upcoming events'}
      </Text>
    </View>
  );
};

export default UpcomingEvents;
