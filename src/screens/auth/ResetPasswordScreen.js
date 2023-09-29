import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { View, TouchableOpacity } from 'react-native';
import styles from '../../styles/LoginScreenStyles';
import { Button, Divider, Text, TextInput, Snackbar, Portal } from 'react-native-paper'; // Import Snackbar and Portal
import axios from 'axios'; // Import Axios for API requests
import ColorScheme from '../../utils/ColorScheme';
import { API_BASE_URL } from '../../utils/dev';

const ResetPasswordScreen = ({ navigation }) => {
  const [token, setToken] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [success, setSuccess] = useState(null); // Added state for success message

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleSendToken() {
    setIsLoading(true);
    try {
      // Send a POST request to reset the password
      const response = await axios.post(`${API_BASE_URL}/auth/reset-password`, {
        token,
        contrasena,
      });

      setIsLoading(false);

      // Check if the response status is 200 (success)
      if (response.status === 200) {
        setSuccess('Se ha cambiado la contraseña!'); // Set success message
        setLoginError(null); // Clear any previous login errors
      }
    } catch (error) {
      console.error(error);
      setLoginError('Ha ocurrido un error'); // Set an error message
      setSuccess(null); // Clear any previous success messages
      setIsLoading(false)
    }
  }

  return (
    <ImageBackground
      source={require('../../../assets/Img/LoginScreenBkg.jpg')}
      resizeMode="cover"
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.appName} variant="titleLarge">
            Laraventur
          </Text>
          <Text style={styles.footerText}>
            Por favor, copia y pega el token que recibiste en el campo correspondiente e introduce tu nueva contraseña.
          </Text>
          <TextInput
            style={styles.inputContainer}
            label="Token"
            value={token}
            onChangeText={(text) => setToken(text)}
          />
          <TextInput
            style={styles.inputContainer}
            label="Contraseña"
            placeholder="Ejemplo"
            value={contrasena}
            onChangeText={(text) => setContrasena(text)}
            secureTextEntry={!showPassword}
            right={<TextInput.Icon onPress={togglePasswordVisibility} icon={showPassword ? 'eye-off' : 'eye'} />}
          />

          <Button
            icon="key"
            mode="contained"
            style={styles.button}
            loading={isLoading}
            onPress={handleSendToken}
          >
            Cambiar contraseña
          </Button>
          <Divider style={{ marginVertical: 10 }} />

          <Text style={styles.footerText}>
            {' '}
            <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
              Volver al inicio de sesión
            </Text>
          </Text>
        </View>
      </View>
      <Portal>
        {/* Snackbar for displaying login errors */}
        <Snackbar
          visible={loginError !== null}
          onDismiss={() => setLoginError(null)}
          action={{
            onPress: () => setLoginError(null),
            icon: 'close',
          }}
          style={{
            backgroundColor: ColorScheme.Primary, // Change the background color as needed
            borderRadius: 10, // Customize styles as needed
            padding: 10, // Customize styles as needed
          }}
        >
          <Text style={{ color: ColorScheme.OffWhite }}>{loginError}</Text>
        </Snackbar>

        {/* Snackbar for displaying success message */}
        {success && (
          <Snackbar
            visible={success !== null}
            onDismiss={() => setSuccess(null)}
            style={{
              backgroundColor: ColorScheme.Verdigris, // Change the background color for success message
              borderRadius: 10, // Customize styles as needed
              padding: 10, // Customize styles as needed
            }}
          >
            <Text style={{ color: ColorScheme.OffWhite }}>{success}</Text>
          </Snackbar>
        )}
      </Portal>
    </ImageBackground>
  );
};

export default ResetPasswordScreen;
