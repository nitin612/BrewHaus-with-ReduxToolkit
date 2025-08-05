import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React, { useEffect } from 'react';
import { COLORS } from '../theme/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();
  const { width, height } = Dimensions.get('window');

  useEffect(() => {
    setTimeout(() => {
      CheckLogin();
    }, 3000);
  }, []);

  const CheckLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate('bottomTabNavigation');
        console.log(token, 'sdfghjk');
      } else {
        navigation.navigate('LoginScreen');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash.png')}
        style={{
          width: 200,
          height: 200,
        }}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
