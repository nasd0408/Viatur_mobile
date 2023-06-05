import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';


const Stack = createStackNavigator();

const MainNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName='App' screenOptions={{headerShown:false}} >
      <Stack.Screen name="AuthFlow" component={AuthNavigator} />
      <Stack.Screen name="App" component={AppNavigator} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default MainNavigator;
