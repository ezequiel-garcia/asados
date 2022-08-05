import { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
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

import { events } from '../../dummyData';

const EventManager = ({ onEdit = false, event = events[1], route }) => {
  //  const authCtx = useContext(AuthenticationContext);

  route?.params?.onEdit ? (onEdit = true) : null;

  //SI SE ESTA EDITANTO TENGO Q TRAER TODOOOS LOS DATOS ACAA!!!
  const [inputs, setInputs] = useState({
    name: {
      value: onEdit ? event?.title : '',
      isValid: true,
    },

    description: {
      value: onEdit ? event?.description : '',
      isValid: true,
    },
    location: {
      value: onEdit ? event?.location : '',
      isValid: true,
    },
  });
  const [date, setDate] = useState(onEdit ? event?.date : new Date());
  const [time, setTime] = useState(onEdit ? event?.time : getTime(new Date()));
  const [shareTasks, setShareTasks] = useState(
    onEdit ? event?.shareTasks : false
  );
  const [shareBills, setShareBills] = useState(
    onEdit ? event?.shareBills : false
  );
  const [selectedImage, setSelectedImage] = useState(
    onEdit
      ? event?.image
      : // : 'https://cdn.pixabay.com/photo/2017/06/10/06/39/calender-2389150_1280.png'
        'https://images.unsplash.com/photo-1499591934245-40b55745b905?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8dHJpcHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60'
  );

  const [submitError, setSubmitError] = useState(false);

  const Navigation = useNavigation();

  useEffect(() => {
    onEdit && Navigation.setOptions({ title: 'Edit Event' });
  }, [onEdit]);

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
      // If inputs are ok create the event --> send to firebase also?

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
      // HERE I HAVE TO PASS THE EVENT TO THE EVENTS AND TO PUT IN CURRENT EVENT
      Navigation.navigate('TopTabs');
    }
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
                  inputStyle={{ ...styles.inputStyle, height: 100 }}
                  onUpdateValue={(e) => inputChangeHandler('description', e)}
                  value={inputs.description.value}
                  //style={{ width: 90 }}
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

                <View style={styles.imageContainer}>
                  <Image
                    style={styles.eventPicture}
                    // source={{ uri: selectedImage.localUri }}
                    source={{ uri: selectedImage }}
                  />
                  <ImagePickerComp onSetImage={setSelectedImage} />
                </View>

                {onEdit ? (
                  <View style={styles.buttonsOnEdit}>
                    <Button
                      personalStyle={styles.buttonSave}
                      onPress={submitHandler}
                    >
                      SAVE
                    </Button>
                    <Button
                      personalStyle={styles.buttonCancel}
                      onPress={submitHandler}
                    >
                      DELETE
                    </Button>
                  </View>
                ) : (
                  <View style={styles.buttons}>
                    <Button onPress={submitHandler}>CREATE</Button>
                  </View>
                )}
              </View>
            </KeyboardAvoidingView>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </Background>
  );
};

export default EventManager;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    // alignContent: 'center',
  },
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
  buttonsOnEdit: {
    marginTop: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSave: {
    flex: 1,
    marginRight: 10,
  },
  buttonCancel: {
    flex: 1,
    backgroundColor: Colors.error500,
  },
});
