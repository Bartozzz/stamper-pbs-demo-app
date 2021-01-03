import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styled, { css } from "styled-components/native";

const backIconName = Platform.select({
  ios: "ios-arrow-round-back",
  android: "md-arrow-round-back",
});

const backIconSize = Platform.select({
  ios: 40,
  android: 24,
});

export const Back = styled.TouchableOpacity`
  align-self: flex-start;
`;

export const BackIcon = styled(Ionicons).attrs(({ theme }) => ({
  color: theme.iconColor,
  name: backIconName,
  size: backIconSize,
}))`
  ${Platform.select({
    ios: css`
      padding-top: 1px;
      padding-left: 20px;
    `,
    android: css`
      padding-top: 16px;
      padding-right: 8px;
      padding-left: 16px;
    `,
  })};
`;
