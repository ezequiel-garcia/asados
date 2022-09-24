import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { fetchCurrentEvent } from '../../store/redux/eventsActions';

import Title from '../ui/Title';

const ChatRow = ({ event }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handlePress = () => {
    dispatch(fetchCurrentEvent(event.eid));
    navigation.navigate('TopTabs', { screen: 'Chat' });
  };

  return (
    <TouchableOpacity style={styles.background} onPress={handlePress}>
      <Image style={styles.profilePicture} source={{ uri: event.imageURL }} />
      <View>
        <Title>{event.name}</Title>
        <Text style={styles.message}>
          {event.chat?.lastMessage || 'No messages'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  background: {
    marginBottom: 20,
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#01011709',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
  },
  message: {
    color: 'white',
    marginTop: 5,
    fontFamily: 'Montserrat_300Light',
  },
});
