import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import bottomTabNavigation from './bottomTabNavigation';
import DetailsScreen from '../Screens/DetailsScreen.jsx';
import PaymentScreen from '../Screens/PaymentScreen.tsx';
import HomeScreen from '../Screens/HomeScreen.jsx';
import SignupScreen from '../Screens/auth/SignupScreen.jsx';
import LoginScreen from '../Screens/auth/LoginScreen.jsx';
import SplashScreen from '../Screens/SplashScreen.jsx';
import ProfileScreen from '../Screens/ProfileScreen.jsx';

const RootStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="SignupScreen"
          component={SignupScreen}
          options={{
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="DetailsScreen"
          component={DetailsScreen}
        />
        <Stack.Screen
          name="PaymentScreen"
          component={PaymentScreen}
          options={{
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="bottomTabNavigation"
          component={bottomTabNavigation}
          options={{
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;

const styles = StyleSheet.create({});
