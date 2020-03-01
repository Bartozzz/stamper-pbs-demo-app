import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import styled, { css } from "styled-components/native";
import * as Routes from "../../navigation";

const Back = styled.TouchableOpacity`
  alignSelf: flex-start
`;

const Icon = styled(Ionicons)`
    ${Platform.select({
      ios: css`
        paddingTop: 1;
        paddingLeft: 20
      `,
      android: css`
        paddingTop: 16;
        paddingRight: 8;
        paddingLeft: 16
      `
    })}
`;

export function BackButton(props) {
  function onPress() {
    props.onPress
      ? props.onPress()
      : props.navigation.navigate(Routes.DASHBOARD);
  }

  return (
    <Back onPress={onPress}>
      <Icon
        name={backIconName}
        size={backIconSize}
        color="white"
      />
    </Back>
  );
}

const backIconName = Platform.select({
  ios: "ios-arrow-round-back",
  android: "md-arrow-round-back"
});

const backIconSize = Platform.select({
  ios: 40,
  android: 24
});

export default BackButton;
