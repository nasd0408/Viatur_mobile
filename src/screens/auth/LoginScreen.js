import React, { useState } from 'react';
import { View, ImageBackground } from 'react-native';
import styles from '../../styles/LoginScreenStyles';
import { Button, Text, TextInput } from 'react-native-paper';
import { setIsLoggedIn } from '../../utils/dev';


const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true)
    navigation.navigate("App")
  };

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
            placeholder='Soyun@ejemplo.com'
            value={email}
            onChangeText={text => setEmail(text)}
            activeUnderlineColor='purple'
          />
          <TextInput
            style={styles.inputContainer}

            label="Password"
            placeholder='Ejemplo'
            value={password}
            onChangeText={text => setPassword(text)}
            activeUnderlineColor='purple'
            secureTextEntry={!showPassword}
            right={<TextInput.Icon onPress={togglePasswordVisibility} icon={showPassword ? "eye-off" : "eye"} />}
          />

          <Button
            icon="login"
            mode='contained-tonal'
            onPress={handleLogin}
            style={styles.button}

          >
            Login
          </Button>
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text style={styles.link} onPress={navigateToSignUp}>
                Sign Up
              </Text>
            </Text>
            <Text style={styles.footerText}>
              Forgot your password?{' '}
              <Text style={styles.link} onPress={navigateToForgotPassword}>
                Reset Password
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
