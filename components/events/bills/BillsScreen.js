import { useState } from 'react';
import { StyleSheet, Text, View, Modal, Alert, Pressable } from 'react-native';
import Background from '../../ui/Background';
import Button from '../../ui/Button';
import ModalBills from './ModalBills';
import BillsContainer from './BillsContainer';
import { useNavigation } from '@react-navigation/native';

const BillsScreen = () => {
  const navigation = useNavigation();
  // const [bills, setBills] = useState(billsStam);
  const [modalVisible, setModalVisible] = useState(false);
  const [currenBill, setCurrentBill] = useState(null);

  return (
    <Background>
      <View style={styles.container}>
        <ModalBills
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          currentBill={currenBill}
          setCurrentBill={setCurrentBill}
        />

        {/* receive all this stuff so from the task i can open the modal with edit and delete */}
        <BillsContainer
          setCurrentBill={setCurrentBill}
          setModalVisible={setModalVisible}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            personalStyle={styles.button}
            onPress={() => setModalVisible(true)}
          >
            ADD BILL
          </Button>
          <Button
            personalStyle={styles.button}
            onPress={() => navigation.navigate('Balance')}
          >
            BALANCES
          </Button>
        </View>
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
