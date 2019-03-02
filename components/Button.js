import React, { Component } from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import colors from "../constants/Colors";

class Button extends Component {
  render() {
    const { title, style, disabled, onPress } = this.props;

    if (disabled) {
      return (
        <View style={[styles.buttonStyle, styles.disabledButtonStyle, style]}>
          <Text style={styles.textStyle}>{title}</Text>
        </View>
      );
    }

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
    fontFamily: "poppins-bold",

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
  },
  disabledButtonStyle: {
    backgroundColor: "#1A345F"
  }
});

export default Button;
