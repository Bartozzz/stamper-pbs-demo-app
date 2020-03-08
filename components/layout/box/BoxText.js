import React from "react";
import colors from "../../../constants/Colors";
import styled from "styled-components/native";

const BoxHeading = styled.Text`
  padding-horizontal: 30px;

  color: ${colors.color};
  font-size: 24px;
  text-align: center;
`;

const BoxSubHeading = styled.Text`
  margin-top: 30px

  text-align: center;
  font-size: 18px;
  color: ${colors.color};
`;

const BoxAction = styled.Text`
  margin-top: 30px;

  color: #709BE7;
  font-size: 18px;
  text-align: center;
  text-transform: uppercase;
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
