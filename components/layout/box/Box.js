import React from "react";
import defaultStyles from "../../../constants/Styles";
import colors from "../../../constants/Colors";
import styled from "styled-components/native";

const BoxComponent = styled.View`
  alignItems: center,

  paddingTop: 40;
  paddingBottom: 40;
  marginVertical: 20;
  marginHorizontal: 20;

  shadowColor: #2699FB;
  shadowOffset: { width: 0, height: 30 };
  shadowOpacity: 0.1;
  shadowRadius: 30;

  borderRadius: 10;
  backgroundColor: ${colors.background}
`;

export function Box({ children, style }) {
  return (
    <BoxComponent style={[defaultStyles.center, style]}>{children}</BoxComponent>
  );
}

export default Box;
