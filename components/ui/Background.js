import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../../constants/styles';

const Background = ({ children }) => {
  return (
    <LinearGradient
      // colors={[Colors.primary800, Colors.primary500]}
      colors={[Colors.primary600, '#0d1f2d1f']}
      start={[0, 0]}
      end={[0, 1]}
      style={{ flex: 1 }}
    >
      {children}
    </LinearGradient>
  );
};

export default Background;
