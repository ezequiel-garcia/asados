import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import {
  setMessages,
  setLastMessage,
} from '../../../store/redux/eventsActions';
import Background from '../../ui/Background';
import { Colors } from '../../../constants/styles';
import EventChatRow from './EventChatRow';

import { useNavigation } from '@react-navigation/native';
import { serverTimestamp } from 'firebase/firestore';
import uuid from 'react-native-uuid';

const EventChatScreen = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.events?.currentEvent?.messages);
  const eventInfo = useSelector(
    (state) => state.events?.currentEvent?.eventInfo
  );
  const currentUser = useSelector((state) => state.user.currentUser) || {};

  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() == '') {
      return;
    } else {
      //HAVE TO ADD TO THE MESSAGE
      const id = uuid.v4();
      dispatch(
        setMessages(eventInfo.eid, {
          [id]: {
            id: id,
            timestamp: serverTimestamp(),
            message: input,
            userId: currentUser.uid,
            displayName: currentUser.name,
            photoURL: currentUser.profilePic,
          },
          ...messages,
        })
      );
      dispatch(setLastMessage(eventInfo.eid, input));
      setInput('');
      Keyboard.dismiss();
    }
  };

  return (
    <Background>
      <View style={styles.container}>
        <Text>{Object.values(messages).length ? '' : 'No hay msj'}</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={190}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            {/* Messages */}
            <FlatList
              data={Object.values(messages)}
              keyExtractor={(item) => item.eid}
              renderItem={({ item: message }) => (
                <EventChatRow key={message.id} message={message} />
              )}
            />
          </TouchableWithoutFeedback>

          {/* Input to send a message */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Send Message..."
              placeholderTextColor="#12324a7e"
              onChangeText={setInput}
              onSubmitEditing={sendMessage}
              value={input}
            />
            <Button
              onPress={sendMessage}
              title="Send"
              color={Colors.secondary400}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </Background>
  );
};

export default EventChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 40,
    // alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 0.3,
    borderColor: Colors.primary600,
    padding: 2,
    borderRadius: 10,
    paddingHorizontal: 5,
    // paddingVertical: 10,
  },
  input: {
    flex: 1,
    // padding: 10,
    // backgroundColor: '#ffffffa5',
    // borderRadius: 10,
  },
});
