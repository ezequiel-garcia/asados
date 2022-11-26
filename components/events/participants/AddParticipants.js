import { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../../store/redux/usersActions';
import Background from '../../ui/Background';
import Participant from './Participant';

import { sendEventInvitation } from '../../../store/redux/usersActions';

import Ionicons from '@expo/vector-icons/Ionicons';

const AddParticipants = () => {
  const navigation = useNavigation();

  const { participants, eid, name } = useSelector(
    (state) => state.events?.currentEvent?.eventInfo
  );
  const currentUser = useSelector((state) => state.user.currentUser);

  const [allUsers, setAllUsers] = useState({});

  async function getAllUsers() {
    const allUsersRsp = await fetchAllUsers();
    setAllUsers(allUsersRsp);
  }
  useEffect(() => {
    getAllUsers();
  }, []);

  async function sendInvitation(user) {
    const invitations = {
      ...user.eventsInvitations,
      [eid]: { eid: eid, name: name, inviteName: currentUser.name },
    };
    await sendEventInvitation(user.uid, invitations);
    getAllUsers();
  }

  return (
    <Background>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
        onPress={navigation.goBack}
      >
        <Ionicons name="chevron-back" size={30} color="#ffffffd7" />
        <Text style={{ color: '#ffffffd7', fontSize: 20 }}>Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.uid}
          data={Object.values(allUsers)}
          renderItem={(data) => {
            // Render only the persons that there aren't in the event already or they receive an invitation for the event.
            if (
              !participants[data.item.uid] &&
              !data.item.eventsInvitations?.[`${eid}`]
            ) {
              return (
                <Participant
                  participant={data.item}
                  onPressButton={() => sendInvitation(data.item)}
                />
              );
            }
          }}
        />
      </View>
    </Background>
  );
};

export default AddParticipants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 40,
    //alignItems: 'center',
  },
});
