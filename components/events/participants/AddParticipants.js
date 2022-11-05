import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../../../store/redux/usersActions';
import Background from '../../ui/Background';
import Participant from './Participant';

import { sendEventInvitation } from '../../../store/redux/usersActions';

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

  function sendInvitation(user) {
    const invitations = {
      ...user.eventsInvitations,
      [eid]: { eid: eid, name: name, inviteName: currentUser.name },
    };
    sendEventInvitation(user.uid, invitations);
    getAllUsers();
  }

  return (
    <Background>
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
