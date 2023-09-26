import React, { useState } from 'react';
import { View, ImageBackground } from 'react-native';
import styles from '../../../styles/LoginScreenStyles';
import { Button, Text, TextInput } from 'react-native-paper';
import { useSignupContext } from '../../../context/SignUpContext';


const FisrtStepScreen = ({ navigation }) => {
  const { formData, setFormData } = useSignupContext(); // Obtiene los datos del contexto

  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('')
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleNext = () => {
    // Actualiza los datos del contexto con los valores del primer paso
    /* setFormData({
       ...formData,
       nombres: nombre,
       apellidos: apellido,
       email: email,
       contrasena: password,
     });
 */
    setFormData("nombres", nombre)
    setFormData("apellidos", apellido)
    setFormData("email", email)
    setFormData("contrasena", password)
    // Navega al siguiente paso del formulario
    navigation.navigate('Second');
  };
  return (
    <ImageBackground
      source={require('../../../../assets/Img/LoginScreenBkg.jpg')}
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
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Button
              icon="login"

              mode='contained'
              onPress={() => navigation.navigate("Login")}
              style={{ marginBottom: 15, flex: 1, marginLeft: 10 }}
            >
              Inicia sesion
            </Button>
            <Button
              icon="arrow-right-bold"
              mode='contained'
              onPress={() => handleNext()}
              style={{ marginBottom: 15, flex: 1, marginRight: 10 }}
            >
              Siguiente paso
            </Button>
          </View>
        </View>
      </View>
    </ImageBackground>
  )
}

export default FisrtStepScreen

