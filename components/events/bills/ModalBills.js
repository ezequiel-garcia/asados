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
import uuid from 'react-native-uuid';
import Input from '../../ui/Input';
import SelectWhoPaid from './SelectWhoPaid';
import { Colors } from '../../../constants/styles';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentEventBills } from '../../../store/redux/eventsSlice';

const ModalBills = ({
  modalVisible,
  setModalVisible,

  currentBill,
  setCurrentBill,
}) => {
  const bills = useSelector((state) => state.events.currentEvent.bills);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  const [billTitle, setBillTitle] = useState(
    currentBill ? currentBill.title : ''
  );
  // const [owner, setOwner] = useState(currentBill ? currentBill.owner : '');
  const [amount, setAmount] = useState(currentBill ? currentBill.amount : '');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (currentBill) {
      setBillTitle(currentBill.title);
      // setOwner(currentBill.owner);
      setAmount(currentBill.amount);
      setError(false);
    }
  }, [modalVisible, currentBill]);

  function handleAdd() {
    if (billTitle.trim() == '' || isNaN(amount)) {
      setError(true);
    } else {
      //HAVE TO ADD TO THE BILLS
      dispatch(
        setCurrentEventBills([
          {
            id: uuid.v4(),
            title: billTitle,
            owner: { name: currentUser.name, uid: currentUser.uid },
            date: new Date(),
            amount: amount,
          },
          ...bills,
        ])
      );

      onCancel();
    }
  }

  function handleEdit() {
    if (billTitle.trim() == '' || isNaN(amount)) {
      setError(true);
    } else {
      const editedBills = bills.map((bill) => {
        if (bill.id != currentBill.id) {
          return bill;
        } else {
          return {
            id: bill.id,
            title: billTitle,
            owner: currentUser.name,
            amount: amount,
            date: bill.date,
          };
        }
      });

      dispatch(setCurrentEventBills(editedBills));
      onCancel();
    }
  }

  function onCancel() {
    // initializate the inputs
    setBillTitle('');
    // setOwner('');
    setAmount('');
    setCurrentBill(null);
    // Close the modal
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
      <TouchableWithoutFeedback onPress={onCancel}>
        <View style={styles.centeredView}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.modalView}>
              {error && (
                <Text style={styles.errorText}>
                  Error. Check your data and try again
                </Text>
              )}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Input
                    label="Bill Title"
                    inputStyle={styles.inputStyle}
                    onUpdateValue={(e) => {
                      setBillTitle(e);
                      setError(false);
                    }}
                    value={billTitle}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  <Input
                    label="Amount"
                    keyboardType="numeric"
                    inputStyle={styles.inputStyle}
                    onUpdateValue={(e) => {
                      setAmount(Number(e));
                      setError(false);
                    }}
                    value={'' + amount}
                  />
                </View>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                  {/* <Input
                    label="Who paid"
                    inputStyle={styles.inputStyle}
                    onUpdateValue={(e) => {
                      setOwner({ name: e }), setError(false);
                    }}
                    value={owner.name}
                  /> */}
                </View>
              </View>
              {/* SELECT WHO PAID */}

              {/* <SelectWhoPaid setOwner={setOwner} currentEvent={currentEvent} /> */}

              <View style={{ flexDirection: 'row' }}>
                {currentBill ? (
                  <TouchableOpacity style={styles.button} onPress={handleEdit}>
                    <Text>SAVE</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles.button} onPress={handleAdd}>
                    <Text>ADD</Text>
                  </TouchableOpacity>
                )}

                <TouchableOpacity style={styles.button} onPress={onCancel}>
                  <Text>CANCEL</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalBills;

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
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  inputStyle: {
    fontSize: 16,
    backgroundColor: 'rgba(34, 98, 146, 0.88)',
    // backgroundColor: Colors.primary600,
    color: '#ffffffd6',
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
  errorText: {
    color: Colors.error50,
    fontFamily: 'Montserrat_300Light',
  },
});
