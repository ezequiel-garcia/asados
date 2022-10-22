import { StyleSheet, Text, View, FlatList } from 'react-native';
import Bill from './Bill';

import { setBills } from '../../../store/redux/eventsActions';
import { useSelector } from 'react-redux';

const BillsContainer = ({
  // bills,
  setCurrentBill,
  setModalVisible,
  // setBills,
}) => {
  const bills = useSelector((state) => state.events.currentEvent.bills);

  return (
    <View style={styles.container}>
      {bills?.length == 0 && <Text style={styles.noBills}>No bills</Text>}
      <FlatList
        data={bills}
        keyExtractor={(bill) => bill.id}
        renderItem={(itemData) => (
          <Bill
            bill={itemData.item}
            setCurrentBill={setCurrentBill}
            setModalVisible={setModalVisible}
            setBills={setBills}
          />
        )}
      />
    </View>
  );
};

export default BillsContainer;

const styles = StyleSheet.create({
  container: {
    height: '90%',
  },
  noBills: {
    color: '#eeebebb7',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 30,
  },
});
