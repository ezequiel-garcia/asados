import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from '../../constants/styles';

import { useNavigation } from '@react-navigation/native';

const TabElement = ({ icon, label, size, navTo }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    // const navTo = label;
    navigation.navigate('TabBarHome', {
      screen: navTo,
      params: { onEdit: false },
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <FontAwesome name={icon} color={Colors.primary800} size={size} />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

export default TabElement;

const styles = StyleSheet.create({
  container: {
    paddingTop: 5,
    paddingBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,

    color: Colors.primary800,
  },
});
