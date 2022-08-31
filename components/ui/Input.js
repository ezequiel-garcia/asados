import { View, Text, TextInput, StyleSheet } from 'react-native';

import { Colors } from '../../constants/styles';

function Input({
  label,
  keyboardType,
  secure,
  onUpdateValue,
  value,
  isInvalid,
  inputStyle,
  multiline,
}) {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[
          styles.input,
          isInvalid && styles.inputInvalid,
          { ...inputStyle },
        ]}
        multiline={multiline ? true : false}
        placeholder={label}
        placeholderTextColor="#ffffffea"
        //placeholderTextColor="black"
        autoCapitalize="none"
        keyboardType={keyboardType}
        onChangeText={onUpdateValue}
        value={value}
      />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginVertical: 8,
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 12,
    //backgroundColor: 'white',
    borderRadius: 10,
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
  },
  inputInvalid: {
    backgroundColor: Colors.error50,
    borderWidth: 0.8,
    borderColor: Colors.error500,
  },
});
