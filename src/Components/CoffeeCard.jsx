import {
  StyleSheet,
  Text,
  View,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { COLORS, FONTFAMILY } from '../theme/theme';
import CustomIcons from '../utils/CustomIcons';

const coffeeCard = ({ coffee }) => {
  return (
    <View style={styles.cardStyle}>
      <View style={styles.ImageView}>
        <Image
          source={{ uri: coffee.imageUrl }}
          style={{
            height: 160,
            width: 160,
            borderRadius: 20,
            resizeMode: 'cover',
          }}
        />
      </View>
      <View>
        <Text style={styles.coffeName}>{coffee.name}</Text>
        <Text style={styles.coffeType}>{coffee.special_ingredient}</Text>
      </View>
      <View>
        <Text style={{color:"#fff"}}>sdfghbjkml</Text>
        <TouchableOpacity>
          <CustomIcons name="like" size={25} color={COLORS.primaryOrangeHex} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default coffeeCard;

const styles = StyleSheet.create({
  cardStyle: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    width: 200,
    height: 250,
    marginVertical: 20,
    marginHorizontal: 15,
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 25,
  },
  ImageView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {},
  coffeName: {
    color: COLORS.primaryWhiteHex,
    fontFamily: FONTFAMILY.poppins_semibold,
    marginTop: 10,
    fontSize: 15,
  },
  coffeType: {
    color: COLORS.primaryWhiteHex,
  },
  coffeePrice: {},
  addCart: {},
  addCartLogo: {},
});
