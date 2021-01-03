import styled from "styled-components/native";

import defaultStyles from "../../constants/Styles";

export const Header = styled.View`
  flex-direction: row;
  align-items: center;

  width: 100%;

  padding-vertical: 12px;
  padding-horizontal: 20px;

  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const Title = styled.Text.attrs(() => ({
  style: [defaultStyles.grow, defaultStyles.headerTwoLinesTitle],
}))``;
