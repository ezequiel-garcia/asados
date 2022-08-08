import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const SelectWhoPaid = ({ currentEvent, setOwner }) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ width: '100%', height: 50 }}
          keyExtractor={(item) => item.id}
          data={currentEvent.participants}
          renderItem={(itemData) => (
            <TouchableOpacity
              onPress={() => {
                setOwner(itemData.item);
              }}
            >
              <Text style={{ color: 'white' }}>{itemData.item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default SelectWhoPaid;

const styles = StyleSheet.create({});
