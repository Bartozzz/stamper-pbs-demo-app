import React from "react";
import { connect } from "react-redux";
import { BarCodeScanner } from "expo";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";

import * as Routes from "../../navigation";
import { setQrc } from "../../store/reducers/qrdata";
import Button from "../../components/Button";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

const forwardIcon =
  Platform.OS === "ios" ? "ios-arrow-forward" : "md-arrow-forward";

const styles = StyleSheet.create({
  next: {
    flexDirection: "row",
    alignItems: "center"
  },
  nextText: {
    color: colors.color,
    fontSize: 17,
    alignItems: "center"
  },
  nextIcon: {
    ...Platform.select({
      ios: {
        paddingHorizontal: 6
      },
      android: {
        paddingLeft: 8,
        paddingRight: 16
      }
    })
  },

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

class ScannerScanScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "Skanuj kod",
    headerRight: (
      <TouchableOpacity
        style={styles.next}
        onPress={() => navigation.navigate(Routes.SCANNER_DATA)}
      >
        <Text style={styles.nextText}>Next</Text>

        <Ionicons
          style={styles.nextIcon}
          name={forwardIcon}
          size={Platform.select({
            ios: 32,
            android: 24
          })}
          color="white"
        />
      </TouchableOpacity>
    )
  });

  state = {
    focusedScreen: true
  };

  focusListener = null;
  blurListener = null;

  componentDidMount() {
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
    this.props.setQrc(scan.data);
    this.props.navigation.navigate(Routes.SCANNER_DATA);
  };

  render() {
    return (
      <View style={defaultStyles.container}>
        <View style={styles.scannerContainer}>
          {this.state.focusedScreen ? (
            <BarCodeScanner
              onBarCodeRead={this.onBarCodeRead}
              style={[StyleSheet.absoluteFill, styles.scannerCamera]}
            >
              <Image
                style={styles.scannerImage}
                source={require("../../assets/images/qr.png")}
              />
            </BarCodeScanner>
          ) : null}
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Skanuj kod" onPress={() => null} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  // …
  qrc: state.qrdata.qrc
});

const mapDispatchToProps = {
  // …
  setQrc
};

export default connect(mapStateToProps, mapDispatchToProps)(ScannerScanScreen);
