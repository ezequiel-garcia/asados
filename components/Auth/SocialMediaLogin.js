import { useState, useEffect } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { GoogleLogin } from '../../store/auth/auth-google';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import {
  REACT_APP_EXPO_CLIENT_ID,
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
import { useDispatch } from 'react-redux';

import { checkIfExist } from '../../store/redux/usersActions';

WebBrowser.maybeCompleteAuthSession();

// const redirectUri = makeRedirectUri({
//   scheme: 'com.ezegarcia.Asados',
//   path: 'redirect',
// });

const SocialMediaLogin = () => {
  const [accessToken, setAccessToken] = useState(null);
  // const [user, setUser] = useState(null);
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: REACT_APP_WEB_CLIENT_ID,
    iosClientId: REACT_APP_IOS_CLIENT_ID,
    androidClientId: REACT_APP_ANDROID_CLIENT_ID,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (response?.type == 'success') {
      // user access token
      console.log(JSON.stringify(response));
      setAccessToken(response?.authentication?.accessToken);
      accessToken && fetchUserInfo();
    }
  }, [response, accessToken]);

  async function fetchUserInfo() {
    try {
      let userResponse = await fetch(
        'https://www.googleapis.com/userinfo/v2/me',
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const userInfo = await userResponse.json();
      const { id_token } = response?.params;
      const auth = getAuth();
      const credential = GoogleAuthProvider.credential(id_token);
      const { user } = await signInWithCredential(auth, credential);

      dispatch(checkIfExist(user.uid, userInfo.name));
      console.log(user.uid + 'UIDDD');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={styles.containerSocialMedia}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, height: 0.5, backgroundColor: '#ffffffa7' }} />
        <View>
          <Text style={styles.text}>Or</Text>
        </View>
        <View style={{ flex: 1, height: 0.5, backgroundColor: '#ffffffa7' }} />
      </View>
      <View style={styles.socialMediaButtons}>
        <View style={{ width: '100%' }}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={() => promptAsync()}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Image
                source={require('../../assets/google-login.png')}
                style={{ width: 50, height: 50 }}
                resizeMode="contain"
              />
              <Text style={styles.buttonText}>Continue with google</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SocialMediaLogin;

const styles = StyleSheet.create({
  containerSocialMedia: {
    width: '100%',
    marginTop: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: '#ffffff',
    width: '100%',
    borderRadius: 10,
    marginRight: 30,
  },
  socialMediaButtons: {
    flexDirection: 'row',
    width: '100%',
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
  buttonText: {
    color: '#5f5f5f',
    fontFamily: 'Montserrat_500Medium',
    fontSize: 18,
  },
});
