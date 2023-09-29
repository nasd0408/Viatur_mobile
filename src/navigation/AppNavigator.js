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
import EditProfile from '../screens/EditProfile';
import NotificationsScreen from '../screens/NotificationsScreen';
import DetailSiteScreen from '../screens/DetailSiteScreen';

import CustomDrawer from '../components/navigation/CustomDrawer';
import CustomHeader from '../components/navigation/CustomHeader';

import SearchScreen from '../screens/SearchScreen';
import CompanyDetailScreen from '../screens/CompanyDetailScreen';
import { useAuth } from '../context/AuthContext';
import GeneralDetailScreen from '../screens/DetailScreen';
import DetailScreen from '../screens/DetailScreen';
import ServiceDetailScreen from '../screens/ServiceDetailScreen';
import PromocionDetail from '../screens/PromocionDetail';
import DetailRutaScreen from '../screens/DetailRutaScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ChangePreferencesScreen from '../screens/ChangePreferencesScreen';

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
      name="Inicio"
      component={HomeScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" type="material" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Sitios"
      component={PromotionsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Icon name="nature" type="material" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Empresas"
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
  <Stack.Navigator  screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeStack" component={HomeStack} options={{headerShown:false}}/>
    {/*<Stack.Screen name="DetailSite" component={DetailSiteScreen} />*/}
    <Stack.Screen name="SearchScreen" component={SearchScreen}/>
    <Stack.Screen name="CompanyDetail" component={CompanyDetailScreen}/>
    <Stack.Screen name="DetailScreen" component={DetailScreen}/>
    <Stack.Screen name='DetailSite' component={DetailSiteScreen}/>
    <Stack.Screen name='DetailService' component={ServiceDetailScreen}/>
    <Stack.Screen name='DetailPromocion' component={PromocionDetail}/>
    <Stack.Screen name='DetailRuta' component={DetailRutaScreen}/>
    <Stack.Screen name="Edit" component={EditProfile}/>
    <Stack.Screen name="ChangePassword" component={ChangePasswordScreen}/>
    <Stack.Screen name="EditPreferences" component={ChangePreferencesScreen}/>


  </Stack.Navigator>
);

const AppNavigator = () => {
  const { authState } = useAuth();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} isLoggedIn={authState?.authenticated} />}
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
      {authState?.authenticated && (
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
      {authState?.authenticated &&(
      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons size={size} color={color} name="notifications-outline" />
          ),
          title: 'Notificaciones',
        }}
      />)}
    </Drawer.Navigator>
  );
};

export default AppNavigator;