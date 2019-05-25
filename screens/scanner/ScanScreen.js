import React from "react";
import { connect } from "react-redux";
import { BarCodeScanner, Permissions } from "expo";
import { AsyncStorage, Text, View, Image, StyleSheet } from "react-native";

import * as Routes from "../../navigation";
import { addStamp } from "../../store/reducers/stamp";
import { FORCE_REFRESH_WALLET } from "../../store/reducers/wallet";
import { FORCE_REFRESH_PRIZES } from "../../store/reducers/prizes";
import HeaderHamburger from "../../components/nav/HeaderHamburger";
import HeaderTitle from "../../components/nav/HeaderTitle";
import HeaderBackIcon from "../../components/nav/HeaderBack";
import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import layout from "../../constants/Layout";
import { getParameterByName } from "../../helpers/urls";
import colors from "../../constants/Colors";

const SpinnerImage = require("../../assets/loaders/spinner.gif");
const EarnedRewardImage = require("../../assets/success/earned_reward.gif");
const ReceivedRewardImage = require("../../assets/success/received_reward.gif");
const SubtractStampImage = require("../../assets/success/stamp_subtract.gif");

class ScannerScanScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.scanner.scan"),
    header: navigation.state.params
      ? navigation.state.params.hideHeader
        ? undefined
        : null
      : undefined,
    headerTitle: HeaderTitle,
    headerLeft: <HeaderBackIcon navigation={navigation} />,
    headerRight: <HeaderHamburger navigation={navigation} />,
    headerStyle: defaultStyles.headerTwoLines
  });

  state = {
    isRequesting: false,
    isProcessing: false,
    focusedScreen: true,
    hasCameraPermission: null
  };

  focusListener = null;
  blurListener = null;

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermission: status === "granted"
    });

    this.focusListener = this.props.navigation.addListener("willFocus", () =>
      this.setState({ focusedScreen: true })
    );

    this.blurListener = this.props.navigation.addListener("willBlur", () =>
      this.setState({ focusedScreen: false })
    );
  }

  componentWillUnmount() {
    this.focusListener.remove();
    this.blurListener.remove();
  }

  onBarCodeRead = scan => {
    const { isProcessing } = this.state;
    const { navigation, addStamp } = this.props;

    if (isProcessing) {
      return;
    }

    const code = getParameterByName("p", scan.data);
    const mode = navigation.getParam("type", Routes.SCANNER);

    this.props.navigation.setParams({
      hideHeader: true
    });

    this.setState({
      isProcessing: true,
      isRequesting: true
    });

    AsyncStorage.setItem(FORCE_REFRESH_WALLET, JSON.stringify(true));
    AsyncStorage.setItem(FORCE_REFRESH_PRIZES, JSON.stringify(true));

    function redirectToSuccess(message) {
      let image;

      switch (message) {
        case "congratulations":
          image = EarnedRewardImage;
          break;
        case "subtract":
          image = SubtractStampImage;
          break;
        default:
          image = ReceivedRewardImage;
      }

      navigation.navigate(Routes.INFO_SUCCESS, {
        size: 100,
        image: image,
        timeout:
          message === "congratulations"
            ? 5000 /* Earned reward */
            : 5000 /* Received reward */,
        redirect: Routes.DASHBOARD,
        message: i18n.t(`success.scanner.${message}`)
      });
    }

    addStamp(code)
      .then(res => {
        const { termsAndConditions, message } = res.payload.data;

        if (termsAndConditions) {
          const { title, termsAndConditionsUrl } = termsAndConditions;

          navigation.navigate(Routes.SCANNER_ACCEPT_STAMP_TERMS, {
            title,
            termsAndConditionsUrl,
            onConfirm: () => {
              addStamp(code, true).then(res => {
                redirectToSuccess(res.payload.data.message);
              });
            }
          });
        } else {
          redirectToSuccess(message);
        }
      })
      .catch(() => {
        navigation.navigate(Routes.INFO_ERROR, {
          redirect: Routes.DASHBOARD,
          message:
            mode === Routes.SCANNER
              ? i18n.t("errors.scanner.stampAdd")
              : i18n.t("errors.scanner.claimPrize")
        });
      });
  };

  renderBarCodeScanner() {
    const { hasCameraPermission, focusedScreen } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }

    if (!hasCameraPermission) {
      return <Text>No access to camera</Text>;
    }

    if (focusedScreen) {
      return (
        <BarCodeScanner
          onBarCodeRead={this.onBarCodeRead}
          style={[StyleSheet.absoluteFill, styles.scannerCamera]}
        >
          <Image
            style={styles.scannerImage}
            source={require("../../assets/images/qr.png")}
          />
        </BarCodeScanner>
      );
    }

    return null;
  }

  render() {
    if (this.state.isRequesting) {
      return (
        <View
          style={[defaultStyles.container, { backgroundColor: colors.primary }]}
        >
          <View style={[defaultStyles.grow, defaultStyles.center]}>
            <Image source={SpinnerImage} style={{ width: 45, height: 45 }} />
          </View>
        </View>
      );
    }

    return (
      <View style={defaultStyles.container}>
        <View style={styles.scannerContainer}>
          {this.renderBarCodeScanner()}
        </View>

        <View style={styles.buttonContainer} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scannerContainer: {
    flex: 1,
    backgroundColor: "#000000"
  },
  scannerCamera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  scannerImage: {
    width: layout.window.width * 0.7,
    height: layout.window.width * 0.7
  },

  buttonContainer: {
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 30
  }
});

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
  addStamp
};

export default connect(mapStateToProps, mapDispatchToProps)(ScannerScanScreen);
