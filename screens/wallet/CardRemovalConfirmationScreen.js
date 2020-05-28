import React from "react";
import { connect } from "react-redux";
import { AsyncStorage, StyleSheet, View } from "react-native";

import * as Box from "../../components/layout/Box";

import Button from "../../components/Button";
import Background from "../../components/Background";
import { StamperLogo } from "../../components/Stamper";

import { FORCE_REFRESH_WALLET, removeCard } from "../../store/reducers/wallet";

import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";

const BackgroundImage = require("../../assets/backgrounds/logout_wn.png");
const NewsletterIcon = require("../../assets/images/icons/newsletter.png");

class CardRemovalConfirmationScreen extends React.Component {
  static navigationOptions = () => ({
    header: null,
  });

  state = {
    processing: false,
  };

  accept = async () => {
    this.setState({ processing: true });

    const { navigation } = this.props;
    const cardId = navigation.getParam("cardId");

    this.props.removeCard(cardId).finally(() => {
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
        <StamperLogo style={styles.logo} />

        <Box.Container>
          <Box.Icon width={107} height={85} source={NewsletterIcon} />

          <Box.Heading>{i18n.t("wallet.removal.headline")}</Box.Heading>

          <Box.Subheading>
            {i18n.t("wallet.removal.description")}
          </Box.Subheading>
        </Box.Container>

        <View style={[defaultStyles.row, styles.buttons]}>
          <Button
            style={styles.button}
            title={i18n.t("yes")}
            onPress={this.accept}
            processing={this.state.processing}
          />

          <Button
            style={styles.button}
            title={i18n.t("no")}
            onPress={this.refuse}
            processing={this.state.processing}
          />
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",

    marginTop: 80,
    marginBottom: 30,
  },

  buttons: {
    justifyContent: "space-around",
    marginBottom: 50,
  },
  button: {
    width: 90,
  },
});

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
  removeCard,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CardRemovalConfirmationScreen);
