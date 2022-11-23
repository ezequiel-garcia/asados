import { StyleSheet, Text, View } from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Colors } from '../../constants/styles';

const CheckBox = ({ onPress, checkBoxState, text, decoration }) => {
  return (
    <BouncyCheckbox
      onPress={() => onPress(!checkBoxState)}
      text={text}
      size={25}
      isChecked={checkBoxState}
      textStyle={[
        {
          color: 'white',
        },
        !decoration && { textDecorationLine: 'none' },
      ]}
      iconStyle={{
        backgroundColor: Colors.primary500,
        borderColor: Colors.primary500,
        borderRadius: 5,
      }}
      style={{
        // overflow: 'hidden',
        width: '85%',
      }}
    />
  );
};

export default CheckBox;

const styles = StyleSheet.create({});
