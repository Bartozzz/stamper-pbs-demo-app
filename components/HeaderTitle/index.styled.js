import styled, { css } from "styled-components/native";
import { Platform } from "react-native";

export const HeaderTitle = styled.Text`
  ${Platform.select({
    android: css`
      margin-bottom: 9px;
    `,
    ios: css`
      margin-vertical: 6px;
    `,
  })}

  color: ${({ theme }) => theme.textColor};
  font-family: ${({ theme }) => theme.fontFamily};;
  font-size: ${Platform.select({
    android: 20,
    ios: 26,
  })}px;

  align-self: flex-end;
`;
