import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../constants/Colors";
import layout from "../constants/Layout";

class Error extends Component {
  render() {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorHead}>Something bad happened:</Text>
        <Text style={styles.errorText}>
          {this.props.message || "Internal error"}
        </Text>
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
