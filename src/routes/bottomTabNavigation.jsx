import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen.jsx';
import CartScreens from '../Screens/CartScreens.tsx';
import FavoritesScreen from '../Screens/FavoritesScreen.tsx';
import OrderHistoryScreen from '../Screens/OrderHistoryScreen.tsx';
import { COLORS } from '../theme/theme';
import CustomIcons from '../utils/CustomIcons';

const bottomTabNavigation = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBarStyle,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <CustomIcons
              name="home"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="CartScreens"
        component={CartScreens}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <CustomIcons
              name="cart"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="FavoritesScreen"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <CustomIcons
              name="like"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}
      />
      <Tab.Screen
        name="OrderHistoryScreen"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <CustomIcons
              name="bell"
              size={25}
              color={
                focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
              }
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default bottomTabNavigation;

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 90,
    position: 'absolute',
    backgroundColor: COLORS.primaryBlackHex,
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
    paddingTop:10,
    borderTopLeftRadius:6,
    borderTopRightRadius:6,
  },
});
