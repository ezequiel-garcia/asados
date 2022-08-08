import { useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert, Pressable } from 'react-native';
import Background from '../../ui/Background';
import Button from '../../ui/Button';
import ModalBills from './ModalBills';
import BillsContainer from './BillsContainer';

//noo
import { events } from '../../../dummyData';

const billsStam = [
  {
    id: 1,
    date: new Date(12, 11, 2022),
    title: 'Comprar carne',
    amount: 50,
    owner: { name: 'Ezequiel' },
  },
  {
    id: 2,
    date: new Date(9, 11, 2022),
    title: 'Verduras',
    amount: 120,
    owner: { name: 'pepe' },
  },
  {
    id: 3,
    date: new Date(5, 6, 2022),
    title: 'Comprar carne',
    amount: 50,
    owner: { name: 'Ezequiel' },
  },
];

const BillsScreen = () => {
  const [bills, setBills] = useState(billsStam);
  const [modalVisible, setModalVisible] = useState(false);
  const [currenBill, setCurrentBill] = useState(null);

  //ME TRAIGO EL CURRENTEVENT DE REDUX
  const currentEvent = events[0];

  return (
    <Background>
      <View style={styles.container}>
        <ModalBills
          currentEvent={currentEvent}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          currentBill={currenBill}
          setCurrentBill={setCurrentBill}
          setBills={setBills}
        />

        {/* receive all this stuff so from the task i can open the modal with edit and delete */}
        <BillsContainer
          bills={bills}
          setCurrentBill={setCurrentBill}
          setModalVisible={setModalVisible}
          setBills={setBills}
        />

        <Button
          personalStyle={styles.button}
          onPress={() => setModalVisible(true)}
        >
          ADD BILL
        </Button>
      </View>
    </Background>
  );
};

export default BillsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 40,
    // alignItems: 'center',
  },
  button: {
    width: '40%',
    marginTop: 5,
  },
});
