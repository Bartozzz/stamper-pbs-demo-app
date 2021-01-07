import React, { useRef } from "react";
import styled from "styled-components/native";
import { Dimensions, View, Image } from "react-native";
import { useDispatch } from "react-redux";
import Carousel from "react-native-snap-carousel";
import { _ } from "lodash";
import { NavigationEvents } from "react-navigation";
import * as Analytics from "expo-firebase-analytics";

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
import HeaderButtonSearch from "../../components/HeaderButtonSearch";
import HeaderHamburger from "../../components/HeaderHamburger";
import MapSearchInput from "../../components/MapSearchInput";
import MapArea from "../../components/MapArea";
import MapAreaMarker from "../../components/MapAreaMarker";
import MapCard from "../../components/MapCard";
import { slideWidth, slideMargin } from "../../components/MapCard/constants";
import MapCardToggler from "../../components/MapCardToggler";
import NoInternet from "../../components/NoInternet";

// Store:
import { getRegion } from "../../store/reducers/map";
import { addCard } from "../../store/reducers/wallet";

// Assets:
import images from "../../constants/images";

const CardsContainer = styled.View`
  position: absolute;
  bottom: 100px;
  left: 0;
  right: 0;

  z-index: 3;
`;

const MapScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [currentLocation, reverseLocation] = useLocation();

  const [searchVisible, setSearchVisible] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const [cards, setCards] = React.useState([]);
  const [showCards, setShowCards] = React.useState(false);
  const [markers, setMarkers] = React.useState([]);
  const [region, setRegion] = React.useState();
  const [cluster, setCluster] = React.useState({ markers: [] });
  const [filters, setFilters] = React.useState([]);
  const [filter, setFilter] = React.useState(0);
  const [destroyMap, setDestroyMap] = React.useState(false);

  const createCluster = React.useCallback(
    (markers, region) => {
      const cards = markers
        .map(normalizeCardGeometry)
        .sort(sortByDistance(getRegionForLocation(currentLocation)))
        .sort(sortByActive())
        .filter(filterByCategory(filter, filters));

      return getCluster(
        groupCardsByMerchant(cards).map(normalizeCardGeometry),
        region
      );
    },
    [currentLocation]
  );

  const addCardHandler = React.useCallback((cardId, title, merchantName) => {
    function confirmCardTerms() {
      dispatch(addCard(cardId, true)).then(() => {
        Analytics.logEvent("add_card", {
          title: title,
          merchantName: merchantName,
        });
        navigation
          .navigate(Routes.INFO_SUCCESS, {
            redirect: Routes.WALLET_CARDS,
            message: i18n.t("success.wallet.cardAdd"),
            height: 100,
            width: 88,
            image: images.CardAdd,
            timeout: 3000,
          })
          .catch(() => {
            navigation.navigate(Routes.INFO_ERROR, {
              redirect: Routes.MAP,
              message: i18n.t("errors.wallet.cardAdd"),
            });
          });
      });
    }

    dispatch(addCard(cardId))
      .then((response) => {
        const { termsAndConditions } = response.payload.data;
        const { title, termsAndConditionsUrl } = termsAndConditions;

        if (termsAndConditionsUrl) {
          navigation.push(Routes.MAP_ACCEPT_CARD_TERMS, {
            title,
            termsAndConditionsUrl,
            onConfirm: confirmCardTerms,
          });
        } else {
          confirmCardTerms();
        }
      })
      .catch(() => {
        navigation.navigate(Routes.INFO_ERROR, {
          redirect: Routes.MAP,
          message: i18n.t("errors.wallet.cardAdd"),
        });
      });
  }, []);

  const handleSearch = React.useCallback((value) => {
    setSearchQuery(value);
  }, []);

  const closeCardsOnDrag = useRef(_.debounce(() => setShowCards(false), 250))
    .current;

  // Set navigation params on initial route mount:
  React.useEffect(() => {
    navigation.setParams({
      toggle: () => {
        setSearchVisible((visible) => !visible);
      },
    });
  }, []);

  // Fetch data for user location from the API:
  React.useEffect(() => {
    if (currentLocation && reverseLocation) {
      const { city, isoCountryCode } = reverseLocation;
      const { coords } = currentLocation;

      dispatch(getRegion(city, isoCountryCode, coords))
        .then((response) => {
          const { data } = response.payload;
          const region = getRegionForLocation(currentLocation);
          const cards = data.cards
            .map(normalizeCardGeometry)
            .sort(sortByDistance(region))
            .sort(sortByActive());

          setFilters(data.filters);
          setMarkers(cards);
          setCards(cards);
          setRegion(region);
          setCluster(createCluster(cards, region));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [currentLocation, reverseLocation]);

  // If the user updates filters, filter shown cards:
  React.useEffect(() => {
    if (region) {
      let cards = markers.filter(filterByCategory(filter, filters));

      // If user has search enabled, filter by the query. If he closed the
      // search bar, reset search query to the default value:
      if (searchVisible) {
        cards = cards.filter(filterByQuery(searchQuery));
      } else {
        setSearchQuery("");
      }

      setCards(cards);
      setCluster(createCluster(cards, region));
    }
  }, [filters, filter, searchVisible, searchQuery]);

  // If the user hides cards, reset their state to default:
  React.useEffect(() => {
    if (region && !showCards) {
      const cards = markers
        .filter(filterByCategory(filter, filters))
        .filter(filterByQuery(searchQuery));

      setCards(cards);
      setCluster(createCluster(cards, region));
    }
  }, [showCards]);

  // Still fetching user location:
  if (currentLocation === null && reverseLocation === null) {
    return (
      <View style={[defaultStyles.container, defaultStyles.center]}>
        <Image source={images.MapLoader} style={{ width: 150, height: 150 }} />
      </View>
    );
  }

  if (!navigation.state.params.internet) {
    return <NoInternet />;
  }

  // Fetched user location:
  return (
    <Background source={images.BackgroundWalletWn} disableScroll>
      <MapHeader
        filters={filters}
        filter={filter}
        onFilterSelect={(filter, index) => setFilter(index)}
      />

      {searchVisible && (
        <MapSearchInput
          onChangeText={handleSearch}
          value={searchQuery}
          onClose={() => setSearchVisible(false)}
        />
      )}

      {destroyMap || (
        <MapArea
          userPosition={getRegionForLocation(currentLocation)}
          onRegionChangeComplete={(region) => {
            const cards = markers.filter(filterByCategory(filter, filters));

            setRegion(region);
            setCluster(createCluster(cards, region));
          }}
          onPanDrag={closeCardsOnDrag}
          onPress={closeCardsOnDrag}
        >
          <NavigationEvents
            onWillBlur={() => {
              setDestroyMap(true);
            }}
          />

          {cluster.markers.map((marker) => (
            <MapAreaMarker
              key={`${marker.geometry.coordinates[0]}-${marker.geometry.coordinates[1]}`}
              marker={marker}
              cluster={cluster.cluster}
              onPress={(selectedCards) => {
                const cards = selectedCards
                  .sort(sortByDistance(getRegionForLocation(currentLocation)))
                  .sort(sortByActive());

                setShowCards(true);
                setCards(cards);
              }}
            />
          ))}
        </MapArea>
      )}

      {showCards && (
        <CardsContainer>
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
      )}

      <MapCardToggler
        show={showCards}
        count={cards.length}
        onPress={() => setShowCards(!showCards)}
      />
    </Background>
  );
};

MapScreen.navigationOptions = ({ navigation }) => ({
  title: i18n.t("navigation.map"),
  headerLeft: (
    <HeaderButtonSearch onPress={() => navigation.state.params.toggle()} />
  ),
  headerRight: (
    <HeaderHamburger onPress={() => navigation.pop()} navigation={navigation} />
  ),
  headerStyle: {
    ...defaultStyles.headerTransparent,
    backgroundColor: colors.background,
  },

  headerTitleStyle: { ...defaultStyles.headerCenteredTitle },
  gesturesEnabled: false,
});

export function normalizeCardGeometry(card) {
  return {
    ...card,
    lat: Number(card.lat),
    lng: Number(card.lng),
    geometry: {
      coordinates: [Number(card.lng), Number(card.lat)],
    },
  };
}

function sortByDistance(userPosition) {
  const userCoords = {
    lat: Number(userPosition.latitude),
    lng: Number(userPosition.longitude),
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
    return (card) =>
      card.filters
        ? card.filters.includes(categories[filter])
        : card.filter === categories[filter];
  }
}

function filterByQuery(query) {
  return (marker) => {
    const criterias = [marker.title, marker.address, marker.merchantName]
      .filter((criterion) => typeof criterion === "string")
      .map((string) => string.toLowerCase());

    return criterias.some((criterion) =>
      criterion.includes(query.toLowerCase())
    );
  };
}

function getRegionForLocation(location) {
  return {
    latitude: Number(location.coords.latitude),
    longitude: Number(location.coords.longitude),
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  };
}

function calculateDistance(a, b) {
  var radlat1 = (Math.PI * a.lat) / 180;
  var radlat2 = (Math.PI * b.lat) / 180;
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
        R.propEq("lng", Number(cur.lng)),
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
        cards: [cur],
      })(acc);
    }
  }, [])(cards);
}

export default MapScreen;
