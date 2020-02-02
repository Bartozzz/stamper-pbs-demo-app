import React from "react";

import Marker from "../components/screens/map/Marker";
import ClusterMarker from "../components/screens/map/ClusterMarker";

const MapAreaMarker = ({ marker, cluster }) => {
  const key = marker.geometry.coordinates[0];

  const coordinate = {
    latitude: marker.geometry.coordinates[1],
    longitude: marker.geometry.coordinates[0]
  };

  // If a cluster
  if (marker.properties) {
    return (
      <ClusterMarker
        key={key}
        coordinate={coordinate}
        count={marker.properties.point_count}
        onPress={() => {
          // const markersInCluster = cluster.getLeaves(marker.id);
          // const cardsInCluster = R.pipe(
          //   R.map(R.view(R.lensProp("cards"))),
          //   R.flatten
          // )(markersInCluster);
          //
          // const selectedCard = cardsInCluster[0];
        }}
      />
    );
  } else {
    return (
      <Marker
        key={`${marker.merchantId}${marker.lat}${marker.lng}`}
        coordinate={coordinate}
        item={marker}
        onPress={() => {
          // const selectedCard = marker.cards[0];
        }}
      />
    );
  }
};

export default MapAreaMarker;
