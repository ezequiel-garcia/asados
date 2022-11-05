import { StyleSheet, Text, View, FlatList } from 'react-native';
import Background from '../../ui/Background';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Participant from './Participant';

const CurrentParticipants = () => {
  const navigation = useNavigation();
  const { participants } = useSelector(
    (state) => state.events?.currentEvent?.eventInfo
  );
  return (
    <Background>
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
