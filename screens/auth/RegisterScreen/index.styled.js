import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export const Container = styled(KeyboardAwareScrollView)`
  margin-horizontal: 30px;
  padding-top: 15px;
`;

export const TextContainer = styled.View`
  margin-top: 20px;
  margin-bottom: 30px;

  flex-direction: row;
  align-self: center;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.textColor};
  text-align: center;
  font-size: 12px;
  ${({ bold }) => bold && "font-weight: 900;"}
`;
