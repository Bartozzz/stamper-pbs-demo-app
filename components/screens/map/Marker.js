import React from "react";
import MapView from "react-native-maps";
import { View, Image, StyleSheet } from "react-native";

export function Marker({ item, onPress = () => null, ...rest }) {
  return (
    <MapView.Marker onPress={onPress} {...rest}>
      <View style={[styles.marker, styles.container]}>
        {item.logoUrl && (
          <Image
            style={styles.marker}
            resizeMode="contain"
            source={{ uri: item.logoUrl }}
          />
        )}
      </View>
    </MapView.Marker>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: "hidden",
    backgroundColor: "white"
  },

  marker: {
    zIndex: 2,
    width: 40,
    height: 40,
    borderRadius: 20
  }
});

export default Marker;
