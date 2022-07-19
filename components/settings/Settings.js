import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import Logout from '../Auth/Logout';

const Settings = () => {
  return (
    <SafeAreaView>
      <View>
        <Text>WELCOME TO SETTINGS</Text>
        <Logout />
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({});
