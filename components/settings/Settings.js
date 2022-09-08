import { useState, useContext, useEffect } from 'react';

import {
  StyleSheet,
  View,
  Image,
  Text,
  SafeAreaView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import uuid from 'react-native-uuid';

import { Colors } from '../../constants/styles';
import Button from '../ui/Button';
import Input from '../ui/Input';

import Background from '../ui/Background';
import Title from '../ui/Title';

import ErrorText from '../ui/ErrorText';
import ImagePickerComp from '../ui/ImagePickerComp';

// to save in the DB
import { useDispatch, useSelector } from 'react-redux';
import Logout from '../Auth/Logout';

const Settings = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const currentUser = useSelector((state) => state.user.currentUser);

  const [inputs, setInputs] = useState({
    name: {
      value: currentUser?.name,
      isValid: true,
    },
  });

  const [selectedImage, setSelectedImage] = useState(currentUser?.profilePic);

  const [submitError, setSubmitError] = useState(false);

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currenInputs) => {
      return {
        ...currenInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const nameIsValid = inputs.name.value.trim().length > 0;

    if (!nameIsValid) {
      setInputs((currentInputs) => {
        return {
          name: { value: currentInputs.name.value, isValid: nameIsValid },
        };
      });
    } else {
      // If inputs are ok create the event
      null;
      //MODIFICAR EL USUARIO EN LA BD con el NAME.VALUE y LA IMAGEN
    }
  }

  function handleDelete() {
    return null;
  }

  return (
    <Background>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView contentContainerStyle={styles.scroll}>
          <View style={styles.container}>
            <KeyboardAvoidingView
              // style={{ flex: 1 }}
              behavior="position"
              keyboardVerticalOffset={-40}
            >
              <View style={{ width: 300 }}>
                <Text style={styles.text}>Name</Text>
                <Input
                  label="Name"
                  inputStyle={styles.inputStyle}
                  onUpdateValue={(e) => inputChangeHandler('name', e)}
                  value={inputs.name.value}
                  isInvalid={!inputs.name.isValid}
                />
                {!inputs.name.isValid && (
                  <ErrorText>The name is not valid</ErrorText>
                )}

                <View style={styles.imageContainer}>
                  <Image
                    style={styles.eventPicture}
                    // source={{ uri: selectedImage.localUri }}
                    source={{ uri: selectedImage }}
                  />
                  <ImagePickerComp onSetImage={setSelectedImage} />
                </View>

                <View style={styles.buttons}>
                  <Button
                    personalStyle={styles.buttonSave}
                    onPress={submitHandler}
                  >
                    SAVE
                  </Button>
                  <Button
                    personalStyle={styles.buttonCancel}
                    onPress={handleDelete}
                  >
                    DELETE ACCOUNT
                  </Button>
                </View>
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </Background>
  );
};

export default Settings;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
  },
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Montserrat_400Regular',
  },
  errorText: {
    color: Colors.error200,
  },
  buttons: {
    marginTop: 25,
  },
  inputStyle: {
    fontSize: 16,
    backgroundColor: Colors.primary500,
    color: 'white',
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 10,
  },
  addPhoto: {
    padding: 10,
    backgroundColor: Colors.primary500,
    marginTop: 10,
    width: 100,
    borderRadius: 20,
    alignItems: 'center',
  },
  eventPicture: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginRight: 20,
  },
  buttons: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSave: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: Colors.error500,
  },
});
