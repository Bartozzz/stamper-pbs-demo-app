import React from "react";
import { Image } from "react-native";
import i18n from "../translations";
import normalize from "react-native-normalize";

const LogoImagePL = require("../assets/logos/stamper_logo_2x.png");
const LogoImageEN = require("../assets/logos/stamper_logo_300px_en.png");

export function StamperLogo({ style, ...props }) {
  const currentLocale = i18n.currentLocale();

  const width = props.width || normalize(195, "width");
  const height = props.height || normalize(70, "height");

  if (currentLocale.includes("pl")) {
    return <Image source={LogoImagePL} style={[style, { width, height }]} />;
  } else {
    return <Image source={LogoImageEN} style={[style, { width, height }]} />;
  }
}

export default StamperLogo;
