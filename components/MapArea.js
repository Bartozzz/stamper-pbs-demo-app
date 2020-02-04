import React from "react";
import { StyleSheet } from "react-native";
import MapView from "react-native-maps";

import MapCurrentLocationMarker from "./MapCurrentLocationMarker";

import mapStyle from "../assets/mapStyle";
import colors from "../constants/Colors";

const MapArea = ({ children, userPosition, ...rest }) => {
  return (
    <MapView
      provider={MapView.PROVIDER_GOOGLE}
      maxZoomLevel={18}
      style={styles.map}
      customMapStyle={mapStyle}
      initialRegion={userPosition}
      {...rest}
    >
      <MapCurrentLocationMarker coordinate={userPosition} />

      {children}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
    zIndex: 1,

    // Center indicator vertically:
    justifyContent: "center",
    backgroundColor: colors.background
  }
});

export default MapArea;
