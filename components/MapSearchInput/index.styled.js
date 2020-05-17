import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

export const InputContainer = styled.View`
  position: absolute;
  top: 65px;

  width: 100%;
  height: 60px;

  flex-direction: row;
  justify-content: center;
  align-items: center;

  background-color: ${colors.primary};

  z-index: 3;
`;

export const InputIcon = styled(Ionicons).attrs((props) => ({
  name: "ios-search",
  size: 24,
  color: colors.color,
}))`
  padding-horizontal: 15px;
`;

export const InputClose = styled(Ionicons).attrs((props) => ({
  name: "ios-close-circle-outline",
  size: 24,
  color: colors.info,
}))`
  padding-horizontal: 15px;
`;

export const Input = styled.TextInput.attrs((props) => ({
  underlineColorAndroid: "transparent",
  autoCorrect: false,
  placeholderTextColor: colors.color,
}))`
  flex: 1;
  padding-right: 10px;
  padding-left: 0px;

  font-size: 14px;
  font-family: ${layout.fontText};
  color: ${colors.color};
`;
