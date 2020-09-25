import React from "react";
import { connect } from "react-redux";
import {
  StyleSheet,
  View,
  Dimensions,
  Alert,
  BackHandler,
  Linking,
} from "react-native";
import Background from "../../components/Background";
import { StamperLogo } from "../../components/Stamper";
import DashboardButton from "../../components/DashboardButton";
import PopUp from "../../components/PopUp";
import Quiz from "../../components/Quiz";

import * as StoreReview from "expo-store-review";
import VersionCheck from "react-native-version-check-expo";
import NetInfo from "@react-native-community/netinfo";

import i18n from "../../translations";
import * as Routes from "../../navigation";
import defaultStyles from "../../constants/Styles";

import { getPrizesCount } from "../../store/reducers/prizes";
import { getPopUp } from "../../store/reducers/popup";
import { getQuestion, setAnswer } from "../../store/reducers/quiz";

const MenuImageMap = require("../../assets/images/menu/map.png");
const MenuImageMarket = require("../../assets/images/menu/market-inactive.png");
const MenuImagePrizes = require("../../assets/images/menu/prize.png");
const MenuImageProfile = require("../../assets/images/menu/profile.png");
const MenuImageWallet = require("../../assets/images/menu/wallet.png");
const MenuImageScanner = require("../../assets/images/menu/scanner.png");
const BackgroundImage = require("../../assets/backgrounds/home_wn.png");

const checkUpdateNeeded = async () => {
  const updateNeeded = await VersionCheck.needUpdate();
  if (updateNeeded && updateNeeded.isNeeded) {
    Alert.alert(
      i18n.t("dashboard.UpdateTitle"),
      i18n.t("dashboard.UpdateSubtitle"),
      [
        {
          text: i18n.t("dashboard.Update"),
          onPress: () => {
            BackHandler.exitApp();
            Linking.openURL(updateNeeded.storeUrl);
          },
        },
        {
          text: i18n.t("dashboard.NotNow"),
        },
      ],
      { cancelable: true }
    );
  }
};

let internet;

const unsubscribe = NetInfo.addEventListener((state) => {
  if (state.isInternetReachable === true) {
    internet = true;
  } else {
    internet = false;
  }
});

class DashboardMainScreen extends React.Component {
  static navigationOptions = {
    title: i18n.t("navigation.dashboard.main"),
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = { popUp: true, quiz: true };
  }

  componentDidMount() {
    checkUpdateNeeded();
    if (internet === true) {
      this.props.getPrizesCount();
      this.props.getQuestion().then(() => {
        if (!this.props.quizData) {
          this.props.getPopUp();
        }
      });
    }
    if (internet === false) {
      Alert.alert(
        i18n.t("offline.main"),
        i18n.t("offline.alert"),
        [
          {
            text: i18n.t("close"),
          },
        ],
        { cancelable: true }
      );
    }
    if (this.props.appLaunches % 300 === 0) {
      StoreReview.requestReview();
    }
  }

  componentWillUnmount() {
    unsubscribe();
  }

  closeQuiz = () => {
    this.setState({ quiz: false });
  };

  setAnswer = (answer) => {
    if (answer === this.props.quizData.correctAnswer) {
      this.props.setAnswer(1);
      this.setState({ quiz: false });
    } else {
      this.props.setAnswer(0);
      this.setState({ quiz: false });
    }
  };

  closePopUp = () => {
    this.setState({ popUp: false });
  };

  render() {
    const { navigation, prizesCount, popUpData, quizData } = this.props;
    const { popUp, quiz } = this.state;
    const { height } = Dimensions.get("window");
    const smallPhone = height <= 640;

    return (
      <Background source={BackgroundImage}>
        {popUpData.title && (
          <PopUp
            active={popUp}
            title={popUpData.title}
            content={popUpData.message}
            button={i18n.t("close")}
            onClose={this.closePopUp}
            onPress={this.closePopUp}
          />
        )}
        {quizData.title && (
          <Quiz
            active={quiz}
            title={quizData.title.replaceAll("{stamps}", quizData.stamps)}
            content={quizData.question}
            onYes={() => this.setAnswer(1)}
            onNo={() => this.setAnswer(0)}
            onClose={this.closeQuiz}
          />
        )}
        <View style={[defaultStyles.center, styles.menu]}>
          <StamperLogo style={{ marginBottom: smallPhone ? 0 : 30 }} />

          <View style={[defaultStyles.row, styles.row]}>
            <DashboardButton
              icon={MenuImageMap}
              onPress={() =>
                navigation.push(Routes.MAP, { internet: internet })
              }
            >
              {i18n.t("dashboard.map")}
            </DashboardButton>

            <DashboardButton
              icon={MenuImageWallet}
              onPress={() =>
                navigation.push(Routes.WALLET, { internet: internet })
              }
            >
              {i18n.t("dashboard.wallet")}
            </DashboardButton>
          </View>

          <View style={[defaultStyles.row, styles.row]}>
            <DashboardButton
              icon={MenuImagePrizes}
              badge={prizesCount}
              onPress={() =>
                navigation.push(Routes.PRIZES, { internet: internet })
              }
            >
              {i18n.t("dashboard.prizes")}
            </DashboardButton>

            <DashboardButton
              icon={MenuImageProfile}
              onPress={() =>
                navigation.push(Routes.PROFILE, { internet: internet })
              }
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
              onPress={() =>
                navigation.push(Routes.SCANNER, { internet: internet })
              }
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
  appLaunches: state.review.appLaunches,
  popUpData: state.popup,
  quizData: state.quiz,
});

const mapDispatchToProps = {
  getPrizesCount,
  getPopUp,
  getQuestion,
  setAnswer,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardMainScreen);
