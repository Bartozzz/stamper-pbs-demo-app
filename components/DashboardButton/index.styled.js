import styled from "styled-components/native";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

export const DashboardButton = styled.TouchableOpacity.attrs({
  activeOpacity: 1,
})`
  flex: 1;
  margin: 10px;

  border-radius: 8px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ focus }) => (focus ? colors.primary : colors.border)};
  background-color: ${({ focus }) =>
    focus ? colors.highlight : "transparent"};
`;

export const DashboardButtonText = styled.Text`
  margin-bottom: 20px;

  color: ${colors.color};
  font-size: 14px;
  font-family: poppins-regular;
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
  background-color: #00d1ff;
`;

export const BadgeText = styled.Text`
  color: ${colors.color};
  font-family: ${layout.fontHead};
  text-align: center;
`;
