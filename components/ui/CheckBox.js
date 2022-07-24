import { StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Colors } from '../../constants/styles';

const CheckBox = ({ onPress, checkBoxState, text }) => {
  return (
    <BouncyCheckbox
      onPress={() => onPress(!checkBoxState)}
      text={text}
      size={30}
      isChecked={checkBoxState}
      textStyle={{
        color: 'white',
        textDecorationLine: 'none',
      }}
      iconStyle={{
        backgroundColor: Colors.primary500,
        borderColor: Colors.primary500,
        borderRadius: 5,
      }}
    />
  );
};

export default CheckBox;

const styles = StyleSheet.create({});
