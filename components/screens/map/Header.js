import React from "react";
import { View } from "react-native";
import styled from "styled-components/native";

import colors from "../../../constants/Colors";
import layout from "../../../constants/Layout";

const Header = styled.ScrollView.attrs(props => ({
  horizontal: true
}))`
  padding-top: 15px;
  padding-bottom: 10px;
  padding-horizontal: 20px;

  background-color: ${colors.background};
`;

const Item = styled.TouchableOpacity`
  margin-right: 30px;

  /* Centers item bar: */
  align-items: center;
`;

const ItemText = styled.Text`
  font-family: ${layout.fontText};
  font-size: 18px;
  color: #95989A;
  ${({ active }) => active && `
    color: ${colors.color};
  `};
`;

const ItemBar = styled.View`
  margin-top: 10px;

  width: 40px;
  height: 4px;

  opacity: 0;
  border-radius: 2px;

  background-color: ${colors.color};

  ${({ active }) => active && `
    opacity: 1
  `};
`;

export default function MapHeader(props) {
  return (
    <View>
      <Header>
        {props.filters.map((filter, index) => (
          <Item
            key={filter}
            onPress={() => props.onFilterSelect(filter, index)}
          >
            <ItemText active={index === props.filter} >
              {filter}
            </ItemText>

            <ItemBar active={index === props.filter} />
          </Item>
        ))}
      </Header>
    </View>
  );
}

