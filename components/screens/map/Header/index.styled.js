import styled from "styled-components/native";

import colors from "../../../../constants/Colors";
import layout from "../../../../constants/Layout";

export const Header = styled.ScrollView.attrs((props) => ({
  horizontal: true,
}))`
  padding-top: 15px;
  padding-bottom: 10px;
  padding-horizontal: 20px;

  background-color: ${colors.background};
`;

export const Item = styled.TouchableOpacity`
  margin-right: 30px;

  /* Centers item bar: */
  align-items: center;
`;

export const ItemText = styled.Text`
  font-family: ${layout.fontText};
  font-size: 18px;
  color: #95989a;

  ${({ active }) =>
    active &&
    `
      color: ${colors.color};
    `};
`;

export const ItemBar = styled.View`
  margin-top: 10px;

  width: 40px;
  height: 4px;

  opacity: 0;
  border-radius: 2px;

  background-color: ${colors.color};

  ${({ active }) =>
    active &&
    `
      opacity: 1
    `};
`;
