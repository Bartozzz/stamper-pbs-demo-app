import React, { Component } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../constants/Colors";
import layout from "../constants/Layout";

class Button extends Component {
  render() {
    const { title, onPress } = this.props;

    return (
      <TouchableOpacity style={styles.buttonStyle} onPress={() => onPress()}>
        <Text style={styles.textStyle}>{title}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 20,
    fontFamily: layout.fontText,
    color: colors.color,
    textAlign: "center",
    textTransform: "uppercase"
  },

  buttonStyle: {
    padding: 10,
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 5
  }
});

export default Button;
