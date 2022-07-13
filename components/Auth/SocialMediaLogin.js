import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';

const SocialMediaLogin = () => {
  return (
    <View style={styles.containerSocialMedia}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, height: 0.5, backgroundColor: '#ffffffa7' }} />
        <View>
          <Text style={styles.text}>Or login with</Text>
        </View>
        <View style={{ flex: 1, height: 0.5, backgroundColor: '#ffffffa7' }} />
      </View>
      <View style={styles.socialMediaButtons}>
        <View style={styles.socialMediaButton}>
          <TouchableOpacity
            style={{
              backgroundColor: '#6262fb',
              padding: 20,
              width: 65,
              borderRadius: 50,
              alignItems: 'center',
            }}
          >
            <FontAwesome5 name="facebook-f" size={24} color="#332564" />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#6262fb',
              padding: 20,
              borderRadius: 50,
            }}
          >
            <FontAwesome5 name="google" size={24} color="#332564" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SocialMediaLogin;

const styles = StyleSheet.create({
  containerSocialMedia: {
    width: 300,
    marginTop: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialMediaButton: {
    marginRight: 30,
  },
  socialMediaButtons: {
    flexDirection: 'row',
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontFamily: 'Montserrat_200ExtraLight',
    color: 'white',
    marginLeft: 10,
    marginRight: 10,
  },
});
