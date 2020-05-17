import React from "react";

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

export const InputWithLabel = ({ iconName, iconSize, error, label, ...rest }) => {

  const [focus, setFocus] = React.useState(false);

  const handleFocus = () => {
    setFocus(true)
  };

  const handleBlur = () => {
    setFocus(false);
  };

  const hasError = Boolean(getErrorMessage(error));
  
  return (
    <Styled.InputPadder>
      <Styled.InputContainer
        error={hasError}
        isFocused={focus}
      >
        <Styled.Input
          {...rest}
          error={hasError}
          isFocused={focus}
          onFocus={handleFocus}
          onBlur={handleBlur}
          testID="input-label-parent"
        />

        <Styled.InputLabel testID="input-label">{label}</Styled.InputLabel>

      </Styled.InputContainer>

      {hasError && <Styled.InputError testID="input-label-error">{getErrorMessage(error)}</Styled.InputError>}
    </Styled.InputPadder>
  );
}


export default InputWithLabel;