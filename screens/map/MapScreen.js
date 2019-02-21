import * as React from "react";
import { connect } from "react-redux";
import { AntDesign } from "@expo/vector-icons";
import { MapView, Location, Permissions } from "expo";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";

import Background from "../../components/Background";
import Hamburger from "../../components/Hamburger";
import HeaderBackIcon from "../../components/HeaderBack";
import MapHeader from "../../components/map/Header";
import Card from "../../components/Card";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

import { getRegion, addFav, removeFav } from "../../store/reducers/map";
import { addCard } from "../../store/reducers/wallet";

import mapStyle from "../../assets/mapStyle";
import PlusImage from "../../assets/images/plus.png";
import BackgroundImage from "../../assets/backgrounds/wallet_wn.png";
import LocationIndicator from "../../assets/images/icons/location_indicator.png";

const MODE_MAP = "MODE_MAP";
const MODE_CARD = "MODE_CARD";
const FILTER_ALL = "FILTER_ALL";
const FILTER_FAV = "FILTER_FAV";

class MapNearbyScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Okolica",
    headerLeft: <HeaderBackIcon navigation={navigation} />,
    headerRight: <Hamburger navigation={navigation} />,
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
        latitudeDelta: 1,
        longitudeDelta: 1
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

    this.requestUserPosition()
      .then(data => {
        getRegion(data.city);
        // getRegion("Paris");

        this.setState(data);
      })
      .catch(err => {
        getRegion("Paris");

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

    addCard(cardId)
      .then(() => {
        navigation.navigate(Routes.INFO_SUCCESS, {
          redirect: Routes.DASHBOARD,
          message: i18n.t("success.wallet.cardAdd")
        });
      })
      .catch(err => {
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

  renderDataAsMap() {
    const { location, selected } = this.state;
    const selectedCard = this.data.find(item => item.id === selected);

    return (
      <View style={styles.map}>
        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          provider={MapView.PROVIDER_GOOGLE}
          minZoomLevel={15}
          initialRegion={this.initialRegion}
        >
          <MapView.Marker coordinate={this.initialRegion}>
            <View>
              <Image style={styles.indicator} source={LocationIndicator} />
            </View>
          </MapView.Marker>

          {this.data.map(item => (
            <MapView.Marker
              key={item.id}
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

        {selectedCard && (
          <View style={styles.selected}>
            <View style={styles.selectedImageContainer}>
              <Image
                style={styles.selectedImage}
                source={{ uri: selectedCard.iconUrl }}
              />
            </View>

            <View style={styles.selectedInfoContainer}>
              <Text style={styles.selectedTitle}>{selectedCard.title}</Text>
              <Text style={styles.selectedAmount}>
                {selectedCard.stampsTotal}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.selectedAddContainer}
              onPress={this.addCard(selected)}
            >
              <Image style={styles.selectAdd} source={PlusImage} />
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  renderDataAsCards() {
    return (
      <ScrollView style={styles.list}>
        <FlatList
          data={this.data}
          numColumns={2}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({ item }) => (
            <Card
              image={{ uri: item.logoUrl }}
              title={item.title}
              subtitle={`zbierz ${item.stampsTotal} pieczątek`}
              action={"Dodaj kartę"}
              onPress={this.addCard(item.id)}
              renderAction={() =>
                item.favorite ? (
                  <AntDesign
                    name="star"
                    size={20}
                    color="#F3CE30"
                    onPress={this.removeFav(item.id)}
                  />
                ) : (
                  <AntDesign
                    name="staro"
                    size={20}
                    color="#95989A"
                    onPress={this.addFav(item.id)}
                  />
                )
              }
            />
          )}
        />
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
          <ActivityIndicator color={colors.primary} size="large" />
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
    borderRadius: 20
  },

  selected: {
    zIndex: 3,

    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",

    position: "absolute",
    bottom: 25,

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
  selectAdd: {
    width: 48,
    height: 48
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
