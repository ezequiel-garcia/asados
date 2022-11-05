import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  KeyboardAvoidingView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { Colors } from '../../../constants/styles';

import { useSelector, useDispatch } from 'react-redux';

import {
  acceptEventInvitation,
  rejectEventInvitation,
} from '../../../store/redux/usersActions';

const ModalInvitation = ({
  modalVisible,
  setModalVisible,
  eventInvitation,
  currentUser,
}) => {
  const dispatch = useDispatch();

  async function handleAccept() {
    await acceptEventInvitation(
      currentUser,
      currentUser.eventsInvitations,
      eventInvitation.eid
    );
    setModalVisible(false);
  }

  async function onCancel() {
    await rejectEventInvitation(
      currentUser,
      currentUser.eventsInvitations,
      eventInvitation.eid
    );
    setModalVisible(false);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>Event Invitation</Text>
              <Text style={styles.text}>
                <Text style={styles.bold}>{eventInvitation?.inviteName} </Text>
                has invited you to the event{' '}
                <Text style={styles.bold}>{eventInvitation?.name}</Text>
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.button} onPress={handleAccept}>
              <Text style={styles.buttonText}>ACCEPT</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text style={styles.buttonText}>CANCEL</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalInvitation;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'rgba(4, 22, 36, 0.88)',
    margin: 20,
    width: '80%',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  button: {
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.secondary600,
    borderRadius: 10,
  },
  title: {
    color: 'white',
    fontFamily: 'Montserrat_500Medium',
    fontSize: 20,
    marginBottom: 15,
  },
  text: {
    color: 'white',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 15,
    marginBottom: 5,
  },
  bold: {
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 16,
    textTransform: 'capitalize',
  },
  buttonText: {
    color: '#ffffffe0',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 15,
  },
});
