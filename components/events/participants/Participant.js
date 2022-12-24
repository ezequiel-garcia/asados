import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRoute } from '@react-navigation/native';
import {
  deleteParticipant,
  setBills,
} from '../../../store/redux/eventsActions';

import { Colors } from '../../../constants/styles';

const Participant = ({ participant, onPressButton }) => {
  const route = useRoute();
  const currentEvent = useSelector((state) => state.events.currentEvent || {});
  const currentUser = useSelector((state) => state.user.currentUser);
  const addToEvent = route?.params?.addToEvent;

  const dispatch = useDispatch();

  const deleteUser = () => {
    dispatch(deleteParticipant(participant.uid, currentEvent?.eventInfo?.eid));
    //delete the user bills in the event
    const newBills = currentEvent?.bills.filter(
      (item) => item.owner.uid != participant.uid
    );

    // dispatch(setCurrentEventBills(newTasks));
    dispatch(setBills(currentEvent?.eventInfo?.eid, newBills));
  };

  return (
    <View style={styles.background}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          style={styles.profilePicture}
          source={{ uri: participant.profilePic }}
        />
        <View>
          <Text style={styles.displayName}>{participant.name}</Text>
        </View>
      </View>
      {/* If there is in the add section it will be a button to add, If not to delete from event if there is the admin */}
      {/* If there is the admin of the event and is not him can delete from the event */}
      {!addToEvent ? (
        currentUser.uid == currentEvent?.eventInfo?.admin ? (
          currentUser.uid !== participant.uid ? (
            <TouchableOpacity onPress={deleteUser}>
              <Text style={styles.buttonText}>Delete</Text>
            </TouchableOpacity>
          ) : null
        ) : null
      ) : (
        <TouchableOpacity onPress={onPressButton}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Participant;

const styles = StyleSheet.create({
  background: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginRight: 20,
  },

  displayName: {
    textTransform: 'capitalize',
    fontSize: 17,
    fontFamily: 'Montserrat_400Regular',
    color: 'white',
  },
  buttonText: {
    color: Colors.secondary400,
    fontFamily: 'Montserrat_600SemiBold',
  },
});
