import React from "react";
import { connect } from "react-redux";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { AsyncStorage, Text, View, Image, StyleSheet } from "react-native";
import * as Analytics from "expo-firebase-analytics";

import * as Routes from "../../navigation";
import { addStamp } from "../../store/reducers/stamp";
import { FORCE_REFRESH_WALLET } from "../../store/reducers/wallet";
import { FORCE_REFRESH_PRIZES } from "../../store/reducers/prizes";
import HeaderTitle from "../../components/HeaderTitle";
import HeaderHamburger from "../../components/HeaderHamburger";
import HeaderBack from "../../components/HeaderBack";
import NoInternet from "../../components/NoInternet";
import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import layout from "../../constants/Layout";
import { getParameterByName } from "../../helpers/urls";
import { getImageForMessage } from "../../helpers/scanner";
import colors from "../../constants/Colors";

const SpinnerImage = require("../../assets/loaders/spinner.gif");

class ScannerScanScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.scanner.scan"),
    header: navigation.state.params
      ? navigation.state.params.hideHeader
        ? null
        : undefined
      : undefined,
    headerTitle: HeaderTitle,
    headerLeft: <HeaderBack navigation={navigation} />,
    headerRight: <HeaderHamburger navigation={navigation} />,
    headerStyle: defaultStyles.headerTwoLines,
  });

  state = {
    isRequesting: false,
    isProcessing: false,
    focusedScreen: true,
    hasCameraPermission: null,
    internet: undefined,
  };

  focusListener = null;
  blurListener = null;

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);

    this.setState({
      hasCameraPermission: status === "granted",
    });

    this.focusListener = this.props.navigation.addListener("willFocus", () =>
      this.setState({ focusedScreen: true })
    );

    this.blurListener = this.props.navigation.addListener("willBlur", () =>
      this.setState({ focusedScreen: false })
    );

    if (this.props.navigation.state.params.internet === false) {
      this.setState({ internet: false });
    }
  }

  componentWillUnmount() {
    this.focusListener.remove();
    this.blurListener.remove();
  }

  redirectToSuccess = (message) => {
    const { image, dimensions, timeout } = getImageForMessage(message);

    this.props.navigation.navigate(Routes.INFO_SUCCESS, {
      ...dimensions,
      image,
      timeout,
      redirect: Routes.DASHBOARD,
      message: i18n.t(`success.scanner.${message}`),
    });
  };

  redirectToFailure = () => {
    const mode = this.props.navigation.getParam("type", Routes.SCANNER);

    this.props.navigation.navigate(Routes.INFO_ERROR, {
      redirect: Routes.DASHBOARD,
      message:
        mode === Routes.SCANNER
          ? i18n.t("errors.scanner.stampAdd")
          : i18n.t("errors.scanner.claimPrize"),
    });
  };

  redirectToTerms = (code, walletId, termsAndConditions) => {
    const { navigation } = this.props;
    const { title, termsAndConditionsUrl } = termsAndConditions;

    navigation.navigate(Routes.SCANNER_ACCEPT_STAMP_TERMS, {
      title,
      termsAndConditionsUrl,
      onConfirm: () => {
        this.props
          .addStamp(code, walletId, true)
          .then((res) => {
            const { message } = res.payload.data;

            if (message) {
              this.redirectToSuccess(message);
              Analytics.logEvent("add_stamp");
            } else {
              this.redirectToFailure();
            }
          })
          .catch(() => {
            this.redirectToFailure();
          });
      },
    });
  };

  onBarCodeRead = async (scan) => {
    if (this.state.isProcessing) {
      return;
    }

    try {
      let code;
      if (scan.code) {
        code = scan.code;
      } else {
        code = getParameterByName("p", scan.data);
      }

      this.props.navigation.setParams({
        hideHeader: true,
      });

      this.setState({
        isProcessing: true,
        isRequesting: true,
      });

      await AsyncStorage.setItem(FORCE_REFRESH_WALLET, JSON.stringify(true));
      await AsyncStorage.setItem(FORCE_REFRESH_PRIZES, JSON.stringify(true));

      this.props
        .addStamp(code, this.props.navigation.state.params.walletCardId)
        .then((res) => {
          const { termsAndConditions, message } = res.payload.data;

          if (termsAndConditions && typeof termsAndConditions === "object") {
            this.redirectToTerms(
              code,
              this.props.navigation.state.params.walletCardId,
              termsAndConditions
            );
          } else if (message && message !== "error") {
            this.redirectToSuccess(message);
            Analytics.logEvent("add_stamp");
          } else {
            this.redirectToFailure();
          }
        })
        .catch(() => {
          this.redirectToFailure();
        });
    } catch (err) {
      this.redirectToFailure();
    }
  };

  renderBarCodeScanner() {
    const { hasCameraPermission, focusedScreen } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }

    if (!hasCameraPermission) {
      return <Text>No access to camera</Text>;
    }

    if (this.state.internet === false) {
      return <NoInternet />;
    }

    if (focusedScreen) {
      return (
        <Camera
          onBarCodeScanned={this.onBarCodeRead}
          style={[StyleSheet.absoluteFill, styles.scannerCamera]}
        >
          <Image
            style={styles.scannerImage}
            source={require("../../assets/images/qr.png")}
          />
        </Camera>
      );
    }

    return null;
  }

  render() {
    if (this.props.navigation.state.params.p) {
      const data = { code: this.props.navigation.state.params.p };
      this.onBarCodeRead(data);
    }

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
    backgroundColor: "#000000",
  },
  scannerCamera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scannerImage: {
    width: layout.window.width * 0.7,
    height: layout.window.width * 0.7,
  },

  buttonContainer: {
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 30,
  },
});

const mapStateToProps = () => ({
  // …
});

const mapDispatchToProps = {
  // …
  addStamp,
};

export default connect(mapStateToProps, mapDispatchToProps)(ScannerScanScreen);
