import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../constants/Colors";

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

    fontFamily: "poppins-bold",
    fontSize: 26,
    color: colors.color
  }
});
