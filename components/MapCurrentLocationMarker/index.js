import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";

import * as Styled from "./index.styled";

export const MapCurrentLocationMarker = ({ coordinate }) => {
  return (
    <MapView.Marker coordinate={coordinate} anchor={{ x: 0.5, y: 0.5 }}>
      <View>
        <Styled.Indicator />
      </View>
    </MapView.Marker>
  );
};

export default MapCurrentLocationMarker;
