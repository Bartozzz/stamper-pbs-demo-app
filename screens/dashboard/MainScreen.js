import React from "react";
import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";

import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

const MenuImageMap = require("../../assets/images/menu/map.png");
const MenuImageMarket = require("../../assets/images/menu/market.png");
const MenuImagePrizes = require("../../assets/images/menu/prize.png");
const MenuImageProfile = require("../../assets/images/menu/profile.png");
const MenuImageWallet = require("../../assets/images/menu/wallet.png");

const MENU_MAP = "MENU_MAP";
const MENU_MARKET = "MENU_MARKET";
const MENU_PRIZES = "MENU_PRIZES";
const MENU_PROFILE = "MENU_PROFILE";
const MENU_WALLET = "MENU_WALLET";
const MENU_SCANNER = "MENU_SCANNER";

class MainScreen extends React.Component {
  static navigationOptions = {
    title: "Dashboard",
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
        return;

      case MENU_PRIZES:
        return;

      case MENU_PROFILE:
        return navigation.navigate("ProfileMenu");

      case MENU_MARKET:
        return;

      case MENU_SCANNER:
        return navigation.navigate("Url");
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
      <View style={styles.container}>
        <View style={styles.menu}>
          <View style={styles.row}>
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

              <Text style={styles.boxText}>Okolica</Text>
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

              <Text style={styles.boxText}>Portfel</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
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

              <Text style={styles.boxText}>Nagrody</Text>
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

              <Text style={styles.boxText}>Twój profil</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
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

              <Text style={styles.boxText}>Market</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={1}
              style={[styles.box, scannerStyles]}
              onPressIn={this.focusMenuElement(MENU_SCANNER)}
              onPressOut={this.blurMenuElement}
              onPress={this.navigateTo(MENU_SCANNER)}
            >
              <Text style={styles.boxText}>Skanuj</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },

  menu: {
    flex: 1,

    justifyContent: "center",
    alignItems: "center"
  },

  row: {
    flexDirection: "row",
    marginHorizontal: 40
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

export default MainScreen;
