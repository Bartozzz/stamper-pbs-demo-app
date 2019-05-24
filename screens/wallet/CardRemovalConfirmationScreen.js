import React from "react";
import { connect } from "react-redux";
import { AsyncStorage, StyleSheet, Image, Text, View } from "react-native";

import Button from "../../components/Button";
import Background from "../../components/Background";
import StamperLogo from "../../components/StamperLogo";

import { FORCE_REFRESH_WALLET, removeCard } from "../../store/reducers/wallet";

import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";

const BackgroundImage = require("../../assets/backgrounds/logout_wn.png");
const NewsletterIcon = require("../../assets/images/icons/newsletter.png");

class CardRemovalConfirmationScreen extends React.Component {
  static navigationOptions = () => ({
    header: null
  });

  accept = async () => {
    const { navigation, removeCard } = this.props;
    const cardId = navigation.getParam("cardId");

    removeCard(cardId).finally(() => {
      AsyncStorage.setItem(FORCE_REFRESH_WALLET, JSON.stringify(false));
      navigation.goBack();
    });
  };

  refuse = () => {
    const { navigation } = this.props;

    navigation.goBack();
  };

  render() {
    return (
      <Background source={BackgroundImage}>
        <StamperLogo styles={styles.logo} />

        <View style={[defaultStyles.center, styles.box]}>
          <Image style={styles.boxIcon} source={NewsletterIcon} />

          <Text style={styles.boxText}>
            {i18n.t("wallet.removal.headline")}
          </Text>

          <Text style={[styles.boxAlternativeText]}>
            {i18n.t("wallet.removal.description")}
          </Text>
        </View>

        <View style={[defaultStyles.row, styles.buttons]}>
          <Button
            style={styles.button}
            title={i18n.t("yes")}
            onPress={this.accept}
          />

          <Button
            style={styles.button}
            title={i18n.t("no")}
            onPress={this.refuse}
          />
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",

    marginTop: 45,
    marginBottom: 10
  },

  box: {
    alignItems: "center",

    paddingTop: 50,
    paddingBottom: 50,
    marginTop: 20,
    marginBottom: 40,
    marginHorizontal: 20,

    shadowColor: "#2699FB",
    shadowOffset: { width: 0, height: 30 },
    shadowOpacity: 0.1,
    shadowRadius: 30,

    borderRadius: 10,
    backgroundColor: colors.background
  },
  boxText: {
    paddingHorizontal: 30,

    color: colors.color,
    fontSize: 24,
    textAlign: "center"
  },
  boxAlternativeText: {
    paddingHorizontal: 30,
    marginTop: 30,

    textAlign: "center",
    fontSize: 18,
    color: colors.color
  },
  boxIcon: {
    width: 107,
    height: 85,
    marginBottom: 40
  },

  buttons: {
    justifyContent: "space-around",
    marginBottom: 50
  },
  button: {
    width: 90
  }
});

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
  removeCard
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CardRemovalConfirmationScreen
);