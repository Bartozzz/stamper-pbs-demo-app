import styled from "styled-components/native";

export const Text = styled.Text`
  margin-top: 50px;
  width: 200px;

  align-self: center;
  text-align: center;

  font-size: ${({ theme }) => theme.fontSize};
  font-family: ${({ theme }) => theme.fontFamily};
  color: ${({ theme }) => theme.color};
`;
