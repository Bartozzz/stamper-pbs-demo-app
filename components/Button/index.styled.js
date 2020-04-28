import React from "react";
import { TouchableOpacity } from "react-native";
import colors from "../../constants/Colors";
import styled from "styled-components/native";

export const Button = styled.View`
  justify-content: center;
  align-items: center;

  width: ${({ full }) => (full ? "100%" : "auto")};
  height: 48px;

  border-radius: 7px;
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-family: poppins-bold;

  color: ${colors.color};
  text-align: center;
  text-transform: uppercase;
  text-shadow-color: ${colors.shadow};
  text-shadow-offset: 1px 1px;
  text-shadow-radius: 2px;
`;

export const ActivityIndicator = styled.ActivityIndicator.attrs(() => ({
  size: "small",
  color: colors.color
}))``;

export const ButtonDisabled = styled(Button)`
  background-color: ${colors.disabled};
`;

export const ButtonEnabled = styled(props => <Button {...props} as={TouchableOpacity} />)`
  background-color: ${colors.primary};
`;
