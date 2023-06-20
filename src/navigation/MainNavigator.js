import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import AppNavigator from './AppNavigator';
import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator();

const MainNavigator = () => {
  const { authState } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthFlow" screenOptions={{ headerShown: false }}>
        {authState?.authenticated ? (
          <Stack.Screen name="App" component={AppNavigator} />
        ) : (
          <>
            <Stack.Screen name="AuthFlow" component={AuthNavigator} />
            <Stack.Screen name="App" component={AppNavigator} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
