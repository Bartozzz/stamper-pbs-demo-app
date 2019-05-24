import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import Background from "../../components/Background";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import Button from "../../components/forms/Button";

const BackgroundImage = require("../../assets/backgrounds/home_wn.png");
const LogoImage = require("../../assets/logos/stamper_logo_2x.png");
const LogoImageEn = require("../../assets/logos/stamper_logo_300px_en.png");
const BalanceIcon = require("../../assets/images/icons/balance.png");

class TermsOfUseScreen extends React.Component {
  static navigationOptions = {
    header: null
  };

  navigateToTOS = () => {
    this.props.navigation.navigate(Routes.AUTH_TOS);
  };

  renderLogo() {
    const currentLocale = i18n.currentLocale();

    if (!currentLocale || currentLocale.includes("en")) {
      return (
        <Image
          source={LogoImageEn}
          style={[styles.logo, { width: 195, height: 70 }]}
        />
      );
    } else {
      return (
        <Image
          source={LogoImage}
          style={[styles.logo, { width: 195, height: 70 }]}
        />
      );
    }
  }

  render() {
    const onAccept = this.props.navigation.getParam("onAccept", () => {});

    return (
      <Background source={BackgroundImage}>
        {this.renderLogo()}

        <View style={[defaultStyles.center, styles.box]}>
          <Image style={styles.boxIcon} source={BalanceIcon} />

          <Text style={styles.boxText}>
            {i18n.t("auth.externalTos.headline")}
          </Text>

          <TouchableOpacity onPress={this.navigateToTOS}>
            <Text style={styles.boxLink}>
              {i18n.t("auth.externalTos.link")}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.button}>
          <Button title={i18n.t("yes")} onPress={onAccept} />
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

  box: {
    alignItems: "center",

    paddingTop: 80,
    paddingBottom: 80,
    marginVertical: 20,
    marginHorizontal: 36,
    marginTop: 20,

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
  boxLink: {
    marginTop: 50,

    color: "#709BE7",
    fontSize: 18,
    textAlign: "center",
    textTransform: "uppercase"
  },
  boxIcon: {
    width: 160,
    height: 125,
    marginBottom: 60
  },

  button: {
    marginHorizontal: 30
  }
});

export default TermsOfUseScreen;
