import { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';

import { Colors } from '../../constants/styles';
import Button from '../ui/Button';
import Input from './Input';
import Animation from './Animation';
import SocialMediaLogin from './SocialMediaLogin';

import { AuthenticationContext } from '../../store/auth/auth-context';

function RegisterForm() {
  const authCtx = useContext(AuthenticationContext);
  const [inputs, setInputs] = useState({
    name: {
      value: '',
      isValid: true,
    },
    email: {
      value: '',
      isValid: true,
    },
    confirmEmail: {
      value: '',
      isValid: true,
    },
    password: {
      value: '',
      isValid: true,
    },
    confirmPassword: {
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

  function submitHandler() {
    // Validate before submit
    const nameIsValid = inputs.name.value.trim().length > 1;
    const emailIsValid =
      inputs.email.value.includes('@') &&
      inputs.email.value.includes('.') &&
      inputs.email.value.trim().length > 4;
    const passwordIsValid = inputs.password.value.trim().length > 6;
    const emailsAreEqual =
      emailIsValid && inputs.email.value === inputs.confirmEmail.value;
    const passwordsAreEqual =
      passwordIsValid && inputs.password.value === inputs.confirmPassword.value;

    if (
      !nameIsValid ||
      !emailIsValid ||
      !passwordIsValid ||
      !emailsAreEqual ||
      !passwordsAreEqual
    ) {
      setInputs((currentInputs) => {
        return {
          name: { value: currentInputs.name.value, isValid: nameIsValid },
          email: { value: currentInputs.email.value, isValid: emailIsValid },
          confirmEmail: {
            value: currentInputs.confirmEmail.value,
            isValid: emailsAreEqual,
          },
          password: {
            value: currentInputs.password.value,
            isValid: passwordIsValid,
          },
          confirmPassword: {
            value: currentInputs.confirmPassword.value,
            isValid: passwordsAreEqual,
          },
        };
      });
    } else {
      // If inputs are ok, register
      authCtx.onRegister(
        inputs.name.value,
        inputs.email.value,
        inputs.password.value
      );
    }
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <Animation />

        <Text style={styles.title}> Register</Text>

        <View style={{ width: 300 }}>
          <Input
            label="User Name"
            onUpdateValue={(e) => inputChangeHandler('name', e)}
            value={inputs.name.value}
            keyboardType="email-address"
            isInvalid={!inputs.email.isValid}
          />
          <Input
            label="Email Address"
            onUpdateValue={(e) => inputChangeHandler('email', e)}
            value={inputs.email.value}
            keyboardType="email-address"
            isInvalid={!inputs.email.isValid}
          />

          <Input
            label="Confirm Email Address"
            onUpdateValue={(e) => inputChangeHandler('confirmEmail', e)}
            value={inputs.confirmEmail?.value}
            keyboardType="email-address"
            isInvalid={!inputs.confirmEmail?.isValid}
          />

          <Input
            label="Password"
            onUpdateValue={(p) => inputChangeHandler('password', p)}
            secure
            value={inputs.password.value}
            isInvalid={!inputs.password.isValid}
          />

          <Input
            label="Confirm Password"
            onUpdateValue={(p) => inputChangeHandler('confirmPassword', p)}
            secure
            value={inputs.confirmPassword?.value}
            isInvalid={!inputs.confirmPassword?.isValid}
          />

          {submitError && (
            <Text style={styles.errorText}>
              Register Failed. Check your data and try again.
            </Text>
          )}

          <View style={styles.buttons}>
            <Button onPress={submitHandler}>SIGNUP</Button>
          </View>
        </View>
        {/*  <SocialMediaLogin /> */}
      </KeyboardAvoidingView>

      <View style={styles.signupContainer}>
        <TouchableOpacity
          onPress={() => {
            authCtx.resetError();
            Navigation.navigate('Login');
          }}
        >
          <Text style={styles.text}>
            Do you have an account?
            <Text style={styles.signup}> LOGIN</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default RegisterForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary800,
    padding: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 40,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Montserrat_400Regular',
  },
  text: {
    color: 'white',
    fontWeight: '300',
    fontFamily: 'Montserrat_200ExtraLight',
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
    fontFamily: 'Montserrat_500Medium',
  },
  signupContainer: {
    marginTop: 30,

    alignSelf: 'center',
  },
});
