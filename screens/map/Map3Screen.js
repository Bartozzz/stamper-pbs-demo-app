import * as React from "react";
import * as R from "ramda";
import { connect } from "react-redux";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  FontAwesome,
  Foundation,
  Entypo
} from "@expo/vector-icons";
import MapView from "react-native-maps";
import Carousel from "react-native-snap-carousel";
import {
  Linking,
  AsyncStorage,
  Dimensions,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity
} from "react-native";

import Background from "../../components/Background";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import colors from "../../constants/Colors";
import { getCluster } from "../../helpers/map";

import { getRegion, addFav, removeFav } from "../../store/reducers/map";
import { addCard, FORCE_REFRESH_WALLET } from "../../store/reducers/wallet";
import { FORCE_REFRESH_PRIZES } from "../../store/reducers/prizes";

import BackgroundImage from "../../assets/backgrounds/wallet_wn.png";
import CardAdd from "../../assets/success/card_add.gif";

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

function createCardFromMerchantData(data) {
  return data;
}

class MapNearbyScreen extends React.Component {
  state = {
    filter: 0,
    selected: null,
    region: null,
    city: null,
    userPosition: null,
    locationLoaded: false,
    showCards: false,
    cardsToShow: []
  };

  get data() {
    // All:
    if (this.state.filter === 0) {
      return this.props.data;
    }

    // Filter by category:
    const filter = this.props.filters[this.state.filter];

    return this.props.data
      .filter(item => item.filter === filter)
      .sort((a, b) => {
        const userCoords = {
          lat: this.state.userPosition.latitude,
          lng: this.state.userPosition.longitude
        };

        const aDist = calculateDistance(a, userCoords);
        const bDist = calculateDistance(b, userCoords);

        return aDist - bDist;
      });
  }

  get groupedByMerchant() {
    return R.reduce((acc, cur) => {
      const index = R.findIndex(
        R.allPass([
          R.propEq("merchantId", cur.merchantId),
          R.propEq("lat", cur.lat),
          R.propEq("lng", cur.lng)
        ])
      )(acc);

      if (index > -1) {
        return R.over(
          R.compose(R.lensIndex(index), R.lensProp("cards")),
          R.append(createCardFromMerchantData(cur))
        )(acc);
      } else {
        return R.append({
          lat: cur.lat,
          lng: cur.lng,
          logoUrl: cur.logoUrl,
          merchantId: cur.merchantId,
          cards: [createCardFromMerchantData(cur)]
        })(acc);
      }
    }, [])(this.data);
  }

