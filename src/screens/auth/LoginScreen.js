import React, { useState } from 'react';
import { View, ImageBackground } from 'react-native';
import styles from '../../styles/LoginScreenStyles';
import { Button, Text, TextInput, Portal, Snackbar, IconButton } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';
import ColorScheme from '../../utils/ColorScheme';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { onLogin, onRegister } = useAuth();
  const [error, setError] = useState(null);
  const [loginError, setLoginError] = useState(null);
  const [isLoadingLogin, setIsLoadingLogin] = useState(false)


  const handleLogin = async () => {
    setIsLoadingLogin(true)
    try {
      const result = await onLogin(email, password);

      if (result.error) {
        // Handle general errors here
        if (result.msg.statusCode === 400) {
          setLoginError('Error de inicio de sesión: Debes completar todos los campos.');
        } else if (result.msg.statusCode === 404) {
          setLoginError('Error de inicio de sesión: El usuario no existe.');
        } else if (result.msg.statusCode === 401) {
          setLoginError('Error de inicio de sesión: La contraseña es incorrecta.');
        } else {
          setLoginError('Error de inicio de sesión: Código de estado desconocido.');
        }

        setIsLoadingLogin(false)
      } else {
        // Handle successful login
        console.log('Login successful');

        // Clear any previous login error messages
        setLoginError(null);
        setIsLoadingLogin(false)
      }
    } catch (error) {
      // Handle the specific error thrown in the login function
      console.error(error.message); // Displays the custom error message

      // Set the login error message to display to the user
      setLoginError(error.message);
      setIsLoadingLogin(false)
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
            keyboardType='email-address'
          />
          <TextInput
            style={styles.inputContainer}

            label="Contraseña"
            placeholder='Ejemplo'
            value={password}
            onChangeText={text => setPassword(text)}
            secureTextEntry={!showPassword}
            right={<TextInput.Icon onPress={togglePasswordVisibility} icon={showPassword ? "eye-off" : "eye"} />}
          />

          <Button
            icon="login"
            mode='contained'
            onPress={() => handleLogin()}
            style={styles.button}
            loading={isLoadingLogin}

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
          onDismiss={() => setLoginError(null)}
          action={
            {
              onPress: () => setLoginError(null),
              icon: 'close'
            }
          }
          style={{
            backgroundColor: ColorScheme.Primary, // Cambia el color de fondo según tus necesidades
            borderRadius: 10, // Personaliza los estilos según tus necesidades
            padding: 10, // Personaliza los estilos según tus necesidades
          }}
        >
          <Text style={{ color: ColorScheme.OffWhite }}>{loginError}</Text>
        </Snackbar>
      </Portal>

    </ImageBackground>

  );
};

export default LoginScreen;
