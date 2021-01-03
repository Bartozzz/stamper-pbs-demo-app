import React from "react";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

export const FocusableCard = ({ children, ...props }) => {
  return (
    <Theme>
      <Styled.CardContainer {...props}>{children}</Styled.CardContainer>
    </Theme>
  );
};

export default FocusableCard;
