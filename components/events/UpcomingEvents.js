import Events from './Events';

import { useSelector } from 'react-redux';

import { Text, View } from 'react-native';
import { upcoming } from '../../store/redux/eventsSlice';

//DUMMY DATA
//import { events } from '../../dummyData';

const UpcomingEvents = () => {
  const events = useSelector((state) => state.events.events);
  const upc = useSelector((state) => upcoming(state));

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

  return upc.length > 0 ? (
    <Events dataEvents={upc} />
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
