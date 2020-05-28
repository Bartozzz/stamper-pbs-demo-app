import styled from "styled-components/native";

import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

export const ErrorContainer = styled.View`
  padding: 10px;
  margin-vertical: 10px;

  width: 100%;
  background-color: ${colors.error};
  border-radius: 5px;
`;

export const ErrorHead = styled.Text`
  font-size: 14px;
  font-family: ${layout.fontHead};
  color: ${colors.color};
`;

export const ErrorText = styled.Text`
  font-size: 14px;
  font-family: ${layout.fontText};
  color: ${colors.color};
`;
