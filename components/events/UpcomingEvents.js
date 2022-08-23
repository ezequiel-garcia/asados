import Events from './Events';

import { useSelector } from 'react-redux';

import { Text, View } from 'react-native';

//DUMMY DATA
import { events } from '../../dummyData';

const UpcomingEvents = () => {
  const events = useSelector((state) => state.events.events);
  console.log('EVENTOS DESDE UPCOMING' + JSON.stringify(events));

  //ENTRAR DESDE EL OBJECTOOO PARA JACER EL FILTEEER OBJECT.ENTRIES
  if (events.length > 0) {
    const upcoming = events
      .filter((e) => e.date >= new Date())
      .sort((a, b) => a.date - b.date);

    return <Events dataEvents={upcoming} />;
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
