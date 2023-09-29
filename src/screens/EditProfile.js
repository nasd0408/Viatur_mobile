import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, TextInput, Avatar, Menu, Divider,Modal, Portal,Snackbar } from 'react-native-paper';
import axios from 'axios';
import { API_BASE_URL } from '../utils/dev';
import { useUser} from '../context/UserContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import ColorScheme from '../utils/ColorScheme';
import { ScrollView } from 'react-native-gesture-handler';


const EditProfileScreen = ({ navigation }) => {
  const { userData, fetchUserData  } = useUser();
  const [profilePicture, setProfilePicture] = useState(null);
  const [nombres, setNombres] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date());
  const [sexo, setSexo] = useState('');
  const [isLoadingEdit, setIsLoadingEdit] = useState(false)
  const [editError, setEditError] = useState(null)
  const [success, setSuccess] = useState(null);


  const [sexModalVisible, setSexModalVisible] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false)
  
  const formData = new FormData()


  function setFormData(key, value) {
    if (value !== undefined) {
      formData.append(key, value);
    }
  }
  
  const openMenu = () => setSexModalVisible(true);
  const closeMenu = () => setSexModalVisible(false);
  
  useEffect(() => {
    // Initialize state variables with user data when userData changes
    if (userData) {
      setNombres(userData.persona.nombres);
      setApellidos(userData.persona.apellidos);
      setDireccion(userData.persona.direccion);
      setTelefono(userData.persona.telefono);
      setFechaNacimiento(new Date(userData.persona.fechaNacimiento));
      setSexo(userData.persona.sexo);
    }
  }, [userData]);
  
  const showDatePicker = () => setDatePickerVisible(true);
  const hideDatePicker = () => setDatePickerVisible(false);

  function obtenerNombreSexo(inicialSexo) {
    switch (inicialSexo) {
      case 'M':
        return 'Masculino';
      case 'F':
        return 'Femenino';
      default:
        return 'Otro';
    }
  }

 
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
       
      }
    } catch (error) {
      console.log('Error picking profile picture:', error);
    }
  };
  const handleDateChange = (event, date) => {
    if (date) {
      setFechaNacimiento(date);
    }
    hideDatePicker();
  };

  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so we add 1
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  const handleSave = async () => {
    setIsLoadingEdit(true)
    try {

      setFormData('nombres', nombres)
      setFormData('apellidos', apellidos)
      setFormData('direccion', direccion)
      setFormData('telefono', telefono)
      setFormData('sexo', sexo)
      setFormData('fechaNacimiento', formatDateToYYYYMMDD(fechaNacimiento))
      if(profilePicture){
      formData.append('files',{
        uri: profilePicture,
        type: 'image/jpeg', // Set the correct MIME type based on the image type
        name: 'profile.jpg', // Set a default name for the file
      });}
      
      // Send the data using Axios
      await axios.put(`${API_BASE_URL}/persona`, formData, {
       headers: {
         'Content-Type': 'multipart/form-data',
        },
      });
      await fetchUserData()
      
      // Redirect back to the profile screen after successful update
      setIsLoadingEdit(false)
      setSuccess('Perfil actualizado correctamente')
      navigation.navigate('Profile');
    } catch (error) {
      setEditError(error.message);

      setIsLoadingEdit(false)
      // Handle error as needed
    }
  };
  const profilePictureUrl = userData.persona.foto
    ? `${API_BASE_URL}/persona/foto/${userData.persona.foto}`
    : null;

  return (
    <ScrollView contentContainerStyle={styles.container} >
      
       {profilePicture ? (
              <Avatar.Image source={{ uri: profilePicture }} size={100} style={{ alignSelf: "center", marginBottom: 15 }} />
              ) : (
              <Avatar.Image source={{ uri: profilePictureUrl }} size={100} style={{ alignSelf: "center", marginBottom: 15 }} />
            )}
             <Button
              mode="contained"
              onPress={pickProfilePicture}
              style={{ marginBottom: 15 }}
              icon={"camera"}>
              Seleccionar foto de perfil
            </Button>
      <Text style={styles.label}>Nombre:</Text>
      <TextInput
        style={styles.input}
        value={nombres}
        onChangeText={ setNombres}
      />
      <Text style={styles.label}>Apellido:</Text>
      <TextInput
        style={styles.input}
        value={apellidos}
        onChangeText={ setApellidos}
      />
      <Text style={styles.label}>Dirección:</Text>
      <TextInput
        style={styles.input}
        value={direccion}
        onChangeText={setDireccion}
      />
      <Text style={styles.label}>Número de Teléfono:</Text>
      <TextInput
        style={styles.input}
        value={telefono}
        onChangeText={setTelefono}
      />
      <Menu
          visible={sexModalVisible}
          onDismiss={closeMenu}
          anchor={<Button mode='contained' onPress={openMenu}>{sexo? obtenerNombreSexo(sexo) :"Selecciona tu sexo"}</Button>}>
          <Menu.Item onPress={() => {setSexo("M"); closeMenu()}} title="Masculino" />
          <Divider />
          <Menu.Item onPress={() => {setSexo("F");closeMenu()}} title="Femenino" />
          <Divider />
          <Menu.Item onPress={() => {setSexo("O");closeMenu()}} title="Otro" />
        </Menu>
        <Button style={{marginTop:10}} onPress={showDatePicker} mode="contained">
        {fechaNacimiento ? `Fecha: ${fechaNacimiento.getDate()}/${fechaNacimiento.getMonth() + 1}/${fechaNacimiento.getFullYear()}` : 'Seleccionar fecha de nacimiento'}      </Button>
       <Modal visible={datePickerVisible} onDismiss={hideDatePicker} contentContainerStyle={styles.modalContainer}>
          <DateTimePicker
            value={fechaNacimiento}
            mode="date"
            display="spinner"
            onChange={handleDateChange}
          />
          <Button onPress={hideDatePicker}>Done</Button>
        </Modal>
      <Button loading={isLoadingEdit} style={{marginTop:10}} onPress={handleSave} mode="contained">
        Guardar Cambios
      </Button>
      <Portal>
        <Snackbar
        visible={editError !== null}
        onDismiss={() => setEditError(null)}
        action={
          {
          onPress:() => setEditError(null),
          icon:'close'
        }
        }
        style={{
          backgroundColor: ColorScheme.Primary, // Cambia el color de fondo según tus necesidades
          borderRadius: 10, // Personaliza los estilos según tus necesidades
          padding: 10, // Personaliza los estilos según tus necesidades
        }}
      >
        <Text style={{ color: ColorScheme.OffWhite }}>{editError}</Text>
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    marginBottom: 16,
  },
});

export default EditProfileScreen;
