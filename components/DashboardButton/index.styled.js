import styled from "styled-components/native";

export const DashboardButton = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  flex: 1;
  margin: 10px;

  border-radius: ${(props) => props.theme.borderRadius};
  border-width: ${(props) => props.theme.borderWidth};
  border-style: solid;
  border-color: ${(props) =>
    props.focus
      ? props.theme.focus.borderColor
      : props.theme.normal.borderColor};
  background-color: ${(props) =>
    props.focus
      ? props.theme.focus.backgroundColor
      : props.theme.normal.backgroundColor};
`;

export const DashboardButtonText = styled.Text`
  margin-bottom: 20px;

  color: ${(props) => props.theme.text.color};
  font-size: ${(props) => props.theme.text.fontSize};
  font-family: ${(props) => props.theme.text.fontFamily};
  text-align: center;
`;

export const DashboardButtonIcon = styled.Image`
  align-self: center;

  width: 60px;
  height: 60px;

  margin-top: 20px;
  margin-bottom: 16px;
`;

export const BadgeContainer = styled.View`
  position: absolute;
  right: 10px;
  top: 10px;

  align-items: center;
  justify-content: center;

  width: 22px;
  height: 22px;

  border-radius: 22px;
  background-color: ${(props) => props.theme.badge.backgroundColor};
`;

export const BadgeText = styled.Text`
  color: ${(props) => props.theme.badge.textColor};
  font-family: ${(props) => props.theme.badge.fontFamily};
  text-align: center;
`;
