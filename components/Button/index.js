import React from "react";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

export const Button = ({ title, style, textStyle, onPress, ...rest }) => {
  if (rest.disabled) {
    return (
      <Theme>
        <Styled.ButtonDisabled full={rest.full} style={[style]}>
          <Styled.ButtonText
            disabled
            testID="button-disabled"
            style={textStyle}
          >
            {title}
          </Styled.ButtonText>
        </Styled.ButtonDisabled>
      </Theme>
    );
  }

  if (rest.processing) {
    return (
      <Theme>
        <Styled.ButtonDisabled full={rest.full} style={[style]}>
          <Styled.ActivityIndicator testID="button-processing" />
        </Styled.ButtonDisabled>
      </Theme>
    );
  }

  return (
    <Theme>
      <Styled.ButtonEnabled full={rest.full} style={[style]} onPress={onPress}>
        <Styled.ButtonText testID="button-default" style={textStyle}>
          {title}
        </Styled.ButtonText>
      </Styled.ButtonEnabled>
    </Theme>
  );
};

export default Button;
