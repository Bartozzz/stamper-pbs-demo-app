import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";
import * as Analytics from "expo-firebase-analytics";

import * as Routes from "../../../navigation";

import * as Styled from "./index.styled";

import * as Box from "../../../components/layout/Box";

import Background from "../../../components/Background";
import { StamperLogo } from "../../../components/Stamper";

import { removeCard } from "../../../store/reducers/wallet";

import i18n from "../../../translations";
import defaultStyles from "../../../constants/Styles";

import images from "../../../constants/images";

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
    const title = navigation.getParam("title");
    const merchantName = navigation.getParam("merchantName");

    this.props.removeCard(cardId).finally(() => {
      navigation.navigate(Routes.WALLET_CARDS, { internet: true });
      Analytics.logEvent("remove_card", {
        title: title,
        merchantName: merchantName,
      });
    });
  };

  refuse = () => {
    const { navigation } = this.props;

    navigation.navigate(Routes.WALLET_CARDS, { internet: true });
  };

  render() {
    return (
      <Background source={images.BackgroundLogoutWn}>
        <StamperLogo style={styles.logo} />

        <Box.Container>
          <Box.Icon width={107} height={85} source={images.Newsletter} />

          <Box.Heading>{i18n.t("wallet.removal.headline")}</Box.Heading>

          <Box.Subheading style={{ width: "90%" }}>
            {i18n.t("wallet.removal.description")}
          </Box.Subheading>
        </Box.Container>

        <View style={[defaultStyles.row, styles.buttons]}>
          <Styled.ButtonStyled
            title={i18n.t("yes")}
            onPress={this.accept}
            processing={this.state.processing}
          />

          <Styled.ButtonStyled
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
