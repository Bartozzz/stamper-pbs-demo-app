import * as React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import normalize from "react-native-normalize";

import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import * as Routes from "../../navigation";

import HeaderHamburger from "../../components/nav/HeaderHamburger";
import HeaderBackIcon from "../../components/nav/HeaderBack";
import Background from "../../components/Background";
import CardBackground from "../../components/CardBackground/";
import { formatDate } from "../../helpers/date";

const BackgroundImage = require("../../assets/backgrounds/details_wn.png");

class CardInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("merchant"),
    headerLeft: (
      <HeaderBackIcon
        navigation={navigation}
        onPress={() =>
          navigation.navigate(
            navigation.getParam("backTo", Routes.WALLET_PLACES)
          )
        }
      />
    ),
    headerRight: <HeaderHamburger navigation={navigation} />,
    headerStyle: {
      ...defaultStyles.headerTransparent,
      backgroundColor: colors.background,
    },
  });

  state = {
    active: 0,
  };

  openInLinkedApp = (link) => {
    if (Linking.canOpenURL(link)) {
      Linking.openURL(link);
    }
  };

  render() {
    const { navigation } = this.props;
    const { active } = this.state;

    const cards = navigation.getParam("cards");
    const card = cards[active];

    return (
      <Background source={BackgroundImage} disableScroll>
        <View style={styles.carousel}>
          <Carousel
            ref={(carousel) => (this.carouselRef = carousel)}
            data={cards}
            removeClippedSubviews={false}
            onSnapToItem={(index) => this.setState({ active: index })}
            renderItem={({ item }) => (
              <View style={styles.slideInnerContainer}>
                <CardBackground src={item.cardUrl}>
                  <View style={styles.slideInnerSection}>
                    <View
                      style={{ height: normalize(130, "height"), padding: 15 }}
                    >
                      {!item.cardOnly && (
                        <Image
                          source={{ uri: item.logoUrl }}
                          style={{
                            width: 80,
                            height: 80,
                            resizeMode: "contain",
                          }}
                        />
                      )}
                    </View>

                    <Text
                      style={[styles.slideInnerText, styles.slideInnerTextA]}
                    >
                      {item.cardNumber}
                    </Text>
                    <Text
                      style={[styles.slideInnerText, styles.slideInnerTextB]}
                    >
                      {item.title}
                    </Text>
                  </View>

                  <View
                    style={[styles.slideInnerSection, defaultStyles.center]}
                  >
                    {!item.cardOnly && (
                      <Image
                        source={{ uri: item.iconUrl }}
                        style={{ width: 100, height: 100 }}
                      />
                    )}
                  </View>
                </CardBackground>
              </View>
            )}
            inactiveSlideScale={0.9}
            inactiveSlideOpacity={0.5}
            inactiveSlideShift={8}
            sliderWidth={Dimensions.get("window").width}
            itemWidth={Dimensions.get("window").width * 0.75}
            containerCustomStyle={styles.slider}
            contentContainerCustomStyle={styles.sliderContentContainer}
          />

          <Pagination
            dotsLength={cards.length}
            carouselRef={this.carouselRef}
            activeDotIndex={active}
            containerStyle={styles.paginationContainer}
            dotColor={colors.color}
            dotStyle={styles.paginationDot}
            dotContainerStyle={styles.paginationDotContainer}
            inactiveDotColor={colors.color}
            inactiveDotOpacity={0.5}
            inactiveDotScale={1}
          />
        </View>

        <ScrollView style={styles.infoContainer}>
          <View style={[defaultStyles.row, styles.row]}>
            <View style={styles.textDescriptionContainer}>
              <Text style={styles.textDescription}>
                {i18n.t("card.details1")}
              </Text>
            </View>

            <View>
              <Text style={styles.textValue}>
                {card.stampsTotal - card.stampsToDate}
              </Text>
            </View>
          </View>

          {card.validToDate && (
            <View style={[defaultStyles.row, styles.row]}>
              <View style={styles.textDescriptionContainer}>
                <Text style={styles.textDescription}>
                  {i18n.t("card.details2")}
                </Text>
              </View>

              <View>
                <Text style={styles.textValue}>
                  {formatDate(card.validToDate)}
                </Text>
              </View>
            </View>
          )}

          <View style={[defaultStyles.row, styles.row]}>
            <View style={styles.textDescriptionContainer}>
              <Text style={styles.textDescription}>
                {i18n.t("card.details4")}
              </Text>
            </View>

            <View>
              <Text style={styles.textValue}>
                {card.stampsToDate}/{card.stampsTotal}
              </Text>
            </View>
          </View>

          {card.description && (
            <View style={[styles.row]}>
              <Text style={styles.descriptionTitle}>
                {i18n.t("card.details5")}
              </Text>

              <View>
                <Text style={styles.descriptionValue}>{card.description}</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {card.termsAndConditionsUrl && (
          <TouchableOpacity
            style={styles.terms}
            onPress={() => this.openInLinkedApp(card.termsAndConditionsUrl)}
          >
            <Text style={styles.termsText}>{i18n.t("card.seeTerms")}</Text>
          </TouchableOpacity>
        )}
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  carousel: {
    alignItems: "center",
    height: 300,
  },
  paginationDot: {
    marginHorizontal: 0,
    marginVertical: 0,
    padding: 0,

    width: 6,
    height: 6,
    borderRadius: 6,
  },
  paginationContainer: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 40,

    backgroundColor: colors.primary,
    borderRadius: 20,
  },

  slider: {
    marginTop: 20,
    overflow: "visible",
  },
  sliderContentContainer: {
    paddingVertical: 10,
  },
  slideInnerContainer: {
    // width: Dimensions.get("window").width * 0.75,
    width: normalize(280, "width"),
    height: normalize(180, "height"),

    // backgroundColor: colors.color,
    borderRadius: 10,
  },
  slideInnerImage: {
    ...defaultStyles.grow,
    ...defaultStyles.row,

    width: "100%",
    height: "100%",

    borderRadius: 10,
  },
  slideInnerSection: {
    flex: 1,
  },
  slideInnerText: {
    paddingLeft: 20,
  },
  slideInnerTextA: {
    marginBottom: 10,

    fontSize: 9,
    color: colors.info,
  },
  slideInnerTextB: {
    fontSize: 10,
    color: colors.info,
  },

  infoContainer: {
    flex: 1,

    backgroundColor: colors.color,
  },

  row: {
    alignItems: "center",

    minHeight: 74,

    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#efefef",
  },

  textDescriptionContainer: {
    flex: 1,
  },
  textDescription: {
    marginLeft: 24,

    color: "#636363",
    fontSize: 14,
    textAlign: "left",
    textTransform: "uppercase",
  },
  textValue: {
    marginRight: 24,

    fontSize: 14,
    textAlign: "right",
    textTransform: "uppercase",
  },

  descriptionTitle: {
    alignSelf: "flex-start",

    marginLeft: 24,
    marginTop: 24,

    color: "#636363",
    fontSize: 14,
    textAlign: "left",
    textTransform: "uppercase",
  },
  descriptionValue: {
    marginHorizontal: 24,
    marginVertical: 24,

    color: "#636363",
    fontSize: 14,
    textAlign: "left",
  },

  terms: {
    alignItems: "center",
    justifyContent: "center",

    height: 70,
  },
  termsText: {
    color: "#709BE7",
    fontSize: 14,
    textTransform: "uppercase",
  },
});

const mapStateToProps = (state) => ({
  // …
  isLoading: state.prizes.isLoading,
  prizes: state.prizes.prizes,
});

const mapDispatchToProps = {
  // …
};

export default connect(mapStateToProps, mapDispatchToProps)(CardInfoScreen);
