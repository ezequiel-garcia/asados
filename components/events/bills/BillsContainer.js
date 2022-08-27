import { useEffect } from 'react';

import { StyleSheet, Text, View, FlatList } from 'react-native';
import Bill from './Bill';

import { setBills } from '../../../store/redux/eventsActions';
import { useSelector, useDispatch } from 'react-redux';

const BillsContainer = ({
  // bills,
  setCurrentBill,
  setModalVisible,
  // setBills,
}) => {
  const dispatch = useDispatch();
  const bills = useSelector((state) => state.events.currentEvent.bills);
  const { eid } = useSelector((state) => state.events.currentEvent.eventInfo);

  useEffect(() => {
    if (bills.length > 0) {
      dispatch(setBills(eid, bills));
    }
  }, [bills]);

  return (
    <View style={styles.container}>
      {bills?.length == 0 && <Text>No bills</Text>}
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
});
