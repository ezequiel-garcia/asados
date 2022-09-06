import { useSelector } from 'react-redux';

import { Text, View } from 'react-native';

import Events from './Events';

const PreviousEvents = () => {
  const events = useSelector((state) => state.events.events);

  if (Object.keys(events).length > 0) {
    let arrayEvents = [];

    arrayEvents = Object.values(events);

    const previous = arrayEvents
      .filter((e) => e.date < new Date())
      .sort((a, b) => a.date - b.date);

    if (previous.length > 0) {
      return <Events dataEvents={previous} />;
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
      <Text
        style={{
          color: '#ffffffb7',
          fontSize: 20,
          fontFamily: 'Montserrat_400Regular',
        }}
      >
        {'No previous events'}
      </Text>
    </View>
  );
};

export default PreviousEvents;
