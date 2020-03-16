import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, TouchableOpacity, Linking } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Box from "../../components/layout/box/Box";
import BoxIcon from "../../components/layout/box/BoxIcon";
import * as BoxText from "../../components/layout/box/BoxText";

import Button from "../../components/forms/Button";
import Background from "../../components/Background";
import StamperLogo from "../../components/StamperLogo";

import * as Routes from "../../navigation";
import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";

const BackgroundImage = require("../../assets/backgrounds/logout_wn.png");
const BalanceIcon = require("../../assets/images/icons/balance.png");

class ScannerAcceptStampTermsScreen extends React.Component {
  state = {
    processing: false
  };

  openTermsAndConditions = link => () => {
    Linking.openURL(link);
  };

  accept = () => {
    this.setState({ processing: true });
    this.props.route.params?.onConfirm() ?? (() => {})();
  };

  refuse = () => {
    this.props.navigation.navigate(Routes.SCANNER_CONFIRM_REFUSED_TERMS, {
      onConfirm: () => this.props.route.params?.onConfirm() ?? (() => {})()
    });
  };

  render() {
    const title = this.props.route.params?.title;
    const terms = this.props.route.params?.termsAndConditionsUrl;

    return (
      <Background source={BackgroundImage}>
        <StamperLogo style={styles.logo} />

        <Box>
          <TouchableOpacity style={styles.close} onPress={this.refuse}>
            <Ionicons name="md-close" size={32} color="white" />
          </TouchableOpacity>

          <BoxIcon width={107} height={85} source={BalanceIcon} />

          <BoxText.Heading>
            {i18n.t("map.terms.accept", { title })}
          </BoxText.Heading>

          <TouchableOpacity onPress={this.openTermsAndConditions(terms)}>
            <BoxText.Action>{i18n.t("map.terms.terms")}</BoxText.Action>
          </TouchableOpacity>
        </Box>

        <View style={[defaultStyles.row, styles.buttons]}>
          <Button
            title={i18n.t("map.terms.confirm")}
            onPress={this.accept}
            processing={this.state.processing}
            full
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
    marginBottom: 30
  },

  close: {
    position: "absolute",
    top: 10,
    right: 15
  },

  buttons: {
    justifyContent: "space-around",
    marginBottom: 50,
    marginHorizontal: 20
  }
});

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ScannerAcceptStampTermsScreen
);
