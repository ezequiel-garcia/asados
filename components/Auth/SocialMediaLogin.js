import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';

const SocialMediaLogin = () => {
  return (
    <View style={styles.containerSocialMedia}>
      <Text style={{ color: 'white' }}>Or login with</Text>
      <View style={styles.socialMediaButtons}>
        <View style={styles.socialMediaButton}>
          <TouchableOpacity
            style={{
              backgroundColor: '#6262fb',
              padding: 20,
              borderRadius: 50,
            }}
          >
            <Text style={{ color: 'white' }}>FB</Text>
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
            <Text style={{ color: 'white' }}>GOO</Text>
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
    marginTop: 25,
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
});
