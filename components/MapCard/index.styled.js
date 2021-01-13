import styled from "styled-components/native";
import normalize from "react-native-normalize";

import { slideMargin, slidePadding, slideWidth } from "./constants";

export const CardWrapper = styled.View`
  margin: ${slideMargin}px;

  background-color: ${({ theme }) => theme.wrapperBackground};
  border-radius: ${({ theme }) => theme.wrapperBorderRadius};
`;

export const CardSection = styled.View`
  display: ${({ show }) => (show ? "flex" : "none")};
  min-height: ${normalize(250)}px;

  padding-top: ${({ alternateColor }) => (alternateColor ? slidePadding : 0)}px;
  padding-bottom: ${({ alternateColor }) =>
    alternateColor ? slidePadding * 2 : 0}px;
  background-color: ${({ alternateColor, theme }) =>
    alternateColor
      ? theme.focused.cardBackground
      : theme.normal.cardBackground};
`;

export const CardName = styled.Text`
  margin: ${slidePadding}px;

  font-size: 16px;
  font-weight: bold;
`;

export const CardBackgroundImage = styled.Image`
  margin-bottom: ${slidePadding}px;
  width: ${slideWidth - slideMargin}px;
  height: ${slideWidth * 0.3}px;
  resize-mode: cover;
`;

export const CardLogoImageContainer = styled.View`
  position: absolute;
  align-self: center;
  overflow: hidden;
  z-index: 2;

  margin: ${slidePadding}px;
  width: ${(slideWidth - slidePadding * 2) * 0.3 - 20}px;
  height: ${(slideWidth - slidePadding * 2) * 0.3 - 20}px;
  border-radius: ${((slideWidth - slidePadding * 2) * 0.3 - 20) / 2}px;
`;

export const CardLogoImage = styled.Image.attrs((props) => ({
  resizeMode: "contain",
}))`
  width: ${(slideWidth - slidePadding * 2) * 0.3 - 20}px;
  height: ${(slideWidth - slidePadding * 2) * 0.3 - 20}px;

  background-color: white;
`;

export const CardItem = styled.View`
  flex-direction: row;

  margin-horizontal: ${slidePadding}px;
  margin-vertical: ${slidePadding / 2}px;
`;

export const CardItemIcon = styled.Text`
  margin-right: 5px;
  text-align: center;

  width: 20px;
`;

export const CardItemText = styled.Text`
  padding-right: ${slidePadding * 2}px;
  color: ${({ alternateColor, invalid, theme }) => {
    if (invalid) {
      return theme.invalid.cardItemText;
    } else if (alternateColor) {
      return theme.focused.cardItemText;
    } else {
      return theme.normal.cardItemText;
    }
  }};
`;

export const CardDescription = styled.Text`
  color: ${({ theme }) => theme.focused.cardDescription};
  margin: ${slidePadding}px;
`;

export const CardFooter = styled.View`
  flex-direction: row;
  padding: ${slidePadding}px;
`;

export const CardFooterButtons = styled.View`
  flex-direction: row;
  width: 130px;
`;

export const CardFooterButton = styled.View`
  align-items: center;
  justify-content: center;

  margin-right: 7px;

  width: 37px;
  height: 37px;

  background-color: ${({ active, theme }) =>
    active
      ? theme.footerButton.backgroundColor.active
      : theme.footerButton.backgroundColor.inactive};
  border-radius: ${({ theme }) => theme.footerButton.borderRadius};
`;

export const CardFooterAddCardButton = styled.View`
  align-items: center;
  justify-content: center;

  width: ${slideWidth - 130 - slidePadding * 3}px;
  height: 37px;

  background-color: ${({ active, theme }) =>
    active
      ? theme.footerButton.backgroundColor.active
      : theme.footerButton.backgroundColor.inactive};
  border-radius: ${({ theme }) => theme.footerButton.borderRadius};
`;

export const CardFooterAddCardButtonText = styled.Text`
  color: ${({ theme }) => theme.footerButton.textColor};
`;
