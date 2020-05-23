import React from "react";
import { StyleSheet, Animated, Platform } from "react-native";
import colors from "../../constants/Colors";

export function HeaderTitle(props) {
  return (
    <Animated.Text
      numberOfLines={1}
      {...props}
      style={[styles.title]}
      accessibilityTraits="header"
    />
  );
}

const styles = StyleSheet.create({
  title: {
    ...Platform.select({
      android: {
        marginBottom: 9,
      },
      ios: {
        // Standard header margin:
        marginVertical: 6,
      },
    }),

    color: colors.color,
    fontFamily: "poppins-bold",
    fontSize: Platform.select({
      android: 20,
      ios: 26,
    }),

    // Align to the bottom of the container:
    alignSelf: "flex-end",
  },
});

export default HeaderTitle;
