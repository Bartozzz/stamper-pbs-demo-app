import styled from "styled-components/native";
import * as Box from "../layout/Box";

export const Container = styled.View`
  position: absolute;
  z-index: 9999;
  height: 100%;
  width: 100%;
  justify-content: center;

  background: rgba(0, 0, 0, 0.5);

  ${(props) => !props.active && "display: none;"}
`;

export const Close = styled.TouchableOpacity`
  position: absolute;
  top: 10px;
  right: 15px;
`;

export const Subheading = styled(Box.Subheading)`
  width: 80%;
`;

export const ButtonContainer = styled.View`
  width: 90%;
  margin-top: 10%;
`;
