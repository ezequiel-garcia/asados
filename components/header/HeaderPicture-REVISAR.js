import { StyleSheet, Text, View, Image } from 'react-native';
import { useContext } from 'react';

import { AuthenticationContext } from '../../store/auth/auth-context';

const HeaderPicture = () => {
  const { userData } = useContext(AuthenticationContext);
  return (
    <View>
      <Image style={styles.profilePicture} source={userData.profilePicture} />
    </View>
  );
};

export default HeaderPicture;

const styles = StyleSheet.create({
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
});
