import { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { leaveEvent } from '../../store/redux/eventsActions';
import { AuthenticationContext } from '../../store/auth/auth-context';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/styles';

//HERE I'LL BRING THE REDUX STORE TO BRING THE CURRENT EVENT
import { events } from '../../dummyData'; //Have to change

const EventHeader = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useContext(AuthenticationContext); //I can use it to check if is the creator
  const currentEvent = useSelector((state) => state.events.currentEvent || {});
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentEventInfo = useSelector(
    (state) => state.events.currentEvent?.eventInfo || {}
  );
  const [eventOwner, setEventOwner] = useState(
    currentEventInfo.admin == user.uid
  );

  useState(() => {
    setEventOwner(currentEventInfo.admin == user.uid);
    console.log(eventOwner + 'event owner');
    console.log(JSON.stringify(currentEventInfo));
  }, [currentEventInfo]);

  const handlePress = () => {
    // IF IS THE OWNER GO TO EDIT EVENT
    if (eventOwner) {
      navigation.navigate('TabBarHome', {
        screen: 'Create Event',
        params: {
          onEdit: true,
          event: {
            ...currentEventInfo,
            date: currentEventInfo.date.toISOString(),
          },
        },
      });
    } else {
      //IF IS A GUEST LEAVE THE EVENT
      dispatch(leaveEvent(currentUser, currentEvent));

      navigation.navigate('TabBarHome');
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: Colors.primary800 }}>
      <View style={styles.container}>
        <View style={styles.eventInfo}>
          <Image
            style={styles.profilePicture}
            source={{ uri: currentEventInfo.imageURL }}
          />
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Text style={styles.eventTitle}>{currentEventInfo.name}</Text>
          </View>
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
    width: '100%',
  },
  eventInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  profilePicture: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginRight: 20,
  },
  eventTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat_400Regular',
    color: 'white',
    textTransform: 'capitalize',
  },
  button: {
    padding: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.primary500,
    borderRadius: 20,
    marginLeft: 5,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'Montserrat_500Medium',
    fontSize: 15,
  },
});
