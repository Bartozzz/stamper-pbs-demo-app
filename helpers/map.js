import Supercluster from "supercluster";

export function getZoomLevel(longitudeDelta) {
  return Math.round(Math.log(360 / longitudeDelta) / Math.LN2);
}

export function getCluster(places, region) {
  if (places.lenght === 0) {
    return {
      markers: places,
    };
  }

  const cluster = new Supercluster({
    radius: 40,
    maxZoom: 18,
  });

  const padding = 0;
  let markers = [];

  try {
    cluster.load(places);

    markers = cluster.getClusters(
      [
        region.longitude - region.longitudeDelta * (0.5 + padding),
        region.latitude - region.latitudeDelta * (0.5 + padding),
        region.longitude + region.longitudeDelta * (0.5 + padding),
        region.latitude + region.latitudeDelta * (0.5 + padding),
      ],
      getZoomLevel(region.longitudeDelta)
    );
  } catch (e) {
    console.debug("Failed to create cluster", e);
  }

  return {
    markers,
    cluster,
  };
}
