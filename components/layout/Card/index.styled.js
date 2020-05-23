import styled from "styled-components/native";

import colors from "../../../constants/Colors";
import Button from "../../Button";

export const Padder = styled.View`
  width: 50%;
  padding-vertical: 8px;
  padding-horizontal: 8px;
`;

export const Component = styled.View`
  background-color: ${colors.color};
  border-radius: 8px;
`;

export const ActionButton = styled.View`
  position: absolute;
  top: 0px;
  left: 0px;
`;

export const SecondaryActionButton = styled.View`
  position: absolute;
  top: 0px;
  right: 0px;
`;

export const Image = styled.Image`
  align-self: center;

  margin-top: 35px;
  margin-bottom: 20px;

  /* Make sure the image fits: */
  resize-mode: contain;

  width: 60px;
  height: 60px;
`;

export const Title = styled.Text`
  color: #001432;
  font-size: 14px;
  font-family: poppins-bold;
  text-align: center;
`;

export const Subtitle = styled.Text`
  color: #709be7;
  font-size: 9px;
  font-family: nunito-regular;
  text-align: center;
`;

export const CardButton = styled(Button)`
  padding: 4px;
  margin-horizontal: 4px;
  margin-bottom: 4px;
  margin-top: 10px;

  height: auto;
`;