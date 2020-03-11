import React from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import styled from "styled-components/native";

const InputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-horizontal: 20px;
  margin-vertical: 0px;

  height: 40px;
  width: 265px;

  border-radius: 10px;
  background-color: #1a5bf1;
`;

const InputIcon = styled(Ionicons).attrs(props => ({
  name: "ios-search",
  size: 16,
  color: colors.info
}))`
  padding-horizontal: 10px;
`;

const Input = styled.TextInput.attrs(props => ({
  underlineColorAndroid: "transparent",
  autoCorrect: false,
  placeholderTextColor: colors.info
}))`
  flex: 1;
  padding-right: 10px;
  padding-left: 0px;

  font-size: 14px;
  font-family: ${layout.fontText};
  color: ${colors.info};
`;

export function InputSearch(props) {
  return (
    <InputContainer>
      <InputIcon />

      <Input {...props} />
    </InputContainer>
  );
}

export default InputSearch;
