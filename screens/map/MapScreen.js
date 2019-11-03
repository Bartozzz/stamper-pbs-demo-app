import * as React from "react";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapView from "react-native-maps";
import Carousel, { Pagination } from "react-native-snap-carousel";
import {
  AsyncStorage,
  Dimensions,
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Image
} from "react-native";

import Background from "../../components/Background";
import HeaderHamburger from "../../components/nav/HeaderHamburger";
import HeaderBackIcon from "../../components/nav/HeaderBack";
import MapHeader from "../../components/screens/map/Header";
import Card from "../../components/layout/card/Card";
import CardButton from "../../components/layout/card/CardButton";
import WalletIcon from "../../components/icons/WalletIcon";

import IconAddToWallet from "../../components/screens/map/IconAddToWallet";
import IconInWallet from "../../components/screens/map/IconInWallet";
import Marker from "../../components/screens/map/Marker";
import ClusterMarker from "../../components/screens/map/ClusterMarker";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import { getCluster } from "../../helpers/map";

import { getRegion, addFav, removeFav } from "../../store/reducers/map";
import { addCard, FORCE_REFRESH_WALLET } from "../../store/reducers/wallet";
import { FORCE_REFRESH_PRIZES } from "../../store/reducers/prizes";
import {
  getData,
  getDataForLocation,
  getUniqueData
} from "../../store/selectors/map";

import mapStyle from "../../assets/mapStyle";
import BackgroundImage from "../../assets/backgrounds/wallet_wn.png";
import LocationIndicator from "../../assets/images/icons/location_indicator.png";
import MapLoader from "../../assets/loaders/map.gif";
import CardAdd from "../../assets/success/card_add.gif";

const MODE_MAP = "MODE_MAP";
const MODE_CARD = "MODE_CARD";
const FILTER_ALL = "FILTER_ALL";
const FILTER_ONLINE = "FILTER_ONLINE";

class MapNearbyScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.map"),
    headerLeft: <HeaderBackIcon navigation={navigation} />,
    headerRight: <HeaderHamburger navigation={navigation} />,
    headerStyle: {
      ...defaultStyles.headerTransparent,
      backgroundColor: colors.background
    }
  });

  state = {
    mode: MODE_MAP,
    filter: FILTER_ALL,
    active: 0,
    region: null,
    selected: null,
    city: null,
    userPosition: null,
    locationLoaded: false
  };

  get data() {
    const pickOnlyOnline = this.state.filter === FILTER_ONLINE;

    return getData(this.props.data, pickOnlyOnline);
  }

  componentDidMount() {
    this.requestUserPosition().then(data => {
      if (__DEV__) {
        this.props.getRegion("Kraków", data.region);
      } else {
        this.props.getRegion(data.city, data.region);
      }

      this.setState({ ...data, userPosition: data.region });
    });
  }

  toggleMode = () => {
    if (this.state.mode === MODE_MAP) {
      this.setState({ mode: MODE_CARD });
    } else {
      this.setState({ mode: MODE_MAP });
    }
  };

  setFilter = filter => () => {
    this.setState({
      filter
    });
  };

  requestUserPosition = async () => {
    try {
      let { status } = await Permissions.askAsync(Permissions.LOCATION);
      let location;
      let reverse;

      if (status === "granted") {
        // Get user geocode location:
        location = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        // Try to find the name of the city the current user is in:
        reverse = await Location.reverseGeocodeAsync(location.coords);
      }

      // Same shape as component' state:
      return {
        locationLoaded: true,
        city: Array.isArray(reverse) ? reverse[0].city : null,
        region: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          // TODO: calculate deltas based on screen sizes:
          latitudeDelta: 0.02897628441160549,
          longitudeDelta: 0.025000199675559998
        }
      };
    } catch (err) {
      console.error(err);

      return {
        region: {},
        locationLoaded: false
      };
    }
  };

  selectCard = cardId => () => {
    this.setState({
      selected: cardId,
      active: 0
    });
  };

  addCard = cardId => () => {
    const { navigation, addCard } = this.props;

    AsyncStorage.setItem(FORCE_REFRESH_WALLET, JSON.stringify(true));
    AsyncStorage.setItem(FORCE_REFRESH_PRIZES, JSON.stringify(true));

    function confirmCardTerms() {
      addCard(cardId, true).then(() => {
        navigation.navigate(Routes.INFO_SUCCESS, {
          redirect: Routes.MAP,
          message: i18n.t("success.wallet.cardAdd"),
          height: 100,
          width: 88,
          image: CardAdd,
          timeout: 3000
        });
      });
    }

    addCard(cardId)
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
          redirect: Routes.DASHBOARD,
          message: i18n.t("errors.wallet.cardAdd")
        });
      });
  };

  addFav = cardId => () => {
    this.props.addFav(cardId);
  };

  removeFav = cardId => () => {
    this.props.removeFav(cardId);
  };

  renderSelectedCardOnMap() {
    const { selected, active } = this.state;
    const selectedCard = this.data.find(item => item.id === selected);

    // If no card is selected, render nothing:
    if (!selectedCard) {
      return null;
    }

    // Situation 2: a restaurant can have multiple cards in the same location.
    // When a card is selected, we should display all the cards in the selected
    // location.
    const selectedBatch = getDataForLocation(
      this.data,
      selectedCard.lat,
      selectedCard.lng
    );

    return (
      <View style={styles.selectedContainer}>
        <Pagination
          dotsLength={selectedBatch.length}
          carouselRef={this.carouselRef}
          activeDotIndex={active}
          containerStyle={styles.paginationContainer}
          dotColor={colors.color}
          dotStyle={styles.paginationDot}
          inactiveDotColor={colors.color}
          inactiveDotOpacity={0.5}
          inactiveDotScale={1}
        />

        <Carousel
          ref={carousel => (this.carouselRef = carousel)}
          data={selectedBatch}
          onSnapToItem={index => this.setState({ active: index })}
          renderItem={({ item }) => (
            <View
              style={[styles.selected, !item.active && styles.selectedInactive]}
            >
              <View style={styles.selectedImageContainer}>
                <Image
                  style={styles.selectedImage}
                  source={{ uri: item.iconUrl }}
                />
              </View>

              <View style={styles.selectedInfoContainer}>
                <Text style={styles.selectedTitle}>{item.title}</Text>
                <Text style={styles.selectedAmount}>
                  {i18n.t("map.collectStamps", {
                    count: item.stampsTotal
                  })}
                </Text>
              </View>

              {item.inWallet ? (
                <IconInWallet />
              ) : (
                <IconAddToWallet
                  onPress={item.active ? this.addCard(item.id) : () => null}
                />
              )}
            </View>
          )}
          inactiveSlideScale={0.65}
          inactiveSlideOpacity={0.85}
          inactiveSlideShift={0}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={slideTargetWidth}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
        />
      </View>
    );
  }

  renderMarker = (marker, cluster) => {
    const key = marker.geometry.coordinates[0];

    // If a cluster
    if (marker.properties) {
      const markersInCluster = cluster.getLeaves(marker.id);

      return (
        <ClusterMarker
          key={key}
          coordinate={{
            latitude: Number(marker.geometry.coordinates[1]),
            longitude: Number(marker.geometry.coordinates[0])
          }}
          count={marker.properties.point_count}
          onPress={this.selectCard(markersInCluster[0].id)}
        />
      );
    } else {
      return (
        <Marker
          key={`${marker.id}`}
          item={marker}
          coordinate={{
            latitude: Number(marker.geometry.coordinates[1]),
            longitude: Number(marker.geometry.coordinates[0])
          }}
          onPress={this.selectCard(marker.id)}
        />
      );
    }
  };

  renderDataAsMap() {
    const { userPosition, region } = this.state;

    const allCoords = this.data.map(marker => ({
      ...marker,
      geometry: {
        coordinates: [marker.lng, marker.lat]
      }
    }));

    const { markers, cluster } = getCluster(allCoords, region);

    // console.log(cluster.points);

    return (
      <View style={styles.map}>
        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          provider={MapView.PROVIDER_GOOGLE}
          initialRegion={region}
          onRegionChange={region => this.setState({ region })}
        >
          <MapView.Marker coordinate={userPosition}>
            <View>
              <Image style={styles.indicator} source={LocationIndicator} />
            </View>
          </MapView.Marker>

          {markers.map((marker, index) =>
            this.renderMarker(marker, cluster, index)
          )}
        </MapView>

        {this.renderSelectedCardOnMap()}
      </View>
    );
  }

  navigateToWallet = () => {
    this.props.navigation.push(Routes.WALLET);
  };

  renderDataAsCards() {
    // Situation 1: a restaurant has the same card in two different locations.
    // In this case, we display only one card when rendering cards as list and
    // keep the default rendering when rendering as a map.
    const data = getUniqueData(this.data)
      // Filter inactive cards:
      .filter(item => item.active)
      // Show favourite items first:
      .sort(item => !item.favorite);

    return (
      <ScrollView style={styles.list}>
        <FlatList
          data={data}
          numColumns={2}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({ item }) => (
            <Card
              image={{ uri: item.logoUrl }}
              title={item.title}
              subtitle={i18n.t("map.collectStamps", {
                count: item.stampsTotal
              })}
              renderButton={() =>
                item.inWallet ? (
                  <CardButton
                    title={i18n.t("map.addCard")}
                    onPress={() => null}
                    disabled
                  />
                ) : (
                  <CardButton
                    title={i18n.t("map.addCard")}
                    onPress={this.addCard(item.id)}
                  />
                )
              }
              renderPrimaryAction={() =>
                item.favorite ? (
                  <AntDesign
                    name="star"
                    size={20}
                    color="#F3CE30"
                    onPress={this.removeFav(item.id)}
                    style={styles.star}
                  />
                ) : (
                  <AntDesign
                    name="staro"
                    size={20}
                    color="#95989A"
                    onPress={this.addFav(item.id)}
                    style={styles.star}
                  />
                )
              }
              renderSecondaryAction={() =>
                item.inWallet ? (
                  <WalletIcon
                    color={colors.primary}
                    onPress={this.navigateToWallet}
                  />
                ) : (
                  <WalletIcon color="#95989A" onPress={() => /* noop */ null} />
                )
              }
            />
          )}
        />
        <View style={{ height: 60 }} />
      </ScrollView>
    );
  }

  renderData() {
    switch (this.state.mode) {
      case MODE_MAP:
        return this.renderDataAsMap();

      case MODE_CARD:
        return this.renderDataAsCards();
    }
  }

  render() {
    const { navigation } = this.props;
    const { mode, filter, locationLoaded } = this.state;

    if (!locationLoaded) {
      return (
        <View style={[defaultStyles.container, defaultStyles.center]}>
          <Image source={MapLoader} style={{ width: 150, height: 150 }} />
        </View>
      );
    }

    return (
      <Background source={BackgroundImage} disableScroll>
        <MapHeader
          mode={mode}
          navigation={navigation}
          onSelectNearby={this.setFilter(FILTER_ALL)}
          onSelectFav={this.setFilter(FILTER_ONLINE)}
          onToggleMode={this.toggleMode}
          nearby={filter === FILTER_ALL}
          fav={filter === FILTER_ONLINE}
        />

        {this.renderData()}
      </Background>
    );
  }
}

