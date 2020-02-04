import React from "react";
import { View, Image, StyleSheet } from "react-native";
import MapView from "react-native-maps";

import LocationIndicator from "../assets/images/icons/location_indicator.png";

const MapCurrentLocationMarker = ({ coordinate }) => {
  return (
    <MapView.Marker coordinate={coordinate} anchor={{ x: 0.5, y: 0.5 }}>
      <View>
        <Image style={styles.indicator} source={LocationIndicator} />
      </View>
    </MapView.Marker>
  );
};

const styles = StyleSheet.create({
  indicator: {
    zIndex: 1,
    width: 120,
    height: 120
  }
});

export default MapCurrentLocationMarker;
