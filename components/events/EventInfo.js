import { StyleSheet, Text, View } from 'react-native';
import React, { useLayoutEffect } from 'react';

import { useNavigation } from '@react-navigation/native';

const EventInfo = () => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'hola',
    });
  }, [navigation]);

  return (
    <View>
      <Text>EventInfo</Text>
    </View>
  );
};

export default EventInfo;

const styles = StyleSheet.create({});
