import React from "react";
import { StyleSheet, Image } from "react-native";

export function BoxIcon({ source, width, height }) {
  return <Image style={[styles.icon, { width, height }]} source={source} />;
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: 40
  }
});

export default BoxIcon;
