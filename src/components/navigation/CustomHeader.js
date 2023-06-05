import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../utils/ColorScheme';
import { useNavigation } from '@react-navigation/native';

const CustomHeader = () => {
  const navigation = useNavigation();
  const toggleDrawer = () => {
    navigation.toggleDrawer();
  };

  const navigateToSearchScreen = () => {
    navigation.navigate('SearchScreen')
  };

  return (
    <View style={styles.container}>
      {Platform.OS === 'android' && <StatusBar backgroundColor={colors.Primary} />}
      <TouchableOpacity style={styles.drawerButton} onPress={toggleDrawer}>
        <Ionicons name="menu-outline" size={24} color={colors.OffWhite} />
      </TouchableOpacity>
      <Text style={styles.title}>LARAVENTUR</Text>
      <TouchableOpacity style={styles.searchButton} onPress={navigateToSearchScreen}>
        <Ionicons name="search-outline" size={24} color={colors.OffWhite} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.Primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  drawerButton: {
    marginRight: 8,
  },
  searchButton: {
    marginLeft: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.OffWhite,
  },
});

export default CustomHeader;
