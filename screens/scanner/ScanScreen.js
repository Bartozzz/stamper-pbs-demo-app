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
import { getImageForMessage } from "../../helpers/scanner";
import colors from "../../constants/Colors";

const SpinnerImage = require("../../assets/loaders/spinner.gif");

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

  redirectToSuccess = message => {
    const { image, dimensions, timeout } = getImageForMessage(message);

    this.props.navigation.navigate(Routes.INFO_SUCCESS, {
      ...dimensions,
      image,
      timeout,
      redirect: Routes.DASHBOARD,
      message: i18n.t(`success.scanner.${message}`)
    });
  };

  redirectToFailure = () => {
    const mode = this.props.navigation.getParam("type", Routes.SCANNER);

    this.props.navigation.navigate(Routes.INFO_ERROR, {
      redirect: Routes.DASHBOARD,
      message:
        mode === Routes.SCANNER
          ? i18n.t("errors.scanner.stampAdd")
          : i18n.t("errors.scanner.claimPrize")
    });
  };

  onBarCodeRead = scan => {
    if (this.state.isProcessing) {
      return;
    }

    const { navigation, addStamp } = this.props;
    const code = getParameterByName("p", scan.data);

    this.props.navigation.setParams({
      hideHeader: true
    });

    this.setState({
      isProcessing: true,
      isRequesting: true
    });

    AsyncStorage.setItem(FORCE_REFRESH_WALLET, JSON.stringify(true));
    AsyncStorage.setItem(FORCE_REFRESH_PRIZES, JSON.stringify(true));

    addStamp(code)
      .then(res => {
        const { termsAndConditions, message } = res.payload.data;

        if (termsAndConditions) {
          navigation.navigate(Routes.SCANNER_ACCEPT_STAMP_TERMS, {
            title: termsAndConditions.title,
            termsAndConditionsUrl: termsAndConditions.termsAndConditionsUrl,
            onConfirm: () => {
              addStamp(code, true)
                .then(res => {
                  this.redirectToSuccess(res.payload.data.message);
                })
                .catch(() => {
                  this.redirectToFailure();
                });
            }
          });
        } else {
          this.redirectToSuccess(message);
        }
      })
      .catch(() => {
        this.redirectToFailure();
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
