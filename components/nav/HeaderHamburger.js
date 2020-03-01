import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import styled, { css } from "styled-components/native";
import * as Routes from "../../navigation";

const Hamburger = styled.TouchableOpacity`
  alignSelf: flex-start
`;

const Icon = styled(Ionicons)`
    ${Platform.select({
      ios: css`
        paddingTop: 5;
        paddingRight: 20
      `,
      android: css`
        paddingTop: 16;
        paddingLeft: 8;
        paddingRight: 16
      `
    })}
`;

export function HeaderHamburger(props) {
  function onPress() {
    props.navigation.navigate(Routes.DASHBOARD);
  }

  return (
    <Hamburger onPress={onPress}>
      <Icon
        name={hamburgerIconName}
        size={hamburgerIconSize}
        color="white"
      />
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
