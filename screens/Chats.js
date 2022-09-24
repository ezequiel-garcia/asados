import { StyleSheet, Text, View, FlatList } from 'react-native';
import Background from '../components/ui/Background';
import ChatRow from '../components/chats/ChatRow';
import { useSelector } from 'react-redux';

const Chats = () => {
  const events = useSelector((state) => state.events.events);
  let orderedEvents = [];

  if (Object.keys(events).length > 0) {
    let arrayEvents = [];

    arrayEvents = Object.values(events);

    orderedEvents = arrayEvents.sort((a, b) => a.date - b.date);

    // if (upcoming.length > 0) {
    //   return <Events dataEvents={upcoming} />;
    // }
  }

  return (
    <Background>
      <View style={styles.container}>
        <FlatList
          data={orderedEvents}
          keyExtractor={(event) => event.eid}
          renderItem={(eventData) => {
            return <ChatRow event={eventData.item} />;
          }}
        />
      </View>
    </Background>
  );
};

export default Chats;

const styles = StyleSheet.create({
  container: {
    padding: '5%',
  },
});
