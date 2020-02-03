import React from "react";
import styled from "styled-components/native";
import { AsyncStorage, Dimensions, View, Image } from "react-native";
import { useDispatch } from "react-redux";
import Carousel from "react-native-snap-carousel";

import * as R from "ramda";

// Utils:
import * as Routes from "../../navigation";
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
import MapCard, { slideWidth, slideMargin } from "../../components/MapCard";
import MapCardToggler from "../../components/MapCardToggler";

// Store:
import { getRegion } from "../../store/reducers/map";
import { addCard, FORCE_REFRESH_WALLET } from "../../store/reducers/wallet";
import { FORCE_REFRESH_PRIZES } from "../../store/reducers/prizes";

// Assets:
import BackgroundImage from "../../assets/backgrounds/wallet_wn.png";
import MapLoader from "../../assets/loaders/map.gif";
import CardAdd from "../../assets/success/card_add.gif";

const CardsContainer = styled.View`
  display: ${({ hide }) => (hide ? "none" : "flex")};
  z-index: 3;

  position: absolute;
  bottom: 100px;
  left: 0;
  right: 0;
`;

const MapScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [currentLocation, reverseLocation] = useLocation();

  const [cards, setCards] = React.useState([]);
  const [showCards, setShowCards] = React.useState(false);
  const [markers, setMarkers] = React.useState([]);
  const [cluster, setCluster] = React.useState({ markers: [] });
  const [filters, setFilters] = React.useState([]);
  const [filter, setFilter] = React.useState(0);

  const addCardHandler = React.useCallback(cardId => {
    AsyncStorage.setItem(FORCE_REFRESH_WALLET, JSON.stringify(true));
    AsyncStorage.setItem(FORCE_REFRESH_PRIZES, JSON.stringify(true));

    function confirmCardTerms() {
      dispatch(addCard(cardId, true)).then(() => {
        navigation
          .navigate(Routes.INFO_SUCCESS, {
            redirect: Routes.WALLET_CARDS,
            message: i18n.t("success.wallet.cardAdd"),
            height: 100,
            width: 88,
            image: CardAdd,
            timeout: 3000
          })
          .catch(() => {
            navigation.navigate(Routes.INFO_ERROR, {
              redirect: Routes.MAP,
              message: i18n.t("errors.wallet.cardAdd")
            });
          });
      });
    }

    dispatch(addCard(cardId))
      .then(response => {
        const { termsAndConditions } = response.payload.data;
        const { title, termsAndConditionsUrl } = termsAndConditions;

        if (termsAndConditionsUrl) {
          navigation.push(Routes.MAP_ACCEPT_CARD_TERMS, {
            title,
            termsAndConditionsUrl,
            onConfirm: confirmCardTerms
          });
        } else {
          confirmCardTerms();
        }
      })
      .catch(() => {
        navigation.navigate(Routes.INFO_ERROR, {
          redirect: Routes.MAP,
          message: i18n.t("errors.wallet.cardAdd")
        });
      });
  }, []);

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
          const cards = data.cards
            .map(normalizeCardGeometry)
            .sort(sortByDistance(getRegionForLocation(currentLocation)))
            .sort(sortByActive());

          setFilters(data.filters);
          setMarkers(cards);
          setCards(cards);
          setCluster(
            getCluster(
              groupCardsByMerchant(cards).map(normalizeCardGeometry),
              getRegionForLocation(currentLocation)
            )
          );
        })
        .catch(error => {
          console.log(error);
        });
    }
  }, [currentLocation, reverseLocation]);

  // If the user selects a filter, filter shown cards:
  React.useEffect(() => {
    if (currentLocation && currentLocation) {
      const cards = markers
        .map(normalizeCardGeometry)
        .sort(sortByDistance(getRegionForLocation(currentLocation)))
        .sort(sortByActive())
        .filter(filterByCategory(filter, filters));

      setCards(cards);
    }
  }, [filters, filter]);

  // If the user hides cards, reset their state to default:
  React.useEffect(() => {
    if (currentLocation && currentLocation && !showCards) {
      const cards = markers
        .map(normalizeCardGeometry)
        .sort(sortByDistance(getRegionForLocation(currentLocation)))
        .sort(sortByActive())
        .filter(filterByCategory(filter, filters));

      setCards(cards);
    }
  }, [showCards]);

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
        userPosition={getRegionForLocation(currentLocation)}
        onRegionChangeComplete={region => {
          setCluster(
            getCluster(
              groupCardsByMerchant(markers).map(normalizeCardGeometry),
              region
            )
          );
        }}
      >
        {cluster.markers.map(marker => (
          <MapAreaMarker
            marker={marker}
            cluster={cluster.cluster}
            onPress={selectedCards => {
              setShowCards(true);
              setCards(
                selectedCards
                  .map(normalizeCardGeometry)
                  .sort(sortByDistance(getRegionForLocation(currentLocation)))
                  .sort(sortByActive())
              );
            }}
          />
        ))}
      </MapArea>

      <CardsContainer hide={!showCards}>
        <Carousel
          data={cards}
          renderItem={({ item }) => (
            <MapCard {...item} onAddCard={addCardHandler} />
          )}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          inactiveSlideShift={0}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={slideWidth + slideMargin}
        />
      </CardsContainer>

      <MapCardToggler
        show={showCards}
        onPress={() => setShowCards(!showCards)}
      />
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

function sortByDistance(userPosition) {
  const userCoords = {
    lat: Number(userPosition.latitude),
    lng: Number(userPosition.longitude)
  };

  return (a, b) => {
    const aDist = calculateDistance(a, userCoords);
    const bDist = calculateDistance(b, userCoords);

    return aDist - bDist;
  };
}

function sortByActive() {
  return (a, b) => {
    const isActiveA = a.active && !a.inWallet;
    const isActiveB = b.active && !b.inWallet;

    return Number(isActiveB) - Number(isActiveA);
  };
}

function filterByCategory(filter, categories) {
  if (filter === 0) {
    return () => true;
  } else {
    return card => card.filter === categories[filter];
  }
}

function getRegionForLocation(location) {
  return {
    latitude: Number(location.coords.latitude),
    longitude: Number(location.coords.longitude),
    latitudeDelta: 0.025,
    longitudeDelta: 0.025
  };
}

function calculateDistance(a, b) {
  var radlat1 = (Math.PI * a.lat) / 180;
  var radlat2 = (Math.PI * b.lng) / 180;
  var theta = a.lng - b.lng;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;

  return dist;
}

function groupCardsByMerchant(cards) {
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
        lat: Number(cur.lat),
        lng: Number(cur.lng),
        logoUrl: cur.logoUrl,
        merchantId: cur.merchantId,
        cards: [cur]
      })(acc);
    }
  }, [])(cards);
}

export default MapScreen;
