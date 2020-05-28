import React from "react";
import { Image } from "react-native";
import normalize from "react-native-normalize";

import i18n from "../../translations";

const LogoImagePL = require("../../assets/logos/stamper_logo_2x.png");
const LogoImageEN = require("../../assets/logos/stamper_logo_300px_en.png");
const SygnetImage = require("../../assets/logos/stamper_sygnet_2x.png");

export const StamperLogo = ({ style, ...props }) => {
  const currentLocale = i18n.currentLocale();

  const width = props.width || normalize(195, "width");
  const height = props.height || normalize(70, "height");

  if (currentLocale.includes("pl")) {
    return <Image source={LogoImagePL} style={[style, { width, height }]} />;
  } else {
    return <Image source={LogoImageEN} style={[style, { width, height }]} />;
  }
};

export const StamperSygnet = ({ style, ...props }) => {
  const size = props.size || 50;
  const width = size;
  const height = size;

  return <Image source={SygnetImage} style={[style, { width, height }]} />;
};
