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

const BeansCard = ({ beans }) => {
  return (
    <View style={styles.cardStyle}>
      <View style={styles.ImageView}>
        <Image
          source={{ uri: beans.imageUrl }}
          style={{
            height: 160,
            width: 160,
            borderRadius: 20,
            resizeMode: 'cover',
          }}
        />
      </View>
      <View>
        <Text style={styles.coffeName}>{beans.name}</Text>
        <Text style={styles.coffeType}>{beans.special_ingredient}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              marginRight: 6,
              color: COLORS.primaryOrangeHex,
              fontWeight: '600',
              fontSize: 20,
            }}
          >
            {beans.prices?.[0]?.currency}
          </Text>
          <Text style={{ color: '#fff', fontWeight: '600', fontSize: 20 }}>
            {beans.prices?.[0]?.price}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            backgroundColor: COLORS.primaryOrangeHex,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 5,
          }}
        >
          <CustomIcons name="add" size={15} color={COLORS.primaryBlackHex} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BeansCard;

const styles = StyleSheet.create({
  cardStyle: {
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    width: 200,
    height: 280,
    marginVertical: 20,
    marginHorizontal: 15,
    borderRadius: 25,
    justifyContent: 'center',
    padding: 20,
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
