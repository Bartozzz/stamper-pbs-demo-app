import React from "react";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

export const InputSearch = (props) => {
  return (
    <Theme>
      <Styled.InputContainer>
        <Styled.InputIcon />

        <Styled.Input testID="input-search" {...props} />
      </Styled.InputContainer>
    </Theme>
  );
};

export default InputSearch;
