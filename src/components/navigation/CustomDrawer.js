import React, { useContext, useEffect, useState } from 'react';
import { View, Image, ImageBackground, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Paragraph } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import ColorScheme from '../../utils/ColorScheme';
import { API_BASE_URL, user } from '../../utils/dev';
import { useAuth } from '../../context/AuthContext';
import { useUser } from '../../context/UserContext';

const CustomDrawer = (props) => {
  const navigation = useNavigation();
  const {onLogout, authState} = useAuth();
  const handleLogin = () => {
    navigation.navigate('AuthFlow');
  };
  const handleLogout=()=>{
    navigation.navigate('HomeStack');
    onLogout();
  }
  const { userData } = useUser(); // Access user data from the context

const profilePictureUrl =userData?.persona.foto  ? `${API_BASE_URL}/persona/foto/${userData.persona.foto}`
: null
  const nombreCompleto = userData?.persona.nombres ? userData.persona.nombres + " " + userData?.persona.apellidos: "Cargando" ;
  return (
    <View style={styles.container}>
      <DrawerContentScrollView {...props} contentContainerStyle={styles.drawerContentContainer}>
        <ImageBackground source={require('../../../assets/menu-bg-blue.jpg')} style={styles.imageBackground}>
          {authState?.authenticated ? (
            <View style={styles.profileContainer}>
              <Image source={{ uri:profilePictureUrl }} style={styles.profileImage} />
              <Paragraph style={styles.userName}>{nombreCompleto}</Paragraph>
            </View>
          ) : (
            <TouchableOpacity onPress={handleLogin}>
              <View style={styles.loginContainer}>
                <Ionicons name="person-circle-outline" size={70} color={ColorScheme.OffWhite} />
                <Text style={styles.loginText}>Iniciar sesion</Text>
              </View>
            </TouchableOpacity>
          )}
        </ImageBackground>
        <View style={styles.drawerItemListContainer}>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View style={styles.bottomElementsContainer}>
        <TouchableOpacity onPress={() => {}} style={styles.touchableOpacities}>
          <View style={styles.bottomOptionsContainer}>
            <Ionicons name="share-social-outline" size={22} />
            <Text style={styles.bottomOptionsText}>Comparte con un amigo</Text>
          </View>
        </TouchableOpacity>
        {authState.authenticated &&
        <TouchableOpacity onPress={handleLogout} style={styles.touchableOpacities}>
          <View style={styles.bottomOptionsContainer}>
            <Ionicons name="exit-outline" size={22} />
            <Text style={styles.bottomOptionsText}>Salir</Text>
          </View>
        </TouchableOpacity>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: ColorScheme.OffWhite,
  },
  drawerContentContainer: {
    backgroundColor: ColorScheme.Secondary,
  },
  imageBackground: {
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 16,
  },
  profileImage: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    color: ColorScheme.OffWhite,
    fontSize: 18,
    backgroundColor: ColorScheme.Secondary,
    borderRadius: 50,
    textAlign: 'center',
    padding: 10,
  },
  loginContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  loginText: {
    marginTop: 8,
    fontSize: 16,
    color: ColorScheme.OffWhite,
  },
  drawerItemListContainer: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: ColorScheme.OffWhite,
  },
  bottomElementsContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  touchableOpacities: {
    paddingVertical: 15,
  },
  bottomOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomOptionsText: {
    fontSize: 15,
    marginLeft: 5,
  },
});

export default CustomDrawer;
