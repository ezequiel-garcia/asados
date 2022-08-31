import { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { AuthenticationContext } from '../../store/auth/auth-context';
import { useSelector } from 'react-redux';

import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';

//DRAWER
// import DrawerNavigator from '../../navigation/DrawerNavigator';

import { Colors } from '../../constants/styles';

const Header = () => {
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.user.currentUser) || {};

  const { userData } = useContext(AuthenticationContext);

  console.log(currentUser);

  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary800 }}>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image
            style={styles.profilePicture}
            // source={userData.profilePicture}
            source={currentUser.profilePic || userData.profilePicture}
          />
          <Text style={styles.name}>{currentUser.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Settings');
          }}
        >
          <Ionicons name="settings-outline" size={28} color="#ffffffdd" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.primary800,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 25,
    paddingBottom: 15,
    paddingTop: 5,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginRight: 20,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Montserrat_400Regular',
    color: 'white',
  },
});
