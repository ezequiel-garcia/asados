import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Background from '../../ui/Background';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Participant from './Participant';
import Ionicons from '@expo/vector-icons/Ionicons';

const CurrentParticipants = () => {
  const navigation = useNavigation();
  const { participants } = useSelector(
    (state) => state.events?.currentEvent?.eventInfo
  );
  return (
    <Background>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
        onPress={navigation.goBack}
      >
        <Ionicons name="chevron-back" size={30} color="#ffffffd7" />
        <Text style={{ color: '#ffffffd7', fontSize: 20 }}>Back</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item) => item.uid}
          data={Object.values(participants)}
          renderItem={(data) => <Participant participant={data.item} />}
        />
      </View>
    </Background>
  );
};

export default CurrentParticipants;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 40,
    //alignItems: 'center',
  },
});
