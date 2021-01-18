import styled from "styled-components/native";
import Button from "../../../components/Button";

export const Logout = styled.View`
  align-items: center;

  padding-top: 40px;
  padding-bottom: 44px;
  margin-vertical: 20px;
  margin-horizontal: 36px;
  margin-top: 80px;

  shadow-color: ${({ theme }) => theme.containerShadowColor};
  shadow-offset: 0px 30px;
  shadow-opacity: 0.1;
  shadow-radius: 30px;

  border-radius: 10px;
  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const LogoutText = styled.Text`
  color: ${({ theme }) => theme.logoutTextColor};
  font-size: 15px;
  text-align: center;
`;

export const LogoutIcon = styled.Image`
  width: 120px;
  height: 120px;
  margin-bottom: 60px;
`;

export const ButtonsContainer = styled.View`
  justify-content: space-around;
  margin-bottom: 50px;
`;
export const ButtonYesNo = styled(Button)`
  width: 90px;
`;
