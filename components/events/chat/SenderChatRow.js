import { StyleSheet, Text, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { getTime } from '../../../util/date';

const SenderChatRow = ({ message }) => {
  return (
    <View style={styles.background}>
      <Text style={styles.time}>{getTime(message?.timestamp?.toDate())}</Text>
      <View style={{ flex: 1, alignItems: 'flex-end' }}>
        <Text style={styles.displayName}>You</Text>
        <Text style={styles.message}>{message.message}</Text>
      </View>
    </View>
  );
};

export default SenderChatRow;

const styles = StyleSheet.create({
  background: {
    marginBottom: 10,
    flexDirection: 'row',
    // alignItems: 'baseline',
    backgroundColor: '#5d7395fd',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
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
