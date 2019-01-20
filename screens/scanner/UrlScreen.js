import React from "react";
import { connect } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  View
} from "react-native";

import * as Routes from "../../navigation";
import { setUrl, QRDATA_URL } from "../../store/reducers/qrdata";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Hamburger from "../../components/Hamburger";
import defaultStyles from "../../constants/Styles";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

class ScannerUrlScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "QR Code tester",
    headerTitle: "",
    headerRight: <Hamburger navigation={navigation} />,
    headerStyle: {
      borderBottomWidth: 0,
      backgroundColor: colors.background
    }
    // headerTransparent: true
  });

  get urlField() {
    // Default value:
    return this.props.url !== null ? this.props.url : "URL";
  }

  onSavePress = async () => {
    try {
      await AsyncStorage.setItem(QRDATA_URL, this.props.url);
    } catch (err) {
      // Silent error…
    }

    this.props.navigation.navigate(Routes.SCANNER_SCAN);
  };

  render() {
    return (
      <View style={defaultStyles.container}>
        <ScrollView
          style={defaultStyles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>QR Code{"\n"}tester</Text>
          </View>

          <View style={styles.inputContainer}>
            <Input
              value={this.urlField}
              onChangeText={text => this.props.setUrl(text)}
              autoCapitalize="none"
            />
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Save" onPress={this.onSavePress} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 30
  },

  titleContainer: {
    alignItems: "center",
    marginTop: 70,
    marginBottom: 40
  },
  titleText: {
    fontFamily: layout.fontHead,
    fontSize: 40,
    color: colors.color,
    textTransform: "uppercase",
    textAlign: "center"
  },

  inputContainer: {
    alignItems: "center",
    marginTop: 15,
    marginBottom: 60,
    marginHorizontal: 30
  },

  buttonContainer: {
    alignItems: "center",
    marginHorizontal: 30
  }
});

const mapStateToProps = state => ({
  // …
  url: state.qrdata.url
});

const mapDispatchToProps = {
  // …
  setUrl
};

export default connect(mapStateToProps, mapDispatchToProps)(ScannerUrlScreen);
