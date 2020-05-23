import styled from "styled-components/native";

import colors from "../../constants/Colors";

export const Container = styled.View`
  align-items: center;

  margin-horizontal: 0px;
  margin-vertical: 12px;

  flex-direction: row;
`;
export const CheckboxComponent = styled.TouchableOpacity`
  margin-right: 9px;
  /* Visual centering: */
  padding-top: 1px;
  padding-left: 1px;

  align-items: center;
  justify-content: center;

  width: 20px;
  height: 20px;
  border-radius: 20px;

  border-width: 1.5px;
  border-style: solid;
  border-color: ${colors.inputBorder};

  ${({ checked }) =>
    checked &&
    `
    border-color: ${colors.primary};
    background-color: ${colors.primary};
  `};
`;

export const CheckBoxLabel = styled.Text`
  margin-right: 2px;

  font-size: 11.5px;
  color: ${colors.link};
`;
