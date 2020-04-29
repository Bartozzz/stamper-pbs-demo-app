import { Ionicons } from "@expo/vector-icons";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import styled from "styled-components/native";
import normalize from 'react-native-normalize';

export const InputContainer = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin-horizontal: 20px;
  margin-vertical: 0px;

  height: 40px;
  width: ${normalize(265)}px;

  border-radius: 10px;
  background-color: #1a5bf1;
`;

export const InputIcon = styled(Ionicons).attrs(props => ({
  name: "ios-search",
  size: 16,
  color: colors.info
}))`
  padding-horizontal: 10px;
`;

export const Input = styled.TextInput.attrs(props => ({
  underlineColorAndroid: "transparent",
  autoCorrect: false,
  placeholderTextColor: colors.info,
}))`
  flex: 1;
  padding-right: 10px;
  padding-left: 0px;

  font-size: 14px;
  font-family: ${layout.fontText};
  color: ${colors.info};
`;