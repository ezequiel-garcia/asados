import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Title = ({ children }) => {
  return <Text style={styles.title}>{children}</Text>;
};

export default Title;

const styles = StyleSheet.create({
  title: {
    textTransform: 'capitalize',
    fontSize: 22,
    fontFamily: 'Montserrat_400Regular',
    color: 'white',
  },
});
