import { useLayoutEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import Background from '../components/ui/Background';
import ChatRow from '../components/chats/ChatRow';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

const Chats = () => {
  const navigation = useNavigation();
  const events = useSelector((state) => state.events.events);
  const [orderedEvents, setOrderedEvents] = useState([]);

  useLayoutEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (Object.keys(events).length > 0) {
        let arrayEvents = [];
        arrayEvents = Object.values(events);
        setOrderedEvents(arrayEvents.sort((a, b) => a.date - b.date));
      }
      console.log('actualizando lpm');
    });
    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation, events]);

  useLayoutEffect(() => {}, [events]);

  return (
    <Background>
      <View style={styles.container}>
        <FlatList
          data={orderedEvents}
          keyExtractor={(event) => event.eid}
          renderItem={(eventData) => {
            return <ChatRow key={eventData.item.eid} event={eventData.item} />;
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
