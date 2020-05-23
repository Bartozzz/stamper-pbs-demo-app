import styled from "styled-components/native";
import colors from "../../constants/Colors";

import Button from "../Button";

export const Container = styled.View`
  flex-direction: row;
  justify-content: center;
`;

export const ButtonLoginRegister = styled(Button)`
  margin-left: 5px;
  margin-right: 5px;
  width: 130px;
`;

export const ButtonFacebook = styled(Button)`
  margin-top: 20px;
  width: 270px;
`;

export const ButtonGoogle = styled.Text`
  color: ${colors.color};
  text-align: center;
  padding: 10%;
`;
