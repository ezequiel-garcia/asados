import { useEffect } from 'react';

import { StyleSheet, Text, View, FlatList } from 'react-native';

import { setBills } from '../../../store/redux/eventsActions';
import { useSelector } from 'react-redux';

const BalancesContainer = () => {
  const bills = useSelector((state) => state.events.currentEvent.bills);
  const eventParticipants = useSelector(
    (state) => state.events?.currentEvent?.participants
  );

  function totalAmount() {
    if (bills.length == 0) {
      return 0;
    } else {
      const total = 0;
      bills.forEach((bill) => {
        total += bill.amount;
      });
      return total;
    }
  }

  function calculateExpenses() {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.noBills}>Total event expenses: {totalAmount}</Text>
      {Object.keys(eventParticipants)?.length > 1 && calculateExpenses}
    </View>
  );
};

export default BalancesContainer;

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
