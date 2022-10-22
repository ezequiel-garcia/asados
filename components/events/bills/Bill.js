import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors } from '../../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';

import { getDate, dateFromDB } from '../../../util/date';

import { useSelector, useDispatch } from 'react-redux';
import { setCurrentEventBills } from '../../../store/redux/eventsSlice';
import { setBills } from '../../../store/redux/eventsActions';

const Bill = ({ bill, setCurrentBill, setModalVisible, setBills }) => {
  const dateFormat = getDate(dateFromDB(bill.date));
  const bills = useSelector((state) => state.events.currentEvent.bills);
  const eventInfo = useSelector(
    (state) => state.events?.currentEvent?.eventInfo
  );
  const dispatch = useDispatch();

  function onEdit() {
    setCurrentBill(bill);
    setModalVisible(true);
  }
  function handleDelete() {
    const newBills = bills.filter((item) => item.id != bill.id);

    // dispatch(setCurrentEventBills(newTasks));
    dispatch(setBills(eventInfo.eid, newBills));
  }

  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <Text style={styles.dateText}>{dateFormat.day}</Text>
        <Text style={styles.dateText}>{dateFormat.month} </Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.titleText}>{bill.title}</Text>
          <Text style={styles.description}>
            {`${bill.owner.name} paid $${bill.amount}`}
          </Text>
        </View>
        <View style={styles.iconsContainer}>
          <TouchableOpacity onPress={onEdit}>
            <MaterialIcons name="mode-edit" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleDelete}>
            <MaterialIcons name="delete-outline" size={24} color="#f47777b3" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Bill;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: 7,
    // borderBottomColor: '#ffffff9a',
    // borderBottomWidth: 1,
    // height: 60,
    // backgroundColor: Colors.primary500,
    // borderRadius: 25,
    // marginTop: 10,
    // marginBottom: 10,
  },
  date: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    paddingRight: 5,
    borderRightColor: '#ffffff9a',
    borderRightWidth: 1,

    // width: 70,
    // backgroundColor: Colors.primary800,
    // borderRadius: 20,
  },
  dateText: {
    color: 'white',
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
  },
  titleText: {
    color: 'white',
    fontFamily: 'Montserrat_500Medium',
    fontSize: 20,
  },
  infoContainer: {
    flex: 1,
    // paddingBottom: 15,
    // paddingTop: 15,
    // paddingLeft: 5,
    // paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },

  descriptionContainer: {
    flex: 6,
    justifyContent: 'center',
  },
  description: {
    color: 'white',
    fontFamily: 'Montserrat_300Light',
  },
  iconsContainer: {
    flex: 2,
    paddingRight: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
