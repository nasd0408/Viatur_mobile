import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { API_BASE_URL } from '../utils/dev';
import { useUser } from '../context/UserContext';
import { Button, Divider, FAB, Text } from 'react-native-paper';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const ProfileScreen = ({navigation}) => {
  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;
  const { userData } = useUser(); // Access user data from the context
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
  const profilePictureUrl = userData.persona.foto
    ? `${API_BASE_URL}/persona/foto/${userData.persona.foto}`
    : null;

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        {profilePictureUrl && (
          <Image
            source={{ uri: profilePictureUrl }}
            style={styles.profileImage}
          />
        )}
        {/* Add a transparent overlay with a gradient */}
      </View>
      <Divider />
      <Text style={styles.label}>Nombre:</Text>
      <Text style={styles.value}>{userData.persona.nombres} {userData.persona.apellidos}</Text>
      <Text style={styles.label}>Correo electrónico:</Text>
      <Text style={styles.value}>{userData.email}</Text>
      <Text style={styles.label}>Direccion:</Text>
      <Text style={styles.value}>{userData.persona.direccion}</Text>
      <Text style={styles.label}>Numero de telefono:</Text>
      <Text style={styles.value}>{userData.persona.telefono}</Text>
      <Text style={styles.label}>Parte de laraventur desde:</Text>
      <Text style={styles.value}>{new Date(userData.creado).toLocaleDateString()}</Text>
      <Text style={styles.label}>Fecha de nacimiento:</Text>
      <Text style={styles.value}>{new Date(userData.persona.fechaNacimiento).toLocaleDateString()}</Text>
      <Text style={styles.label}>Sexo:</Text>
      <Text style={styles.value}>{obtenerNombreSexo(userData.persona.sexo)}</Text>
      <Text style={styles.label}>En Laraventur con rol de :</Text>
      <Text style={styles.value}>{userData.rol.nombre}</Text>
      <FAB.Group
          open={open}
          visible
          icon={open ? 'close' : 'pencil'}
          actions={[
            {
              icon: 'account-wrench',
              label: 'Editar preferencias',
              onPress: ()=>{navigation.navigate('EditPreferences')}
            },
            {
              icon: 'account',
              label: 'Editar perfil',
              onPress: ()=>{navigation.navigate('Edit')}
            },
            {
              icon: 'lock',
              label: 'Cambiar contraseña',
              onPress: ()=>{navigation.navigate('ChangePassword')},
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height:'100%',
    justifyContent:'space-evenly'
  },
  profileImageContainer: {
    position: 'relative', // Make sure the overlay stays on top of the image
  },
  profileImage: {
    width: Dimensions.get('window').width/2,
    height: Dimensions.get('window').width/2,
    borderRadius:100,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Adjust the opacity (last value) as needed
    // You can add a gradient background here using LinearGradient from 'react-native-linear-gradient'
    width: Dimensions.get('window').width/2,
    height: Dimensions.get('window').width/2,
    borderRadius:100,
  },
  text: {
    marginBottom: 8,
  },

  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  value: {
    fontSize: 14,
    marginBottom: 8,
  },
});

export default ProfileScreen;
