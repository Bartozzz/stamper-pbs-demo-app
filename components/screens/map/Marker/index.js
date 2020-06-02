import React from "react";
import MapView from "react-native-maps";

import * as Styled from "./index.styled";

export const Marker = ({ item, onPress = () => null, ...rest }) => {
  return (
    <MapView.Marker onPress={onPress} {...rest}>
      <Styled.Container>
        {item.logoUrl && <Styled.Marker source={{ uri: item.logoUrl }} />}
      </Styled.Container>
    </MapView.Marker>
  );
};

export default Marker;
