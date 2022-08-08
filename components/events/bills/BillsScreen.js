import { useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert, Pressable } from 'react-native';
import Background from '../../ui/Background';
import Button from '../../ui/Button';
// import ModalTask from './ModalTask';
import BillsContainer from './BillsContainer';

const billsStam = [
  {
    id: 1,
    date: new Date(12, 11, 2022),
    title: 'Comprar carne',
    amount: 50,
    owner: 'Ezequiel',
  },
  {
    id: 2,
    date: new Date(9, 11, 2022),
    title: 'Verduras',
    amount: 120,
    owner: 'pepe',
  },
  {
    id: 3,
    date: new Date(5, 6, 2022),
    title: 'Comprar carne',
    amount: 50,
    owner: 'Ezequiel',
  },
];

const BillsScreen = () => {
  const [bills, setBills] = useState(billsStam);
  const [modalVisible, setModalVisible] = useState(false);
  const [currenBill, setCurrentBill] = useState(null);

  return (
    <Background>
      <View style={styles.container}>
        {/* <ModalTask
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          currentTask={currentTask}
          setCurrentTask={setCurrentTask}
          setTasks={setTasks}
        /> */}

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
  },
});
