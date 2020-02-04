import React from "react";
import * as R from "ramda";

import Marker from "../components/screens/map/Marker";
import ClusterMarker from "../components/screens/map/ClusterMarker";

const MapAreaMarker = ({ marker, cluster, onPress }) => {
  const coordinate = {
    latitude: marker.geometry.coordinates[1],
    longitude: marker.geometry.coordinates[0]
  };

  // If a cluster
  if (marker.properties) {
    return (
      <ClusterMarker
        coordinate={coordinate}
        count={marker.properties.point_count}
        onPress={() => {
          const markersInCluster = cluster.getLeaves(marker.id);
          const cardsInCluster = R.pipe(
            R.map(R.view(R.lensProp("cards"))),
            R.flatten
          )(markersInCluster);

          if (onPress) {
            onPress(cardsInCluster);
          }
        }}
      />
    );
  } else {
    return (
      <Marker
        coordinate={coordinate}
        item={marker}
        onPress={() => {
          if (onPress) {
            onPress(marker.cards);
          }
        }}
      />
    );
  }
};

export default MapAreaMarker;
