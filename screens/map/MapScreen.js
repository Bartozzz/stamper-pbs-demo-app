import * as React from "react";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { MapView, Location, Permissions } from "expo";
import Carousel from "react-native-snap-carousel";
import {
  AsyncStorage,
  Dimensions,
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity
} from "react-native";

import Background from "../../components/Background";
import HeaderHamburger from "../../components/nav/HeaderHamburger";
import HeaderBackIcon from "../../components/nav/HeaderBack";
import MapHeader from "../../components/screens/map/Header";
import Card from "../../components/layout/card/Card";
import CardButton from "../../components/layout/card/CardButton";
import WalletIcon from "../../components/icons/WalletIcon";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

import { getRegion, addFav, removeFav } from "../../store/reducers/map";
import { addCard, FORCE_REFRESH_WALLET } from "../../store/reducers/wallet";
import { FORCE_REFRESH_PRIZES } from "../../store/reducers/prizes";

import mapStyle from "../../assets/mapStyle";
import PlusImage from "../../assets/images/plus.png";
import AddedImage from "../../assets/images/icons/already-in-wallet.png";
import BackgroundImage from "../../assets/backgrounds/wallet_wn.png";
import LocationIndicator from "../../assets/images/icons/location_indicator.png";
import MapLoader from "../../assets/loaders/map.gif";
import StampAdd from "../../assets/success/stamp_add.gif";

const MODE_MAP = "MODE_MAP";
const MODE_CARD = "MODE_CARD";
const FILTER_ALL = "FILTER_ALL";
const FILTER_FAV = "FILTER_FAV";

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
    selected: null,
    city: null,
    location: null,
    locationLoaded: false
  };

  get initialRegion() {
    const { location } = this.state;

    if (location && Reflect.has(location, "coords")) {
      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        // TODO: calculate deltas based on screen sizes:
        latitudeDelta: 0.025,
        longitudeDelta: 0.025
      };
    }
  }

  get data() {
    const { data } = this.props;
    const { filter } = this.state;

    switch (filter) {
      case FILTER_FAV:
        return data.filter(item => item.favorite === true);

      default:
        return data;
    }
  }

  componentDidMount() {
    const { getRegion } = this.props;

    this.requestUserPosition().then(data => {
      if (__DEV__) {
        getRegion("Paris", data.location.coords);
      } else {
        getRegion(data.city, data.location.coords);
      }

      this.setState(data);
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
      city: Array.isArray(reverse) ? reverse[0].city : null,
      location,
      locationLoaded: true
    };
  };

  selectCard = cardId => () => {
    this.setState({ selected: cardId });
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
          height: 98,
          width: 144,
          image: StampAdd,
          timeout: 3000
        });
      });
    }

    addCard(cardId)
      .then(response => {
        const { termsAndConditions } = response.payload.data;
        const { title, termsAndConditionsUrl } = termsAndConditions;

        if (termsAndConditionsUrl) {
          navigation.navigate(Routes.MAP_ACCEPT_CARD_TERMS, {
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
    const { selected } = this.state;
    const selectedCard = this.data.find(item => item.id === selected);

    // If no card is selected, render nothing:
    if (!selectedCard) {
      return null;
    }

    // Situation 2: a restaurant can have multiple cards in the same location.
    // When a card is selected, we should display all the cards in the selected
    // location.
    const selectedBatch = this.data.filter(item => {
      const eps = 0.00001;
      const latDiff = Math.abs(item.lat - selectedCard.lat);
      const lngDiff = Math.abs(item.lng - selectedCard.lng);

      return latDiff < eps && lngDiff < eps;
    });

    return (
      <View style={styles.selectedContainer}>
        <Carousel
          ref={carousel => (this.carouselRef = carousel)}
          data={selectedBatch}
          onSnapToItem={index => this.setState({ active: index })}
          renderItem={({ item }) => (
            <View style={styles.selected}>
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
                <View style={styles.selectedAddedContainer}>
                  <Image style={styles.selectAdded} source={AddedImage} />

                  <Text style={styles.selectedAddedContainerText}>
                    {i18n.t("map.cardAlreadyAdded")}
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.selectedAddContainer}
                  onPress={this.addCard(selected)}
                >
                  <Image style={styles.selectAdd} source={PlusImage} />
                </TouchableOpacity>
              )}
            </View>
          )}
          inactiveSlideScale={0.65}
          inactiveSlideOpacity={0.85}
          inactiveSlideShift={0}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={Dimensions.get("window").width * 0.725}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
        />
      </View>
    );
  }

  renderDataAsMap() {
    return (
      <View style={styles.map}>
        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          provider={MapView.PROVIDER_GOOGLE}
          initialRegion={this.initialRegion}
        >
          <MapView.Marker coordinate={this.initialRegion}>
            <View>
              <Image style={styles.indicator} source={LocationIndicator} />
            </View>
          </MapView.Marker>

          {this.data.map(item => (
            <MapView.Marker
              key={`${item.id}${item.lat}${item.lng}`}
              onPress={this.selectCard(item.id)}
              coordinate={{
                latitude: Number(item.lat),
                longitude: Number(item.lng)
              }}
            >
              <View>
                <Image style={styles.marker} source={{ uri: item.logoUrl }} />
              </View>
            </MapView.Marker>
          ))}
        </MapView>

        {this.renderSelectedCardOnMap()}
      </View>
    );
  }

  navigateToWallet = () => {
    this.props.navigation.navigate(Routes.WALLET);
  };

  renderDataAsCards() {
    // Situation 1: a restaurant has the same card in two different locations.
    // In this case, we display only one card when rendering cards as list and
    // keep the default rendering when rendering as a map.
    const data = this.data.reduce((acc, curr) => {
      const index = acc.findIndex(element => element.id === curr.id);

      if (index === -1) {
        return [...acc, curr];
      } else {
        return acc;
      }
    }, []);

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
          onSelectFav={this.setFilter(FILTER_FAV)}
          onToggleMode={this.toggleMode}
          nearby={filter === FILTER_ALL}
          fav={filter === FILTER_FAV}
        />

        {this.renderData()}
      </Background>
    );
  }
}

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

  marker: {
    zIndex: 2,
    width: 40,
    height: 40,
    borderRadius: 20,

    // Make sure the logo fits in the marker:
    resizeMode: "contain",
    backgroundColor: "white"
  },

  selectedContainer: {
    zIndex: 3,

    position: "absolute",
    bottom: 25,

    height: 100,
    width: Dimensions.get("window").width
  },
  selected: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",

    height: 80,
    width: 350,
    borderRadius: 80,

    backgroundColor: colors.primary
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
  },
  selectedAddContainer: {
    marginRight: 16
  },
  selectedAddedContainer: {
    marginRight: 14
  },
  selectedAddedContainerText: {
    position: "absolute",
    top: 2,
    left: 4,

    color: colors.primary,
    fontSize: 6,
    fontFamily: "nunito-regular"
  },
  selectAdd: {
    width: 48,
    height: 48
  },
  selectAdded: {
    height: 56,
    width: 74
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

export default connect(mapStateToProps, mapDispatchToProps)(MapNearbyScreen);
