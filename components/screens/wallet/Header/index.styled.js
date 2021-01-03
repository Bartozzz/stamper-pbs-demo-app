import styled from "styled-components/native";
import defaultStyles from "../../../../constants/Styles";

export const Tabs = styled.View`
  flex-direction: row;
  align-items: center;

  width: 100%;

  padding-vertical: 12px;
  padding-horizontal: 20px;

  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const TabsTitle = styled.Text`
  ${defaultStyles.grow};
  ${defaultStyles.headerTwoLinesTitle};
`;

export const Cards = styled.Text`
  margin-left: 16px;

  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 18px;
  color: ${({ theme }) => theme.textColor};

  opacity: 0.5;

  ${({ active }) =>
    active &&
    `
      opacity: 1;
    `};
`;

export const Places = styled.Text`
  margin-left: 16px;

  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 18px;
  color: ${({ theme }) => theme.textColor};

  opacity: 0.5;

  ${({ active }) =>
    active &&
    `
      opacity: 1;
    `};
`;
