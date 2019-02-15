import React from "react";
import { StyleSheet, TouchableOpacity, Text, View, Image } from "react-native";

import * as Routes from "../../navigation";
import i18n from "../../translations";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

const ModeMap = require("../../assets/images/menu/mode_map.png");
const ModeCards = require("../../assets/images/menu/mode_cards.png");

export default function MapHeader(props) {
  const nearbyStyles = [
    styles.headerItem,
    props.nearby ? styles.headerItemActive : false
  ];

  const nearbyBorderStyles = [
    styles.headerBorderItem,
    props.nearby ? styles.headerBorderActive : false
  ];

  const favStyles = [
    styles.headerItem,
    props.fav ? styles.headerItemActive : false
  ];

  const favBorderStyles = [
    styles.headerBorderItem,
    props.fav ? styles.headerBorderActive : false
  ];

  const modeIcon =
    props.mode === "MODE_MAP" ? (
      <Image source={ModeMap} style={styles.toggleIcon} />
    ) : (
      <Image source={ModeCards} style={styles.toggleIcon} />
    );

  return (
    <View style={[styles.header, props.style]}>
      <TouchableOpacity onPress={props.onSelectNearby}>
        <View style={nearbyBorderStyles}>
          <Text style={nearbyStyles}>W pobliżu</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => props.onToggleMode()}>
        <View style={styles.toggle}>{modeIcon}</View>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.onSelectFav}>
        <View style={favBorderStyles}>
          <Text style={favStyles}>Ulubione</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export const styles = StyleSheet.create({
  header: {
    zIndex: 2,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    width: "100%",

    paddingVertical: 15,
    paddingHorizontal: 20,

    backgroundColor: colors.background
  },
  headerItem: {
    fontFamily: layout.fontText,
    fontSize: 18,
    color: "#95989A"
  },
  headerItemActive: {
    color: colors.color
  },
  headerBorderItem: {
    paddingBottom: 2,
    paddingHorizontal: 3,

    borderStyle: "solid",
    borderBottomWidth: 2,
    borderBottomColor: "transparent"
  },
  headerBorderActive: {
    borderBottomColor: colors.primary
  },

  toggle: {
    zIndex: 3,

    position: "absolute",
    top: -20,

    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",

    width: 55,
    height: 55,

    borderWidth: 4,
    borderStyle: "solid",
    borderColor: "#2b313e",
    borderRadius: 55,

    backgroundColor: colors.primary
  },
  toggleIcon: {
    width: 33,
    height: 33
  }
});
