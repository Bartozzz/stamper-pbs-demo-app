import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Background from "../../components/Background";
import StamperLogo from "../../components/StamperLogo";

import * as Box from "../../components/layout/Box";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import Button from "../../components/Button";

const BackgroundImage = require("../../assets/backgrounds/home_wn.png");
const BalanceIcon = require("../../assets/images/icons/balance.png");

class TermsOfUseScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  state = {
    processing: false
  };

  accept = () => {
    this.setState({ processing: true });

    this.props.navigation.getParam("onAccept")();
  };

  showTerms = () => {
    this.props.navigation.push(Routes.AUTH_TOS);
  };

  render() {
    return (
      <Background source={BackgroundImage}>
        <StamperLogo style={styles.logo} />

        <Box.Container>
          <Box.Icon width={160} height={125} source={BalanceIcon} />

          <Box.Heading>
            {i18n.t("auth.externalTos.headline")}
          </Box.Heading>

          <TouchableOpacity onPress={this.showTerms}>
            <Box.Action>{i18n.t("auth.externalTos.link")}</Box.Action>
          </TouchableOpacity>
        </Box.Container>

        <View style={styles.button}>
          <Button
            title={i18n.t("yes")}
            onPress={this.accept}
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

  button: {
    marginHorizontal: 30
  }
});

export default TermsOfUseScreen;
