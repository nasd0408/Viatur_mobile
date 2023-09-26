import React from 'react';
import {  StatusBar } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FisrtStepScreen from './FisrtStepScreen';
import SecondStepScreen from './SecondStepScreen';
import ThirdStepScreen from './ThirdStepScreen';

const Tab = createMaterialTopTabNavigator();

const SignupScreen = ({ navigation }) => {
 
 


  return (
    <>
      <StatusBar translucent />
      <Tab.Navigator initialRouteName='First'

        screenOptions={{
          swipeEnabled: false,
          tabBarStyle: { marginTop: StatusBar.currentHeight }
        }}
      >
        <Tab.Screen name="First" component={FisrtStepScreen}
          options={{
            title: "Informacion de cuenta"
          }}></Tab.Screen>
        <Tab.Screen name="Second" component={SecondStepScreen}
          options={{
            title: "Informacion personal"
          }}></Tab.Screen>
        <Tab.Screen name="Third" component={ThirdStepScreen}
          options={{
            title: "Preferencias"
          }}></Tab.Screen>
      </Tab.Navigator>
      
          </>
  );
};

export default SignupScreen;
