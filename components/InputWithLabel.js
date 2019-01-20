import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import colors from "../constants/Colors";
import layout from "../constants/Layout";

class InputWithLabel extends Component {
  state = {
    isFocused: false
  };

  handleFocus = () => {
    this.setState({
      isFocused: true
    });
  };

  handleBlur = () => {
    this.setState({
      isFocused: false
    });
  };

  render() {
    const { label, ...rest } = this.props;
    const { isFocused } = this.state;

    const placeholderColor = isFocused ? colors.color : colors.inputBorder;
    const inputStyle = isFocused ? styles.inputContainerFocused : null;

    return (
      <View style={[styles.inputContainer, inputStyle]}>
        <TextInput
          {...rest}
          placeholderTextColor={placeholderColor}
          style={styles.inputStyle}
          underlineColorAndroid="transparent"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />

        <Text style={styles.inputLabel}>{label}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: colors.inputBorder
  },
  inputContainerFocused: {
    borderColor: colors.color
  },

  inputLabel: {
    paddingVertical: 10,
    paddingRight: 10,

    color: colors.label,
    fontSize: 12
  },

  inputStyle: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,

    fontSize: 16,
    fontFamily: layout.fontText,
    color: colors.color
  }
});

export default InputWithLabel;
