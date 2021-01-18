import * as React from "react";
import { connect } from "react-redux";
import { View, TouchableOpacity, ScrollView } from "react-native";
import * as Analytics from "expo-firebase-analytics";

import { getDiscountCode } from "../../../store/reducers/prizes";

import Theme from "./index.theme";
import * as Styled from "styled-components";
import i18n from "../../../translations";
import defaultStyles from "../../../constants/Styles";
import * as Routes from "../../../navigation";

import Button from "../../../components/Button";
import HeaderTitle from "../../../components/HeaderTitle";
import HeaderHamburger from "../../../components/HeaderHamburger";
import HeaderBack from "../../../components/HeaderBack";
import Background from "../../../components/Background";

import images from "../../../constants/images";

class RewardCodeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.prizes.collect"),
    headerTitle: HeaderTitle,
    headerLeft: (
      <HeaderBack
        navigation={navigation}
        onPress={() => {
          navigation.navigate(
            navigation.getParam("backTo", Routes.PRIZES_LIST)
          );
        }}
      />
    ),
    headerRight: <HeaderHamburger navigation={navigation} />,
    headerStyle: defaultStyles.headerTwoLines,
  });

  state = {
    selectedDiscountProvider: null,
    generatedCode: null,
  };

  componentDidMount() {
    if (this.defaultDiscountProvider && this.discountProviders.length === 0) {
      this.setState({
        selectedDiscountProvider: this.defaultDiscountProvider,
      });
    }
  }

  componentDidUpdate(prevProps) {
    const prevCard = prevProps.navigation.getParam("card");

    if (prevCard.id !== this.card.id) {
      if (this.defaultDiscountProvider && this.discountProviders.length === 0) {
        this.setState({
          selectedDiscountProvider: this.defaultDiscountProvider,
          generatedCode: null,
        });
      } else {
        this.setState({
          selectedDiscountProvider: null,
          generatedCode: null,
        });
      }
    }
  }

  get card() {
    return this.props.navigation.getParam("card");
  }

  get defaultDiscountProvider() {
    return this.card.discountProviders.filter((provider) => {
      return provider.active && provider.default;
    })[0];
  }

  get discountProviders() {
    return this.card.discountProviders.filter((provider) => {
      return !provider.default;
    });
  }

  selectDiscountProvider = (provider) => {
    this.setState({
      selectedDiscountProvider: provider,
    });
  };

  generateCode = () => {
    const cardId = this.card.id;
    const providerId = this.state.selectedDiscountProvider.id;

    this.props
      .getDiscountCode(cardId, providerId)
      .then((response) => {
        this.setState({
          generatedCode: response.payload.data.code,
        });
        Analytics.logEvent("collect_reward", {
          title: this.card.title,
          merchant: this.card.merchantName,
        });
      })
      .catch((error) => {
        console.error(error);
        this.props.navigation.navigate(Routes.INFO_ERROR, {
          redirect: Routes.PRIZES_LIST,
        });
      });
  };

  renderGeneratedCode() {
    return (
      <Theme>
        <View style={defaultStyles.grow}>
          <Styled.About>
            <Styled.AboutIcon source={{ uri: this.card.iconUrl }} />
            <Styled.AboutMerchant>
              {this.card.merchantName}
            </Styled.AboutMerchant>
            <Styled.AboutTitle>{this.card.title}</Styled.AboutTitle>
          </Styled.About>

          <Styled.Code>
            <Styled.CodeTitle>{i18n.t("prizes.writeCode")}</Styled.CodeTitle>
            <Styled.CodeTitle>{this.state.generatedCode}</Styled.CodeTitle>
          </Styled.Code>
        </View>

        <Styled.ButtonContainer>
          <Button
            title={i18n.t("prizes.backToRewards")}
            onPress={() => {
              this.props.navigation.navigate(Routes.INFO_SUCCESS, {
                message: i18n.t("success.scanner.reward"),
                redirect: Routes.PRIZES_LIST,
              });
            }}
          />
        </Styled.ButtonContainer>
      </Theme>
    );
  }

  renderAllDiscountProviders() {
    return (
      <Theme>
        <ScrollView>
          <Styled.About>
            <Styled.AboutIcon source={{ uri: this.card.iconUrl }} />
            <Styled.AboutMerchant>
              {this.card.merchantName}
            </Styled.AboutMerchant>
            <Styled.AboutTitle>{this.card.title}</Styled.AboutTitle>
          </Styled.About>

          {this.defaultDiscountProvider && (
            <Styled.ButtonContainer>
              <Button
                title={i18n.t("prizes.receiveInApplication")}
                onPress={() => {
                  this.selectDiscountProvider(this.defaultDiscountProvider);
                }}
              />
            </Styled.ButtonContainer>
          )}

          {this.defaultDiscountProvider ? (
            <Styled.PickText>
              {i18n.t("prizes.selectTextSecondary")}
            </Styled.PickText>
          ) : (
            <Styled.PickText>
              {i18n.t("prizes.selectTextPrimary")}
            </Styled.PickText>
          )}

          <Styled.Providers>
            {this.discountProviders.map((provider) => (
              <TouchableOpacity
                key={provider.id}
                onPress={() =>
                  provider.active
                    ? this.selectDiscountProvider(provider)
                    : () => null
                }
              >
                <Styled.Providers>
                  <Styled.ProviderImage
                    source={
                      provider.active
                        ? { uri: provider.logoUrl }
                        : { uri: provider.logoUrlInactive }
                    }
                  />
                </Styled.Providers>
              </TouchableOpacity>
            ))}
          </Styled.Providers>
        </ScrollView>
      </Theme>
    );
  }

  renderSelectedDiscountProvider() {
    const card = this.state.selectedDiscountProvider;

    return (
      <Theme>
        <Styled.Card>
          <TouchableOpacity
            onPress={
              this.discountProviders.length === 0
                ? () => this.props.navigation.navigate(Routes.PRIZES_LIST)
                : () => this.selectDiscountProvider(null)
            }
          >
            <Styled.Close name="closecircleo" size={32} />
          </TouchableOpacity>

          <Styled.Provider>
            <Styled.ProviderImage source={{ uri: card.logoUrl }} />
          </Styled.Provider>

          <Styled.Heading>{i18n.t("prizes.confirm")}</Styled.Heading>

          <Styled.Text>{this.card.merchantName}</Styled.Text>
          <Styled.Text>{this.card.title}</Styled.Text>

          <Styled.ButtonContainer>
            <Button
              title={i18n.t("prizes.generate")}
              onPress={this.generateCode}
            />
          </Styled.ButtonContainer>
        </Styled.Card>
      </Theme>
    );
  }

  render() {
    return (
      <Theme>
        <Background source={images.BackgroundPrizesWn} disableScroll>
          {this.state.generatedCode
            ? this.renderGeneratedCode()
            : this.state.selectedDiscountProvider
            ? this.renderSelectedDiscountProvider()
            : this.renderAllDiscountProviders()}
        </Background>
      </Theme>
    );
  }
}

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  getDiscountCode,
};

export default connect(mapStateToProps, mapDispatchToProps)(RewardCodeScreen);
