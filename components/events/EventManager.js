import { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../constants/styles';
import Button from '../ui/Button';
import Input from '../ui/Input';

import Background from '../ui/Background';
import Title from '../ui/Title';
import DateAndTimePicker from './DateAndTimePicker';
import { getTime } from '../../util/date';
import ShareOptions from './ShareOptions';
import ErrorText from '../ui/ErrorText';
import ImagePickerComp from '../ui/ImagePickerComp';

const EventManager = ({ onEdit }) => {
  //  const authCtx = useContext(AuthenticationContext);

  //SI SE ESTA EDITANTO TENGO Q TRAER TODOOOS LOS DATOS ACAA!!!
  const [inputs, setInputs] = useState({
    name: {
      value: '',
      isValid: true,
    },

    description: {
      value: '',
      isValid: true,
    },
    location: {
      value: '',
      isValid: true,
    },
  });
  const [date, setDate] = useState(onEdit ? '15/11/1993' : new Date());
  const [time, setTime] = useState(onEdit ? '12:30' : getTime(new Date()));
  const [shareTasks, setShareTasks] = useState(true);
  const [shareBills, setShareBills] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const [submitError, setSubmitError] = useState(false);

  const Navigation = useNavigation();

  //   useEffect(() => {
  //     if (authCtx.error) {
  //       setSubmitError(true);
  //     } else {
  //       setSubmitError(false);
  //     }
  //   }, [authCtx.error]);

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currenInputs) => {
      return {
        ...currenInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function onConfirmDate(date) {
    setDate(date);
  }
  function onConfirmTime(time) {
    setTime(getTime(time));
  }

  //   async function submitHandler() {
  function submitHandler() {
    // Validate before submit
    //THINK if I want to do optional de description and location
    const nameIsValid = inputs.name.value.trim().length > 0;
    const descriptionIsValid = inputs.description.value.trim().length > 0;
    const locationIsValid = inputs.location.value.trim().length > 2;

    if (!nameIsValid || !descriptionIsValid || !locationIsValid) {
      setInputs((currentInputs) => {
        return {
          name: { value: currentInputs.name.value, isValid: nameIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
          location: {
            value: currentInputs.location.value,
            isValid: locationIsValid,
          },
        };
      });
    } else {
      //       // If inputs are ok Login
      //       authCtx.onLogin(inputs.email.value, inputs.password.value);
      const event = {
        name: inputs.name.value,
        description: inputs.description.value,
        location: inputs.location.value,
        date,
        time,
        shareBills,
        shareTasks,
        image: selectedImage,
      };
      console.log(event);
      Navigation.navigate('Home');
    }
  }

  return (
    <Background>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="position">
            <View style={{ width: 300 }}>
              {(!inputs.description.isValid ||
                !inputs.name.isValid ||
                !inputs.location.isValid) && (
                <ErrorText>Please fill all the data</ErrorText>
              )}

              <Input
                label="Name"
                inputStyle={styles.inputStyle}
                onUpdateValue={(e) => inputChangeHandler('name', e)}
                value={inputs.name.value}
                isInvalid={!inputs.name.isValid}
              />

              <Input
                label="Description"
                inputStyle={{ ...styles.inputStyle, height: 80 }}
                onUpdateValue={(e) => inputChangeHandler('description', e)}
                value={inputs.description.value}
                style={{ width: 90 }}
                multiline
                isInvalid={!inputs.description.isValid}
              />
              <Input
                label="Location"
                inputStyle={styles.inputStyle}
                onUpdateValue={(e) => inputChangeHandler('location', e)}
                value={inputs.location.value}
                isInvalid={!inputs.location.isValid}
              />
              {/* {submitError && (
                <Text style={styles.errorText}>
                  Login Authentication Failed. Check your data and try again.
                </Text>
              )} */}

              {/* HAVE TO PASS THEM THE FUNCTIONS FOR SELECT, THE TIME AND THE DATE */}
              <DateAndTimePicker
                date={date}
                time={time}
                onConfirmDate={onConfirmDate}
                onConfirmTime={onConfirmTime}
              />

              <ShareOptions
                setShareBills={setShareBills}
                setShareTasks={setShareTasks}
                shareTasks={shareTasks}
                shareBills={shareBills}
              />

              {/* <TouchableOpacity style={styles.addPhoto}>
                <Text style={{ color: 'white' }}>Add Photo</Text>
              </TouchableOpacity> */}

              <ImagePickerComp onSetImage={setSelectedImage} />

              <View style={styles.buttons}>
                <Button onPress={submitHandler}>CREATE</Button>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Background>
  );
};

export default EventManager;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 40,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat_400Regular',
  },
  text: {
    color: 'white',
    fontFamily: 'Montserrat_300Light',
  },
  errorText: {
    color: Colors.error200,
    marginBottom: 10,
  },
  buttons: {
    marginTop: 25,
  },
  inputStyle: {
    fontSize: 16,
    backgroundColor: Colors.primary500,
    color: 'white',
  },
  addPhoto: {
    padding: 10,
    backgroundColor: Colors.primary500,
    marginTop: 10,
    width: 100,
    borderRadius: 20,
    alignItems: 'center',
  },
});
