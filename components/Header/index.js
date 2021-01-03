import React from "react";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

export const Header = ({ style, title }) => {
  return (
    <Theme>
      <Styled.Header style={style}>
        <Styled.Title>{title}</Styled.Title>
      </Styled.Header>
    </Theme>
  );
};

export default Header;
