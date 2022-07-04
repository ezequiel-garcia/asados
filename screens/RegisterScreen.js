import { useState, useContext } from 'react';

// import AuthContent from '../components/Auth/AuthContent';
// import LoadingOverlay from '../components/ui/LoadingOverlay';
// import { login } from '../util/auth';
import { Alert } from 'react-native';
import RegisterForm from '../components/Auth/RegisterForm';

function LoginScreen() {
  //   const [isAuthenticating, setIsAuthenticating] = useState(false);

  //   const authCtx = useContext(AuthContext);

  //   async function loginHandler({ email, password }) {
  //     setIsAuthenticating(true);
  //     try {
  //       const token = await login(email, password);
  //       authCtx.authenticate(token);
  //     } catch (error) {
  //       Alert.alert(
  //         'Authentication failed',
  //         'Could not log you in. Please check your credentials or try again later'
  //       );
  //       setIsAuthenticating(false);
  //     }
  //   }

  //   if (isAuthenticating) {
  //     return <LoadingOverlay message="Logging you in..." />;
  //   }

  return <RegisterForm />;
}

export default LoginScreen;
