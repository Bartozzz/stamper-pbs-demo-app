import React from "react";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import styled from "styled-components/native";

const InputContainer = styled.View`
  flex: 1;
  flexDirection: row;
  justifyContent: center;
  alignItems: center;

  marginHorizontal: 20;
  marginVertical: 0;

  height: 40;
  width: 265;

  borderRadius: 10;
  backgroundColor: #1A5BF1
`;

const InputIcon = styled(Ionicons)`
  paddingHorizontal: 10
`;

const Input = styled.TextInput`
  flex: 1;
  paddingRight: 10;
  paddingLeft: 0;

  fontSize: 14;
  fontFamily: ${layout.fontText};
  color: ${colors.info}
`;

export function InputSearch(props) {
  return (
    <InputContainer>
      <InputIcon
        name="ios-search"
        size={16}
        color={colors.info}
      />

      <Input
        {...props}
        placeholderTextColor={colors.info}
        underlineColorAndroid="transparent"
        autoCorrect={false}
      />
    </InputContainer>
  );
}

export default InputSearch;