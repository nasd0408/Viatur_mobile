import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input, Button, Icon } from '@rneui/base';
import styles from '../../styles/LoginScreenStyles';
import RNDateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [date, setDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [showPassword, setShowPassword] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = () => {
    // Perform signup logic here
  };

  return (
    <View style={styles.container}>
      <Text h3 style={styles.appName}>
        Registro
      </Text>
      <Input
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Apellido"
        value={surname}
        onChangeText={setSurname}
        containerStyle={styles.inputContainer}
      />
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        containerStyle={styles.inputContainer}
        inputMode='email'
      />
      <Input
        placeholder="Contraseña"
        secureTextEntry={!showPassword}
        value={password}
        onChangeText={setPassword}
        containerStyle={styles.inputContainer}
        rightIcon={
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              type="feather"
              color="#888"
              onPress={togglePasswordVisibility}
            />
          }
      />
      <Input
        placeholder="Date"
        disabled
        value={date.toLocaleDateString()}
        containerStyle={styles.inputContainer}
        rightIcon={
            <Icon name='calendar' type='feather'
            onPress={()=>setShow(true)}/>       
        }
      />
      {show && (<RNDateTimePicker value={date} mode='date' onChange={onChange}/>)}
      <Button title="Sign Up" onPress={handleSignUp} buttonStyle={styles.button} />
    </View>
  );
};



export default SignUpScreen;
