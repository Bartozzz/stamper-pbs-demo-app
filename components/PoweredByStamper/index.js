import * as React from "react";
import { View } from "react-native";
import normalize from "react-native-normalize";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

export const PoweredByStamper = ({ light, style, ...props }) => {
  const width = props.width || normalize(195, "width");
  const height = props.height || normalize(70, "height");

  return (
    <Theme light={light}>
      <View style={style}>
        <Styled.PoweredByStamper>Powered by Stamper</Styled.PoweredByStamper>
        <Styled.StamperLogoTint style={{ width, height }} />
      </View>
    </Theme>
  );
};

export default PoweredByStamper;
