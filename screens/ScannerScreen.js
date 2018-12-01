import React from "react";
import { BarCodeScanner } from "expo";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform
} from "react-native";

import Button from "../components/Button";
import colors from "../constants/Colors";
import layout from "../constants/Layout";

const forwardIcon =
  Platform.OS === "ios" ? "ios-arrow-forward" : "md-arrow-forward";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },

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

export default class ScannerScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "QR Code scanner",
    headerRight: (
      <TouchableOpacity
        style={styles.next}
        onPress={() => navigation.navigate("Output")}
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.scannerContainer}>
          <BarCodeScanner
            onBarCodeRead={scan => alert(scan.data)}
            style={StyleSheet.absoluteFill}
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Scan" />
        </View>
      </View>
    );
  }
}
