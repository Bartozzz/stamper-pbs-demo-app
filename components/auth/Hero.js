import React from "react";
import { StyleSheet, Text, View } from "react-native";

import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

export default function AuthHero(props) {
  return (
    <View style={[styles.hero, props.style]}>
      <Text style={styles.heroTextA}>Dołącz do</Text>
      <Text style={styles.heroTextA}>bardziej lojalnych!</Text>
      <Text style={styles.heroTextB}>Z nami wiele możesz, nic nie musisz.</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  hero: {
    height: 350,
    backgroundColor: colors.background,

    justifyContent: "center",
    alignItems: "center"
  },

  heroTextA: {
    marginVertical: 2,
    marginHorizontal: 0,

    color: colors.color,

    fontSize: 26,
    fontWeight: "900",
    fontFamily: layout.fontHead,
    textAlign: "center",
    textTransform: "uppercase"
  },

  heroTextB: {
    marginTop: 20,

    color: colors.border,

    fontSize: 18,
    fontFamily: layout.fontText,
    textAlign: "center"
  }
});
