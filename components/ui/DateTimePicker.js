import React, { useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/styles';

const DateTimePicker = ({ mode, text, onConfirm, iconName }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    onConfirm(date);
    hideDatePicker();
  };

  return (
    <View>
      <TouchableOpacity
        style={[styles.button, { width: mode === 'date' ? 130 : 100 }]}
        onPress={() => {
          Keyboard.dismiss();
          showDatePicker();
        }}
      >
        <Text style={styles.text}>{text}</Text>
        <Ionicons name={iconName} size={24} color="#e3e2e2" />
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={mode}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={mode == 'date' ? new Date() : null}
        date={new Date()}
        display={mode == 'date' ? 'inline' : 'spinner'}
      />
    </View>
  );
};

export default DateTimePicker;

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 130,
    padding: 10,
    paddingBottom: 15,
    paddingTop: 15,
    borderRadius: 10,
    backgroundColor: Colors.primary500,
  },
  text: {
    color: 'white',
    marginRight: 8,
    fontFamily: 'Montserrat_600SemiBold',
  },
});
