import React from "react";
import defaultStyles from "../../../constants/Styles";
import colors from "../../../constants/Colors";
import styled from "styled-components/native";

const BoxComponent = styled.View`
  align-items: center;

  padding-top: 40px;
  padding-bottom: 40px;
  margin-vertical: 20px;
  margin-horizontal: 20px;

  shadow-color: #2699FB;
  /* TODO: check if this syntax is correct */
  shadow-offset: { width: 0px, height: 30px };
  shadow-opacity: 0.1px;
  shadow-radius: 30px;

  border-radius: 10px;
  background-color: ${colors.background};
`;

export function Box({ children, style }) {
  return (
    <BoxComponent style={[defaultStyles.center, style]}>
      {children}
    </BoxComponent>
  );
}

export default Box;
