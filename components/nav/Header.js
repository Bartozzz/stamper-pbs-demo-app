import React from "react";
import colors from "../../constants/Colors";
import defaultStyles from "../../constants/Styles";
import styled from "styled-components/native";

const HeaderComponent = styled.View`
  flex-direction: row;
  align-items: center;

  width: 100%;

  padding-vertical: 12px;
  padding-horizontal: 20px;

  background-color: ${colors.primary};
`;

const Title = styled.Text`
  ${defaultStyles.grow};
  ${defaultStyles.headerTwoLinesTitle};
`;

export function Header(props) {
  return (
    <HeaderComponent style={props.style}>
      <Title>{props.title}</Title>
    </HeaderComponent>
  );
}

export default Header;
