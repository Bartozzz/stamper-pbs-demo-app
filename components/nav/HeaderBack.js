import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import styled, { css } from "styled-components/native";
import * as Routes from "../../navigation";

const Back = styled.TouchableOpacity`
  align-self: flex-start;
`;

const Icon = styled(Ionicons).attrs((props) => ({
  color: "white",
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

export function BackButton(props) {
  function onPress() {
    props.onPress
      ? props.onPress()
      : props.navigation.navigate(Routes.DASHBOARD);
  }

  return (
    <Back onPress={onPress}>
      <Icon />
    </Back>
  );
}

const backIconName = Platform.select({
  ios: "ios-arrow-round-back",
  android: "md-arrow-round-back",
});

const backIconSize = Platform.select({
  ios: 40,
  android: 24,
});

export default BackButton;
