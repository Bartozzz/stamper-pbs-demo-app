import React from "react";
import { View, StyleSheet } from "react-native";

export function HeaderEmpty() {
  return <View style={styles.empty}></View>;
}

const styles = StyleSheet.create({
  empty: {
    alignSelf: "flex-start",

    width: 45,
    height: 40
  }
});

export default HeaderEmpty;
