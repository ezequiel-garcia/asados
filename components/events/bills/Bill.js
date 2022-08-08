import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Colors } from '../../../constants/styles';
import { MaterialIcons } from '@expo/vector-icons';

import { getDate } from '../../../util/date';

const Bill = ({ bill }) => {
  const dateFormat = getDate(bill.date);

  function onEdit() {}
  function handleDelete() {}

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
            {`${bill.owner} paid $${bill.amount}`}
          </Text>
        </View>
        <View
          style={{
            flex: 2,
            flexDirection: 'row',

            // width: '80%',
            justifyContent: 'space-between',
          }}
        >
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
    height: 70,
    backgroundColor: Colors.primary500,
    borderRadius: 25,
    marginTop: 10,
    marginBottom: 10,
  },
  date: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    backgroundColor: Colors.primary800,
    borderRadius: 20,
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
    paddingBottom: 15,
    paddingTop: 15,
    paddingLeft: 5,
    paddingRight: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  picture: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginRight: 8,
  },
  descriptionContainer: {
    flex: 6,
    justifyContent: 'center',
  },
  description: {
    color: 'white',
    fontFamily: 'Montserrat_300Light',
  },
});
