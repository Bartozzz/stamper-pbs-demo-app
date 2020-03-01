import React from "react";
import colors from "../../../constants/Colors";
import styled from "styled-components/native";

const BoxHeading = styled.Text`
  paddingHorizontal: 30;

  color: ${colors.color};
  fontSize: 24;
  textAlign: center
`;

const BoxSubHeading = styled.Text`
  marginTop: 30;

  textAlign: center;
  fontSize: 18;
  color: ${colors.color}
`;

const BoxAction = styled.Text`
  marginTop: 30;

  color: #709BE7;
  fontSize: 18;
  textAlign: center;
  textTransform: uppercase
`;

export function Heading({ children, style }) {
  return <BoxHeading style={style}>{children}</BoxHeading>;
}

export function Subheading({ children, style }) {
  return <BoxSubHeading style={style}>{children}</BoxSubHeading>;
}

export function Action({ children, style }) {
  return <BoxAction style={style}>{children}</BoxAction>;
}
