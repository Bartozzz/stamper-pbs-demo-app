import React from "react";
import { View, Image } from "react-native";
import { useDispatch } from "react-redux";

import * as R from "ramda";

// Utils:
import i18n from "../../translations";
import colors from "../../constants/Colors";
import defaultStyles from "../../constants/Styles";
import useLocation from "../../helpers/hooks/useLocation";
import { getCluster } from "../../helpers/map";

// Components:
import Background from "../../components/Background";
import MapHeader from "../../components/screens/map/Header";
import HeaderEmpty from "../../components/nav/HeaderEmpty";
import HeaderHamburger from "../../components/nav/HeaderHamburger";
import MapArea from "../../components/MapArea";
import MapAreaMarker from "../../components/MapAreaMarker";

// Store:
import { getRegion } from "../../store/reducers/map";

// Assets:
import BackgroundImage from "../../assets/backgrounds/wallet_wn.png";
import MapLoader from "../../assets/loaders/map.gif";

const MapScreen = () => {
  const dispatch = useDispatch();
  const [currentLocation, reverseLocation] = useLocation();

  const [cards, setCards] = React.useState([]);
  const [markers, setMarkers] = React.useState([]);
  const [cluster, setCluster] = React.useState({ markers: [] });
  const [filters, setFilters] = React.useState([]);
  const [filter, setFilter] = React.useState(0);

  React.useEffect(() => {
    console.log("Re-render");
  });

  // Fetch data for user location from the API:
  React.useEffect(() => {
    if (currentLocation && reverseLocation) {
      const { city } = reverseLocation;
      const { coords } = currentLocation;

      dispatch(getRegion(city, coords))
        .then(response => {
          const { data } = response.payload;
          const cards = data.cards.map(normalizeCardGeometry);

          setFilters(data.filters);
          setMarkers(cards);
          setCards(groupCardsByMerchant(cards));

          setCluster(
            getCluster(cards, {
              latitude: Number(currentLocation.coords.latitude),
              longitude: Number(currentLocation.coords.longitude),
              latitudeDelta: 0.025,
              longitudeDelta: 0.025
            })
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [currentLocation, reverseLocation]);

  // Still fetching user location:
  if (currentLocation === null && reverseLocation === null) {
    return (
      <View style={[defaultStyles.container, defaultStyles.center]}>
        <Image source={MapLoader} style={{ width: 150, height: 150 }} />
      </View>
    );
  }

  // Fetched user location:
  return (
    <Background source={BackgroundImage} disableScroll>
      <MapHeader
        filters={filters}
        filter={filter}
        onFilterSelect={(filter, index) => setFilter(index)}
      />

      <MapArea
        userPosition={{
          latitude: Number(currentLocation.coords.latitude),
          longitude: Number(currentLocation.coords.longitude),
          latitudeDelta: 0.025,
          longitudeDelta: 0.025
        }}
        onRegionChangeComplete={region => {
          setCluster(getCluster(markers, region));
        }}
      >
        {cluster.markers.map(marker => (
          <MapAreaMarker
            key={marker.id}
            marker={marker}
            cluster={cluster.cluster}
          />
        ))}
      </MapArea>
    </Background>
  );
};

MapScreen.navigationOptions = ({ navigation }) => ({
  title: i18n.t("navigation.map"),
  headerLeft: <HeaderEmpty />,
  headerRight: <HeaderHamburger navigation={navigation} />,
  headerStyle: {
    ...defaultStyles.headerTransparent,
    backgroundColor: colors.background
  }
});

export function normalizeCardGeometry(card) {
  return {
    ...card,
    lat: Number(card.lat),
    lng: Number(card.lng),
    geometry: {
      coordinates: [Number(card.lng), Number(card.lat)]
    }
  };
}

export function groupCardsByMerchant(data) {
  return R.reduce((acc, cur) => {
    const index = R.findIndex(
      R.allPass([
        R.propEq("merchantId", cur.merchantId),
        R.propEq("lat", Number(cur.lat)),
        R.propEq("lng", Number(cur.lng))
      ])
    )(acc);

    if (index > -1) {
      return R.over(
        R.compose(R.lensIndex(index), R.lensProp("cards")),
        R.append(cur)
      )(acc);
    } else {
      return R.append({
        merchantId: cur.merchantId,
        lng: Number(cur.lng),
        lat: Number(cur.lat),
        logoUrl: cur.logoUrl,

        cards: [cur]
      })(acc);
    }
  }, [])(data);
}

export default MapScreen;
