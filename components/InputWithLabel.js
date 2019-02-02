import React, { Component } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";
import colors from "../constants/Colors";
import layout from "../constants/Layout";

class InputWithLabel extends Component {
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
    const { label, ...rest } = this.props;
    const { isFocused } = this.state;

    return (
      <View style={[styles.inputPadder]}>
        <View style={[styles.inputContainer, this.inputStyle]}>
          <TextInput
            {...rest}
            placeholderTextColor={this.inputColor}
            style={styles.inputStyle}
            underlineColorAndroid="transparent"
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
          />

          <Text style={styles.inputLabel}>{label}</Text>
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
  inputContainerErrored: {
    borderColor: colors.error
  },

  inputLabel: {
    paddingVertical: 10,
    paddingRight: 10,

    color: colors.info,
    fontSize: 10
  },

  inputStyle: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 15,

    fontSize: 14,
    fontFamily: layout.fontText,
    color: colors.color
  },

  inputError: {
    color: colors.error,
    marginHorizontal: 17,
    marginTop: 2
  }
});

export default InputWithLabel;