  addCard = cardId => () => {
    const { navigation, addCard } = this.props;

    AsyncStorage.setItem(FORCE_REFRESH_WALLET, JSON.stringify(true));
    AsyncStorage.setItem(FORCE_REFRESH_PRIZES, JSON.stringify(true));

    function confirmCardTerms() {
      addCard(cardId, true).then(() => {
        navigation.navigate(Routes.INFO_SUCCESS, {
          redirect: Routes.WALLET_CARDS,
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
          redirect: Routes.MAP,
          message: i18n.t("errors.wallet.cardAdd")
        });
      });
  };

  renderSelectedCardOnMap() {
    const data = this.state.cardsToShow.length
      ? this.state.cardsToShow
      : this.data;

    return (
      <View style={styles.cards}>
        <Carousel
          ref={c => {
            this.carousel = c;
          }}
          useScrollView={false}
          data={data}
          onSnapToItem={index => {
            // const card = this.data[index];
            //
            // this.mapView.animateToRegion(
            //   {
            //     latitude: parseFloat(card.lat),
            //     longitude: parseFloat(card.lng)
            //   },
            //   1000
            // );
          }}
          renderItem={({ item }) => (
            <View style={[styles.card]}>
              <Text style={[styles.cardName]}>{item.merchantName}</Text>

              <View
                style={[
                  styles.cardFlip,
                  styles.cardFlipShow,
                  this.state.selected === item.id && styles.cardFlipHide
                ]}
              >
                <View>
                  <View style={styles.cardImageIconContainer}>
                    <Image
                      style={styles.cardImageIcon}
                      source={{ uri: item.logoUrl }}
                    />
                  </View>

                  <Image
                    style={styles.cardImage}
                    source={{ uri: item.backgroundImageUrl }}
                  />
                </View>

                <View style={[styles.cardSection]}>
                  <Text style={[styles.cardSectionIcon]}>
                    <AntDesign name="tag" size={18} color="#c1c0ca" />
                  </Text>

                  <Text style={[styles.cardSectionText]}>{item.title}</Text>
                </View>

                <View style={[styles.cardSection]}>
                  <Text style={[styles.cardSectionIcon]}>
                    <Feather name="clock" size={18} color="#c1c0ca" />
                  </Text>

                  <Text
                    style={[
                      styles.cardSectionText,
                      !item.active && styles.invalid
                    ]}
                  >
                    {item.validTo
                      ? i18n.t("map.validTill", { date: item.validToDate })
                      : i18n.t("map.validDays", { count: item.validDays })}
                  </Text>
                </View>

                <View style={[styles.cardSection]}>
                  <Text style={[styles.cardSectionIcon]}>
                    <MaterialIcons
                      name="monetization-on"
                      size={18}
                      color="#c1c0ca"
                    />
                  </Text>

                  <ScrollView style={{ height: 70 }}>
                    <Text style={[styles.cardSectionText]}>
                      {item.cardDescription}
                    </Text>
                  </ScrollView>
                </View>
              </View>

              <View
                style={[
                  styles.cardFlip,
                  styles.cardFlipActive,
                  styles.cardFlipHide,
                  this.state.selected === item.id && styles.cardFlipShow
                ]}
              >
                <ScrollView style={{ flexGrow: 0, height: 130 }}>
                  <Text style={[styles.cardDescription, styles.cardLightText]}>
                    {item.companyDescription}
                  </Text>
                </ScrollView>

                <View style={[styles.cardSection]}>
                  <Text style={[styles.cardSectionIcon]}>
                    <Entypo name="link" size={18} color="#000" />
                  </Text>

                  <Text style={[styles.cardSectionText, styles.cardLightText]}>
                    {item.website}
                  </Text>
                </View>

                <View style={[styles.cardSection]}>
                  <Text style={[styles.cardSectionIcon]}>
                    <Foundation name="marker" size={18} color="#000" />
                  </Text>

                  <Text style={[styles.cardSectionText, styles.cardLightText]}>
                    {item.address}
                  </Text>
                </View>

                <View style={[styles.cardSection]}>
                  <Text style={[styles.cardSectionIcon]}>
                    <FontAwesome name="bell" size={18} color="#000" />
                  </Text>

                  <Text style={[styles.cardSectionText, styles.cardLightText]}>
                    {item.openingHours}
                  </Text>
                </View>
              </View>

              <View style={[styles.cardFooter]}>
                <View style={[styles.cardFooterButtons]}>
                  <TouchableOpacity
                    onPress={() => {
                      if (!item.companyDescription) {
                        return;
                      }

                      if (this.state.selected === item.id) {
                        this.setState({ selected: null });
                      } else {
                        this.setState({ selected: item.id });
                      }
                    }}
                  >
                    <View
                      style={[
                        styles.cardFooterButton,
                        item.companyDescription && styles.cardFooterButtonActive
                      ]}
                    >
                      <Entypo name="message" size={20} color="#fff" />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => item.phone && this.openCall(item.phone)}
                  >
                    <View
                      style={[
                        styles.cardFooterButton,
                        item.phone && styles.cardFooterButtonActive
                      ]}
                    >
                      <FontAwesome name="phone" size={20} color="#fff" />
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      item.ecommerceUrl && this.openUrl(item.ecommerceUrl)
                    }
                  >
                    <View
                      style={[
                        styles.cardFooterButton,
                        item.ecommerceUrl && styles.cardFooterButtonActive
                      ]}
                    >
                      <Entypo name="shopping-cart" size={16} color="#fff" />
                    </View>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={
                    item.inWallet || !item.active
                      ? () => null
                      : this.addCard(item.id)
                  }
                >
                  <View
                    style={[
                      styles.cardFooterAddCard,
                      !item.inWallet &&
                        item.active &&
                        styles.cardFooterAddCardActive
                    ]}
                  >
                    <Text
                      style={[
                        styles.cardFooterAddCardText,
                        !item.inWallet &&
                          item.active &&
                          styles.cardFooterAddCardTextActive
                      ]}
                    >
                      {i18n.t("map.addCard")}
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          )}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          inactiveSlideShift={0}
          sliderWidth={Dimensions.get("window").width}
          itemWidth={slideTargetWidth + slideTargetMargin}
          containerCustomStyle={styles.slider}
          contentContainerCustomStyle={styles.sliderContentContainer}
        />
      </View>
    );
  }

  renderDataAsMap() {
    const { showCards, userPosition, region } = this.state;

    const allCoords = this.groupedByMerchant.map(marker => ({
      ...marker,
      geometry: {
        coordinates: [marker.lng, marker.lat]
      }
    }));

    const { markers, cluster } = getCluster(allCoords, region);

    return (
      <View style={styles.map}>
        <MapView
          ref={ref => (this.mapView = ref)}
          style={styles.map}
          customMapStyle={mapStyle}
          provider={MapView.PROVIDER_GOOGLE}
          initialRegion={region}
          maxZoomLevel={18}
          onRegionChange={region => this.setState({ region })}
        >
          {markers.map((marker, index) =>
            this.renderMarker(marker, cluster, index)
          )}
        </MapView>

        {showCards && this.renderSelectedCardOnMap()}

        <TouchableWithoutFeedback
          onPress={() =>
            this.setState(state => ({
              showCards: !state.showCards,
              cardsToShow: []
            }))
          }
        >
          <View style={styles.showSelectedOnMapActivator}>
            <Text style={styles.showSelectedOnMapActivatorText}>
              {showCards ? i18n.t("map.closeCards") : i18n.t("map.showCards")}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const slideTargetWidth = 300;
const slideTargetMargin = 6;
const slideTargetPadding = 10;

const styles = StyleSheet.create({
  invalid: {
    color: "red"
  },

  map: {
    flex: 1,
    zIndex: 1,

    // Center indicator vertically:
    justifyContent: "center",
    backgroundColor: colors.background
  },

  cards: {
    zIndex: 3,

    position: "absolute",
    bottom: 100,

    // Take all the width:
    left: 0,
    right: 0
  },
  cardFlip: {
    minHeight: 250,
    backgroundColor: colors.color
  },
  cardFlipActive: {
    backgroundColor: colors.primary,
    paddingTop: slideTargetPadding,
    paddingBottom: slideTargetPadding * 2
  },
  cardFlipHide: {
    display: "none"
  },
  cardFlipShow: {
    display: "flex"
  },
  card: {
    backgroundColor: colors.color,
    borderRadius: 5,

    margin: slideTargetMargin
  },
  cardName: {
    margin: slideTargetPadding,

    fontSize: 16,
    fontWeight: "bold"
  },
  cardDescription: {
    margin: slideTargetPadding
  },
  cardImage: {
    margin: slideTargetPadding,
    width: slideTargetWidth - slideTargetPadding * 2,
    height: (slideTargetWidth - slideTargetPadding * 2) * 0.3,
    resizeMode: "cover"
  },
  cardImageIconContainer: {
    position: "absolute",
    zIndex: 9999,

    alignSelf: "center",
    marginVertical: slideTargetPadding + 10,
    marginHorizontal: slideTargetPadding,

    width: (slideTargetWidth - slideTargetPadding * 2) * 0.3 - 20,
    height: (slideTargetWidth - slideTargetPadding * 2) * 0.3 - 20,

    backgroundColor: "white",
    borderRadius: ((slideTargetWidth - slideTargetPadding * 2) * 0.3) / 2
  },
  cardImageIcon: {
    width: (slideTargetWidth - slideTargetPadding * 2) * 0.3 - 20,
    height: (slideTargetWidth - slideTargetPadding * 2) * 0.3 - 20,
    borderRadius: ((slideTargetWidth - slideTargetPadding * 2) * 0.3 - 20) / 2,
    resizeMode: "contain"
  },
  cardSection: {
    marginHorizontal: slideTargetPadding,
    marginVertical: slideTargetPadding / 2,

    flexDirection: "row"
  },
  cardSectionIcon: {
    marginRight: 5,
    textAlign: "center",

    width: 20
  },
  cardSectionText: {
    paddingRight: slideTargetPadding * 2
  },
  cardLightText: {
    color: colors.color
  },
  cardFooter: {
    flexDirection: "row",
    padding: slideTargetPadding
  },
  cardFooterButtons: {
    flexDirection: "row",
    width: 130
  },
  cardFooterButton: {
    alignItems: "center",
    justifyContent: "center",

    marginRight: 7,

    width: 37,
    height: 37,

    backgroundColor: "#dad9e3",
    borderRadius: 19
  },
  cardFooterButtonActive: {
    backgroundColor: colors.primary
  },
  cardFooterAddCard: {
    alignItems: "center",
    justifyContent: "center",

    width: slideTargetWidth - 130 - slideTargetPadding * 3,
    height: 37,

    backgroundColor: "#dad9e3",
    borderRadius: 19
  },
  cardFooterAddCardActive: {
    backgroundColor: colors.primary
  },
  cardFooterAddCardText: {
    color: colors.color
  },

  showSelectedOnMapActivator: {
    zIndex: 3,

    alignItems: "center",
    justifyContent: "center",

    position: "absolute",
    bottom: 25,
    left: 0,
    right: 0,

    height: 70,

    backgroundColor: colors.primary
  },
  showSelectedOnMapActivatorText: {
    color: colors.color
  }
});

const mapStateToProps = state => ({
  isLoading: state.map.isLoading,
  filters: state.map.filters,
  data: state.map.data
});

const mapDispatchToProps = {
  getRegion,
  addCard,
  addFav,
  removeFav
};

export default connect(mapStateToProps, mapDispatchToProps)(MapNearbyScreen);
