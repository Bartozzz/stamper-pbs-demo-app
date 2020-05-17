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
    isFocused ? ` border-color: ${colors.color}; ` : `border-color: ${colors.inputBorder}`
  };

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

export const InputLabel = styled.Text`
  padding-vertical: 10px;
  padding-right: 10px;

  color: ${colors.info};
  font-size: 10px;
`;

export const Input = styled.TextInput.attrs(props => ({
  underlineColorAndroid: "transparent",
  autoCorrect: false,
  placeholderTextColor: getColorForState(props.error, props.isFocused)
}))`
  flex: 1;
  padding-vertical: 15px;
  padding-horizontal: 15px;

  font-size: 14px;
  font-family: ${layout.fontText};
  color: ${colors.color};
`;