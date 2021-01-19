import * as React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import normalize from "react-native-normalize";
import { FontAwesome } from "@expo/vector-icons";
import i18n from "../../../translations";
import defaultStyles from "../../../constants/Styles";
import theme from "../../../constants/theme";
import * as Routes from "../../../navigation";

import Theme from "./index.theme";
import * as Styled from "./index.styled";

import HeaderHamburger from "../../../components/HeaderHamburger";
import HeaderBack from "../../../components/HeaderBack";
import Background from "../../../components/Background";
import CardBackground from "../../../components/CardBackground/";
import Button from "../../../components/Button";
import { formatDate } from "../../../helpers/date";
import { SafeAreaView } from "react-navigation";

import images from "../../../constants/images";

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
      backgroundColor: theme.colors.background,
    },
    headerTitleStyle: { ...defaultStyles.headerCenteredTitle },
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
      <Theme>
        <SafeAreaView style={defaultStyles.container}>
          <Background scrollsToTop={true} source={images.BackgroundDetails}>
            <Styled.Carousel>
              <Carousel
                ref={(carousel) => (this.carouselRef = carousel)}
                data={cards}
                removeClippedSubviews={false}
                onSnapToItem={(index) => this.setState({ active: index })}
                renderItem={({ item }) => (
                  <Styled.SliderInnerContainer>
                    <CardBackground src={item.cardUrl}>
                      <Styled.SliderInnerSection>
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

                        <Styled.CardNumber>{item.cardNumber}</Styled.CardNumber>
                        <Styled.CardTitle>{item.title}</Styled.CardTitle>
                      </Styled.SliderInnerSection>

                      <Styled.SliderInnerSection style={defaultStyles.center}>
                        {!item.cardOnly && (
                          <Image
                            source={{ uri: item.iconUrl }}
                            style={{ width: 100, height: 100 }}
                          />
                        )}
                        {card.validToDate && (
                          <Styled.ValidToDate>
                            {i18n.t("card.details2")}
                            {"\n"}
                            {formatDate(card.validToDate)}
                          </Styled.ValidToDate>
                        )}
                      </Styled.SliderInnerSection>
                    </CardBackground>
                  </Styled.SliderInnerContainer>
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
                dotColor={theme.colors.white}
                dotStyle={styles.paginationDot}
                dotContainerStyle={styles.paginationDotContainer}
                inactiveDotColor={theme.colors.white}
                inactiveDotOpacity={0.5}
                inactiveDotScale={1}
              />
              {card.openingHours && (
                <Styled.OpeningHoursContainer>
                  <Styled.TextIcon
                    name="bell"
                    size={16}
                    color={theme.colors.white}
                  />
                  <Styled.OpeningHours>{card.openingHours}</Styled.OpeningHours>
                </Styled.OpeningHoursContainer>
              )}
            </Styled.Carousel>

            <Styled.InfoContainer>
              <Styled.Row style={defaultStyles.row}>
                <Styled.TextDescriptionContainer>
                  <Styled.TextDescription>
                    {i18n.t("card.details1")}
                  </Styled.TextDescription>
                </Styled.TextDescriptionContainer>

                <View>
                  <Styled.TextValue>
                    {card.stampsTotal - card.stampsToDate}
                  </Styled.TextValue>
                </View>
              </Styled.Row>

              <Styled.Row style={defaultStyles.row}>
                <Styled.TextDescriptionContainer>
                  <Styled.TextDescription>
                    {i18n.t("card.details4")}
                  </Styled.TextDescription>
                </Styled.TextDescriptionContainer>

                <View>
                  <Styled.TextValue>
                    {card.stampsToDate}/{card.stampsTotal}
                  </Styled.TextValue>
                </View>
              </Styled.Row>

              {actionCardActive && (
                <Styled.ActionCard>
                  <TouchableOpacity
                    onPress={() =>
                      this.setState({
                        actionCardActive: false,
                        actionCardAction: undefined,
                      })
                    }
                  >
                    <Styled.Close color="#95989A" size={20} name="times" />
                  </TouchableOpacity>

                  {card.logoUrl && (
                    <Styled.ActionCardImage source={{ uri: card.logoUrl }} />
                  )}
                  <Styled.ActionCardName>
                    {card.merchantName}
                  </Styled.ActionCardName>
                  <Styled.ActionCardAddress>
                    {card.address}
                  </Styled.ActionCardAddress>
                  <Styled.ButtonStyled
                    onPress={() =>
                      this.actionCardButtonOnPress(
                        card.ecommerceUrl,
                        card.phone
                      )
                    }
                    title={this.actionCardButtonTitle()}
                  />
                </Styled.ActionCard>
              )}
              {actionCardActive || (
                <View>
                  {card.description && (
                    <Styled.Row>
                      <Styled.DescriptionTitle>
                        {i18n.t("card.details5")}
                      </Styled.DescriptionTitle>

                      <View>
                        <Styled.DescriptionValue>
                          {card.description}
                        </Styled.DescriptionValue>
                      </View>
                    </Styled.Row>
                  )}

                  {collapsed || (
                    <View>
                      {card.address && (
                        <Styled.Row style={defaultStyles.row}>
                          <Styled.TextDescriptionContainer>
                            <Styled.TextDescription>
                              {i18n.t("card.details6")}
                            </Styled.TextDescription>
                          </Styled.TextDescriptionContainer>

                          <View>
                            <Styled.TextValue>{card.address}</Styled.TextValue>
                          </View>
                        </Styled.Row>
                      )}
                      {card.website && (
                        <Styled.Row style={defaultStyles.row}>
                          <Styled.TextDescriptionContainer>
                            <Styled.TextDescription>
                              {i18n.t("card.details7")}
                            </Styled.TextDescription>
                          </Styled.TextDescriptionContainer>

                          <View>
                            <Styled.TextValue>{card.website}</Styled.TextValue>
                          </View>
                        </Styled.Row>
                      )}
                      {card.companyDescription && (
                        <Styled.Row>
                          <Styled.DescriptionTitle>
                            {i18n.t("card.details8")}
                          </Styled.DescriptionTitle>

                          <View>
                            <Styled.DescriptionValue>
                              {card.companyDescription}
                            </Styled.DescriptionValue>
                          </View>
                        </Styled.Row>
                      )}
                    </View>
                  )}
                  <Styled.LearnMoreContainer style={defaultStyles.row}>
                    {card.companyDescription || card.address || card.website ? (
                      <TouchableOpacity
                        onPress={() => this.setState({ collapsed: !collapsed })}
                      >
                        <View>
                          {collapsed ? (
                            <Styled.LearnMore>
                              {i18n.t("card.learnMore")}
                            </Styled.LearnMore>
                          ) : (
                            <Styled.CollapseContainer>
                              <Styled.LearnMore>
                                {i18n.t("card.less")}
                              </Styled.LearnMore>
                              <Styled.TextIcon
                                name="arrow-up"
                                size={18}
                                color={theme.colors.primary}
                              />
                            </Styled.CollapseContainer>
                          )}
                        </View>
                      </TouchableOpacity>
                    ) : (
                      <Styled.LearnMore>
                        {i18n.t("card.learnMore")}
                      </Styled.LearnMore>
                    )}

                    <Styled.ButtonsContainer>
                      <Styled.ActionButton
                        onPress={
                          card.ecommerceUrl
                            ? () =>
                                this.setState({
                                  actionCardActive: true,
                                  actionCardAction: "website",
                                })
                            : null
                        }
                      >
                        <FontAwesome
                          name="shopping-cart"
                          size={18}
                          color={theme.colors.white}
                        />
                      </Styled.ActionButton>

                      <Styled.ActionButton
                        onPress={
                          card.phone
                            ? () =>
                                this.setState({
                                  actionCardActive: true,
                                  actionCardAction: "phone",
                                })
                            : null
                        }
                        active={Boolean(card.phone)}
                      >
                        <FontAwesome
                          name="phone"
                          size={18}
                          color={theme.colors.white}
                        />
                      </Styled.ActionButton>
                    </Styled.ButtonsContainer>
                  </Styled.LearnMoreContainer>
                </View>
              )}
            </Styled.InfoContainer>

            {actionCardActive ||
              (card.termsAndConditionsUrl && (
                <Styled.Terms
                  onPress={() =>
                    this.openInLinkedApp(card.termsAndConditionsUrl)
                  }
                >
                  <Styled.TermsText>{i18n.t("card.seeTerms")}</Styled.TermsText>
                </Styled.Terms>
              ))}
          </Background>
        </SafeAreaView>
      </Theme>
    );
  }
}

const styles = StyleSheet.create({
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
    backgroundColor: theme.colors.primary,
    borderRadius: 20,
  },

  slider: {
    marginTop: 20,
    overflow: "visible",
  },
  sliderContentContainer: {
    paddingVertical: 10,
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
