import React from "react";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

export function HeaderButtonSearch(props) {
  return (
    <Theme>
      <Styled.Button {...props}>
        <Styled.Icon />
      </Styled.Button>
    </Theme>
  );
}

export default HeaderButtonSearch;
