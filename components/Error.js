import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../constants/Colors";
import layout from "../constants/Layout";

class Error extends Component {
  get message() {
    const { message } = this.props;

    if (Array.isArray(message)) {
      return message.join(". ");
    } else if (typeof message === "string") {
      return message;
    } else {
      console.error(message);
      return "Internal error";
    }
  }

  render() {
    const message = this.message;

    if (!message) {
      return null;
    }

    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorHead}>Something bad happened:</Text>
        <Text style={styles.errorText}>{message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorHead: {
    fontSize: 18,
    fontFamily: layout.fontHead,
    color: colors.color
  },

  errorText: {
    fontSize: 18,
    fontFamily: layout.fontText,
    color: colors.color
  },

  errorContainer: {
    padding: 10,
    marginVertical: 10,

    width: "100%",
    backgroundColor: colors.error,
    borderRadius: 5
  }
});

export default Error;
