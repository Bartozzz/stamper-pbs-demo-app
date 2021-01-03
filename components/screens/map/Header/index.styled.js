import styled from "styled-components/native";

export const Header = styled.ScrollView.attrs((props) => ({
  horizontal: true,
}))`
  padding-top: 15px;
  padding-bottom: 10px;
  padding-horizontal: 20px;

  background-color: ${({ theme }) => theme.backgroundColor};
`;

export const Item = styled.TouchableOpacity`
  margin-right: 30px;

  /* Centers item bar: */
  align-items: center;
`;

export const ItemText = styled.Text`
  font-family: ${({ theme }) => theme.item.fontFamily};
  font-size: 18px;
  color: ${({ theme }) => theme.item.inactiveColor};

  ${(props) =>
    props.active &&
    `
      color: ${props.theme.item.activeColor};
    `};
`;

export const ItemBar = styled.View`
  margin-top: 10px;

  width: 40px;
  height: 4px;

  opacity: 0;
  border-radius: 2px;

  background-color: ${({ theme }) => theme.itemBarColor};

  ${({ active }) =>
    active &&
    `
      opacity: 1
    `};
`;
