import styled from "styled-components/native";
import theme from "../../constants/theme";
import { StamperLogo } from "../Stamper";

export const PoweredByStamper = styled.Text`
  align-self: center;
  text-align: center;
  margin-vertical: 1%;
  font-size: 18px;
  font-family: ${theme.fontHead};

  color: ${(props) => props.theme.textColor};
`;

export const StamperLogoTint = styled(StamperLogo)`
  tint-color: ${(props) => props.theme.textColor};
`;
