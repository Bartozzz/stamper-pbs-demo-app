import { Ionicons } from "@expo/vector-icons";
import styled from "styled-components/native";
import normalize from "react-native-normalize";

export const InputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-horizontal: 20px;
  margin-vertical: 0px;

  height: 40px;
  width: ${normalize(265)}px;

  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const InputIcon = styled(Ionicons).attrs((props) => ({
  name: "ios-search",
  size: 16,
  color: props.theme.textColor,
}))`
  padding-horizontal: 10px;
`;

export const Input = styled.TextInput.attrs((props) => ({
  underlineColorAndroid: "transparent",
  autoCorrect: false,
  placeholderTextColor: props.theme.textColor,
}))`
  flex: 1;
  padding-right: 10px;
  padding-left: 0px;

  font-size: 14px;
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.textColor};
`;
