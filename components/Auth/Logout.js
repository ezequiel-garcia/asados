import { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
//import Ionicons from '@expo/vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthenticationContext } from '../../store/auth/auth-context';

const Logout = () => {
  const authCtx = useContext(AuthenticationContext);

  return (
    <TouchableOpacity onPress={() => authCtx.onLogout()}>
      <MaterialCommunityIcons name="logout" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default Logout;

const styles = StyleSheet.create({});
