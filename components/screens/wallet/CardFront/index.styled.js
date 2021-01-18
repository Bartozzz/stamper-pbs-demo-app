import { Platform } from "react-native";

import styled, { css } from "styled-components/native";

export const Item = styled.TouchableOpacity`
  padding: 10px;
  margin-horizontal: 15px;
  margin-vertical: 10px;

  border-radius: 10px;

  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const ID = styled.Text`
  flex: 1;

  font-size: 14px;
  font-family: ${({ theme }) => theme.ID.fontFamily};
  color: ${({ theme }) => theme.ID.textColor};
`;

export const ImageContainer = styled.View`
  overflow: hidden;
  z-index: 2;

  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.imageBorderRadius};
`;

export const Image = styled.Image.attrs((props) => ({
  resizeMode: "contain",
}))`
  width: 40px;
  height: 40px;
  ${({ theme }) =>
    Platform.OS === "ios" &&
    css`
      border-radius: ${({ theme }) => theme.imageBorderRadius};
    `}
  background-color: white;
`;

export const Title = styled.Text`
  margin-top: 2px;
  margin-bottom: 3px;

  font-size: 14px;
  font-family: ${({ theme }) => theme.title.fontFamily};
  color: ${({ theme }) => theme.title.textColor};
`;

export const Expiry = styled.Text`
  font-size: 9px;
  font-family: ${({ theme }) => theme.expiry.fontFamily};
  color: ${({ theme }) => theme.expiry.textColor};
`;

export const Amount = styled.Text`
  flex: 1;
  margin-top: 5px;

  text-align: right;
  font-size: 12px;
  font-family: ${({ theme }) => theme.amount.fontFamily};
  color: ${({ theme }) => theme.amount.textColor};
`;
