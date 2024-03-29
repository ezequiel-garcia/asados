import { useState, useContext, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Colors } from '../../constants/styles';
import Button from '../ui/Button';
import Input from './Input';
import Animation from './Animation';
import SocialMediaLogin from './SocialMediaLogin';

import { AuthenticationContext } from '../../store/auth/auth-context';

function AuthForm() {
  const authCtx = useContext(AuthenticationContext);
  const [inputs, setInputs] = useState({
    email: {
      value: '',
      isValid: true,
    },

    password: {
      value: '',
      isValid: true,
    },
  });
  const [submitError, setSubmitError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authCtx.error) {
      setSubmitError(true);
      setIsLoading(false);
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
    const passwordIsValid = inputs.password.value.trim().length > 6;

    if (!emailIsValid || !passwordIsValid) {
      setInputs((currentInputs) => {
        return {
          email: { value: currentInputs.email.value, isValid: emailIsValid },
          password: {
            value: currentInputs.password.value,
            isValid: passwordIsValid,
          },
        };
      });
    } else {
      // If inputs are ok Login
      setIsLoading(true);
      authCtx.onLogin(inputs.email.value, inputs.password.value);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        {/* <ScrollView> */}
        <SafeAreaView style={{ flex: 1 }}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'position' : 'height'}
          >
            <Animation />
            {isLoading ? <ActivityIndicator size="large" /> : null}
            <Text style={styles.title}>Login</Text>
            <View style={{ alignContent: 'center', alignItems: 'center' }}>
              <View style={{ width: '90%' }}>
                {!inputs.email.isValid && <Text>Invalid email</Text>}
                <Input
                  label="Email Address"
                  onUpdateValue={(e) => inputChangeHandler('email', e)}
                  value={inputs.email.value}
                  keyboardType="email-address"
                  isInvalid={!inputs.email.isValid}
                />
                {!inputs.password.isValid && (
                  <Text>Invalid password. Minimum 7 characters</Text>
                )}
                <Input
                  label="Password"
                  onUpdateValue={(p) => inputChangeHandler('password', p)}
                  secure
                  value={inputs.password.value}
                  isInvalid={!inputs.password.isValid}
                />
                {submitError && (
                  <Text style={styles.errorText}>
                    Login Authentication Failed. Check your data and try again.
                  </Text>
                )}

                <TouchableOpacity
                  onPress={() => {
                    authCtx.resetError();
                    Navigation.navigate('ForgotPassword');
                  }}
                >
                  <Text style={styles.text}>Forgot your password?</Text>
                </TouchableOpacity>

                <View style={styles.buttons}>
                  <Button onPress={submitHandler}>LOGIN</Button>
                </View>
              </View>
            </View>
            {/* // Social media buttons */}
            <SocialMediaLogin setIsLoading={setIsLoading} />
          </KeyboardAvoidingView>
          {/* </ScrollView> */}
          <View style={styles.signupContainer}>
            <TouchableOpacity
              onPress={() => {
                authCtx.resetError();
                Navigation.navigate('SignIn');
              }}
            >
              <Text style={styles.text}>
                Don't have an account?
                <Text style={styles.signup}> SIGNUP</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default AuthForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: Colors.primary800,
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

  signup: {
    color: Colors.secondary400,
    fontFamily: 'Montserrat_500Medium',
  },
  signupContainer: {
    marginTop: 10,
    width: '90%',
    alignSelf: 'center',
  },
  errorText: {
    color: Colors.error50,
    fontFamily: 'Montserrat_300Light',
  },
});
