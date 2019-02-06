import React from "react";
import { connect } from "react-redux";
import { BarCodeScanner, Permissions } from "expo";
import { Ionicons } from "@expo/vector-icons";
import { Text, View, Image, StyleSheet, Platform } from "react-native";

import * as Routes from "../../navigation";
import { setQrc } from "../../store/reducers/qrdata";
import { addStamp } from "../../store/reducers/stamp";
import Button from "../../components/Button";
import Hamburger from "../../components/Hamburger";
import i18n from "../../translations";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";
import { getParameterByName } from "../../helpers/urls";

class ScannerScanScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: i18n.t("navigation.scanner.scan"),
    headerRight: <Hamburger navigation={navigation} />
  });

  state = {
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
    const code = getParameterByName("p", scan.data);

    this.props
      .addStamp(code)
      .then(() => this.props.navigation.navigate(Routes.DASHBOARD))
      .catch(() => this.props.navigation.navigate(Routes.DASHBOARD));
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
    width: layout.window.width * 0.5,
    height: layout.window.width * 0.5
  },

  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 30,

    ...Platform.select({
      ios: {
        marginBottom: 35
      },
      android: {
        marginBottom: 20
      }
    })
  }
});

const mapStateToProps = state => ({
  // …
});

const mapDispatchToProps = {
  // …
  addStamp
};

export default connect(mapStateToProps, mapDispatchToProps)(ScannerScanScreen);
