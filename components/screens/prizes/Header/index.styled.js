import styled from "styled-components/native";
import colors from "../../../../constants/Colors";

export const Tabs = styled.View`
  flex-direction: row;
  align-items: center;

  padding-vertical: 13px;
  padding-horizontal: 20px;

  background-color: ${colors.primary};
`;

export const AvailablePrizesText = styled.Text`
  font-family: poppins-regular;
  font-size: 18px;
  color: ${colors.color};

  ${({ active }) =>
    active &&
    `
      font-family: poppins-bold;
    `};
`;

export const ReceivedPrizesText = styled.Text`
  text-align: right;

  font-family: poppins-regular;
  font-size: 18px;
  color: ${colors.color};

  ${({ active }) =>
    active &&
    `
      font-family: poppins-bold;
    `};
`;
