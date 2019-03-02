import React from "react";
import { connect } from "react-redux";
import { BarCodeScanner, Permissions } from "expo";
import { Text, View, Image, StyleSheet } from "react-native";

import * as Routes from "../../navigation";
import { addStamp } from "../../store/reducers/stamp";
import Button from "../../components/Button";
import Hamburger from "../../components/Hamburger";
import HeaderTitle from "../../components/HeaderTitle";
import HeaderBackIcon from "../../components/HeaderBack";
import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import layout from "../../constants/Layout";
import { getParameterByName } from "../../helpers/urls";

class ScannerScanScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.scanner.scan"),
    headerTitle: HeaderTitle,
    headerLeft: <HeaderBackIcon navigation={navigation} />,
    headerRight: <Hamburger navigation={navigation} />,
    headerStyle: defaultStyles.headerTwoLines
  });

  state = {
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

    this.setState({
      isProcessing: true
    });

    addStamp(code)
      .then(res =>
        navigation.navigate(Routes.INFO_SUCCESS, {
          redirect: Routes.DASHBOARD,
          message: i18n.t(`success.scanner.${res.payload.data.message}`)
        })
      )
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
    return (
      <View style={defaultStyles.container}>
        <View style={styles.scannerContainer}>
          {this.renderBarCodeScanner()}
        </View>

        <View style={styles.buttonContainer}>
          <Button title={i18n.t("scanner.scan.action")} onPress={() => null} />
        </View>
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
