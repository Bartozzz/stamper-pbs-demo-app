import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/Colors";
import layout from "../constants/Layout";

class InputWithIcon extends Component {
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
    const { iconName, iconSize, ...rest } = this.props;
    const { isFocused } = this.state;

    const iconColor = isFocused ? colors.color : colors.inputBorder;
    const placeholderColor = isFocused ? colors.color : colors.inputBorder;
    const inputStyle = isFocused ? styles.inputContainerFocused : null;

    return (
      <View style={[styles.inputContainer, inputStyle]}>
        <Ionicons
          style={styles.inputIcon}
          name={iconName}
          size={iconSize}
          color={iconColor}
        />

        <TextInput
          {...rest}
          placeholderTextColor={placeholderColor}
          style={styles.inputStyle}
          underlineColorAndroid="transparent"
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    marginVertical: 15,

    borderRadius: 100,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.inputBorder
  },
  inputContainerFocused: {
    borderColor: colors.color
  },

  inputIcon: {
    paddingVertical: 10,
    paddingHorizontal: 20
  },

  inputStyle: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,

    fontSize: 20,
    fontFamily: layout.fontText,
    color: colors.color
  }
});

export default InputWithIcon;
