import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import Background from "../../components/Background";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

const MenuImageMap = require("../../assets/images/menu/map.png");
const MenuImageMarket = require("../../assets/images/menu/market-inactive.png");
const MenuImagePrizes = require("../../assets/images/menu/prize.png");
const MenuImageProfile = require("../../assets/images/menu/profile.png");
const MenuImageWallet = require("../../assets/images/menu/wallet.png");
const MenuImageScanner = require("../../assets/images/menu/scanner.png");
const BackgroundImage = require("../../assets/backgrounds/home.png");
const LogoImage = require("../../assets/logos/stamper.png");

const MENU_MAP = "MENU_MAP";
const MENU_MARKET = "MENU_MARKET";
const MENU_PRIZES = "MENU_PRIZES";
const MENU_PROFILE = "MENU_PROFILE";
const MENU_WALLET = "MENU_WALLET";
const MENU_SCANNER = "MENU_SCANNER";

class DashboardMainScreen extends React.Component {
  static navigationOptions = {
    title: i18n.t("navigation.dashboard.main"),
    header: null
  };

  state = {
    focused: null
  };

  isFocused = element => {
    return this.state.focused === element;
  };

  focusMenuElement = focused => () => {
    this.setState({ focused });
  };

  blurMenuElement = () => {
    this.setState({ focused: null });
  };

  navigateTo = element => () => {
    const { navigation } = this.props;

    this.setState({
      focused: null
    });

    switch (element) {
      case MENU_MAP:
        return;

      case MENU_WALLET:
        return navigation.navigate(Routes.WALLET);

      case MENU_PRIZES:
        return navigation.navigate(Routes.PRIZES);

      case MENU_PROFILE:
        return navigation.navigate(Routes.PROFILE);

      case MENU_MARKET:
        return;

      case MENU_SCANNER:
        return navigation.navigate(Routes.SCANNER);
    }
  };

  render() {
    const mapStyles = this.isFocused(MENU_MAP) ? styles.boxFocus : null;
    const walletStyles = this.isFocused(MENU_WALLET) ? styles.boxFocus : null;
    const prizesStyles = this.isFocused(MENU_PRIZES) ? styles.boxFocus : null;
    const profileStyles = this.isFocused(MENU_PROFILE) ? styles.boxFocus : null;
    const marketStyles = this.isFocused(MENU_MARKET) ? styles.boxFocus : null;
    const scannerStyles = this.isFocused(MENU_SCANNER) ? styles.boxFocus : null;

    return (
      <Background source={BackgroundImage}>
        <View style={[defaultStyles.center, styles.menu]}>
          <Image
            source={LogoImage}
            style={[styles.logo, { width: 195, height: 70 }]}
          />

          <View style={[defaultStyles.row, styles.row]}>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.box, mapStyles]}
              onPressIn={this.focusMenuElement(MENU_MAP)}
              onPressOut={this.blurMenuElement}
              onPress={this.navigateTo(MENU_MAP)}
            >
              <Image
                source={MenuImageMap}
                style={[styles.boxIcon, { width: 60, height: 60 }]}
              />

              <Text style={styles.boxText}>{i18n.t("dashboard.map")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              style={[styles.box, walletStyles]}
              onPressIn={this.focusMenuElement(MENU_WALLET)}
              onPressOut={this.blurMenuElement}
              onPress={this.navigateTo(MENU_WALLET)}
            >
              <Image
                source={MenuImageWallet}
                style={[styles.boxIcon, { width: 60, height: 60 }]}
              />

              <Text style={styles.boxText}>{i18n.t("dashboard.wallet")}</Text>
            </TouchableOpacity>
          </View>

          <View style={[defaultStyles.row, styles.row]}>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.box, prizesStyles]}
              onPressIn={this.focusMenuElement(MENU_PRIZES)}
              onPressOut={this.blurMenuElement}
              onPress={this.navigateTo(MENU_PRIZES)}
            >
              <Image
                source={MenuImagePrizes}
                style={[styles.boxIcon, { width: 60, height: 60 }]}
              />

              <Text style={styles.boxText}>{i18n.t("dashboard.prizes")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              style={[styles.box, profileStyles]}
              onPressIn={this.focusMenuElement(MENU_PROFILE)}
              onPressOut={this.blurMenuElement}
              onPress={this.navigateTo(MENU_PROFILE)}
            >
              <Image
                source={MenuImageProfile}
                style={[styles.boxIcon, { width: 60, height: 60 }]}
              />

              <Text style={styles.boxText}>{i18n.t("dashboard.profile")}</Text>
            </TouchableOpacity>
          </View>

          <View style={[defaultStyles.row, styles.row]}>
            <TouchableOpacity
              activeOpacity={1}
              style={[styles.box, marketStyles]}
              onPressIn={this.focusMenuElement(MENU_MARKET)}
              onPressOut={this.blurMenuElement}
              onPress={this.navigateTo(MENU_MARKET)}
            >
              <Image
                source={MenuImageMarket}
                style={[styles.boxIcon, { width: 60, height: 60 }]}
              />

              <Text style={styles.boxText}>{i18n.t("dashboard.market")}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              style={[styles.box, scannerStyles]}
              onPressIn={this.focusMenuElement(MENU_SCANNER)}
              onPressOut={this.blurMenuElement}
              onPress={this.navigateTo(MENU_SCANNER)}
            >
              <Image
                source={MenuImageScanner}
                style={[styles.boxIcon, { width: 60, height: 60 }]}
              />

              <Text style={styles.boxText}>{i18n.t("dashboard.scanner")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    flex: 1
  },

  row: {
    marginHorizontal: 40
  },

  logo: {
    marginBottom: 50
  },

  box: {
    flex: 1,
    height: 120,
    margin: 10,
    padding: 1,

    borderRadius: 8,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: colors.border
  },
  boxFocus: {
    padding: 0,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.highlight
  },
  boxText: {
    color: colors.color,

    fontSize: 16,
    fontFamily: layout.fontText,
    textAlign: "center"
  },
  boxIcon: {
    alignSelf: "center",
    marginVertical: 12
  }
});

export default DashboardMainScreen;
