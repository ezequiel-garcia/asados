import { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Background from '../../ui/Background';
import { Colors } from '../../../constants/styles';

import { useNavigation } from '@react-navigation/native';

const EventChatScreen = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.events?.currentEvent?.messages);
  const eventInfo = useSelector(
    (state) => state.events?.currentEvent?.eventInfo
  );

  const [input, setInput] = useState('');

  const sendMessage = () => {};

  return (
    <Background>
      <View style={styles.container}>
        <Text>{messages.length ? 'HOLA AMIGO' : 'No hay msj'}</Text>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1 }}
          keyboardVerticalOffset={10}
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Send Message..."
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
    // padding: 10,
    // backgroundColor: '#ffffffa5',
    // borderRadius: 10,
  },
});
