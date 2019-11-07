import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import PlusImage from "../../../assets/images/plus.png";

export function IconAddToWallet({ style, onPress }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image style={[styles.icon, style]} source={PlusImage} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 16
  },
  icon: {
    width: 48,
    height: 48
  }
});

export default IconAddToWallet;
