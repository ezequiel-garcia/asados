import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import Title from '../../ui/Title';
import { Colors } from '../../../constants/styles';
import { useNavigation } from '@react-navigation/native';

//HAVE TO BRING FROM THE CURRENT EVENT THE PARTICIPANTS, FOR NOW I'LL DO WITH USERS

const Participants = ({ currentEvent }) => {
  const navigation = useNavigation();

  const participants = currentEvent?.participants || {};
  let toShowProfile = Object.values(participants);
  const lengthParticipants = Object.keys(participants).length;

  if (lengthParticipants > 4) {
    toShowProfile = toShowProfile.slice(0, 4);
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ParticipantsScreen')}
        >
          <Title>Participants ({lengthParticipants})</Title>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ParticipantsScreen', {
              screen: 'AddParticipants',
              params: { addToEvent: true },
            })
          }
        >
          <Text style={styles.textButton}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profiles}>
        {/* TAKE EVENT PARTICIPANTS AND PUT THEIR PICTURE, IF MORE THAN 4 SO ... 
            NOW I'LL TAKE THE USERS PICTURES. AT LEAST THE CREATOR PICTURE WILL BE THERE*/}

        {toShowProfile.map((participant) => {
          return (
            <View key={participant.uid}>
              <Image
                style={styles.profilePicture}
                source={{ uri: participant.profilePic }}
              />
              <Text style={styles.name}>
                {participant.name.substring(0, participant.name.indexOf(' '))}
              </Text>
            </View>
          );
        })}

        {/* {Object.values(participants).map(participant)} */}

        {lengthParticipants > 4 && (
          <Text style={{ color: 'white', fontSize: 30 }}>...</Text>
        )}
      </View>
    </View>
  );
};

export default Participants;

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    width: '100%',
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textButton: {
    fontSize: 20,
    color: Colors.secondary400,
    fontFamily: 'Montserrat_600SemiBold',
    marginLeft: 20,
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 15,
  },
  profiles: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  name: {
    color: 'white',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 12,
  },
});
