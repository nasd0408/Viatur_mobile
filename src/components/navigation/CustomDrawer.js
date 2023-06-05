import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useState } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Paragraph } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ColorScheme from '../../utils/ColorScheme';
import {isLoggedIn, setIsLoggedIn} from '../../utils/dev'
import { useNavigation } from '@react-navigation/native';
import { user } from '../../utils/dev';

const CustomDrawer = (props) => {
  const colors = ColorScheme;
  const navigation = useNavigation()
  const handleLogin = () => {
    navigation.navigate('AuthFlow');
  };
  const handleLogout = () =>{
    setIsLoggedIn(false);

  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.OffWhite }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ backgroundColor: colors.Secondary }}
      >
        <ImageBackground
          source={require('../../../assets/menu-bg-blue.jpg')}
          style={{ padding: 20 }}
        >
          {isLoggedIn ? (
            <View style={styles.profileContainer}>
              <Image
                source={{uri: user.FotoDePerfil}} // Replace with the appropriate user data
                style={styles.profileImage}
              />
              <Paragraph style={styles.userName}>{user.Nombre + ' ' + user.Apellido}</Paragraph>
            </View>
          ) : (
            <TouchableOpacity onPress={handleLogin}>
              <View style={styles.loginContainer}>
                <Ionicons name="person-circle-outline" size={70} color={ColorScheme.OffWhite} />
                <Text style={styles.loginText}>Log In</Text>
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
        <TouchableOpacity onPress={handleLogout} style={styles.touchableOpacities}>
          <View style={styles.bottomOptionsContainer}>
            <Ionicons name="exit-outline" size={22} />
            <Text style={styles.bottomOptionsText}>Salir</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
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
    color: colors.OffWhite,
    fontSize: 18,
    backgroundColor: colors.Secondary,
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
    backgroundColor: colors.OffWhite,
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
