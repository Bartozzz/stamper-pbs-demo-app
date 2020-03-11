import React from "react";
import { ActivityIndicator } from "react-native";
import colors from "../../constants/Colors";
import styled from "styled-components/native";

const ButtonDisabled = styled.View`
  justify-content: center;
  align-items: center;

  height: 48px;

  border-radius: 7px;

  background-color: ${colors.disabled};
`;

const ButtonText = styled.Text`
  font-size: 16px;
  font-family: poppins-bold;

  color: ${colors.color};
  text-align: center;
  text-transform: uppercase;
  text-shadow-color: ${colors.shadow};
  text-shadow-offset: 1px 1px;
  text-shadow-radius: 2px;
`;

const ButtonEnabled = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  height: 48px;

  border-radius: 7px;

  background-color: ${colors.primary};
`;

export function Button({ title, style, textStyle, onPress, ...rest }) {
  const fullStyle = rest.full ? { width: "100%" } : {};

  if (rest.disabled) {
    return (
      <ButtonDisabled style={[fullStyle, style]}>
        <ButtonText style={textStyle}>{title}</ButtonText>
      </ButtonDisabled>
    );
  }

  if (rest.processing) {
    return (
      <ButtonDisabled style={[fullStyle, style]}>
        <ActivityIndicator size="small" color={colors.color} />
      </ButtonDisabled>
    );
  }

  return (
    <ButtonEnabled style={[fullStyle, style]} onPress={onPress}>
      <ButtonText style={textStyle}>{title}</ButtonText>
    </ButtonEnabled>
  );
}

export default Button;
