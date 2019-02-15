import * as React from "react";
import { connect } from "react-redux";
import { MapView, Location, Permissions } from "expo";
import { StyleSheet, View, Text, Image, ActivityIndicator } from "react-native";

import Hamburger from "../../components/Hamburger";
import HeaderBackIcon from "../../components/HeaderBack";
import MapHeader from "../../components/map/Header";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

import { getRegion } from "../../store/reducers/map";

import mapStyle from "../../assets/mapStyle";
import LocationIndicator from "../../assets/images/icons/location_indicator.png";

const MODE_MAP = "MODE_MAP";
const MODE_CARD = "MODE_CARD";

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

  componentDidMount() {
    const { getRegion } = this.props;

    this.requestUserPosition()
      // .then(data => getRegion(data.city))
      .then(data => getRegion("Paris"))
      .catch(err => getRegion("Paris"));
  }

  toggleMode = () => {
    if (this.state.mode === MODE_MAP) {
      this.setState({ mode: MODE_CARD });
    } else {
      this.setState({ mode: MODE_MAP });
    }
  };

  requestUserPosition = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    let location;
    let reverse;

    if (status === "granted") {
      // Get user geocode location:
      location = await Location.getCurrentPositionAsync({});

      // Try to find the name of the city the current user is in:
      reverse = await Location.reverseGeocodeAsync(location.coords);
    }

    const newState = {
      city: Array.isArray(reverse) ? reverse[0].city : null,
      location,
      locationLoaded: true
    };

    this.setState(newState);

    return newState;
  };

  renderDataAsMap() {
    const { data } = this.props;
    const { location } = this.state;

    return (
      <View style={styles.map}>
        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          provider={MapView.PROVIDER_GOOGLE}
          minZoomLevel={15}
          initialRegion={this.initialRegion}
        >
          {data.map(item => (
            <MapView.Marker
              key={item.id}
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

          <MapView.Marker coordinate={this.initialRegion}>
            <View>
              <Image style={styles.indicator} source={LocationIndicator} />
            </View>
          </MapView.Marker>
        </MapView>
      </View>
    );
  }

  renderDataAsCards() {
    return null;
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
    const { mode, locationLoaded } = this.state;

    if (!locationLoaded) {
      return (
        <View style={[defaultStyles.container, defaultStyles.center]}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      );
    }

    return (
      <>
        <MapHeader
          mode={mode}
          navigation={navigation}
          onToggleMode={this.toggleMode}
          nearby
        />

        {this.renderData()}
      </>
    );
  }
}

const styles = StyleSheet.create({
  indicator: {
    // position: "absolute",

    // Center indicator horizontally:
    // alignSelf: "center",

    width: 300,
    height: 300
  },

  map: {
    flex: 1,
    zIndex: 1,

    // Center indicator vertically:
    justifyContent: "center",
    backgroundColor: colors.background
  },

  marker: {
    width: 40,
    height: 40,
    borderRadius: 20
  }
});

const mapStateToProps = state => ({
  // …
  isLoading: state.map.isLoading,
  data: state.map.data
});

const mapDispatchToProps = {
  // …
  getRegion
};

export default connect(mapStateToProps, mapDispatchToProps)(MapNearbyScreen);
