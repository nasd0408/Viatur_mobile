import React, { useState } from 'react';
import { View, ImageBackground } from 'react-native';
import styles from '../../styles/LoginScreenStyles';
import { Button, Text, TextInput } from 'react-native-paper';
import { useAuth } from '../../context/AuthContext';


const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('')
  const [password, setPassword] = useState('');
  const [direccion, setDireccion] = useState('')
  const [telefono, setTelefono] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState(Date.now)
  const [sexo, setSexo] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const { onRegister } = useAuth();


  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    const result = await onRegister(email, password);
    if (result && result.error) {
      alert(result.msg);
    };
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
          <Text style={styles.footerText}>Datos de cuenta </Text>
          <TextInput
            style={styles.inputContainer}
            label="Nombre"
            value={nombre}
            onChangeText={text => setNombre(text)}
            activeUnderlineColor='purple'
          />
          <TextInput
            style={styles.inputContainer}
            label="Apellido"
            value={apellido}
            onChangeText={text => setApellido(text)}
            activeUnderlineColor='purple'
          />
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

            label="Contraseña"
            placeholder='Ejemplo'

            value={password}
            onChangeText={text => setPassword(text)}
            activeUnderlineColor='purple'
            secureTextEntry={!showPassword}
            right={<TextInput.Icon onPress={togglePasswordVisibility} icon={showPassword ? "eye-off" : "eye"} />}
          />
          <Button
            icon="account-check"
            mode='contained'
            onPress={handleRegister}
          >
            Registrate!
          </Button>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignupScreen;
