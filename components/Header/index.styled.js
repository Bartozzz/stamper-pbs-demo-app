import styled from "styled-components/native";

import colors from "../../constants/Colors";
import defaultStyles from "../../constants/Styles";

export const Header = styled.View`
  flex-direction: row;
  align-items: center;

  width: 100%;

  padding-vertical: 12px;
  padding-horizontal: 20px;

  background-color: ${colors.primary};
`;

export const Title = styled.Text.attrs(() => ({
  style: [defaultStyles.grow, defaultStyles.headerTwoLinesTitle],
}))``;
