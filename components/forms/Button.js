import React from "react";
import { ActivityIndicator } from "react-native";
import colors from "../../constants/Colors";
import styled from "styled-components/native";

const ButtonDisabled = styled.View`
  justifyContent: center;
  alignItems: center;

  height: 48;

  borderRadius: 7;

  backgroundColor: ${colors.disabled}
`;

const ButtonText = styled.Text`
  fontSize: 16;
  fontFamily: poppins-bold;

  color: ${colors.color};
  textAlign: center;
  textTransform: uppercase;
  textShadowColor: ${colors.shadow};
  textShadowOffset: { width: 1, height: 1 };
  textShadowRadius: 2
`;

const ButtonEnabled = styled.TouchableOpacity`
  justifyContent: center;
  alignItems: center;

  height: 48;

  borderRadius: 7;

  backgroundColor: ${colors.primary}
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
    <ButtonEnabled
      style={[fullStyle, style]}
      onPress={onPress}
    >
      <ButtonText style={textStyle}>{title}</ButtonText>
    </ButtonEnabled>
  );
}

export default Button;
