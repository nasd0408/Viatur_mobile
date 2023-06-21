import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import { Button, Divider, Text, TextInput} from 'react-native-paper'

const SignUpScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [step, setStep] = useState(1);

  if (step === 1){ 
    return (
      <View style={styles.container}>
        <Text>Paso 1: Datos básicos</Text>
        <TextInput
          label="Usuario"
          value={username}
          onChangeText={text => setUsername(text)}
          style={styles.input}
        />
        <Divider/>
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          style={styles.input}
        />
        <Divider/>
        <TextInput
          label="Contraseña"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
        <Button mode="contained" onPress={()=> setStep(2)}>
          Siguiente
        </Button>
      </View>
    )
}
  else if (step === 2) {
    return(
      <View>
        <Text> 2</Text>
        <Button onPress={()=>setStep(1)}>Anterior</Button>
        <Button onPress={()=>setStep(3)}>Siguiente</Button>
      </View>
    )
  }
  else if (step ===3){
    return(
    <View>
        <Text> 3</Text>
        <Button onPress={()=>setStep(2)}>Anterior</Button>
      </View>)
  }
}

export default SignUpScreen

const styles = StyleSheet.create({})