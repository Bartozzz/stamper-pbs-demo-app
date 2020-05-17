import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import styled, { css } from "styled-components/native";

export const Button = styled.TouchableOpacity`
  align-self: flex-start;
`;

export const Icon = styled(Ionicons).attrs(() => ({
  color: "white",
  name: "ios-search",
  size: Platform.select({
    ios: 32,
    android: 24,
  }),
}))`
  ${Platform.select({
    ios: css`
      padding-top: 5px;
      padding-horizontal: 20px;
    `,
    android: css`
      padding-top: 16px;
      padding-horizontal: 16px;
    `,
  })};
`;
