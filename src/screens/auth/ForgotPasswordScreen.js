import React, { useState } from 'react';
import { ImageBackground } from 'react-native';
import { View } from 'react-native';
import styles from '../../styles/LoginScreenStyles';
import { Button, Divider, Text, TextInput, Snackbar, Portal } from 'react-native-paper'; // Import Snackbar and Portal
import axios from 'axios'; // Import Axios for API requests
import { API_BASE_URL } from '../../utils/dev';
import ColorScheme from '../../utils/ColorScheme';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function handleSendToken() {
    setIsLoading(true);
    setError(null); // Clear any previous errors
    try {
      // Send a POST request to send a password reset email
      const response = await axios.post(`${API_BASE_URL}/auth/forgot-password`, { email });
      setIsLoading(false);

      // Check if the response status is 200 (success)
      if (response.status === 200) {
        setSuccess('Password reset email sent successfully'); // Set success message
        setIsLoading(false)
      } else {
        setError('An error occurred'); // Set a generic error message
      }
    } catch (error) {
      console.error(error);
      setError('An error occurred'); // Set an error message
      setIsLoading(false)
    }
  }

  return (
    <ImageBackground
      source={require('../../../assets/Img/LoginScreenBkg.jpg')}
      resizeMode='cover'
      style={styles.backgroundImage}
    >
      <View style={styles.overlay} >
        <View style={styles.container} >
          <Text style={styles.appName} variant='titleLarge'>Laraventur</Text>
          <Text style={styles.footerText}>
            Por favor, ingresa tu dirección de correo electrónico. Te enviaremos un correo con instrucciones para restablecer tu contraseña.
          </Text>
          <TextInput
            style={styles.inputContainer}
            label="Email"
            value={email}
            onChangeText={text => setEmail(text)}
            keyboardType='email-address'
          />
          <Button
            icon="email-send"
            mode='contained'
            style={styles.button}
            loading={isLoading}
            onPress={handleSendToken}
          >
            Enviar correo de recuperación
          </Button>

          <Button
            icon="email"
            mode='contained'
            style={styles.button}
            onPress={() => navigation.navigate('ResetPassword')}
          >
            Ya tengo mi token de recuperación
          </Button>
          <Divider style={{ marginVertical: 10 }} />

          <Text style={styles.footerText}>
            {' '}
            <Text style={styles.link} onPress={() => navigation.navigate('Login')} >
              Volver al inicio de sesión
            </Text>
          </Text>
        </View>
      </View>
      <Portal>
        {/* Snackbar for displaying errors */}
        <Snackbar
          visible={error !== null}
          onDismiss={() => setError(null)}
          action={{
            onPress: () => setError(null),
            icon: 'close',
          }}
          style={{
            backgroundColor: ColorScheme.Primary, // Change the background color as needed
            borderRadius: 10, // Customize styles as needed
            padding: 10, // Customize styles as needed
          }}
        >
          <Text style={{ color: ColorScheme.OffWhite }}>{error}</Text>
        </Snackbar>

        {/* Snackbar for displaying success message */}
        {success && (
          <Snackbar
            visible={success !== null}
            onDismiss={() => setSuccess(null)}
            style={{
              backgroundColor: ColorScheme.Primary, // Change the background color for success message
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

export default ForgotPasswordScreen;
