import { StyleSheet, Text, View } from 'react-native';
import DateTimePicker from '../ui/DateTimePicker';

const DateAndTimePicker = ({ date, time, onConfirmTime, onConfirmDate }) => {
  // function handlerConfirm(e) {
  //   onConfirmDate(e);
  // }

  return (
    <View style={styles.selectors}>
      {/* Date picker */}
      <DateTimePicker
        onConfirm={onConfirmDate}
        text={date.toLocaleDateString()}
        iconName="calendar-outline"
        mode="date"
      />
      {/* Time Picker */}
      <DateTimePicker
        onConfirm={onConfirmTime}
        text={time}
        iconName="time-outline"
        mode="time"
      />
    </View>
  );
};

export default DateAndTimePicker;

const styles = StyleSheet.create({
  selectors: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
