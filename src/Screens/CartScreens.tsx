import {
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../theme/theme';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  reset,
  incrementByAmount,
} from '../features/counter/counterSlice';

const CartScreens = ({}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: COLORS.primaryGreyHex,
          width: 130,
          height: 50,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          marginBottom: 20,
        }}
      >
        <Text style={{ color: 'white', fontWeight: '500' }}>111</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity style={styles.btns}>
          <Text style={{ color: 'white' }}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns}>
          <Text style={{ color: 'white' }}>-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btns}>
          <Text style={{ color: 'white' }}>reset</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[{ marginTop: 10 }, styles.btns]}>
        <Text style={{ color: 'white' }}>IncByValue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CartScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btns: {
    backgroundColor: COLORS.primaryLightGreyHex,
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
});
