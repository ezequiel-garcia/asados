import { useEffect } from 'react';

import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import Background from '../../ui/Background';
import Button from '../../ui/Button';
import { useNavigation } from '@react-navigation/native';
import users from '../../../users';
import Balance from './Balance';

const BalancesContainer = () => {
  const navigation = useNavigation();
  const bills = useSelector((state) => state.events.currentEvent.bills);
  const eventParticipants = useSelector(
    (state) => state.events?.currentEvent?.eventInfo?.participants
  );

  function totalAmount() {
    if (bills.length == 0) {
      return 0;
    } else {
      let total = 0;
      bills.forEach((bill) => {
        total += bill.amount;
      });
      return total;
    }
  }

  function calculateExpenses() {
    let usersBills = {};
    bills.forEach((bill) => {
      if (usersBills[bill.owner.uid]) {
        usersBills[bill.owner.uid].amount =
          usersBills[bill.owner.uid].amount + bill.amount;
      } else {
        usersBills[bill.owner.uid] = {
          amount: bill.amount,
          name: bill.owner.name,
        };
      }
    });

    // add the users that didn't put money to the list with amount of 0.
    Object.values(eventParticipants).forEach((participant) => {
      if (!usersBills[participant.uid]) {
        usersBills[participant.uid] = {
          amount: 0,
          name: participant.name,
        };
      }
    });

    //Order the bills from max to min
    let orderedBills = Object.values(usersBills).sort(
      (a, b) => b.amount - a.amount
    );

    //Calculate how much everyone have to receive / add
    let expenses = [];
    orderedBills.map(
      (bill) =>
        (bill.amount =
          bill.amount - totalAmount() / Object.keys(eventParticipants).length)
    );

    while (orderedBills.length > 1) {
      if (orderedBills[0].amount == 0) {
        orderedBills.shift();
      }
      if (orderedBills[orderedBills.length - 1].amount == 0) {
        orderedBills.pop();
      }
      if (orderedBills.length > 1) {
        if (
          orderedBills[orderedBills.length - 1].amount * -1 <=
          orderedBills[0].amount
        ) {
          expenses.unshift(
            `${
              orderedBills[orderedBills.length - 1].name
            } have to pay $${-orderedBills[
              orderedBills.length - 1
            ].amount.toFixed(2)} to ${orderedBills[0].name}`
          );
          orderedBills[0].amount +=
            orderedBills[orderedBills.length - 1].amount;
          orderedBills[orderedBills.length - 1].amount = 0;
        } else {
          expenses.unshift(
            `${
              orderedBills[orderedBills.length - 1].name
            } have to pay $${orderedBills[0].amount.toFixed(2)} to ${
              orderedBills[0].name
            }`
          );
          orderedBills[orderedBills.length - 1].amount +=
            orderedBills[0].amount;
          orderedBills[0].amount = 0;
        }
      }
    }

    return <Balance balances={expenses} />;
  }

  return (
    <Background>
      <View style={styles.container}>
        <View style={styles.expensesContainer}>
          <Text style={styles.totalAmount}>
            Total event expenses: ${totalAmount()}
          </Text>
          {/* <Text style={styles.everyoneAmount}>
            Everyone has to pay $
            {totalAmount() / Object.keys(eventParticipants).length}
          </Text> */}

          {Object.keys(eventParticipants)?.length > 1 && calculateExpenses()}
        </View>
        <Button
          personalStyle={styles.button}
          onPress={() => navigation.navigate('BillsScreen')}
        >
          BILLS
        </Button>
      </View>
    </Background>
  );
};

export default BalancesContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 40,
  },
  expensesContainer: {
    height: '90%',
  },
  totalAmount: {
    color: '#fdfdfddc',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 25,
  },
  everyoneAmount: {
    marginVertical: 10,
    color: '#fdfdfddc',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 15,
  },
  button: {
    width: '40%',
    marginTop: 5,
  },
});
