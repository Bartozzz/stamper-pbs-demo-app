import styled from "styled-components/native";

export const ErrorContainer = styled.View`
  padding: 10px;
  margin-vertical: 10px;

  width: 100%;
  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: 5px;
`;

export const ErrorHead = styled.Text`
  font-size: ${({ theme }) => theme.head.fontSize};
  font-family: ${({ theme }) => theme.head.fontFamily};
  color: ${({ theme }) => theme.head.color};
`;

export const ErrorText = styled.Text`
  font-size: ${({ theme }) => theme.text.fontSize};
  font-family: ${({ theme }) => theme.text.fontFamily};
  color: ${({ theme }) => theme.text.color};
`;
