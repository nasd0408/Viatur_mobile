import {  View ,ImageBackground} from 'react-native'
import React, { useState }  from 'react'
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import styles from '../../../styles/LoginScreenStyles';
import { Button, Text, TextInput, Provider, Portal, Modal, RadioButton, Avatar } from 'react-native-paper';
import { useSignupContext } from '../../../context/SignUpContext';


const SecondStepScreen = ({navigation}) => {
    const { formData, setFormData } = useSignupContext(); // Obtiene los datos del contexto

    const [direccion, setDireccion] = useState('')
    const [telefono, setTelefono] = useState('')
    const [fechaNacimiento, setFechaNacimiento] = useState(new Date())
    const [sexo, setSexo] = useState('')
    const [profilePicture, setProfilePicture] = useState(null);
  
    const [sexModalVisible, setSexModalVisible] = useState(false);
    const [dateModalVisible, setDateModalVisible] = useState(false)
    const [datePickerVisible, setDatePickerVisible] = useState(false)

    
  const showSexModal = () => setSexModalVisible(true);
  const hideSexModal = () => setSexModalVisible(false);

  const showDateModal = () => setDateModalVisible(true);
  const hideDateModal = () => setDateModalVisible(false);

  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);
  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  const handleDateChange = (event, date) => {
    if (date) {
      setFechaNacimiento(date);
    }
    hideDatePicker();
  };


  const handleGenderSelect = (gender) => {
    setSexo(gender);
    hideSexModal()
  };
  const pickProfilePicture = async () => {
    try {
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (permissionResult.granted === false) {
        alert('Permission to access the camera roll is required!');
        return;
      }

      const imageResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });

      if (!imageResult.canceled) {
        setProfilePicture(imageResult.uri)
        formData.append('files', {
          uri: imageResult.uri,
          type: 'image/jpeg', // Set the correct MIME type based on the image type
          name: 'profile.jpg', // Set a default name for the file
        });
      }
    } catch (error) {
      console.log('Error picking profile picture:', error);
    }
  };


  const handleNext = () => {
    // Actualiza los datos del contexto con los valores del primer paso
    /*setFormData({
      ...formData,
      direccion: direccion,
      telefono: telefono,
      fechaNacimiento: fechaNacimiento,
      sexo: sexo,
      files: profilePicture,
      rol:'4'
    });
*/
    setFormData("direccion",direccion)
    setFormData("telefono",telefono)
    setFormData("fechaNacimiento",formatDateToYYYYMMDD(fechaNacimiento))
    setFormData("sexo",sexo)
    setFormData("rol",3)
    // Navega al siguiente paso del formulario
    navigation.navigate('Third');
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
            <Text style={styles.footerText}>Datos personales </Text>
            <TextInput
              style={styles.inputContainer}
              label="Dirección"
              value={direccion}
              onChangeText={text => setDireccion(text)}
              activeUnderlineColor='purple'
            />
            <TextInput
              style={styles.inputContainer}
              label="Telefono"
              value={telefono}
              onChangeText={text => setTelefono(text)}
              activeUnderlineColor='purple'
              keyboardType='phone-pad'
            />


              <Button
                mode='contained'
                style={{ marginBottom: 15 }}
                onPress={showSexModal}
                icon={"format-list-bulleted"}
              >
                {sexo ? `Genero Seleccionado: ${sexo}` : 'Seleccionar Genero'}
              </Button>

            <Button
              mode='contained'
              style={{ marginBottom: 15 }}
              onPress={showDatePicker}
              icon={"calendar"}
            >
              {fechaNacimiento ? `Fecha: ${fechaNacimiento.getDate()}/${fechaNacimiento.getMonth() + 1}/${fechaNacimiento.getFullYear()}` : 'Seleccionar fecha de nacimiento'}
            </Button>

            <Button
              mode="contained"
              onPress={pickProfilePicture}
              style={{ marginBottom: 15 }}
              icon={"camera"}>
              Seleccionar foto de perfil
            </Button>

            {profilePicture ? (
              <Avatar.Image source={{ uri: profilePicture }} size={100} style={{ alignSelf: "center", marginBottom: 15 }} />
            ) : (
              <Avatar.Icon icon="account" size={100} style={{ alignSelf: "center", marginBottom: 15 }} />
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Button
                icon="arrow-left-bold"
                mode='contained'
                onPress={() => navigation.navigate("First")}
                style={{ marginBottom: 15, flex: 1, marginRight: 10 }}
              >
                Paso anterior
              </Button>
              <Button
                icon="arrow-right-bold"

                mode='contained'
                onPress={() =>handleNext()}
                style={{ marginBottom: 15, flex: 1, marginLeft: 10 }}
              >
                Siguiente paso
              </Button>
            </View>
          </View>
        </View>
        <Portal>
        <Modal visible={sexModalVisible} onDismiss={hideSexModal} contentContainerStyle={styles.modalContainer}>
          <Text style={styles.modalTitle}>Selecciona tu genero:</Text>
          <RadioButton.Group onValueChange={handleGenderSelect} value={sexo}>
            <RadioButton.Item label="Masculino" value="M" />
            <RadioButton.Item label="Femenino" value="F " />
            <RadioButton.Item label="Otro" value="O" />
          </RadioButton.Group>
          <Button onPress={hideSexModal}>Cerrar</Button>
        </Modal>
        <Modal visible={dateModalVisible} onDismiss={hideDateModal} contentContainerStyle={styles.modalContainer}>
          <Button onPress={showDatePicker}>Open Date Picker</Button>
          {/* Additional modals and their contents */}
        </Modal>
        <Modal visible={datePickerVisible} onDismiss={hideDatePicker} contentContainerStyle={styles.modalContainer}>
          <DateTimePicker
            value={fechaNacimiento}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />
          <Button onPress={hideDatePicker}>Done</Button>
        </Modal>
      </Portal>

      </ImageBackground>
  )
}

export default SecondStepScreen

