import React from "react";
import { View } from "react-native";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

export const MapHeader = (props) => {
  return (
    <Theme>
      <View>
        <Styled.Header>
          {props.filters.map((filter, index) => (
            <Styled.Item
              key={filter}
              onPress={() => props.onFilterSelect(filter, index)}
            >
              <Styled.ItemText active={index === props.filter}>
                {filter}
              </Styled.ItemText>

              <Styled.ItemBar active={index === props.filter} />
            </Styled.Item>
          ))}
        </Styled.Header>
      </View>
    </Theme>
  );
};

export default MapHeader;
