import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import Background from "../../components/Background";
import StamperLogo from "../../components/StamperLogo";

import Box from "../../components/layout/box/Box";
import BoxIcon from "../../components/layout/box/BoxIcon";
import * as BoxText from "../../components/layout/box/BoxText";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import Button from "../../components/forms/Button";

const BackgroundImage = require("../../assets/backgrounds/home_wn.png");
const BalanceIcon = require("../../assets/images/icons/balance.png");

class TermsOfUseScreen extends React.Component {
  state = {
    processing: false
  };

  accept = () => {
    this.setState({ processing: true });

    this.props.route.params?.onAccept();
  };

  showTerms = () => {
    this.props.navigation.push(Routes.AUTH_TOS);
  };

  render() {
    return (
      <Background source={BackgroundImage}>
        <StamperLogo style={styles.logo} />

        <Box>
          <BoxIcon width={160} height={125} source={BalanceIcon} />

          <BoxText.Heading>
            {i18n.t("auth.externalTos.headline")}
          </BoxText.Heading>

          <TouchableOpacity onPress={this.showTerms}>
            <BoxText.Action>{i18n.t("auth.externalTos.link")}</BoxText.Action>
          </TouchableOpacity>
        </Box>

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
