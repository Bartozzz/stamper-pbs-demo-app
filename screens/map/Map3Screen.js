import * as React from "react";
import { connect } from "react-redux";
import {
  AntDesign,
  Feather,
  MaterialIcons,
  FontAwesome,
  Foundation,
  Entypo
} from "@expo/vector-icons";
import Carousel from "react-native-snap-carousel";
import {
  AsyncStorage,
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity
} from "react-native";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import colors from "../../constants/Colors";

import { getRegion, addFav, removeFav } from "../../store/reducers/map";
import { addCard, FORCE_REFRESH_WALLET } from "../../store/reducers/wallet";
import { FORCE_REFRESH_PRIZES } from "../../store/reducers/prizes";

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
    return (
      <View style={styles.cards}>
        <Carousel
          renderItem={({ item }) => (
            <View style={[styles.card]}>
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
            </View>
          )}
        />
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
