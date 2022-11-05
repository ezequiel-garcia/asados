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

import { acceptEventInvitation } from '../../../store/redux/usersActions';

const ModalInvitation = ({
  modalVisible,
  setModalVisible,
  eventInvitation,
  currentUser,
}) => {
  const dispatch = useDispatch();

  function handleAccept() {
    acceptEventInvitation(
      currentUser,
      currentUser.eventsInvitations,
      eventInvitation.eid
    );
    setModalVisible(false);
  }

  function onCancel() {
    console.log('RECHAZO EVENT');
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
              <Text>Event Invitation</Text>
              <Text>
                {eventInvitation?.inviteName} has invite you to the event{' '}
                {eventInvitation?.name}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={styles.button} onPress={handleAccept}>
              <Text>ACCEPT</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={onCancel}>
              <Text>CANCEL</Text>
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
});
