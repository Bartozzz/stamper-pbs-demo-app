import * as React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import normalize from "react-native-normalize";
import { FontAwesome } from "@expo/vector-icons";
import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import * as Routes from "../../navigation";
import { ifIphoneX } from "react-native-iphone-x-helper";

import HeaderHamburger from "../../components/HeaderHamburger";
import HeaderBack from "../../components/HeaderBack";
import Background from "../../components/Background";
import CardBackground from "../../components/CardBackground/";
import Button from "../../components/Button";
import { formatDate } from "../../helpers/date";
import { SafeAreaView } from "react-navigation";

const BackgroundImage = require("../../assets/backgrounds/details_wn.png");

class CardInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("merchant"),
    headerLeft: (
      <HeaderBack
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
    collapsed: true,
    actionCardActive: false,
    actionCardAction: undefined,
  };

  openInLinkedApp = (link) => {
    if (Linking.canOpenURL(link)) {
      Linking.openURL(link);
    }
  };

  actionCardButtonTitle = () => {
    if (this.state.actionCardAction === "website") {
      return i18n.t("card.orderOnline");
    } else if (this.state.actionCardAction === "phone") {
      return i18n.t("card.call");
    }
  };

  actionCardButtonOnPress = (link, phone) => {
    if (this.state.actionCardAction === "website") {
      this.openInLinkedApp(link.startsWith("http") ? link : `https://${link}`);
    } else if (this.state.actionCardAction === "phone") {
      this.openInLinkedApp(`tel:${phone.replace(/-| /g, "")}`);
    }
  };

  render() {
    const { navigation } = this.props;
    const { active, collapsed, actionCardActive } = this.state;

    const cards = navigation.getParam("cards");
    const card = cards[active];

    return (
      <SafeAreaView style={defaultStyles.container}>
        <Background scrollsToTop={true} source={BackgroundImage}>
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
                        style={{
                          height: normalize(130, "height"),
                          padding: 15,
                        }}
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
                      {card.validToDate && (
                        <Text style={styles.validToDate}>
                          {i18n.t("card.details2")}
                          {"\n"}
                          {formatDate(card.validToDate)}
                        </Text>
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
            {card.openingHours && (
              <View style={styles.openingHoursContainer}>
                <FontAwesome
                  style={styles.textIcon}
                  name="bell"
                  size={16}
                  color={colors.color}
                />
                <Text style={styles.openingHours}>{card.openingHours}</Text>
              </View>
            )}
          </View>

          <View style={styles.infoContainer}>
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

            {actionCardActive && (
              <View style={styles.actionCard}>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({
                      actionCardActive: false,
                      actionCardAction: undefined,
                    })
                  }
                >
                  <FontAwesome
                    style={styles.actionCardClose}
                    color="#95989A"
                    size={20}
                    name="times"
                  />
                </TouchableOpacity>

                {card.logoUrl && (
                  <Image
                    source={{ uri: card.logoUrl }}
                    style={styles.actionCardImage}
                  />
                )}
                <Text style={styles.actionCardName}>{card.merchantName}</Text>
                <Text style={styles.actionCardAddress}>{card.address}</Text>
                <Button
                  onPress={() =>
                    this.actionCardButtonOnPress(card.ecommerceUrl, card.phone)
                  }
                  style={styles.actionCardButton}
                  title={this.actionCardButtonTitle()}
                />
              </View>
            )}
            {actionCardActive || (
              <View>
                {card.description && (
                  <View style={[styles.row]}>
                    <Text style={styles.descriptionTitle}>
                      {i18n.t("card.details5")}
                    </Text>

                    <View>
                      <Text style={styles.descriptionValue}>
                        {card.description}
                      </Text>
                    </View>
                  </View>
                )}

                {collapsed || (
                  <View>
                    {card.address && (
                      <View style={[defaultStyles.row, styles.row]}>
                        <View style={styles.textDescriptionContainer}>
                          <Text style={styles.textDescription}>
                            {i18n.t("card.details6")}
                          </Text>
                        </View>

                        <View>
                          <Text style={styles.textValue}>{card.address}</Text>
                        </View>
                      </View>
                    )}
                    {card.website && (
                      <View style={[defaultStyles.row, styles.row]}>
                        <View style={styles.textDescriptionContainer}>
                          <Text style={styles.textDescription}>
                            {i18n.t("card.details7")}
                          </Text>
                        </View>

                        <View>
                          <Text style={styles.textValue}>{card.website}</Text>
                        </View>
                      </View>
                    )}
                    {card.companyDescription && (
                      <View style={[styles.row]}>
                        <Text style={styles.descriptionTitle}>
                          {i18n.t("card.details8")}
                        </Text>

                        <View>
                          <Text style={styles.descriptionValue}>
                            {card.companyDescription}
                          </Text>
                        </View>
                      </View>
                    )}
                  </View>
                )}
                <View
                  style={[
                    defaultStyles.row,
                    styles.row,
                    styles.learnMoreContainer,
                  ]}
                >
                  {card.companyDescription || card.address || card.website ? (
                    <TouchableOpacity
                      onPress={() => this.setState({ collapsed: !collapsed })}
                    >
                      <View>
                        {collapsed ? (
                          <Text style={styles.learnMoreText}>
                            {i18n.t("card.learnMore")}
                          </Text>
                        ) : (
                          <View style={styles.collapseText}>
                            <Text style={styles.learnMoreText}>
                              {i18n.t("card.less")}
                            </Text>
                            <FontAwesome
                              name="arrow-up"
                              size={18}
                              color={colors.primary}
                              style={styles.textIcon}
                            />
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  ) : (
                    <Text style={{ color: "#dad9e3" }}>
                      {i18n.t("card.learnMore")}
                    </Text>
                  )}

                  <View style={styles.buttons}>
                    <TouchableOpacity
                      onPress={
                        card.ecommerceUrl
                          ? () =>
                              this.setState({
                                actionCardActive: true,
                                actionCardAction: "website",
                              })
                          : null
                      }
                      style={[
                        styles.button,
                        {
                          backgroundColor: card.ecommerceUrl
                            ? colors.primary
                            : "#dad9e3",
                        },
                      ]}
                    >
                      <FontAwesome
                        name="shopping-cart"
                        size={18}
                        color={colors.color}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={
                        card.phone
                          ? () =>
                              this.setState({
                                actionCardActive: true,
                                actionCardAction: "phone",
                              })
                          : null
                      }
                      style={[
                        styles.button,
                        {
                          backgroundColor: card.phone
                            ? colors.primary
                            : "#dad9e3",
                        },
                      ]}
                    >
                      <FontAwesome
                        name="phone"
                        size={18}
                        color={colors.color}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          </View>

          {actionCardActive ||
            (card.termsAndConditionsUrl && (
              <TouchableOpacity
                style={styles.terms}
                onPress={() => this.openInLinkedApp(card.termsAndConditionsUrl)}
              >
                <Text style={styles.termsText}>{i18n.t("card.seeTerms")}</Text>
              </TouchableOpacity>
            ))}
        </Background>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  carousel: {
    alignItems: "center",
    ...ifIphoneX(
      {
        height: 380,
      },
      {
        height: 300,
      }
    ),
  },
  paginationDot: {
    marginHorizontal: 0,
    marginVertical: 0,
    padding: 0,

    width: 5,
    height: 5,
    borderRadius: 5,
  },
  paginationContainer: {
    paddingVertical: 8,
    paddingHorizontal: 1,
    marginBottom: 20,
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

  validToDate: {
    color: colors.color,
    fontSize: 11,
    textAlign: "right",
  },

  openingHoursContainer: {
    flexDirection: "row",

    marginBottom: 30,
  },

  openingHours: {
    color: colors.color,
  },

  textIcon: {
    marginHorizontal: 10,
  },

  infoContainer: {
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
    textAlign: "justify",
  },

  learnMoreContainer: {
    flex: 1,
    marginLeft: 24,
    justifyContent: "space-between",
  },
  learnMoreText: {
    color: colors.primary,
    fontSize: 14,
  },
  collapseText: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttons: {
    flexDirection: "row",
    marginRight: 14,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",

    marginRight: 8,

    width: 33,
    height: 33,

    borderRadius: 19,
  },

  terms: {
    alignItems: "center",
    justifyContent: "center",

    height: 60,

    backgroundColor: colors.primary,
  },
  termsText: {
    color: colors.color,
    fontSize: 14,
  },

  actionCard: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,

    backgroundColor: "#F8F8F8",

    zIndex: 9999,
    bottom: 0,
    height: 265,
  },
  actionCardClose: {
    alignSelf: "flex-end",

    marginHorizontal: 25,
    marginTop: 25,
  },
  actionCardImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: -15,
  },
  actionCardName: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "poppins-medium",

    marginTop: 20,
  },

  actionCardAddress: {
    color: "#77838F",
    fontSize: 14,
    fontFamily: "nunito-regular",
    textAlign: "center",
  },

  actionCardButton: {
    width: "85%",

    alignSelf: "center",
    marginTop: 20,
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
