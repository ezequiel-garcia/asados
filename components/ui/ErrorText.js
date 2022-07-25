import { StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants/styles';

const ErrorText = ({ children }) => {
  return <Text style={styles.errorText}>{children}</Text>;
};

export default ErrorText;

const styles = StyleSheet.create({
  errorText: {
    color: Colors.error50,
    fontFamily: 'Montserrat_300Light',
  },
});
