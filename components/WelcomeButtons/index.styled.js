import styled from "styled-components/native";

import Button from "../Button";

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`;

export const LoginRegisterButton = styled(Button)`
  margin-top: 10px;
  width: 270px;
`;

export const OrLoginWith = styled.Text`
  color: ${({ theme }) => theme.orLoginWithColor};
  text-align: center;
  padding-vertical: 5%;
`;

export const ExternalLoginContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 175px;

  align-self: center;
  padding-bottom: 10%;
`;

export const LogInWith = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.logInWithBackgroundColor};
  height: 50px;
  width: 50px;
  border-radius: 7px;
`;

export const Icon = styled.Image.attrs({
  resizeMode: "contain",
})`
  height: 22.5px;
  width: 22.5px;
  tint-color: ${({ theme }) => theme.iconTint};
  flex: 1;
  align-self: center;
  justify-content: center;
`;
