import React from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import colors from "../../../constants/Colors";

const ClusterMarker = ({ count, onPress = () => null, ...rest }) => (
  <MapView.Marker onPress={onPress} {...rest}>
    <View style={style.container}>
      <View style={style.bubble}>
        <Text style={style.count}>{count}</Text>
      </View>
    </View>
  </MapView.Marker>
);

const style = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: "flex-start"
  },

  bubble: {
    flex: 0,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    justifyContent: "center",

    minWidth: 40,
    minHeight: 40,

    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.primary,

    backgroundColor: colors.primary,

    zIndex: 2
  },

  count: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold"
  }
});

export default ClusterMarker;
