import { Platform } from "react-native";

import styled, { css } from "styled-components/native";

import images from "../../../../constants/images";

const height = Platform.select({
  ios: 90,
  android: 87,
});

export const ItemRemove = styled.TouchableOpacity`
  ${Platform.select({
    ios: css`
      align-items: center;
      justify-content: center;

      position: absolute;
      top: 10px;
      right: ${-height}px;
    `,

    android: css`
      align-self: flex-end;
      align-items: center;
      justify-content: center;

      padding: 10px;
      margin-horizontal: 15px;
      margin-vertical: 10px;
    `,
  })}

  height: ${height}px;
  width: ${height}px;

  background-color: ${({ theme }) => theme.backgroundColor};
  border-radius: ${({ theme }) => theme.borderRadius};

  /* Need to add zIndex to ensure that the TouchableOpacity will receive press */
  /* events on Android: */
  z-index: 1;
`;

export const RemoveImage = styled.Image.attrs((props) => ({
  source: images.Delete,
}))`
  width: 40px;
  height: 40px;
`;
