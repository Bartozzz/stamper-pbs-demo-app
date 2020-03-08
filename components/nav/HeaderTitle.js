import React from "react";
import { Animated, Platform } from "react-native";
import colors from "../../constants/Colors";
import styled, { css } from "styled-components/native";

const Title = styled(Animated.Text).attrs(props => ({
  numberOfLines: 1,
  accessibilityTraits: "header"
}))`
  ${Platform.select({
      android: css`
        margin-bottom: 9px;
        font-size: 20px;
      `,
      ios: css`
        /* Standard header margin: */
        margin-vertical: 6px;
        font-size: 26px;
      `
    })};

    color: ${colors.color};
    fontFamily: poppins-bold;

    /* Align to the bottom of the container: */
    alignSelf: flex-end;
`;

export function HeaderTitle(props) {
  return (
    <Title {...props} />
  );
}

export default HeaderTitle;
