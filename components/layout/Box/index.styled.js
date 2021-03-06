import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;

  padding-top: 40px;
  padding-bottom: 40px;
  margin-vertical: 20px;
  margin-horizontal: 20px;

  shadow-color: #2699fb;
  shadow-offset: 0 30px;
  shadow-opacity: 0.1;
  shadow-radius: 30px;

  border-radius: 10px;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const Icon = styled.Image`
  margin-bottom: 40px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export const Heading = styled.Text`
  padding-horizontal: 30px;

  color: ${({ theme }) => theme.headingColor};
  font-size: 24px;
  text-align: center;
`;

export const Subheading = styled.Text`
  margin-top: 30px

  text-align: center;
  font-size: 18px;
  color: ${({ theme }) => theme.subheadingColor};
`;

export const Action = styled.Text`
  margin-top: 30px;

  color: ${({ theme }) => theme.actionColor};
  font-size: 18px;
  text-align: center;
  text-transform: uppercase;
`;
