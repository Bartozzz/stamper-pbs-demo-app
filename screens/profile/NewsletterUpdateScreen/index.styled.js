import styled from "styled-components/native";
import { StamperLogo } from "../../../components/Stamper";
import Button from "../../../components/Button";

export const Logo = styled(StamperLogo)`
  align-self: center;

  margin-top: 40px;
  margin-bottom: 0px;
`;
export const ButtonsContainer = styled.View`
  justify-content: space-around;
  margin-bottom: 50px;
`;

export const ButtonStyled = styled(Button)`
  width: 90px;
`;
