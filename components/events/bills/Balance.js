import { StyleSheet, Text, View, FlatList } from 'react-native';
import uuid from 'react-native-uuid';
import { Colors } from '../../../constants/styles';

import React from 'react';

const Balance = ({ balances }) => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginTop: 15,
        }}
      >
        <View
          style={{
            width: '70%',
            borderColor: Colors.secondary400,
            borderWidth: 0.5,
          }}
        ></View>
      </View>
      <FlatList
        style={styles.list}
        data={balances}
        renderItem={(item) => (
          <Text style={styles.text} key={uuid.v4()}>
            {item.item}
          </Text>
        )}
      />
    </View>
  );
};

export default Balance;

const styles = StyleSheet.create({
  list: {
    marginTop: 15,
  },
  text: {
    textTransform: 'capitalize',
    marginVertical: 10,
    fontSize: 15,
    fontFamily: 'Montserrat_600SemiBold',
    color: '#ebebebde',
  },
});
