import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import CustomIcons from '../utils/CustomIcons';

interface gradientIconBar {
  name?: string;
  size?: number;
  color?: string;
}

const GradientIcon: React.FC<gradientIconBar> = ({ name, size, color }) => {
  return (
    <View style={styles.Icon}>
      <CustomIcons name={name} size={size} color={color} />
    </View>
  );
};

export default GradientIcon;

const styles = StyleSheet.create({
  Icon: {},
});
