import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { GoogleLogin } from '../../store/auth/auth-google';
import React from 'react';

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

              borderRadius: 50,
              alignItems: 'center',
            }}
          >
            <Image
              source={require('../../assets/facebook-login.png')}
              style={{ width: 70, height: 70 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: '#ffffff',

              borderRadius: 50,
            }}
          >
            <Image
              source={require('../../assets/google-login.png')}
              style={{ width: 70, height: 70 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        {/* <GoogleLogin /> */}
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
