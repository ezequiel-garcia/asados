import { StyleSheet, Text, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import React from 'react';

const EventChatRow = ({ message }) => {
  return (
    <View style={styles.background}>
      <Image style={styles.profilePicture} source={{ uri: message.photoURL }} />
      <View>
        <Text style={styles.displayName}>{message.displayName}</Text>
        <Text style={styles.message}>{message.message}</Text>
      </View>
    </View>
  );
};

export default EventChatRow;

const styles = StyleSheet.create({
  background: {
    marginBottom: 10,

    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
  },
  message: {
    color: 'white',
    marginTop: 5,
    fontFamily: 'Montserrat_300Light',
  },
  displayName: {
    textTransform: 'capitalize',
    fontSize: 17,
    fontFamily: 'Montserrat_400Regular',
    color: 'white',
  },
});
