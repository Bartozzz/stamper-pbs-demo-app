import React from "react";
import {
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Text,
  View,
  Image
} from "react-native";

import i18n from "../../translations";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import defaultStyles from "../../constants/Styles";

const ModeMap = require("../../assets/images/menu/mode_map.png");
const ModeCards = require("../../assets/images/menu/mode_cards.png");

export default function MapHeader(props) {
  const nearbyStyles = [
    styles.headerItem,
    defaultStyles.textLeft,
    props.nearby ? styles.headerItemActive : false
  ];

  const nearbyBorderStyles = [
    styles.headerBorderItem,
    props.nearby ? styles.headerBorderActive : false
  ];

  const favStyles = [
    styles.headerItem,
    defaultStyles.textRight,
    props.fav ? styles.headerItemActive : false
  ];

  const favBorderStyles = [
    styles.headerBorderItem,
    props.fav ? styles.headerBorderActive : false
  ];

  const modeIcon =
    props.mode === "MODE_MAP" ? (
      <Image source={ModeCards} style={styles.toggleIcon} />
    ) : (
      <Image source={ModeMap} style={styles.toggleIcon} />
    );

  return (
    <View style={[styles.header, props.style]}>
      <TouchableOpacity
        style={defaultStyles.grow}
        onPress={props.onSelectNearby}
      >
        <View style={nearbyBorderStyles}>
          <Text style={nearbyStyles}>{i18n.t("map.nearby")}</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[defaultStyles.grow, styles.toggleContainer]}
        onPress={() => props.onToggleMode()}
      >
        <View style={styles.toggle}>{modeIcon}</View>
      </TouchableOpacity>

      <TouchableOpacity style={defaultStyles.grow} onPress={props.onSelectFav}>
        <View style={favBorderStyles}>
          <Text style={favStyles}>{i18n.t("map.favs")}</Text>
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
    color: colors.color,
    textDecorationLine: "underline",
    textDecorationStyle: "solid",
    textDecorationColor: colors.primary
  },
  //headerBorderItem: {
  //  paddingBottom: 2,
  //  paddingHorizontal: 3,

  //  borderStyle: "solid",
  //  borderBottomWidth: 2,
  //  borderBottomColor: "transparent"
  //},
  //headerBorderActive: {
  //  borderBottomColor: colors.primary
  //},

  toggleContainer: {
    position: "absolute",
    left: (Dimensions.get("window").width - 55) / 2,
    top: 10,

    width: 55,
    height: 55,

    zIndex: 1000
  },
  toggle: {
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
