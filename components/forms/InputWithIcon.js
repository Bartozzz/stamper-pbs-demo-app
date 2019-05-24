import React, { Component } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

class InputWithIcon extends Component {
  state = {
    isFocused: false
  };

  get inputStyle() {
    if (this.error) {
      return styles.inputContainerErrored;
    } else if (this.state.isFocused) {
      return styles.inputContainerFocused;
    }
  }

  get inputColor() {
    if (this.error) {
      return colors.error;
    } else if (this.state.isFocused) {
      return colors.color;
    } else {
      return colors.inputBorder;
    }
  }

  get error() {
    const { error } = this.props;

    if (Array.isArray(error)) {
      if (error.length) {
        return error.join(". ") + ".";
      }
    } else if (error) {
      return error + ".";
    } else {
      return null;
    }
  }

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

    return (
      <View style={[styles.inputPadder]}>
        <View style={[styles.inputContainer, this.inputStyle]}>
          <Ionicons
            style={styles.inputIcon}
            name={iconName}
            size={iconSize}
            color={this.inputColor}
          />

          <TextInput
            {...rest}
            placeholderTextColor={this.inputColor}
            style={styles.inputStyle}
            underlineColorAndroid="transparent"
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            autoCorrect={false}
          />
        </View>

        {this.error ? (
          <Text style={styles.inputError}>{this.error}</Text>
        ) : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputPadder: {
    marginVertical: 15
  },

  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    height: 47,
    width: "100%",

    borderRadius: 100,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.inputBorder
  },
  inputContainerFocused: {
    borderColor: colors.color
  },
  inputContainerErrored: {
    borderColor: colors.error
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

    fontSize: 14,
    fontFamily: layout.fontText,
    color: colors.color
  },

  inputError: {
    position: "absolute",
    top: 48,

    color: colors.error,
    marginHorizontal: 17,
    marginTop: 2,

    fontSize: 12
  }
});

export default InputWithIcon;
