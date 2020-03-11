import React from "react";
import MapView from "react-native-maps";
import styled from "styled-components/native";

import MapCurrentLocationMarker from "./MapCurrentLocationMarker";

import mapStyle from "../assets/mapStyle";
import colors from "../constants/Colors";

const Map = styled(MapView)`
  flex: 1;
  z-index: 1;

  /* Center indicator vertically: */
  justify-content: center;
  background-color: ${colors.background};
`;

const MapArea = ({ children, userPosition, ...rest }) => {
  return (
    <Map
      provider={MapView.PROVIDER_GOOGLE}
      maxZoomLevel={18}
      customMapStyle={mapStyle}
      initialRegion={userPosition}
      {...rest}
    >
      <MapCurrentLocationMarker coordinate={userPosition} />

      {children}
    </Map>
  );
};

export default MapArea;
