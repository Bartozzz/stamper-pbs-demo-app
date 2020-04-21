import React from "react";
import styled from "styled-components/native";

export const StyledCardContainer = styled.TouchableOpacity`
  position: relative;

  padding: 10px;
  margin-horizontal: 15px;
  margin-vertical: 10px;

  border-width: 1px;
  border-radius: 10px;
  border-style: solid;
  border-color: ${({ focused }) => (focused ? "#0046F5" : "#203451")};
  background-color: ${({ focused }) => (focused ? "#001333" : "#203451")};
`;

export const FocusableCard = ({ children, ...props }) => {
  return <StyledCardContainer {...props}>{children}</StyledCardContainer>;
};

export default FocusableCard;
