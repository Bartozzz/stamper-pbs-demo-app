import React from "react";
import MapView from "react-native-maps";

import * as Styled from "./index.styled";

const ClusterMarker = ({ count, onPress = () => null, ...rest }) => (
  <MapView.Marker onPress={onPress} {...rest}>
    <Styled.Container>
      <Styled.Bubble>
        <Styled.Count>{count}</Styled.Count>
      </Styled.Bubble>
    </Styled.Container>
  </MapView.Marker>
);

export default ClusterMarker;
