import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";

import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

function getColorForState(error, focus) {
  if (error) {
    return colors.error;
  } else if (focus) {
    return colors.color;
  } else {
    return colors.inputBorder;
  }
}

export const InputPadder = styled.View`
  margin-vertical: 15px;
`;

export const InputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 47px;
  width: 100%;

  border-radius: 100px;
  border-width: 1px;
  border-style: solid;
  border-color: ${colors.inputBorder};

  ${({ isFocused }) =>
    isFocused
      ? ` border-color: ${colors.color}; `
      : `border-color: ${colors.inputBorder}`};

  ${({ error }) =>
    error &&
    `
      border-color: ${colors.error};
    `};
`;

export const InputError = styled.Text`
  position: absolute;
  top: 48px;

  color: ${colors.error};
  margin-horizontal: 17px;
  margin-top: 2px;

  font-size: 12px;
`;

export const InputIcon = styled(Ionicons)`
  padding-vertical: 10px;
  padding-horizontal: 20px;

  ${({ isFocused }) =>
    isFocused ? ` color: ${colors.color}; ` : `color: ${colors.inputBorder}`};

  ${({ error }) =>
    error &&
    `
    color: ${colors.error};
  `};
`;

export const Input = styled.TextInput.attrs((props) => ({
  underlineColorAndroid: "transparent",
  autoCorrect: false,
  placeholderTextColor: getColorForState(props.error, props.isFocused),
}))`
  flex: 1;
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  padding-left: 0px;

  font-size: 14px;
  font-family: ${layout.fontText};
  color: ${colors.color};
`;
