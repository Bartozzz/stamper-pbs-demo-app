import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import styled, { css } from "styled-components/native";
import * as Routes from "../../navigation";
import { useNavigation } from '@react-navigation/native';

const Hamburger = styled.TouchableOpacity`
  align-self: flex-start;
`;

const Icon = styled(Ionicons).attrs(props => ({
  color: "white",
  name: hamburgerIconName,
  size: hamburgerIconSize
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
    `
  })};
`;

export function HeaderHamburger() {
  const navigation = useNavigation();

  function onPress() {
    navigation.navigate(Routes.DASHBOARD);
  }

  return (
    <Hamburger onPress={onPress}>
      <Icon />
    </Hamburger>
  );
}

const hamburgerIconName = Platform.select({
  ios: "md-home",
  android: "md-home"
});

const hamburgerIconSize = Platform.select({
  ios: 32,
  android: 24
});

export default HeaderHamburger;
