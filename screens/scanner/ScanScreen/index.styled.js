import styled from "styled-components/native";
import { Camera } from "expo-camera";

import layout from "../../../constants/Layout";

export const ScannerContainer = styled.View`
  flex: 1;
  background-color: #000000;
`;

export const ScannerCamera = styled(Camera)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ScannerImage = styled.Image`
  width: ${layout.window.width * 0.7}px;
  height: ${layout.window.width * 0.7}px;
`;

export const ButtonContainer = styled.View`
  align-items: center;
  margin-vertical: 20px;
  margin-horizontal: 30px;
`;
