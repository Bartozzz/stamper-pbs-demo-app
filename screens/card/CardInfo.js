import * as React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, ScrollView, Text, Dimensions } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";

import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import * as Routes from "../../navigation";

import Hamburger from "../../components/Hamburger";
import HeaderBackIcon from "../../components/HeaderBack";
import Button from "../../components/Button";
import Background from "../../components/Background";
import { formatDate } from "../../helpers/date";

const BackgroundImage = require("../../assets/backgrounds/prizes_wn.png");

class CardInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("merchant"),
    headerLeft: (
      <HeaderBackIcon
        navigation={navigation}
        onPress={() => navigation.navigate(Routes.WALLET_PLACES)}
      />
    ),
    headerRight: <Hamburger navigation={navigation} />,
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

    const merchant = navigation.getParam("merchant");
    const cards = navigation.getParam("cards");
    const card = cards[active];

    console.log(card);

    return (
      <Background source={BackgroundImage} disableScroll>
        <View style={styles.carousel}>
          <Carousel
            ref={carousel => (this.carouselRef = carousel)}
            data={cards}
            onSnapToItem={index => this.setState({ active: index })}
            renderItem={({ item, index }) => (
              <View style={styles.slideInnerContainer}>{/* … */}</View>
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
                Ilość pieczątek do nagrody
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
              <Text style={styles.textDescription}>Promocja trwa do</Text>
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
                Możliwość wymiany pieczątek
              </Text>
            </View>

            <View>
              <Text style={styles.textValue}>TAK</Text>
            </View>
          </View>

          <View style={[defaultStyles.row, styles.row]}>
            <View style={styles.textDescriptionContainer}>
              <Text style={styles.textDescription}>Zebrane pieczątki</Text>
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

    backgroundColor: colors.color,
    borderRadius: 10
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
