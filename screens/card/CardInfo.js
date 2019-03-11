import * as React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  ImageBackground,
  Dimensions
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import * as Routes from "../../navigation";

import HeaderHamburger from "../../components/nav/HeaderHamburger";
import HeaderBackIcon from "../../components/nav/HeaderBack";
import Background from "../../components/Background";
import { formatDate } from "../../helpers/date";

const BackgroundImage = require("../../assets/backgrounds/details_wn.png");
const CardImage = require("../../assets/backgrounds/card.png");

class CardInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("merchant"),
    headerLeft: (
      <HeaderBackIcon
        navigation={navigation}
        onPress={() => navigation.navigate(Routes.WALLET_PLACES)}
      />
    ),
    headerRight: <HeaderHamburger navigation={navigation} />,
    headerStyle: {
      ...defaultStyles.headerTransparent,
      backgroundColor: colors.background
    }
  });

  state = {
    active: 0
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
            ref={carousel => (this.carouselRef = carousel)}
            data={cards}
            onSnapToItem={index => this.setState({ active: index })}
            renderItem={({ item }) => (
              <View style={styles.slideInnerContainer}>
                <ImageBackground
                  source={CardImage}
                  style={styles.slideInnerImage}
                  resizeMode="cover"
                >
                  <ImageBackground
                    source={{ uri: item.cardUrl }}
                    style={styles.slideInnerImage}
                    resizeMode="cover"
                  >
                    <View style={styles.slideInnerSection}>
                      <View style={{ height: 130, padding: 15 }}>
                        {!item.cardOnly && (
                          <Image
                            source={{ uri: item.logoUrl }}
                            style={{ width: 80, height: 80 }}
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
                  </ImageBackground>
                </ImageBackground>
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

          <View style={[defaultStyles.row, styles.row]}>
            <View style={styles.textDescriptionContainer}>
              <Text style={styles.textDescription}>
                {i18n.t("card.details3")}
              </Text>
            </View>

            <View>
              <Text style={styles.textValue}>Yes</Text>
            </View>
          </View>

          <View style={[defaultStyles.row, styles.row]}>
            <View style={styles.textDescriptionContainer}>
              <Text style={styles.textDescription}>
                {i18n.t("card.details3")}
              </Text>
            </View>

            <View>
              <Text style={styles.textValue}>
                {card.stampsToDate}/{card.stampsTotal}
              </Text>
            </View>
          </View>
        </ScrollView>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  carousel: {
    alignItems: "center",
    height: 300
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
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginBottom: 40,

    backgroundColor: colors.primary,
    borderRadius: 20
  },

  slider: {
    marginTop: 20,
    overflow: "visible"
  },
  sliderContentContainer: {
    paddingVertical: 10
  },
  slideInnerContainer: {
    // width: Dimensions.get("window").width * 0.75,
    width: 280,
    height: 180,

    // backgroundColor: colors.color,
    borderRadius: 10
  },
  slideInnerImage: {
    ...defaultStyles.grow,
    ...defaultStyles.row,

    width: "100%",
    height: "100%",

    borderRadius: 10
  },
  slideInnerSection: {
    flex: 1
  },
  slideInnerText: {
    paddingLeft: 20
  },
  slideInnerTextA: {
    marginBottom: 10,

    fontSize: 9,
    color: colors.info
  },
  slideInnerTextB: {
    fontSize: 10,
    color: colors.info
  },

  infoContainer: {
    flex: 1,

    backgroundColor: colors.color
  },

  row: {
    alignItems: "center",

    height: 74,

    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#efefef"
  },

  textDescriptionContainer: {
    flex: 1
  },
  textDescription: {
    marginLeft: 24,

    color: "#636363",
    fontSize: 14,
    textAlign: "left",
    textTransform: "uppercase"
  },
  textValue: {
    marginRight: 24,

    fontSize: 14,
    textAlign: "right",
    textTransform: "uppercase"
  }
});

const mapStateToProps = state => ({
  // …
  isLoading: state.prizes.isLoading,
  prizes: state.prizes.prizes
});

const mapDispatchToProps = {
  // …
};

export default connect(mapStateToProps, mapDispatchToProps)(CardInfoScreen);
