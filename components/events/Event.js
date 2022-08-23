import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import Title from '../ui/Title';
import { Colors } from '../../constants/styles';

import { getDate } from '../../util/date';

const Event = ({ event }) => {
  const { date, name, description, image } = event;
  const dateFormat = getDate(date);
  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <Text style={styles.dateText}>{dateFormat.day}</Text>
        <Text style={styles.dateText}>{dateFormat.month} </Text>
      </View>
      <View style={styles.infoContainer}>
        <Image
          source={{
            uri: image,
          }}
          style={styles.picture}
        />
        <View style={styles.descriptionContainer}>
          <Title>{name}</Title>
          <Text style={styles.description}>
            {description?.length < 55
              ? description
              : description.slice(0, 55) + ' ...'}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '95%',
    height: 90,
    backgroundColor: Colors.primary500,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  date: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    backgroundColor: Colors.primary800,
    borderRadius: 20,
  },
  dateText: {
    color: 'white',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
  },
  infoContainer: {
    flex: 1,
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  picture: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 8,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  description: {
    color: 'white',
    fontFamily: 'Montserrat_300Light',
  },
});
