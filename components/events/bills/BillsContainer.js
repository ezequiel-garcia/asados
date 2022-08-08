import { StyleSheet, Text, View, FlatList } from 'react-native';
import Bill from './Bill';

const BillsContainer = ({
  bills,
  setCurrentBill,
  setModalVisible,
  setBills,
}) => {
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
