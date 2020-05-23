import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View } from "react-native";

import * as Box from "../../components/layout/Box";

import Button from "../../components/Button";
import Background from "../../components/Background";
import StamperLogo from "../../components/StamperLogo";

import * as Routes from "../../navigation";
import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";

const BackgroundImage = require("../../assets/backgrounds/logout_wn.png");
const BalanceIcon = require("../../assets/images/icons/balance.png");

class MapConfirmRefusedTermsScreen extends React.Component {
  static navigationOptions = () => ({
    header: null,
  });

  accept = () => {
    this.props.navigation.navigate(Routes.DASHBOARD);
  };

  refuse = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <Background source={BackgroundImage}>
        <StamperLogo style={styles.logo} />

        <Box.Container>
          <Box.Icon width={107} height={85} source={BalanceIcon} />

          <Box.Heading>{i18n.t("map.terms.refuse.heading")}</Box.Heading>

          <Box.Subheading style={{ width: "80%" }}>
            {i18n.t("map.terms.refuse.subheading")}
          </Box.Subheading>
        </Box.Container>

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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapConfirmRefusedTermsScreen);
