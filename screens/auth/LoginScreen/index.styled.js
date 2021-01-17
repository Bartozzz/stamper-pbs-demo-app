import styled from "styled-components/native";

export const Container = styled.ScrollView`
  margin-horizontal: 30px;
  padding-top: 15px;
`;

export const TextContainer = styled.View`
  flex-direction: row;
  align-self: center;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  font-size: 12px;

  margin-top: 20px;
  margin-bottom: 30px;
`;
