import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

import {
  REACT_APP_WEV_CLIENT_ID,
  REACT_APP_IOS_CLIENT_ID,
  REACT_APP_ANDROID_CLIENT_ID,
} from '@env';

// WebBrowser.maybeCompleteAuthSession();

// export function GoogleLogin() {
//   const [accessToekn, setAccessToken] = useState(null);
//   const [user, setUser] = useState(null);
//   const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
//     clientId: REACT_APP_WEV_CLIENT_ID,
//     iosClientId: REACT_APP_IOS_CLIENT_ID,
//     androidClientId: REACT_APP_ANDROID_CLIENT_ID,
//   });

//   useEffect(() => {
//     if (response?.type === 'success') {
//       setAccessToken(response?.authentication?.accessToken);
//       accessToekn && fetchUserInfo();
//     }
//   }, [response]);

//   async function fetchUserInfo() {
//     let response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
//       headers: { Authorization: `Bearer ${accessToekn}` },
//     });
//     const userInfo = await response.json();

//     setUser(userInfo);

//     console.log('USUARIO LOGUEADO --> ' + userInfo);
//   }

//   return (
//     <View>
//       <TouchableOpacity
//         style={{
//           backgroundColor: '#ffffff',
//           borderRadius: 50,
//         }}
//         onPress={() => {
//           promptAsync();
//         }}
//       >
//         <Image
//           source={require('../../assets/google-login.png')}
//           style={{ width: 70, height: 70 }}
//           resizeMode="contain"
//         />
//       </TouchableOpacity>
//     </View>
//   );
// }
