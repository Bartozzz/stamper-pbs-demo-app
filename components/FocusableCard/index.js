import React from "react";
import * as Styled from "./index.styled";

export const FocusableCard = ({ children, ...props }) => {
  return <Styled.CardContainer {...props}>{children}</Styled.CardContainer>;
};

export default FocusableCard;
