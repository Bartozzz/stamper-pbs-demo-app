import styled from "styled-components/native";
import normalize from "react-native-normalize";

export const Button = styled.View`
  z-index: 3;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  position: absolute;
  bottom: 25px;
  left: 0px;
  right: 0px;

  height: ${normalize(70)}px;
  padding-horizontal: 20px;

  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const TextCount = styled.Text`
  color: ${({ theme }) => theme.textColor};
`;

export const TextControl = styled.Text`
  color: ${({ theme }) => theme.textColor};
  text-transform: uppercase;
`;
