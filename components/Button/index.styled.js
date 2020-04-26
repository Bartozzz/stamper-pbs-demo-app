import colors from "../../constants/Colors";
import styled from "styled-components/native";

export const ButtonDisabled = styled.View`
  justify-content: center;
  align-items: center;

  height: 48px;

  border-radius: 7px;

  background-color: ${colors.disabled};
`;

export const ButtonText = styled.Text`
  font-size: 16px;
  font-family: poppins-bold;

  color: ${colors.color};
  text-align: center;
  text-transform: uppercase;
  text-shadow-color: ${colors.shadow};
  text-shadow-offset: 1px 1px;
  text-shadow-radius: 2px;
`;

export const ActivityIndicator = styled.ActivityIndicator.attrs(() => ({
  size: "small",
  color: colors.color
}))``;

export const ButtonEnabled = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;

  height: 48px;

  border-radius: 7px;

  background-color: ${colors.primary};
`;
