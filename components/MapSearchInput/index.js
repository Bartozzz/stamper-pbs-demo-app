import React from "react";
import * as Styled from "./index.styled";

export const InputSearch = ({ onClose, ...props }) => {
  return (
    <Styled.InputContainer>
      <Styled.InputIcon />

      <Styled.Input testID="input-search" {...props} />

      <Styled.InputClose testID="input-close" onPress={onClose} />
    </Styled.InputContainer>
  );
};

export default InputSearch;
