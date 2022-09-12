import { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthenticationContext } from '../../store/auth/auth-context';

const Logout = () => {
  const authCtx = useContext(AuthenticationContext);

  return (
    <TouchableOpacity style={styles.logout} onPress={() => authCtx.onLogout()}>
      <MaterialCommunityIcons name="logout" size={30} color="#ffffffe7" />
      <Text style={styles.text}>LOGOUT</Text>
    </TouchableOpacity>
  );
};

export default Logout;

const styles = StyleSheet.create({
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
    marginLeft: 5,
  },
  text: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 15,
    color: 'white',
  },
});
