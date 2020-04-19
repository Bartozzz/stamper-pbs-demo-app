import React from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import styled from "styled-components/native";

import LocationIndicator from "../assets/images/icons/location_indicator.png";

const Indicator = styled.Image`
  z-index: 1;
  width: 120px;
  height: 120px;
`;

const MapCurrentLocationMarker = ({ coordinate }) => {
  return (
    <MapView.Marker coordinate={coordinate} anchor={{ x: 0.5, y: 0.5 }}>
      <View>
        <Indicator source={LocationIndicator} />
      </View>
    </MapView.Marker>
  );
};

export default MapCurrentLocationMarker;
