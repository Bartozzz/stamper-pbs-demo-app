import React from "react";
import { Animated, Platform } from "react-native";
import colors from "../../constants/Colors";
import styled, { css } from "styled-components/native";

const Title = styled.Text`
  ${Platform.select({
      android: css`
        marginBottom: 9;
        fontSize: 20
      `,
      ios: css`
        /* Standard header margin: */
        marginVertical: 6;

        fontSize: 26
      `
    })};

    color: ${colors.color};
    fontFamily: poppins-bold;

    /* Align to the bottom of the container: */
    alignSelf: flex-end
`;

export function HeaderTitle(props) {
  return (
    <Title
      as={Animated.text}
      numberOfLines={1}
      {...props}
      accessibilityTraits="header"
    />
  );
}

export default HeaderTitle;
