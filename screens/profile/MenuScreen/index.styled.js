import styled from "styled-components";
import { StamperLogo } from "../../../components/Stamper";

export const Avatar = styled.Image`
  width: 70px;
  height: 70px;

  border-radius: ${({ theme }) => theme.avatar.borderRadius};
  border-width: 4px;
  border-color: ${({ theme }) => theme.avatar.borderColor};
`;

export const Logo = styled(StamperLogo)`
  align-self: center;
`;

export const Login = styled.Text`
  margin-vertical: 14px;

  color: ${({ theme }) => theme.login.textColor};
  font-size: 16px;
  font-family: ${({ theme }) => theme.login.fontFamily};
`;

export const Email = styled.Text`
  margin-bottom: 30px;

  color: ${({ theme }) => theme.email.textColor};
  font-size: 10px;
  font-family: ${({ theme }) => theme.email.fontFamily};
`;
export const EmailIcon = styled.Image`
  width: 16px;
  height: 16px;
  margin-right: 6px;
`;

export const Menu = styled.View`
  align-items: center;

  padding-top: 20px;
  padding-bottom: 10px;
  margin-horizontal: 40px;
  margin-top: 25px;

  border-radius: ${({ theme }) => theme.menu.borderRadius};
  background-color: ${({ theme }) => theme.menu.backgroundColor};
`;
export const MenuSpacer = styled.View`
  width: 50px;
  height: 1.5px;

  background-color: ${({ theme }) => theme.menuSpacer.backgroundColor};
`;

export const MenuItem = styled.TouchableOpacity`
  margin-vertical: 14px;
`;

export const MenuItemText = styled.Text`
  color: ${({ theme }) => theme.menuItemText.textColor};
  font-size: 20px;
  font-family: ${({ theme }) => theme.menuItemText.fontFamily};
  text-align: center;
`;
