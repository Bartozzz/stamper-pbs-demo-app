import React from "react";
import * as Styled from "./index.styled";

export function HeaderButtonSearch(props) {
  return (
    <Styled.Button {...props}>
      <Styled.Icon />
    </Styled.Button>
  );
}

export default HeaderButtonSearch;
