import React, { useState } from 'react';
import { View, ImageBackground } from 'react-native';
import styles from '../../styles/LoginScreenStyles';
import { Button, Provider, Text, TextInput, Portal, Snackbar } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { onLogin, onRegister } = useAuth();
  const [error, setError] = useState(null);
  const [loginError, setLoginError] = useState(null);


  const handleLogin = async () => {
    try {
      const result = await onLogin(email, password);

      if (result.error) {
        // Handle general errors here
        console.error('Login error:', result.msg);

        // Set the login error message to display to the user
        setLoginError(result.msg);
      } else {
        // Handle successful login
        console.log('Login successful');

        // Clear any previous login error messages
        setLoginError(null);
      }
    } catch (error) {
      // Handle the specific error thrown in the login function
      console.error(error.message); // Displays the custom error message

      // Set the login error message to display to the user
      setLoginError(error.message);
    }
  };
  const continueAsGuest = () => {
    navigation.navigate('App')
  }
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
   
      <ImageBackground
        source={require('../../../assets/Img/LoginScreenBkg.jpg')}
        resizeMode='cover'
        style={styles.backgroundImage}
      >
        <View style={styles.overlay} >
          <View style={styles.container} >
            <Text style={styles.appName} variant='titleLarge'>Laraventur</Text>
            <TextInput
              style={styles.inputContainer}
              label="Email"
              value={email}
              onChangeText={text => setEmail(text)}
              activeUnderlineColor='purple'
              keyboardType='email-address'
            />
            <TextInput
              style={styles.inputContainer}

              label="Contraseña"
              placeholder='Ejemplo'
              value={password}
              onChangeText={text => setPassword(text)}
              activeUnderlineColor='purple'
              secureTextEntry={!showPassword}
              right={<TextInput.Icon onPress={togglePasswordVisibility} icon={showPassword ? "eye-off" : "eye"} />}
            />

            <Button
              icon="login"
              mode='contained'
              onPress={() => handleLogin()}
              style={styles.button}

            >
              Iniciar sesión
            </Button>
            <Button
              icon="login"
              mode='contained'
              onPress={continueAsGuest}
              style={styles.button}

            >
              Continuar como invitado
            </Button>
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                No tienes una cuenta?{' '}
                <Text style={styles.link} onPress={navigateToSignUp}>
                  Registrate!
                </Text>
              </Text>
              <Text style={styles.footerText}>
                Olvidaste tu contraseña?{' '}
                <Text style={styles.link} onPress={navigateToForgotPassword}>
                  Reestablecer contraseña
                </Text>
              </Text>
            </View>
          </View>
        </View>
        
        <Portal>
        <Snackbar
          visible={loginError !== null}
          onDismiss={() => setLoginError(null)
          }
          >
            {loginError &&<Text>{loginError.message}</Text>}
        </Snackbar>
      </Portal>

      </ImageBackground>
   
  );
};

export default LoginScreen;
