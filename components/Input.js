import React, { Component } from "react";
import { TextInput, StyleSheet } from "react-native";
import colors from "../constants/Colors";
import layout from "../constants/Layout";

class Input extends Component {
  render() {
    return (
      <TextInput
        {...this.props}
        placeholderTextColor={colors.color}
        style={styles.inputStyle}
        underlineColorAndroid="transparent"
      />
    );
  }
}

const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 20,
    fontFamily: layout.fontText,
    color: colors.color,

    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,

    width: "100%",
    borderRadius: 100,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border
  }
});

export default Input;
