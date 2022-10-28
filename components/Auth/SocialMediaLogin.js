import { useState, useEffect } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { GoogleLogin } from '../../store/auth/auth-google';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {
  REACT_APP_WEB_CLIENT_ID,
  REACT_APP_IOS_CLIENT_ID,
  REACT_APP_ANDROID_CLIENT_ID,
} from '@env';
// import { makeRedirectUri } from 'expo-auth-session';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from 'firebase/auth';

WebBrowser.maybeCompleteAuthSession();

// const redirectUri = makeRedirectUri({
//   scheme: 'com.ezegarcia.Asados',
//   path: 'redirect',
// });

const SocialMediaLogin = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: REACT_APP_WEB_CLIENT_ID,
    iosClientId: REACT_APP_IOS_CLIENT_ID,
    androidClientId: REACT_APP_ANDROID_CLIENT_ID,
  });

  useEffect(() => {
    if (response?.type == 'success') {
      // user access token
      setAccessToken(response.authentication.accessToken);
      accessToken && fetchUserInfo();
      const { id_token } = response.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential);
    }
  }, [response, accessToken]);

  async function fetchUserInfo() {
    let response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = await response.json();
    setUser(userInfo);
  }
  //check working

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
            onPress={() => promptAsync()}
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
        {user && (
          <Text style={{ color: 'white' }}>
            USUARIOOOO {JSON.stringify(user)}
          </Text>
        )}
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
