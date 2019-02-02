import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../constants/Colors";
import layout from "../constants/Layout";

class Button extends Component {
  render() {
    const { title, style, onPress } = this.props;

    return (
      <TouchableOpacity
        style={[styles.buttonStyle, style]}
        onPress={() => onPress()}
      >
        <Text style={styles.textStyle}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontWeight: "900",
    fontFamily: layout.fontHead,

    color: colors.color,
    textAlign: "center",
    textTransform: "uppercase",
    textShadowColor: "rgba(0, 0, 0, 0.16)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2
  },

  buttonStyle: {
    justifyContent: "center",
    alignItems: "center",

    height: 48,
    width: "100%",

    backgroundColor: colors.primary,
    borderRadius: 5
  }
});

export default Button;
