import React from "react";
import colors from "../../constants/Colors";
import defaultStyles from "../../constants/Styles";
import styled from "styled-components/native";

const HeaderComponent = styled.View`
  flexDirection: row;
  alignItems: center;

  width: 100%;

  paddingVertical: 12;
  paddingHorizontal: 20;

  backgroundColor: ${colors.primary}
`;

const Title = styled.Text`
  ${defaultStyles.grow};
  ${defaultStyles.headerTwoLinesTitle}
`;

export function Header(props) {
  return (
    <HeaderComponent style={props.style}>
      <Title>{props.title}</Title>
    </HeaderComponent>
  );
}

export default Header;
