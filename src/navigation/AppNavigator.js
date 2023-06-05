import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/base';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ColorScheme from '../utils/ColorScheme';

import HomeScreen from '../screens/HomeScreen';
import PromotionsScreen from '../screens/PromotionsScreen';
import TourismCompaniesScreen from '../screens/TourismCompaniesScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import DetailSiteScreen from '../screens/DetailSiteScreen';

import CustomDrawer from '../components/navigation/CustomDrawer';
import CustomHeader from '../components/navigation/CustomHeader';

import {isLoggedIn} from '../utils/dev'
import SearchScreen from '../screens/SearchScreen';

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const colors = ColorScheme;

const HomeStack = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: colors.Primary,
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" type="material" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Promotions"
      component={PromotionsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="local-offer" type="material" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Companies"
      component={TourismCompaniesScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="business" type="material" color={color} size={size} />
        ),
      }}
    />
  </Tab.Navigator>
);

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeStack" component={HomeStack} />
    <Stack.Screen name="DetailSite" component={DetailSiteScreen} />
    <Stack.Screen name="SearchScreen" component={SearchScreen}/>
  </Stack.Navigator>
);
const AppNavigator = () => {

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} isLoggedIn={isLoggedIn} />}
      backBehavior="initialRoute"
      screenOptions={{
        header: () => <CustomHeader />,
        drawerLabelStyle: { marginLeft: -25, fontSize: 15 },
        drawerActiveBackgroundColor: colors.Primary,
        drawerActiveTintColor: colors.OffWhite,
        drawerInactiveTintColor: 'black',
      }}
    >
      <Drawer.Screen
        name="MainStack"
        component={MainStack}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons size={size} color={color} name="home-outline" />
          ),
          title: 'Inicio',
        }}
      />
      {isLoggedIn && (
        <Drawer.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            drawerIcon: ({ size, color }) => (
              <Ionicons size={size} color={color} name="person-outline" />
            ),
            title: 'Perfil',
          }}
        />
      )}
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons size={size} color={color} name="notifications-outline" />
          ),
          title: 'Notificaciones',
        }}
      />
    </Drawer.Navigator>
  );
};

export default AppNavigator;