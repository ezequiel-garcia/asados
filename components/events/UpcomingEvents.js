import Events from './Events';

import { useSelector } from 'react-redux';

import { Text, View } from 'react-native';

//DUMMY DATA
//import { events } from '../../dummyData';

const UpcomingEvents = () => {
  const events = useSelector((state) => state.events.events);
  console.log('EVENTOS DESDE UPCOMING' + JSON.stringify(events));

  if (Object.keys(events).length > 0) {
    let arrayEvents = [];

    arrayEvents = Object.values(events);

    console.log(arrayEvents[0]);
    const upcoming = arrayEvents
      .filter((e) => e.date >= new Date())
      .sort((a, b) => a.date - b.date);

    if (upcoming.length > 0) {
      return <Events dataEvents={upcoming} />;
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <Text style={{ color: '#ffffffb7', fontSize: 20 }}>
        {'No upcoming events'}
      </Text>
    </View>
  );
};

export default UpcomingEvents;
