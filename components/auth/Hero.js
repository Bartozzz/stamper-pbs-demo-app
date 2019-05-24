import React from "react";
import { StyleSheet, Text, ImageBackground, View } from "react-native";

import i18n from "../../translations";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import StamperSygnet from "../StamperSygnet";

const HeroImage = require("../../assets/backgrounds/hero.png");

export default function AuthHero(props) {
  return (
    <View style={[props.style]}>
      <ImageBackground
        source={HeroImage}
        style={[styles.hero, { height: "100%", width: "100%" }]}
      >
        <StamperSygnet />

        <Text style={styles.heroTextA}>{i18n.t("auth.hero.slogan1")}</Text>
        <Text style={styles.heroTextB}>{i18n.t("auth.hero.slogan2")}</Text>
      </ImageBackground>
    </View>
  );
}

export const styles = StyleSheet.create({
  hero: {
    backgroundColor: colors.background,

    justifyContent: "center",
    alignItems: "center"
  },

  heroTextA: {
    marginTop: 40,
    marginHorizontal: 0,

    color: colors.color,

    fontSize: 24,
    fontWeight: "900",
    fontFamily: layout.fontHead,
    textAlign: "center",
    textTransform: "uppercase"
  },

  heroTextB: {
    marginTop: 16,

    color: colors.info,

    fontSize: 14,
    fontFamily: layout.fontText,
    textAlign: "center"
  }
});
