import React from "react";
import { Animated } from "react-native";

import * as Styled from "./index.styled";

export const HeaderTitle = (props) => {
  return (
    <Animated.Text
      numberOfLines={1}
      {...props}
      style={[Styled.HeaderTitle.styles]}
      accessibilityTraits="header"
    />
  );
};

export default HeaderTitle;
