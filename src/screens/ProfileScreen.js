import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { user } from "../utils/dev";

const ProfileScreen = ({ navigation }) => {
  const handleEditProfile = () => {
    console.log("handleEditProfile")
    navigation.navigate('Edit', {user});
  }
  
  return (
    <View style={styles.container}>
      <Image style={styles.profileImage} source={{ uri: user.FotoDePerfil }} />
      <View style={styles.separator} />
      <Text style={styles.name}>{`${user.Nombre} ${user.Apellido}`}</Text>
      <View style={styles.separator} />
      <View style={styles.row}>
        <Text style={styles.label}> ID: </Text>
        <Text style={styles.text}>{user.TuristaID}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}> Username: </Text>
        <Text style={styles.text}>{user.UsuarioID}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}> Address: </Text>
        <Text style={styles.text}>{user.Direccion}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}> Phone: </Text>
        <Text style={styles.text}>{user.Telefono}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}> Date of Birth: </Text>
        <Text style={styles.text}>{user.FechaDeNacimiento}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}> Registration Date: </Text>
        <Text style={styles.text}>{user.FechaDeRegistro}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}> Status: </Text>
        <Text style={styles.text}>{user.Estado}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Editar perfil</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.separator} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: 20,
    backgroundColor: "#F5F5F5",
    paddingBottom: 60,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "right",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "left",
  },
  separator: {
    borderBottomColor: "#CCC",
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 0,
    alignItems: "center",
    marginBottom: 5,
  },
  editButton: {
    backgroundColor: colors.Primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  editButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  }
});

export default ProfileScreen;
