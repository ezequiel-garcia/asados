import { View, FlatList } from 'react-native';
import Event from './Event';

const Events = ({ dataEvents }) => {
  console.log(dataEvents);
  return (
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        <FlatList
          data={dataEvents}
          keyExtractor={(event) => event.eid}
          renderItem={(eventData) => {
            return <Event event={eventData.item} />;
          }}
        />
      </View>
    </View>
  );
};

export default Events;
