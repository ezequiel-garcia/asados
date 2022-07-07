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
import Input from './Input';
// import Animation from './Animation';

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
      // If inputs are ok Login
      authCtx.onLogin(inputs.email.value, inputs.password.value);
    }
  }

  return (
    <View style={styles.container}>
      {/* <Animation /> */}
      <Text style={styles.title}>Login</Text>

      <View style={{ width: 300 }}>
        <Input
          label="Email Address"
          onUpdateValue={(e) => inputChangeHandler('email', e)}
          value={inputs.email.value}
          keyboardType="email-address"
          isInvalid={!inputs.email.isValid}
        />

        {submitError && (
          <Text style={styles.errorText}>
            Login Authentication Failed. Check your data and try again.
          </Text>
        )}

        <View style={styles.buttons}>
          <Button onPress={submitHandler}>LOGIN</Button>
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
    fontSize: 40,
    marginBottom: 20,
    textAlign: 'center',
  },
  text: {
    color: 'white',
    fontWeight: '300',
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
