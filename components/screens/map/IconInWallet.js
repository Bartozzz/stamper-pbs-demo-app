import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import AddedImage from "../../../assets/images/icons/already-in-wallet.png";
import i18n from "../../../translations";
import colors from "../../../constants/Colors";

export function IconInWallet() {
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={AddedImage} />
      <Text style={styles.text}>{i18n.t("map.cardAlreadyAdded")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 14
  },
  text: {
    position: "absolute",
    top: 2,
    left: 4,

    color: colors.primary,
    fontSize: 6,
    fontFamily: "nunito-regular"
  },
  icon: {
    height: 56,
    width: 74
  }
});

export default IconInWallet;
