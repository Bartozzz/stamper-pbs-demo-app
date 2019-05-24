import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";

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

class ScannerConfirmRefusedTermsScreen extends React.Component {
  static navigationOptions = () => ({
    header: null
  });

  state = {
    processing: false
  };

  accept = () => {
    this.setState({ processing: true });
    this.props.navigation.getParam("onConfirm", () => {})();
  };

  refuse = () => {
    this.props.navigation.navigate(Routes.SCANNER);
  };

  render() {
    return (
      <Background source={BackgroundImage}>
        <StamperLogo style={styles.logo} />

        <Box>
          <BoxIcon width={107} height={85} source={BalanceIcon} />

          <BoxText.Heading>
            {i18n.t("map.terms.refuse.heading")}
          </BoxText.Heading>

          <BoxText.Subheading>
            {i18n.t("map.terms.refuse.subheading")}
          </BoxText.Subheading>
        </Box>

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
    marginBottom: 30
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
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ScannerConfirmRefusedTermsScreen
);
