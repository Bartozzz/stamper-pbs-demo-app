import React from "react";
import { StyleSheet, Platform, Animated } from "react-native";
import colors from "../constants/Colors";
import layout from "../constants/Layout";

const AnimatedText = Animated.Text;

const HeaderTitle = ({ style, ...rest }) => (
  <AnimatedText
    numberOfLines={1}
    {...rest}
    style={[styles.title]}
    accessibilityTraits="header"
  />
);

const styles = StyleSheet.create({
  title: {
    marginVertical: 6,

    fontSize: 26,
    fontFamily: "poppins-bold",
    color: colors.color,

    alignSelf: "flex-end"
  }
});

export default HeaderTitle;
