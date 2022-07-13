import { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../constants/styles';
import Button from '../ui/Button';
import Input from './Input';

import { AuthenticationContext } from '../../store/auth/auth-context';

const ForgotPassword = () => {
  const authCtx = useContext(AuthenticationContext);
  const [inputs, setInputs] = useState({
    email: {
      value: '',
      isValid: true,
    },
  });
  const [submitError, setSubmitError] = useState(false);

  useEffect(() => {
    if (authCtx.error) {
      setSubmitError(true);
    } else {
      setSubmitError(false);
    }
  }, [authCtx.error]);

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currenInputs) => {
      return {
        ...currenInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  const Navigation = useNavigation();

  async function submitHandler() {
    // Validate before submit
    const emailIsValid =
      inputs.email.value.includes('@') &&
      inputs.email.value.includes('.') &&
      inputs.email.value.trim().length > 4;

    if (!emailIsValid) {
      setInputs((currentInputs) => {
        return {
          email: { value: currentInputs.email.value, isValid: emailIsValid },
        };
      });
    } else {
      // If email it's ok, send the email verificaftion
      const valid = await authCtx.forgotPassword(inputs.email.value);
      console.log(valid);
      if (valid) {
        Alert.alert('Email Sent', 'The reset password was sent to your email');
        Navigation.navigate('Login');
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ width: 300 }}>
        <Text style={styles.title}>Forgot Password?</Text>

        <Input
          label="Enter email"
          onUpdateValue={(e) => inputChangeHandler('email', e)}
          value={inputs.email.value}
          keyboardType="email-address"
          isInvalid={!inputs.email.isValid}
        />

        {submitError && (
          <Text style={styles.errorText}>
            There was a problem trying to send the email. Verify the data and
            try again
          </Text>
        )}

        <View style={styles.buttons}>
          <Button onPress={submitHandler}>SEND EMAIL</Button>
        </View>
      </View>
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary800,
    padding: 20,
  },
  title: {
    color: 'white',
    fontSize: 30,
    marginBottom: 20,
    fontFamily: 'Montserrat_300Light',
  },

  errorText: {
    color: Colors.error200,
    marginBottom: 10,
  },
  buttons: {
    marginTop: 25,
  },

  signup: {
    color: Colors.secondary400,
  },
  signupContainer: {
    marginTop: 20,

    alignSelf: 'center',
  },
});
