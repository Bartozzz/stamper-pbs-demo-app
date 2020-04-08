import * as React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { getDiscountCode } from "../../store/reducers/prizes";

import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import * as Routes from "../../navigation";

import Button from "../../components/forms/Button";
import HeaderHamburger from "../../components/nav/HeaderHamburger";
import HeaderBackIcon from "../../components/nav/HeaderBack";
import HeaderTitle from "../../components/nav/HeaderTitle";
import Background from "../../components/Background";

const BackgroundImage = require("../../assets/backgrounds/prizes_wn.png");

class RewardCodeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.prizes.collect"),
    headerTitle: HeaderTitle,
    headerLeft: (
      <HeaderBackIcon
        navigation={navigation}
        onPress={() => {
          navigation.navigate(
            navigation.getParam("backTo", Routes.PRIZES_LIST)
          );
        }}
      />
    ),
    headerRight: <HeaderHamburger navigation={navigation} />,
    headerStyle: defaultStyles.headerTwoLines
  });

  state = {
    selectedDiscountProvider: null,
    generatedCode: null
  };

  componentDidMount() {
    if (this.defaultDiscountProvider && this.discountProviders.length === 0) {
      this.setState({
        selectedDiscountProvider: this.defaultDiscountProvider
      });
    }
  }

  componentDidUpdate(prevProps) {
    const prevCard = prevProps.navigation.getParam("card");

    if (prevCard.id !== this.card.id) {
      if (this.defaultDiscountProvider && this.discountProviders.length === 0) {
        this.setState({
          selectedDiscountProvider: this.defaultDiscountProvider,
          generatedCode: null
        });
      } else {
        this.setState({
          selectedDiscountProvider: null,
          generatedCode: null
        });
      }
    }
  }

  get card() {
    return this.props.navigation.getParam("card");
  }

  get defaultDiscountProvider() {
    return this.card.discountProviders.filter(provider => {
      return provider.active && provider.default;
    })[0];
  }

  get discountProviders() {
    return this.card.discountProviders.filter(provider => {
      return !provider.default;
    });
  }

  selectDiscountProvider = provider => {
    this.setState({
      selectedDiscountProvider: provider
    });
  };

  generateCode = () => {
    const cardId = this.card.id;
    const providerId = this.state.selectedDiscountProvider.id;

    this.props
      .getDiscountCode(cardId, providerId)
      .then(response => {
        this.setState({
          generatedCode: response.payload.data.code
        });
      })
      .catch(error => {
        console.error(error);
        this.props.navigation.navigate(Routes.INFO_ERROR, {
          redirect: Routes.PRIZES_LIST
        });
      });
  };

  renderGeneratedCode() {
    return (
      <>
        <View style={defaultStyles.grow}>
          <View style={styles.about}>
            <Image
              source={{ uri: this.card.iconUrl }}
              style={styles.aboutIcon}
            />
            <Text style={styles.aboutMerchant}>{this.card.merchantName}</Text>
            <Text style={styles.aboutTitle}>{this.card.title}</Text>
          </View>

          <View style={styles.code}>
            <Text style={styles.codeTitle}>{i18n.t("prizes.writeCode")}</Text>
            <Text style={styles.codeValue}>{this.state.generatedCode}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title={i18n.t("prizes.quickCollect")}
            onPress={() => {
              this.props.navigation.navigate(Routes.INFO_SUCCESS, {
                message: i18n.t("success.scanner.reward"),
                redirect: Routes.PRIZES_LIST
              });
            }}
          />
        </View>
      </>
    );
  }

  renderAllDiscountProviders() {
    return (
      <ScrollView>
        <View style={styles.about}>
          <Image source={{ uri: this.card.iconUrl }} style={styles.aboutIcon} />
          <Text style={styles.aboutMerchant}>{this.card.merchantName}</Text>
          <Text style={styles.aboutTitle}>{this.card.title}</Text>
        </View>

        {this.defaultDiscountProvider && (
          <View style={styles.buttonContainer}>
            <Button
              title={i18n.t("prizes.receiveInApplication")}
              onPress={() => {
                this.selectDiscountProvider(this.defaultDiscountProvider);
              }}
            />
          </View>
        )}

        {this.defaultDiscountProvider ? (
          <Text style={styles.pickText}>
            {i18n.t("prizes.selectTextSecondary")}
          </Text>
        ) : (
          <Text style={styles.pickText}>
            {i18n.t("prizes.selectTextPrimary")}
          </Text>
        )}

        <View style={styles.providers}>
          {this.discountProviders.map(provider => (
              <TouchableOpacity
                key={provider.id}
                onPress={() =>
                  provider.active
                    ? this.selectDiscountProvider(provider)
                    : () => null
                }
              >
                <View style={styles.provider}>
                  <Image
                    source={(provider.active ? {uri: provider.logoUrl} : {uri: provider.logoUrlInactive})}
                    style={[styles.providerImage]}
                  />
                </View>
              </TouchableOpacity>
            ))}
        </View>
      </ScrollView>
    );
  }

  renderSelectedDiscountProvider() {
    const card = this.state.selectedDiscountProvider;

    return (
      <View style={styles.card}>
        <TouchableOpacity onPress={() => this.selectDiscountProvider(null)}>
          <AntDesign style={styles.close} name="closecircleo" size={32} />
        </TouchableOpacity>

        <View style={styles.provider}>
          <Image source={{ uri: card.logoUrl }} style={styles.providerImage} />
        </View>

        <Text style={[styles.text, styles.heading]}>
          {i18n.t("prizes.confirm")}
        </Text>

        <Text style={styles.text}>{this.card.merchantName}</Text>
        <Text style={styles.text}>{this.card.title}</Text>

        <View style={styles.buttonContainer}>
          <Button
            title={i18n.t("prizes.generate")}
            onPress={this.generateCode}
          />
        </View>
      </View>
    );
  }

  render() {
    return (
      <Background source={BackgroundImage} disableScroll>
        {this.state.generatedCode
          ? this.renderGeneratedCode()
          : this.state.selectedDiscountProvider
          ? this.renderSelectedDiscountProvider()
          : this.renderAllDiscountProviders()}
      </Background>
    );
  }
}

