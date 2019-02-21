import React from "react";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";

import i18n from "../../translations";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

const LogoImage = require("../../assets/logos/stamper-icon.png");
const HeroImage = require("../../assets/backgrounds/hero.png");

export default function AuthHero(props) {
  return (
    <ImageBackground source={HeroImage} style={[styles.hero, props.style]}>
      <Image source={LogoImage} style={{ width: 50, height: 50 }} />

      <Text style={styles.heroTextA}>{i18n.t("auth.hero.slogan1")}</Text>
      <Text style={styles.heroTextB}>{i18n.t("auth.hero.slogan2")}</Text>
    </ImageBackground>
  );
}

export const styles = StyleSheet.create({
  hero: {
    height: 300,
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
