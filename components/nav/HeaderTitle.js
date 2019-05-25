import React from "react";
import { StyleSheet, Animated } from "react-native";
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
    // Standard header margin:
    marginVertical: 6,

    fontSize: 26,
    fontFamily: "poppins-bold",
    color: colors.color,

    // Align to the bottom of the container:
    alignSelf: "flex-end"
  }
});

export default HeaderTitle;
