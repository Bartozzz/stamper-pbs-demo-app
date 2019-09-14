import React from "react";
import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

import * as Routes from "../../../navigation";
import i18n from "../../../translations";
import colors from "../../../constants/Colors";

export default function PrizesHeader(props) {
  const availablePrizesStyles = [
    styles.tabsItem,
    props.available ? styles.tabsItemActive : false
  ];

  const receivedPrizesStyles = [
    styles.tabsItem,
    { textAlign: "right" },
    props.received ? styles.tabsItemActive : false
  ];

  return (
    <View style={[styles.tabs, props.style]}>
      <View style={{ flex: 2 }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(Routes.PRIZES_LIST)}
        >
          <Text style={availablePrizesStyles}>
            {i18n.t("prizes.available")}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => props.navigation.navigate(Routes.PRIZES_RECEIVED)}
        >
          <Text style={receivedPrizesStyles}>{i18n.t("prizes.received")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 13,
    paddingHorizontal: 20,

    backgroundColor: colors.primary
  },

  tabsItem: {
    fontFamily: "poppins-regular",
    fontSize: 18,
    color: colors.color
  },
  tabsItemActive: {
    fontFamily: "poppins-bold"
  }
});
