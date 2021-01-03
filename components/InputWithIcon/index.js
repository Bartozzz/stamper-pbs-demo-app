import React from "react";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

const getErrorMessage = (error) => {
  if (Array.isArray(error)) {
    if (error.length) {
      return error.join(". ") + ".";
    }
  } else if (error) {
    return error + ".";
  } else {
    return null;
  }
};

export const InputWithIcon = ({ iconName, iconSize, error, ...rest }) => {
  const [focus, setFocus] = React.useState(false);

  const handleFocus = () => {
    setFocus(true);
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const hasError = Boolean(getErrorMessage(error));

  return (
    <Theme>
      <Styled.InputPadder>
        <Styled.InputContainer error={hasError} isFocused={focus}>
          <Styled.InputIcon
            isFocused={focus}
            error={hasError}
            name={iconName}
            size={iconSize}
          />

          <Styled.Input
            {...rest}
            error={hasError}
            isFocused={focus}
            onFocus={handleFocus}
            onBlur={handleBlur}
            testID="input-icon"
          />
        </Styled.InputContainer>

        {hasError && (
          <Styled.InputError testID="input-icon-error">
            {getErrorMessage(error)}
          </Styled.InputError>
        )}
      </Styled.InputPadder>
    </Theme>
  );
};

export default InputWithIcon;
