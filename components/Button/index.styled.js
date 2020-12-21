import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Button = styled.View`
  justify-content: center;
  align-items: center;

  width: ${({ full }) => (full ? "100%" : "auto")};
  height: ${(props) => props.theme.height};

  border-radius: ${(props) => props.theme.borderRadius};
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-family: ${(props) => props.theme.fontFamily};

  color: ${(props) =>
    props.disabled
      ? props.theme.disabled.textColor
      : props.theme.normal.textColor};
  text-align: center;
  text-transform: uppercase;
  text-shadow-color: ${(props) => props.theme.shadowColor};
  text-shadow-offset: 1px 1px;
  text-shadow-radius: 2px;
`;

export const ActivityIndicator = styled.ActivityIndicator.attrs((props) => ({
  size: "small",
  color: props.theme.disabled.textColor,
}))``;

export const ButtonDisabled = styled(Button)`
  background-color: ${(props) => props.theme.disabled.backgroundColor};
`;

export const ButtonEnabled = styled((props) => (
  <Button {...props} as={TouchableOpacity} />
))`
  background-color: ${(props) => props.theme.normal.backgroundColor};
`;
