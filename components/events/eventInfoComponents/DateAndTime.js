import { StyleSheet, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { getDateForInfo } from '../../../util/date';

const DateAndTime = ({ currentEvent }) => {
  return (
    <View style={styles.dateAndHour}>
      <View style={styles.infoContainer}>
        <Ionicons name="calendar-outline" size={30} color="white" />
        <Text style={styles.text}>{getDateForInfo(currentEvent.date)}</Text>
      </View>
      <View style={styles.infoContainer}>
        <MaterialCommunityIcons name="clock-outline" size={30} color="white" />
        <Text style={styles.text}>{currentEvent.time}</Text>
      </View>
    </View>
  );
};

export default DateAndTime;

const styles = StyleSheet.create({
  dateAndHour: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  infoContainer: {
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontFamily: 'Montserrat_500Medium',

    textAlign: 'center',
  },
});
