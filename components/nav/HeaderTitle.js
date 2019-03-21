import React from "react";
import { StyleSheet, Animated } from "react-native";
import colors from "../../constants/Colors";

const AnimatedText = Animated.Text;

const HeaderTitle = ({ ...rest }) => (
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
