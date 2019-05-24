import React from "react";
import { StyleSheet, Text } from "react-native";
import colors from "../../../constants/Colors";

export function Heading({ children, style }) {
  return <Text style={[styles.boxHeading, style]}>{children}</Text>;
}

export function Subheading({ children, style }) {
  return <Text style={[styles.boxSubheading, style]}>{children}</Text>;
}

export function Action({ children, style }) {
  return <Text style={[styles.boxAction, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  boxHeading: {
    paddingHorizontal: 30,

    color: colors.color,
    fontSize: 24,
    textAlign: "center"
  },

  boxSubheading: {
    marginTop: 30,

    textAlign: "center",
    fontSize: 18,
    color: colors.color
  },

  boxAction: {
    marginTop: 30,

    color: "#709BE7",
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase"
  }
});
