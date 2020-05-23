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

class DashboardMainScreen extends React.Component {
  static navigationOptions = {
    title: i18n.t("navigation.dashboard.main"),
    header: null,
  };

  componentDidMount() {
    this.props.getPrizesCount();
  }

  render() {
    const { navigation, prizesCount } = this.props;
    const { height } = Dimensions.get("window");
    const smallPhone = height <= 640;

    return (
      <Background source={BackgroundImage}>
        <View style={[defaultStyles.center, styles.menu]}>
          <StamperLogo style={{ marginBottom: smallPhone ? 0 : 30 }} />

          <View style={[defaultStyles.row, styles.row]}>
            <DashboardButton
              icon={MenuImageMap}
              onPress={() => navigation.push(Routes.MAP)}
            >
              {i18n.t("dashboard.map")}
            </DashboardButton>

            <DashboardButton
              icon={MenuImageWallet}
              onPress={() => navigation.push(Routes.WALLET)}
            >
              {i18n.t("dashboard.wallet")}
            </DashboardButton>
          </View>

          <View style={[defaultStyles.row, styles.row]}>
            <DashboardButton
              icon={MenuImagePrizes}
              badge={prizesCount}
              onPress={() => navigation.push(Routes.PRIZES)}
            >
              {i18n.t("dashboard.prizes")}
            </DashboardButton>

            <DashboardButton
              icon={MenuImageProfile}
              onPress={() => navigation.push(Routes.PROFILE)}
            >
              {i18n.t("dashboard.profile")}
            </DashboardButton>
          </View>

          <View style={[defaultStyles.row, styles.row]}>
            <DashboardButton icon={MenuImageMarket} onPress={() => {}}>
              {i18n.t("dashboard.market")}
            </DashboardButton>

            <DashboardButton
              icon={MenuImageScanner}
              onPress={() => navigation.push(Routes.SCANNER)}
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
