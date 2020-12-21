import styled from "styled-components/native";

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
  border-radius: ${(props) => props.theme.borderRadius};

  border-width: 1.5px;
  border-style: solid;
  border-color: ${(props) => props.theme.borderColor};

  ${(props) =>
    props.checked &&
    `
    border-color: ${props.theme.backgroundColor};
    background-color: ${props.theme.backgroundColor};
  `};
`;

export const CheckBoxLabel = styled.Text`
  margin-right: 2px;

  font-size: 11.5px;
  color: ${(props) => props.theme.labelColor};
`;
