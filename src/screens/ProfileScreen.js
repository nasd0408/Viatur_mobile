import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { user } from '../utils/dev';
const ProfileScreen = () => {

  
  return (
    <View style={styles.container}>
      <Image style={styles.profileImage} source={{ uri: user.FotoDePerfil }} />
      <Text style={styles.name}>{`${user.Nombre} ${user.Apellido}`}</Text>
      <Text style={styles.label}>ID:</Text>
      <Text style={styles.text}>{user.TuristaID}</Text>
      <Text style={styles.label}>Username:</Text>
      <Text style={styles.text}>{user.UsuarioID}</Text>
      <Text style={styles.label}>Address:</Text>
      <Text style={styles.text}>{user.Direccion}</Text>
      <Text style={styles.label}>Phone:</Text>
      <Text style={styles.text}>{user.Telefono}</Text>
      <Text style={styles.label}>Date of Birth:</Text>
      <Text style={styles.text}>{user.FechaDeNacimiento}</Text>
      <Text style={styles.label}>Registration Date:</Text>
      <Text style={styles.text}>{user.FechaDeRegistro}</Text>
      <Text style={styles.label}>Status:</Text>
      <Text style={styles.text}>{user.Estado}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  text: {
    fontSize: 16,
    marginBottom: 10
  }
});

export default ProfileScreen;
