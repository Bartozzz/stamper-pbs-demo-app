import styled, { css } from "styled-components/native";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const hamburgerIconSize = Platform.select({
  ios: 32,
  android: 24,
});

export const Hamburger = styled.TouchableOpacity`
  align-self: flex-start;
`;

export const HamburgerIcon = styled(Ionicons).attrs((props) => ({
  color: "white",
  name: "md-home",
  size: hamburgerIconSize,
}))`
  ${Platform.select({
    ios: css`
      padding-top: 5px;
      padding-right: 20px;
    `,
    android: css`
      padding-top: 16px;
      padding-left: 8px;
      padding-right: 16px;
    `,
  })};
`;
