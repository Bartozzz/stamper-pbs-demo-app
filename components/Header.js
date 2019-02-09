import React from "react";
import { StyleSheet, Text, View } from "react-native";

import * as Routes from "../navigation";
import i18n from "../translations";
import colors from "../constants/Colors";
import layout from "../constants/Layout";

export default function Header(props) {
  return (
    <View style={[styles.header, props.style]}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",

    width: "100%",

    paddingVertical: 12,
    paddingHorizontal: 20,

    backgroundColor: colors.primary
  },
  headerTitle: {
    flex: 1,

    fontFamily: layout.fontHead,
    fontSize: 26,
    color: colors.color
  }
});
