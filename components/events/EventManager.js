import { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../constants/styles';
import Button from '../ui/Button';
import Input from '../ui/Input';

import Background from '../ui/Background';
import Title from '../ui/Title';

const EventManager = () => {
  //  const authCtx = useContext(AuthenticationContext);

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
  const [submitError, setSubmitError] = useState(false);

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

  function submitHandler() {}

  //   const Navigation = useNavigation();

  //   async function submitHandler() {
  //     // Validate before submit
  //     const emailIsValid =
  //       inputs.email.value.includes('@') &&
  //       inputs.email.value.includes('.') &&
  //       inputs.email.value.trim().length > 4;
  //     const passwordIsValid = inputs.password.value.trim().length > 6;

  //     if (!emailIsValid || !passwordIsValid) {
  //       setInputs((currentInputs) => {
  //         return {
  //           email: { value: currentInputs.email.value, isValid: emailIsValid },
  //           password: {
  //             value: currentInputs.password.value,
  //             isValid: passwordIsValid,
  //           },
  //         };
  //       });
  //     } else {
  //       // If inputs are ok Login
  //       authCtx.onLogin(inputs.email.value, inputs.password.value);
  //     }
  //   }

  return (
    <Background>
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="position">
          <View style={{ width: 300 }}>
            <Input
              label="Name"
              inputStyle={styles.inputStyle}
              onUpdateValue={(e) => inputChangeHandler('name', e)}
              value={inputs.name.value}
              keyboardType="text"
              //isInvalid={!inputs.email.isValid}
            />

            <Input
              label="Description"
              inputStyle={{ ...styles.inputStyle, height: 80 }}
              onUpdateValue={(e) => inputChangeHandler('description', e)}
              value={inputs.description.value}
              style={{ width: 90 }}
              multiline
              //isInvalid={!inputs.password.isValid}
            />

            <Input
              label="Location"
              inputStyle={styles.inputStyle}
              onUpdateValue={(e) => inputChangeHandler('location', e)}
              value={inputs.location.value}
              //isInvalid={!inputs.password.isValid}
            />
            {submitError && (
              <Text style={styles.errorText}>
                Login Authentication Failed. Check your data and try again.
              </Text>
            )}

            <View style={styles.buttons}>
              <Button onPress={submitHandler}>CREATE</Button>
            </View>
          </View>
        </KeyboardAvoidingView>
      </View>
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
    backgroundColor: Colors.primary600,
    color: 'white',
  },
});
