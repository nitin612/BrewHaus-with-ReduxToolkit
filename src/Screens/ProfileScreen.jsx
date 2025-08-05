import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTFAMILY } from '../theme/theme';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../features/authSlice';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [user, setUser] = useState({});
  const logOut = () => {
    dispatch(logOutUser());
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen' }],
    });
  };
  const fetchUser = async () => {
    const userdata = await AsyncStorage.getItem('user');
    if (userdata) {
      setUser(JSON.parse(userdata));
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  console.log(user, 'Dasbdjsakbd');

  return (
    <View style={styles.container}>
      <Text style={styles.mainText}>ProfileScreen</Text>
      <View style={styles.headingBox}>
        <Image
          source={require('../assets/app_images/avatar.png')}
          style={styles.img}
        />
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.dataContainer}>
          <Text style={styles.dataHeading}>Name </Text>
          <Text style={styles.data}>{user.fullname}</Text>
        </View>
        <View style={styles.dataContainer}>
          <Text style={styles.dataHeading}>Email id </Text>
          <Text style={styles.data}>{user.email}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button} onPress={logOut}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  mainText: {
    color: '#fff',
    fontFamily: FONTFAMILY.poppins_extrabold,
    alignSelf: 'center',
    marginTop: 70,
    fontSize: 20,
  },
  button: {
    width: '80%',
    paddingVertical: 20,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 20,
    left: '10%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  headingBox: {
    paddingVertical: 10,
    alignSelf: 'center',
  },
  detailsContainer: {
    padding: 20,
  },
  data: {
    color: COLORS.primaryWhiteHex,
    fontWeight: '500',
    fontSize: 16,
  },
  img: {
    borderRadius: 50,
    height: 80,
    width: 80,
  },
  dataContainer: {
    borderWidth: 2,
    marginVertical: 8,
    borderColor: COLORS.secondaryDarkGreyHex,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 14,
  },
  dataHeading: {
    color: COLORS.primaryOrangeHex,
    fontFamily: FONTFAMILY.poppins_extrabold,
    fontSize: 16,
    marginTop: -25,
    backgroundColor: COLORS.primaryBlackHex,
    alignSelf: 'flex-start',
    paddingLeft: 3,
  },
});
