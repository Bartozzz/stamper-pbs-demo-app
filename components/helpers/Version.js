import React from "react";
import { Text, StyleSheet } from "react-native";
import Constants from 'expo-constants';
import { version } from "../../package.json";

export function Version({ style, ...props }) {
  return (
    <Text {...props} style={[styles.version, style]}>
      V. {Constants.manifest.version}–{version}
    </Text>
  );
}

const styles = StyleSheet.create({
  version: {
    color: "white",
    textAlign: "center",

    fontSize: 10,
    fontWeight: "bold",

    marginVertical: 18
  }
});

export default Version;
