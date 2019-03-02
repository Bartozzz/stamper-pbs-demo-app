import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../constants/Colors";
import layout from "../constants/Layout";

class InputSearch extends Component {
  render() {
    return (
      <View style={styles.inputContainer}>
        <Ionicons
          style={styles.inputIcon}
          name="ios-search"
          size={16}
          color={colors.info}
        />

        <TextInput
          {...this.props}
          placeholderTextColor={colors.info}
          style={styles.inputStyle}
          underlineColorAndroid="transparent"
          autoCorrect={false}
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

    marginHorizontal: 20,
    marginVertical: 0,

    height: 40,
    width: 265,

    borderRadius: 10,
    backgroundColor: "#1A5BF1"
  },

  inputIcon: {
    paddingHorizontal: 10
  },

  inputStyle: {
    flex: 1,
    paddingRight: 10,
    paddingLeft: 0,

    fontSize: 14,
    fontFamily: layout.fontText,
    color: colors.info
  }
});

export default InputSearch;
