import styled from "styled-components/native";
import { StamperLogo } from "../../../components/Stamper";

export const Logo = styled(StamperLogo)`
  align-self: center;

  margin-top: 80px;
  margin-bottom: 30px;
`;

export const Close = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 15px;
`;

export const ButtonsContainer = styled.View`
  justify-content: space-around;
  margin-bottom: 50px;
  margin-horizontal: 20px;
`;
