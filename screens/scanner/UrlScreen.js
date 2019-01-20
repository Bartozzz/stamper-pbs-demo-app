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

import { setUrl, QRDATA_URL } from "../../store/reducers/qrdata";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Hamburger from "../../components/Hamburger";
import colors from "../../constants/Colors";
import layout from "../../constants/Layout";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background
  },
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

class UrlScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: "QR Code tester",
    headerRight: <Hamburger navigation={navigation} />
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

    this.props.navigation.navigate("Scanner");
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
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

const mapStateToProps = state => ({
  // …
  url: state.qrdata.url
});

const mapDispatchToProps = {
  // …
  setUrl
};

export default connect(mapStateToProps, mapDispatchToProps)(UrlScreen);
