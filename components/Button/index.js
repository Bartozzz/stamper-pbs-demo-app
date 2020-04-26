import React from "react";
import * as Styled from "./index.styled";

export const Button = ({ title, style, textStyle, onPress, ...rest }) => {
    const fullStyle = rest.full ? { width: "100%" } : {};
  
    if (rest.disabled) {
      return (
        <Styled.ButtonDisabled style={[fullStyle, style]}>
          <Styled.ButtonText testID="button-disabled" style={textStyle}>{title}</Styled.ButtonText>
        </Styled.ButtonDisabled>
      );
    }
  
    if (rest.processing) {
      return (
        <Styled.ButtonDisabled style={[fullStyle, style]}>
          <Styled.ActivityIndicator testID="button-processing" />
        </Styled.ButtonDisabled>
      );
    }
  
    return (
      <Styled.ButtonEnabled style={[fullStyle, style]} onPress={onPress}>
        <Styled.ButtonText testID="button-default" style={textStyle}>{title}</Styled.ButtonText>
      </Styled.ButtonEnabled>
    );
  }
  
export default Button;
