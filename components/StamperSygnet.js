import React from "react";
import { Image } from "react-native";

const SygnetImage = require("../assets/logos/stamper_sygnet_2x.png");

export function StamperSygnet({ style, ...props }) {
  const size = props.size || 50;
  const width = size;
  const height = size;

  return <Image source={SygnetImage} style={[style, { width, height }]} />;
}

export default StamperSygnet;
