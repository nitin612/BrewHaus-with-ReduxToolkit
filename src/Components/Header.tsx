import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import GradientIcon from './GradientIcon';
import { COLORS } from '../theme/theme';
import { useNavigation } from '@react-navigation/native';

interface headerBarTitle {
  tittle?: string;
}

const Header: React.FC<headerBarTitle> = ({ tittle }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerStyle}>
      <GradientIcon name="bell" size={25} color={COLORS.primaryOrangeHex} />
      <Text style={styles.tittle}>{tittle}</Text>
      <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <Image
          source={require('../assets/app_images/avatar.png')}
          style={styles.profilePic}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 60,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  profilePic: {
    width: 40,
    height: 40,
    borderRadius: 15,
  },
  tittle: {
    fontFamily: 'TitilliumWeb-Bold',
    fontSize: 22,
  },
});

export default Header;