const slideTargetWidth = 350;

const styles = StyleSheet.create({
  list: {
    margin: 8
  },

  star: {
    paddingVertical: 10,
    paddingHorizontal: 13
  },

  indicator: {
    zIndex: 1,
    // position: "absolute",

    // Center indicator horizontally:
    // alignSelf: "center",

    width: 120,
    height: 120
  },

  map: {
    flex: 1,
    zIndex: 1,

    // Center indicator vertically:
    justifyContent: "center",
    backgroundColor: colors.background
  },

  paginationDot: {
    marginHorizontal: 0,
    marginVertical: 0,
    padding: 0,

    width: 6,
    height: 6,
    borderRadius: 6
  },
  paginationContainer: {
    position: "absolute",
    bottom: 80,

    // Take all the width:
    left: 0,
    right: 0,

    marginBottom: 0
  },
  selectedContainer: {
    zIndex: 3,

    position: "absolute",
    bottom: 25,

    // Take all the width:
    left: 0,
    right: 0
  },
  selected: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",

    height: 80,
    width: slideTargetWidth,
    borderRadius: 80,

    backgroundColor: colors.primary
  },
  selectedInactive: {
    backgroundColor: colors.disabled
  },
  selectedImageContainer: {
    marginHorizontal: 12,

    alignItems: "center",
    justifyContent: "center",

    width: 55,
    height: 55,

    borderWidth: 5,
    borderStyle: "solid",
    borderColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 55,
    backgroundColor: colors.background
  },
  selectedImage: {
    width: 50,
    height: 50
  },
  selectedInfoContainer: {
    flex: 1
  },
  selectedTitle: {
    color: colors.color,
    fontSize: 14,
    fontFamily: layout.fontHead
  },
  selectedAmount: {
    color: "#709BE7",
    fontSize: 9,
    fontFamily: layout.fontText
  }
});

const mapStateToProps = state => ({
  isLoading: state.map.isLoading,
  data: state.map.data
});

const mapDispatchToProps = {
  getRegion,
  addCard,
  addFav,
  removeFav
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapNearbyScreen);
