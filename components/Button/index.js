import React from "react";
import * as Styled from "./index.styled";

export const Button = ({ title, style, textStyle, onPress, ...rest }) => {
  if (rest.disabled) {
    return (
      <Styled.ButtonDisabled full={rest.full} style={[style]}>
        <Styled.ButtonText testID="button-disabled" style={textStyle}>
          {title}
        </Styled.ButtonText>
      </Styled.ButtonDisabled>
    );
  }

  if (rest.processing) {
    return (
      <Styled.ButtonDisabled full={rest.full} style={[style]}>
        <Styled.ActivityIndicator testID="button-processing" />
      </Styled.ButtonDisabled>
    );
  }

  return (
    <Styled.ButtonEnabled full={rest.full} style={[style]} onPress={onPress}>
      <Styled.ButtonText testID="button-default" style={textStyle}>
        {title}
      </Styled.ButtonText>
    </Styled.ButtonEnabled>
  );
};

export default Button;
