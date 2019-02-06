import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

import * as Routes from "../../navigation";
import i18n from "../../translations";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

export default function WalletHeader(props) {
  const cardsStyles = [
    styles.tabsItem,
    props.cards ? styles.tabsItemActive : false
  ];
  const placesStyles = [
    styles.tabsItem,
    props.places ? styles.tabsItemActive : false
  ];

  return (
    <View style={[styles.tabs, props.style]}>
      <Text style={styles.tabsTitle}>{props.title}</Text>

      <TouchableOpacity
        onPress={() => props.navigation.navigate(Routes.WALLET_CARDS)}
      >
        <Text style={cardsStyles}>Karty</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => props.navigation.navigate(Routes.WALLET_PLACES)}
      >
        <Text style={placesStyles}>Miejsca</Text>
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    alignItems: "center",

    width: "100%",

    paddingVertical: 12,
    paddingHorizontal: 20,

    backgroundColor: colors.primary
  },
  tabsTitle: {
    flex: 1,

    fontFamily: layout.fontHead,
    fontSize: 26,
    color: colors.color
  },
  tabsItem: {
    marginLeft: 16,

    fontFamily: layout.fontText,
    fontSize: 18,
    color: colors.color,

    opacity: 0.5
  },
  tabsItemActive: {
    opacity: 1
  }
});
