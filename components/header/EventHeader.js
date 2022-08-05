import { useContext } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { AuthenticationContext } from '../../store/auth/auth-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/styles';

//HERE I'LL BRING THE REDUX STORE TO BRING THE CURRENT EVENT
import { events } from '../../dummyData'; //Have to change

const EventHeader = () => {
  const navigation = useNavigation();
  const { user } = useContext(AuthenticationContext); //I can use it to check if is the creator

  const currentEvent = events[0];
  //const eventOwner = user.uid === ownerId;
  const eventOwner = true;

  const handlePress = () => {
    // IF IS THE OWNER GO TO EDIT EVENT
    if (eventOwner) {
      Alert.alert('Edit', 'edit event');
      navigation.navigate('TabBarHome', {
        screen: 'Create Event',
        params: { onEdit: true },
      });
    } else {
      //IF IS A GUEST LEAVE THE EVENT
      Alert.alert('Leave', 'You are leaving the event');
      navigation.navigate('TabBarHome');
    }
  };

  console.log(user);
  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary800 }}>
      <View style={styles.container}>
        <View style={styles.userInfo}>
          <Image
            style={styles.profilePicture}
            source={{ uri: currentEvent.image }}
          />
          <Text style={styles.name}>{currentEvent.title}</Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handlePress();
          }}
        >
          <Text style={styles.buttonText}>{eventOwner ? 'Edit' : 'Leave'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default EventHeader;

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
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 20,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Montserrat_400Regular',
    color: 'white',
  },
  button: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary500,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Montserrat_500Medium',
    fontSize: 15,
  },
});
