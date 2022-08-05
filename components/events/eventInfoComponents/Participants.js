import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import Title from '../../ui/Title';
import { Colors } from '../../../constants/styles';
import users from '../../../users';

//HAVE TO BRING FROM THE CURRENT EVENT THE PARTICIPANTS, FOR NOW I'LL DO WITH USERS

const Participants = ({ currentEvent }) => {
  const participants = users;
  let toShowProfile;
  if (participants.length > 4) {
    toShowProfile = participants.slice(0, 4);
  } else {
    toShowProfile = participants;
  }

  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Title>Participants ({participants.length})</Title>
        <TouchableOpacity>
          <Text style={styles.textButton}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.profiles}>
        {/* TAKE EVENT PARTICIPANTS AND PUT THEIR PICTURE, IF MORE THAN 4 SO ... 
            NOW I'LL TAKE THE USERS PICTURES. AT LEAST THE CREATOR PICTURE WILL BE THERE*/}

        {toShowProfile.map((participant, idx) => {
          return (
            <Image
              key={participant.id}
              style={styles.profilePicture}
              source={participant.profilePicture}
            />
          );
        })}

        {participants.length > 4 && (
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
});
