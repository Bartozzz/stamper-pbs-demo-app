import React from "react";
import * as Styled from "./index.styled";

export const InputSearch = (props) => {
    return (
        <Styled.InputContainer>
            <Styled.InputIcon />

             <Styled.Input testID="InputSearch" {...props} />
        </Styled.InputContainer>
    );
};

export default InputSearch;
