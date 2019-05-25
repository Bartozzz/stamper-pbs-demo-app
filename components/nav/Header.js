import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../constants/Colors";
import defaultStyles from "../../constants/Styles";

export function Header(props) {
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
    ...defaultStyles.grow,
    ...defaultStyles.headerTwoLinesTitle
  }
});

export default Header;
