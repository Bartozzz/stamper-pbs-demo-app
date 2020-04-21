import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Dimensions } from "react-native";
import Background from "../../components/Background";
import StamperLogo from "../../components/StamperLogo";
import DashboardButton from "../../components/DashboardButton";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";

import { getPrizesCount } from "../../store/reducers/prizes";

const MenuImageMap = require("../../assets/images/menu/map.png");
const MenuImageMarket = require("../../assets/images/menu/market-inactive.png");
const MenuImagePrizes = require("../../assets/images/menu/prize.png");
const MenuImageProfile = require("../../assets/images/menu/profile.png");
const MenuImageWallet = require("../../assets/images/menu/wallet.png");
const MenuImageScanner = require("../../assets/images/menu/scanner.png");
const BackgroundImage = require("../../assets/backgrounds/home_wn.png");

const MENU_MAP = "MENU_MAP";
const MENU_MARKET = "MENU_MARKET";
const MENU_PRIZES = "MENU_PRIZES";
const MENU_PROFILE = "MENU_PROFILE";
const MENU_WALLET = "MENU_WALLET";
const MENU_SCANNER = "MENU_SCANNER";

class DashboardMainScreen extends React.Component {
  static navigationOptions = {
    title: i18n.t("navigation.dashboard.main"),
    header: null,
  };

  componentDidMount() {
    this.props.getPrizesCount();
  }

  navigateTo = (element) => () => {
    const { navigation } = this.props;

    switch (element) {
      case MENU_MAP:
        return navigation.push(Routes.MAP);
      case MENU_WALLET:
        return navigation.push(Routes.WALLET);
      case MENU_PRIZES:
        return navigation.push(Routes.PRIZES);
      case MENU_PROFILE:
        return navigation.push(Routes.PROFILE);
      case MENU_MARKET:
        return;
      case MENU_SCANNER:
        return navigation.push(Routes.SCANNER);
    }
  };

  render() {
    const { prizesCount } = this.props;
    const { height } = Dimensions.get("window");
    const smallPhone = height <= 640 ? true : false;

    return (
      <Background source={BackgroundImage}>
        <View style={[defaultStyles.center, styles.menu]}>
          <StamperLogo style={{ marginBottom: smallPhone ? 0 : 30 }} />

          <View style={[defaultStyles.row, styles.row]}>
            <DashboardButton
              icon={MenuImageMap}
              onPress={this.navigateTo(MENU_MAP)}
            >
              {i18n.t("dashboard.map")}
            </DashboardButton>

            <DashboardButton
              icon={MenuImageWallet}
              onPress={this.navigateTo(MENU_WALLET)}
            >
              {i18n.t("dashboard.wallet")}
            </DashboardButton>
          </View>

          <View style={[defaultStyles.row, styles.row]}>
            <DashboardButton
              icon={MenuImagePrizes}
              badge={prizesCount}
              onPress={this.navigateTo(MENU_PRIZES)}
            >
              {i18n.t("dashboard.prizes")}
            </DashboardButton>

            <DashboardButton
              icon={MenuImageProfile}
              onPress={this.navigateTo(MENU_PROFILE)}
            >
              {i18n.t("dashboard.profile")}
            </DashboardButton>
          </View>

          <View style={[defaultStyles.row, styles.row]}>
            <DashboardButton
              icon={MenuImageMarket}
              onPress={this.navigateTo(MENU_MARKET)}
            >
              {i18n.t("dashboard.market")}
            </DashboardButton>

            <DashboardButton
              icon={MenuImageScanner}
              onPress={this.navigateTo(MENU_SCANNER)}
            >
              {i18n.t("dashboard.scanner")}
            </DashboardButton>
          </View>
        </View>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    flex: 1,
  },

  row: {
    marginHorizontal: 40,
  },
});

const mapStateToProps = (state) => ({
  prizesCount: state.prizes.count,
});

const mapDispatchToProps = {
  getPrizesCount,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardMainScreen);
