import React from "react";

import * as Styled from "./index.styled";

export const Header = ({ style, title }) => {
  return (
    <Styled.Header style={style}>
      <Styled.Title>{title}</Styled.Title>
    </Styled.Header>
  );
};

export default Header;