const providerCardMargin = 10;
const providerCardSize =
  (Dimensions.get("window").width - providerCardMargin * 2) / 3 -
  providerCardMargin * 2;

const styles = StyleSheet.create({
  about: {
    marginTop: 60,
    marginBottom: 40
  },
  aboutIcon: {
    alignSelf: "center",
    marginBottom: 20,

    width: 80,
    height: 80,

    borderWidth: 2,
    borderRadius: 40,
    borderColor: colors.primary
  },
  aboutMerchant: {
    marginBottom: 10,

    textTransform: "uppercase",
    textAlign: "center",
    color: colors.color
  },
  aboutTitle: {
    textAlign: "center",
    color: colors.disabled
  },

  close: {
    alignSelf: "flex-end"
  },

  heading: {
    marginVertical: 20,
    fontSize: 20
  },

  text: {
    fontFamily: "poppins-regular",
    textAlign: "center",
    color: "#000000"
  },

  pickText: {
    marginBottom: 20,
    width: '90%',
    alignSelf: "center",
    textAlign: "center",
    color: colors.disabled
  },

  providers: {
    flexWrap: "wrap",
    flexDirection: "row",
    margin: providerCardMargin
  },

  provider: {
    position: "relative",
    margin: providerCardMargin,

    width: providerCardSize,
    height: providerCardSize,

    alignSelf: "center"
  },
  providerImage: {
    width: providerCardSize,
    height: providerCardSize,
    resizeMode: "contain"
  },
  providerImageMain: {
    position: "absolute",
    opacity: 0.25
  },
  providerImageOverlay: {
    tintColor: "gray"
  },

  code: {
    marginVertical: 20,
    marginHorizontal: 24,

    borderWidth: 1,
    borderRadius: 8,
    borderStyle: "solid",
    borderColor: colors.primary
  },
  codeTitle: {
    marginTop: 50,
    marginBottom: 30,

    fontSize: 26,
    textAlign: "center",
    color: colors.primary
  },
  codeValue: {
    marginBottom: 50,

    fontSize: 28,
    textAlign: "center",
    color: colors.color
  },

  buttonContainer: {
    paddingVertical: 25,
    paddingHorizontal: 24
  },

  card: {
    margin: 15,
    padding: 15,

    backgroundColor: "white",
    borderRadius: 16
  }
});

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  getDiscountCode
};

export default connect(mapStateToProps, mapDispatchToProps)(RewardCodeScreen);
