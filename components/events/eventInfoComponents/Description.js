import { StyleSheet, Text, View } from 'react-native';
import Title from '../../ui/Title';

import { Entypo } from '@expo/vector-icons';

const Description = ({ currentEvent }) => {
  return (
    <View style={styles.container}>
      <Title>Description</Title>
      <Text style={styles.text}>{currentEvent?.description}</Text>
      <View style={styles.direction}>
        <Entypo style={styles.icon} name="direction" size={24} color="white" />
        <Text style={styles.text}>{currentEvent?.location} </Text>
      </View>
    </View>
  );
};

export default Description;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 20,
  },
  text: {
    marginTop: 10,
    color: 'white',
    fontSize: 17,
    fontFamily: 'Montserrat_300Light',
  },
  direction: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  icon: {
    marginRight: 10,
    marginBottom: -5,
  },
});
