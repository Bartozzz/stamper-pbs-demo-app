import React from "react";
import { Image } from "react-native";
import normalize from "react-native-normalize";

import i18n from "../../translations";

import images from "../../constants/images";

export const StamperLogo = ({ style, ...props }) => {
  const currentLocale = i18n.currentLocale();

  const width = props.width || normalize(195, "width");
  const height = props.height || normalize(70, "height");

  if (currentLocale.includes("pl")) {
    return (
      <Image source={images.StamperLogoPl} style={[style, { width, height }]} />
    );
  } else {
    return (
      <Image source={images.StamperLogoEn} style={[style, { width, height }]} />
    );
  }
};

export const StamperSygnet = ({ style, ...props }) => {
  const size = props.size || 50;
  const width = size;
  const height = size;

  return (
    <Image source={images.StamperSygnet2x} style={[style, { width, height }]} />
  );
};
