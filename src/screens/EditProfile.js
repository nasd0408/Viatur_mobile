import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { user } from "../utils/dev";
import { TextInput } from 'react-native-paper';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const EditProfile = ({navigation, route, props}) => {
  const [text, setText] = React.useState("");
  const {user} = route.params;
  console.log(user);

  const handleBackProfile = () => {
    navigation.navigate('Profile');
  }

  return (
    <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContentContainer}>
      <Image style={styles.profileImage} source={{ uri: user.FotoDePerfil }} />
      <View style={styles.separator} />
      <TextInput style={styles.name}>{`${user.Nombre} ${user.Apellido}`}</TextInput>
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
        <TextInput style={styles.text}>{user.Direccion}</TextInput>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}> Phone: </Text>
        <TextInput style={styles.text}>{user.Telefono}</TextInput>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}> Date of Birth: </Text>
        <TextInput style={styles.text}>{user.FechaDeNacimiento}</TextInput>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}> Registration Date: </Text>
        <Text style={styles.text}>{user.FechaDeRegistro}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}> Status: </Text>
        <TextInput style={styles.text}>{user.Estado}</TextInput>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}> Password: </Text>
        <TextInput style={styles.text}> Password </TextInput>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}> New Password: </Text>
        <TextInput style={styles.text}> New Password </TextInput>
      </View>
      <View style={styles.separator} />
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.editButton} onPress={handleBackProfile}>
          <Text style={styles.editButtonText}>Back Profile</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      </DrawerContentScrollView>
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
  TextInput: {
    
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
export default EditProfile;