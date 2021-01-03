import styled from "styled-components/native";
import colors from "../../../../constants/Colors";

export const Tabs = styled.View`
  flex-direction: row;
  align-items: center;

  padding-vertical: 13px;
  padding-horizontal: 20px;

  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const AvailablePrizesText = styled.Text`
  font-family: ${({ theme }) => theme.idleFontFamily};
  font-size: 18px;
  color: ${({ theme }) => theme.textColor};

  ${(props) =>
    props.active &&
    `
      font-family: ${props.theme.activeFontFamily};
    `};
`;

export const ReceivedPrizesText = styled.Text`
  text-align: right;

  font-family: ${({ theme }) => theme.idleFontFamily};
  font-size: 18px;
  color: ${({ theme }) => theme.textColor};

  ${(props) =>
    props.active &&
    `
      font-family: ${props.theme.activeFontFamily};
    `};
`;
