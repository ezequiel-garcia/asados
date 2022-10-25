import { StyleSheet, Text, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { getTime } from '../../../util/date';

const EventChatRow = ({ message }) => {
  return (
    <View style={styles.background}>
      <View style={{ flexDirection: 'row' }}>
        <Image
          style={styles.profilePicture}
          source={{ uri: message.photoURL }}
        />
        <View>
          <Text style={styles.displayName}>{message.displayName}</Text>
          <Text style={styles.message}>{message.message}</Text>
        </View>
      </View>
      <Text style={styles.time}>{getTime(message?.timestamp?.toDate())}</Text>
    </View>
  );
};

export default EventChatRow;

const styles = StyleSheet.create({
  background: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'top',
    backgroundColor: '#6d8fc2e1',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
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
  displayName: {
    textTransform: 'capitalize',
    fontSize: 17,
    fontFamily: 'Montserrat_400Regular',
    color: 'white',
  },
  time: {
    fontFamily: 'Montserrat_400Regular',
    color: 'white',
    fontSize: 13,
  },
});
